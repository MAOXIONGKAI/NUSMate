import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const GetSearchResult = (tags) => {
  const getResult = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/profiles/query`, tags, {
        headers: {
          "Content-Type": "application/json",
        },
      });
        return response.data;
    } catch (error) {
        console.log("Error when querying database to find matching user profiles: " + error);
    }
  };
  return getResult();
};

export default GetSearchResult;
