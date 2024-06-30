import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default async function DeleteActivity(ID) {
    try {
        const response = await axios.delete(`${backendURL}/api/activities/${ID}`, {
            headers: {"Content-Type": "application/json"}
        })
        return response.data;
    } catch (error) {
        console.log("Error when deleting activity: " + JSON.stringify(error.response.data));
    }
}