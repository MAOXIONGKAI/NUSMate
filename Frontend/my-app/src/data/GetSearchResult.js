import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const GetSearchResult = (tags) => {
  const { searcherID } = tags;

  // Define async function to fetch matching results from database
  const getResult = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/profiles/query`, tags, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      //Return the response data, filter out the searcher's own user profile
        return response.data.filter(profile => profile._id !== searcherID);
    } catch (error) {
        console.log("Error when querying database to find matching user profiles: " + error);
    }
  };

  // call the function to get the data
  return getResult();
};

export default GetSearchResult;
