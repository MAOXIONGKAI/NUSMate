import { useState, useEffect } from "react";
import axios from "axios";

const RandomImage = () => {
  // Create state to store the url return from unsplash API
  // as well as the relevant attribution(to push for production mode)
  const [imageURL, setImageURL] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [attribution, setAttribution] = useState("");

  // Access key gotten from unsplash official
  const accessKey = process.env.REACT_APP_UNSPLASH_API_KEY;

  // Use effect hook to make API call
  // This is to prevent infinite re-rendering due to React's way of
  // handling states and rendering of components
  useEffect(() => {
    // Making random image request and wait for response from unsplash
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
            params: {
              query: "wallpapers",
            },
          }
        );

        //Update image url when fetch successful
        setImageURL(response.data.urls.regular);
        setAuthorName(response.data.user.name);
        setAttribution(
          `https://unsplash.com/@${response.data.user.username}?utm_source=NUSMate&utm_medium=referral`
        );
        console.log("The author for this image is " + response.data.user.name);
      } catch (error) {
        console.error("Error fetching the image from Unsplash:", error);
      }
    };

    fetchImage();
  }, []);

  return [imageURL, authorName, attribution];
};

export default RandomImage;
