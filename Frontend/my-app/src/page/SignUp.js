import React from "react";

import AccountForm from "./build-profile-forms/AccountForm";
import NUSInfoForm from "./build-profile-forms/NUSInfoForm";
import PersonalForm from "./build-profile-forms/PersonalForm";
import PersonalityTest from "./build-profile-forms/PersonalityTest";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
import { Alert } from "@mui/material";

const steps = [
  "Start creating an account",
  "Build your NUS profile",
  "Fill up personal info",
  "Complete our personality test",
];

export default function SignUp(prop) {
  // Reading saved data and load them from local storage
  const savedFormData = JSON.parse(
    window.localStorage.getItem("signUpFormData")
  );
  const savedCompleteStatus = JSON.parse(
    window.localStorage.getItem("completeStatus")
  );

  //Sign Up form's default value
  const defaultForm = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_major: "",
    second_major: "",
    education_status: "",
    year_of_study: 0,
    nationality: "",
    gender: "",
    birthday: null,
    location: "",
    interests: [],
    description: "",
  }

  // Initialize formData to track user inputs
  const [formData, setFormData] = React.useState(
    savedFormData !== null
      ? savedFormData
      : defaultForm
  );

  // The current active page in which user is filling up the form
  const [activeStep, setActiveStep] = React.useState(0);

  // The current completion status of each step within the form
  const [completed, setCompleted] = React.useState(
    savedCompleteStatus ? savedCompleteStatus : {}
  );

  // Tracking whether the form can be submitted based on
  // whether there's any missing required fields in the form
  const [submittable, setSubmittable] = React.useState(true);

  // Tracking first invalid field in the form
  const [invalidField, setInvalidField] = React.useState("");

  // Tracking the step in which the first invalid field is found
  const [invalidStep, setInvalidStep] = React.useState(-1);

  // Tracking the error status of each field in the form
  // such that when the first invalid field is indentified
  // we can highlight it with red color
  const [error, setError] = React.useState({
    Username: false,
    Email: false,
    Password: false,
    Confirm_Password: false,
    First_Major: false,
    Education_Status: false,
    Year_of_Study: false,
    Nationality: false,
    Gender: false,
    Birthday: false,
    Location: false,
  });

  // Interaction with higher layer using react effect hook
  // Update user's profile data when sign up form is submitted successfully
  React.useEffect(() => {
    window.localStorage.setItem("profileData", JSON.stringify(prop.profile));
  }, [prop.profile]);

  // Update the data in localStorage when any status is changed
  React.useEffect(() => {
    window.localStorage.setItem("signUpFormData", JSON.stringify(formData));
  }, [formData]);

  React.useEffect(() => {
    window.localStorage.setItem("completeStatus", JSON.stringify(completed));
  }, [completed]);

  // Validating whether each step is completed with valid data
  const validateStep = (step) => {
    switch (step) {
      case 0:
        return (
          formData.username !== "" &&
          formData.email !== "" &&
          formData.password !== "" &&
          formData.confirmPassword !== ""
        );
      case 1:
        return (
          formData.first_major !== "" &&
          formData.education_status !== "" &&
          formData.year_of_study > 0 &&
          formData.year_of_study < 5 &&
          formData.nationality !== ""
        );
      case 2:
        return (
          formData.gender !== "" &&
          formData.birthday !== null &&
          formData.location !== ""
        );
      default:
        return true;
    }
  };

  // Handle action when user click next
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setCompleted((prev) => ({ ...prev, [activeStep]: true }));
    } else {
      setCompleted((prev) => ({ ...prev, [activeStep]: false }));
    }
    setActiveStep((prev) => prev + 1);
  };

  // Handle action when user click back
  const handleBack = () => {
    if (!validateStep(activeStep)) {
      setCompleted((prev) => ({ ...prev, [activeStep]: false }));
    }
    setCompleted((prev) => ({ ...prev, [activeStep]: true }));
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle action when user jump page by clicking the step icon directly
  const handleStep = (step) => () => {
    if (validateStep(activeStep)) {
      setCompleted((prev) => ({ ...prev, [activeStep]: true }));
    } else {
      setCompleted((prev) => ({ ...prev, [activeStep]: false }));
    }
    setActiveStep(step);
  };

  // Tracking user's changes in form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  // Handle action when user submit the form
  // A warning message will display if there's any missing input field
  // submittable, first invalid value and error status of each field
  // are tracked by this event as well
  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      { name: "Username", step: 1, condition: formData.username !== "" },
      { name: "Email", step: 1, condition: formData.email !== "" },
      { name: "Password", step: 1, condition: formData.password !== "" },
      {
        name: "Confirm_Password",
        step: 1,
        condition: formData.confirmPassword !== "",
      },
      { name: "First_Major", step: 2, condition: formData.first_major !== "" },
      {
        name: "Education_Status",
        step: 2,
        condition: formData.education_status !== "",
      },
      {
        name: "Year_of_Study",
        step: 2,
        condition: formData.year_of_study > 0 && formData.year_of_study < 5,
      },
      { name: "Nationality", step: 2, condition: formData.nationality !== "" },
      { name: "Gender", step: 3, condition: formData.gender !== "" },
      { name: "Birthday", step: 3, condition: formData.birthday !== null },
      { name: "Location", step: 3, condition: formData.location !== "" },
    ];

    const firstInvalidField = requiredFields.find((field) => !field.condition);

    if (!firstInvalidField) {
      console.log(formData);
      prop.setProfile(formData);
      setFormData(defaultForm)
      //Submit through API to database after backend is complete
    } else {
      setSubmittable(false);
      setInvalidField(firstInvalidField.name);
      setInvalidStep(firstInvalidField.step);
      requiredFields
        .slice(0, firstInvalidField.index)
        .map((field) => setError((prev) => ({ ...prev, [field.name]: false })));
      setError((prev) => ({ ...prev, [firstInvalidField.name]: true }));
    }
  };

  return (
    <Box
      sx={{
        width: "fullWidth",
        height: "fullHeight",
        marginBottom: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "75%",
          marginTop: "3%",
          justifyContent: "center",
        }}
      >
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          <React.Fragment>
            {activeStep === 0 ? (
              <AccountForm
                formData={formData}
                error={error}
                setFormData={setFormData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            ) : activeStep === 1 ? (
              <NUSInfoForm
                formData={formData}
                error={error}
                setFormData={setFormData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            ) : activeStep === 2 ? (
              <PersonalForm
                formData={formData}
                error={error}
                setFormData={setFormData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            ) : (
              <PersonalityTest
                error={error}
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
            {!submittable && (
              <Alert severity="error">
                The field {invalidField} in step {invalidStep} is required but
                is not filled.
              </Alert>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {!(activeStep === 3) && (
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
            </Box>
          </React.Fragment>
        </div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
