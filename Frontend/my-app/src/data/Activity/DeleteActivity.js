import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function DeleteActivity(ID) {
  try {
    const URLs = [
      `${backendURL}/api/activities/${ID}`,
      `${backendURL}/api/participants/remove_all_participants/${ID}`,
    ];
    const requestPromises = URLs.map((URL) => {
      return axios.delete(URL, {
        headers: { "Content-Type": "application/json" },
      });
    });
    
    const response = await axios.all(requestPromises);
    return response;
  } catch (error) {
    console.log(
      "Error when deleting activity: " + JSON.stringify(error.response.data)
    );
  }
}
