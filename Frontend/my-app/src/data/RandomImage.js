import { useState, useEffect } from "react";
import axios from "axios";

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const accessKey = "D5q3mOda2X6oSpFyeuIdAea4_VAyXZd-17Wl6XRbTno"; // Replace with your actual access key

  useEffect(() => {
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
