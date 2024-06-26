import { useState, useEffect } from "react";
import axios from "axios";

const GetTestResult = (testID) => {
  const [testResult, setTestResult] = useState(undefined);
  const proxyURL = process.env.REACT_APP_PROXY_URL;
  const accessKey = process.env.REACT_APP_PERSONALITY_TEST_API_KEY;

  useEffect(() => {
    const getResult = async () => {
      try {
        const response = await axios.get(
          `${proxyURL}/api/personalitypolice/get_result`,
          {
            params: {
              api_key: accessKey,
              test_id: testID,
            },
          }
        );
        setTestResult(response.data.data);
      } catch (error) {
        console.log(
          "Error when getting test result from Personality Police: " + error
        );
      }
    };

    getResult();
  }, []);
  return testResult;
};

export default GetTestResult;
