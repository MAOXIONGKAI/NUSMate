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

export default function Chat(prop) {
  const { profile } = prop;
  const userID = profile._id;

  // Get previous webpage's data if user come to this page by clicking user card
  const location = useLocation();
  const targetUser = location.state?.data ? location.state.data : "";

  const [friends, setFriends] = React.useState([]);
  const [currentFriend, setCurrentFriend] = React.useState(targetUser);
  const [newMessage, setNewMessages] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    UpdateLocalUserProfile(prop.profile, prop.setProfile);
  }, []);

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
    if (!newMessage.trim()) return;

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
    if (event.key === "Enter" && newMessage.trim()) {
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

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 75px)", margin: "0px" }}>
      <Box sx={{ display: "flex", width: "20%" }}>
        <ChatFriendMenu
          profile={profile}
          friends={friends}
          currentFriend={currentFriend}
          setCurrentFriend={setCurrentFriend}
        />
      </Box>
      <Box component="main" sx={{ width: "100%", p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "65vh",
          }}
        >
          <ChatMessages messages={messages} userID={userID} />
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "fixed",
            bottom: "5%",
            width: "80%",
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
            onClick={handleSendMessage}
          />
        </Box>
      </Box>
    </Box>
  );
}
