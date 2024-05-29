import React from "react";
import dayjs from "dayjs";

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
  const savedActiveStep = JSON.parse(window.localStorage.getItem("activeStep"));
  const savedErrorMessage = JSON.parse(
    window.localStorage.getItem("errorMessage")
  );
  const savedSubmissionStatus = JSON.parse(
    window.localStorage.getItem("submissionStatus")
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
    year_of_study: "",
    nationality: "",
    gender: "",
    birthday: null,
    location: "",
    interests: [],
    description: "",
  };

  // React States
  // Initialize formData to track user inputs
  const [formData, setFormData] = React.useState(
    savedFormData !== null ? savedFormData : defaultForm
  );

  // The current active page in which user is filling up the form
  const [activeStep, setActiveStep] = React.useState(
    savedActiveStep ? savedActiveStep : 0
  );

  // The current completion status of each step within the form
  const [completed, setCompleted] = React.useState(
    savedCompleteStatus ? savedCompleteStatus : {}
  );

  // Tracking whether the form can be submitted based on
  // whether there's any missing required fields in the form
  // display error message based on the data stored in this state
  const [submissionStatus, setSubmissionStatus] = React.useState(
    savedSubmissionStatus
      ? savedSubmissionStatus
      : {
          submittable: true,
          invalidField: "",
          invalidStep: -1,
        }
  );

  // Tracking the error status of each field in the form
  // such that when the first invalid field is indentified
  // we can highlight it with red color
  const [error, setError] = React.useState(
    savedErrorMessage
      ? savedErrorMessage
      : {
          username: false,
          email: false,
          password: false,
          confirmPassword: false,
          first_major: false,
          education_status: false,
          year_of_study: false,
          nationality: false,
          gender: false,
          birthday: false,
          location: false,
        }
  );

  //React Effect
  // Update user's profile data when sign up form is submitted successfully
  React.useEffect(() => {
    window.localStorage.setItem("profileData", JSON.stringify(prop.profile));
  }, [prop.profile]);

  // Update the data in localStorage when any status is changed
  React.useEffect(() => {
    window.localStorage.setItem("signUpFormData", JSON.stringify(formData));
  }, [formData]);

  // Update the completion status when it is changed
  // so that the completion icon on the Stepper can be properly shown
  // to reflect user's progress when filling up the form
  React.useEffect(() => {
    window.localStorage.setItem("completeStatus", JSON.stringify(completed));
  }, [completed]);

  // Update the activeStep in localStorage when it is changed
  // so that when the form refresh user still stays at the
  // current active page
  React.useEffect(() => {
    window.localStorage.setItem("activeStep", JSON.stringify(activeStep));
  }, [activeStep]);

  // Keep track of submission status of the form
  // so that when the form refresh user still can see what is the first missing
  // field in the form
  React.useEffect(() => {
    window.localStorage.setItem(
      "submissionStatus",
      JSON.stringify(submissionStatus)
    );
  }, [submissionStatus]);

  // Update the error in localStorage when it is changed
  // so that when the form refresh user still can see the
  // alert message and highlighted fields for invalid inputs
  React.useEffect(() => {
    window.localStorage.setItem("errorMessage", JSON.stringify(error));
  }, [error]);

  // Keep track of whether user's password and confirm password are the same
  // so that the fields can be properly highlighted in red and show alert message
  // when user put in invalid data
  const passwordMatch = formData.password === formData.confirmPassword;
  React.useEffect(() => {
    setError((prev) => ({
      ...prev,
      password: !passwordMatch,
      confirmPassword: !passwordMatch,
    }));
  }, [passwordMatch]);

  // Keep track of birthday input from user and confirm that the selected
  // birthday is before today
  const validBirthday = dayjs().isAfter(formData.birthday);
  React.useEffect(() => {
    setError((prev) => ({ ...prev, birthday: !validBirthday }));
  }, [validBirthday]);

  // Form handling (Validation & Submission)
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

  // Handling user's changes in form inputs
  const handleChange = (event) => {
    // Update form data based on changed field and user's input
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);

    // If user fill up any missing field, instantly change the
    // error state of that field and subission status to make
    // highlight color and alert message disappear,
    if (
      name !== "password" &&
      name !== "confirmPassword" &&
      name !== "birthday"
    ) {
      setError((prev) => ({ ...prev, [name]: false }));
      setSubmissionStatus({
        submittable: true,
        invalidField: "",
        invalidStep: -1,
      });
    }
  };

  // Handle action when user submit the form
  // A warning message will display if there's any missing input field
  // submittable, first invalid value and error status of each field
  // are tracked by this event as well
  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      {
        key: "username",
        name: "Username",
        step: 1,
        condition: formData.username !== "",
      },
      {
        key: "email",
        name: "Email",
        step: 1,
        condition: formData.email !== "",
      },
      {
        key: "password",
        name: "Password",
        step: 1,
        condition: formData.password !== "",
      },
      {
        key: "confirmPassword",
        name: "Confirm_Password",
        step: 1,
        condition: formData.confirmPassword !== "",
      },
      {
        key: "first_major",
        name: "First_Major",
        step: 2,
        condition: formData.first_major !== "",
      },
      {
        key: "education_status",
        name: "Education_Status",
        step: 2,
        condition: formData.education_status !== "",
      },
      {
        key: "year_of_study",
        name: "Year_of_Study",
        step: 2,
        condition: formData.year_of_study > 0 && formData.year_of_study < 5,
      },
      {
        key: "nationality",
        name: "Nationality",
        step: 2,
        condition: formData.nationality !== "",
      },
      {
        key: "gender",
        name: "Gender",
        step: 3,
        condition: formData.gender !== "",
      },
      {
        key: "birthday",
        name: "Birthday",
        step: 3,
        condition: formData.birthday !== null,
      },
      {
        key: "location",
        name: "Location",
        step: 3,
        condition: formData.location !== "",
      },
    ];

    const firstInvalidField = requiredFields.find((field) => !field.condition);

    if (!firstInvalidField && passwordMatch && validBirthday) {
      //Testing code
      console.log(formData);
      prop.setProfile(formData);

      //Reset form after successful form submission
      setFormData(defaultForm);
      setCompleted({});
      setActiveStep(0);
      //Submit through API to database after backend is complete
    } else {
      setSubmissionStatus({
        submittable: false,
        invalidField: firstInvalidField.name,
        invalidStep: firstInvalidField.step,
      });
      requiredFields
        .slice(0, firstInvalidField.index)
        .map((field) => setError((prev) => ({ ...prev, [field.key]: false })));
      setError((prev) => ({
        ...prev,
        [firstInvalidField.key]: true,
      }));
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
            {formData.password !== formData.confirmPassword && (
              <Alert severity="error">The password and confirm password do not match.</Alert>
            )}
            {dayjs().isBefore(dayjs(formData.birthday)) && (
              <Alert severity="error">
                You cannot pick a date that is in the future as your birthday.
              </Alert>
            )}
            {!submissionStatus.submittable && (
              <Alert severity="error">
                The field {submissionStatus.invalidField} in step{" "}
                {submissionStatus.invalidStep} is required but is not filled.
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
