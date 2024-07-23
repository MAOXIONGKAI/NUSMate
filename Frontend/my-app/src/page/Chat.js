import React from "react";
import { useLocation } from "react-router-dom";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import GetFriends from "../data/Friend/GetFriends";
import GetUserProfile from "../data/GetUserProfile";
import ChatFriendMenu from "../component/ChatFriendMenu";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import StyledButton from "../component/StyledButton";
import { db } from "../data/Firebase/firebase-config";
import ChatMessages from "../component/ChatMessages";
import UpdateLocalUserProfile from "../data/UpdateLocalUserProfile";
import CheckIfFriend from "../data/Friend/CheckIfFriend";
import CustomizedSnackbar from "../component/CustomizedSnackbar";

export default function Chat(prop) {
  const { profile } = prop;
  const userID = profile._id;

  // Get previous webpage's data if user come to this page by clicking user card
  const location = useLocation();
  const targetUser = location.state?.data ? location.state.data : "";

  const [friends, setFriends] = React.useState([]);
  const [currentFriend, setCurrentFriend] = React.useState(targetUser);
  const [openFriendRemoved, setOpenFriendRemoved] = React.useState(false);
  const [newMessage, setNewMessages] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const latestMsg = React.useRef();

  React.useEffect(() => {
    UpdateLocalUserProfile(prop.profile, prop.setProfile);
  }, []);

  // Getting user's friends data when user enter the chat page
  React.useEffect(() => {
    const getFriendProfiles = async () => {
      const friendships = await GetFriends(userID);
      const profilePromises = friendships.map((friendship) =>
        GetUserProfile(
          friendship.toUserID !== userID
            ? friendship.toUserID
            : friendship.fromUserID
        )
      );
      const result = await Promise.all(profilePromises);
      setFriends(result);
    };
    getFriendProfiles();
  }, []);

  // If user has friends, and the user does not come to
  // this page by clicking someone's user card,
  // automatically focus on the first friend
  React.useEffect(() => {
    if (friends.length === 0) return;
    if (!targetUser) {
      setCurrentFriend(friends[0]._id);
    }
  }, []);

  const handleChange = (event) => {
    setNewMessages(event.target.value);
  };

  const messagesRef = collection(db, "messages");

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!newMessage.trim() || !currentFriend) return;
    if (!(await CheckIfFriend(userID, currentFriend))) {
      setOpenFriendRemoved(true);
      return;
    }
    const message = {
      text: newMessage,
      sender: profile._id,
      user: [profile._id, currentFriend],
      createdAt: serverTimestamp(),
    };
    await addDoc(messagesRef, message);
    setNewMessages("");
  };

  const handlePressEnter = async (event) => {
    if (!currentFriend) return;
    if (event.key === "Enter" && newMessage.trim()) {
      if (!(await CheckIfFriend(userID, currentFriend))) {
        setOpenFriendRemoved(true);
        return;
      }
      const message = {
        text: newMessage,
        sender: profile._id,
        user: [profile._id, currentFriend],
        createdAt: serverTimestamp(),
      };
      await addDoc(messagesRef, message);
      setNewMessages("");
    }
  };

  // Fetch Chat Messages from Firebase
  React.useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("user", "array-contains", userID),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(
      queryMessages,
      (snapshot) => {
        let messages = [];
        const filteredMessages = snapshot.docs.filter((doc) => {
          const userArray = doc.data().user;
          return userArray.includes(currentFriend);
        });
        filteredMessages.forEach((doc) =>
          messages.push({ ...doc.data(), id: doc.id })
        );
        setMessages(messages);
      },
      (error) => {
        console.log("Error when fetching chat messages: " + error);
      }
    );
    return () => unsubscribe();
  }, [currentFriend]);

  React.useEffect(() => {
    if (latestMsg.current) {
      latestMsg.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 75px)",
        width: "100%",
        margin: "0px",
      }}
    >
      <CustomizedSnackbar
        text="Oops...Seems like you are sending message to someone who is not your friend anymore..."
        severity="error"
        open={openFriendRemoved}
        setOpen={setOpenFriendRemoved}
      />
      <Box sx={{ display: "flex", width: "20vw" }}>
        <ChatFriendMenu
          profile={profile}
          friends={friends}
          currentFriend={currentFriend}
          setCurrentFriend={setCurrentFriend}
        />
      </Box>
      <Box component="main" sx={{ width: "80vw", p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "65vh",
          }}
        >
          <ChatMessages
            messages={messages}
            userID={userID}
            latestMsg={latestMsg}
            currentFriend={currentFriend}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "fixed",
            bottom: "5%",
            width: "76.3%",
          }}
        >
          <TextField
            fullWidth
            autoComplete="off"
            sx={{ marginRight: "20px" }}
            size="small"
            placeholder="Type your message here..."
            name="newMessage"
            value={newMessage}
            onChange={handleChange}
            onKeyDown={handlePressEnter}
          />
          <StyledButton
            text="Send"
            style={{ color: "white", margin: "0px" }}
            background={currentFriend === "" ? "gray" : null}
            disabled={currentFriend === ""}
            onClick={handleSendMessage}
          />
        </Box>
      </Box>
    </Box>
  );
}
