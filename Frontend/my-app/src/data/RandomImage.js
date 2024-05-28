import { useState, useEffect } from "react";
import axios from "axios";

const RandomImage = () => {
  // Create state to store the url return from unsplash API
  const [imageUrl, setImageUrl] = useState("");

  // Access key gotten from unsplash official
  const accessKey = "D5q3mOda2X6oSpFyeuIdAea4_VAyXZd-17Wl6XRbTno";

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
              query: "wallpapers"
            },
          }
        );

        //Update image url when fetch successful
        setImageUrl(response.data.urls.regular);
      } catch (error) {
        console.error("Error fetching the image from Unsplash:", error);
      }
    };

    fetchImage();
  }, []);

  return imageUrl;
};

export default RandomImage;
