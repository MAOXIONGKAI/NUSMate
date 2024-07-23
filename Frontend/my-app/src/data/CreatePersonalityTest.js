import { useState, useEffect } from "react";
import axios from "axios";

const CreatePersonalityTest = (username, redirect) => {
  const [testURL, setTestURL] = useState("");
  const [testID, setTestID] = useState("");

  const frontendURL = process.env.REACT_APP_FRONTEND_URL;
  const proxyURL = process.env.REACT_APP_PROXY_URL;
  const accessKey = process.env.REACT_APP_PERSONALITY_TEST_API_KEY;

  useEffect(() => {
    const newTest = async () => {
      try {
        const response = await axios.get(
          `${proxyURL}/api/personalitypolice/new_test`,
          {
            params: {
              api_key: accessKey,
              company_name: "NUSMate",
              theme_color: "rgba(87, 187, 252, 100)",
              name_of_tester: username,
              completed_message:
                "You will soon be redirected back to NUSMate to complete the rest of the sign up process.",
              notify_url: `${frontendURL}/sign-up`,
              return_url: `${frontendURL}/${
                redirect === undefined ? "sign-up" : redirect
              }`,
            },
          }
        );
        setTestURL(response.data.data.test_url);
        setTestID(response.data.data.test_id);
      } catch (error) {
        console.error("Error when creating new personality test:" + error);
      }
    };

    newTest();
  }, []);

  return [testURL, testID];
};

export default CreatePersonalityTest;
