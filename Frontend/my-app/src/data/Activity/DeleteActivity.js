import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function DeleteActivity(userID, ID) {
  try {
    const URLs = [
      `${backendURL}/api/activities/${ID}`,
      `${backendURL}/api/participants/remove_all_participants/${ID}`,
      `${backendURL}/api/favorite_activities`,
    ];
    const requestPromises = URLs.map((URL) => {
      return axios.delete(
        URL,
        {
          data: {
            userID: userID,
            favoriteActivityID: ID,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    const response = await axios.all(requestPromises);
    return response;
  } catch (error) {
    console.log(
      "Error when deleting activity: " + JSON.stringify(error.response.data)
    );
  }
}
