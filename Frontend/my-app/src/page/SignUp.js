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
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const steps = [
  "Start creating an account",
  "Build your NUS profile",
  "Fill up personal info",
  "Complete our personality test",
];

export default function SignUp() {
  const savedFormData = JSON.parse(
    window.localStorage.getItem("signUpFormData")
  );
  const [formData, setFormData] = React.useState(
    savedFormData !== null
      ? savedFormData
      : {
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
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(formData);
  };

  React.useEffect(() => {
    window.localStorage.setItem("signUpFormData", JSON.stringify(formData));
  }, [formData]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Array of required fields and their validation conditions
    const requiredFields = [
      { name: "username", condition: formData.username !== "" },
      { name: "email", condition: formData.email !== "" },
      { name: "password", condition: formData.password !== "" },
      { name: "confirmPassword", condition: formData.confirmPassword !== "" },
      { name: "first_major", condition: formData.first_major !== "" },
      { name: "education_status", condition: formData.education_status !== "" },
      {
        name: "year_of_study",
        condition: formData.year_of_study > 0 && formData.year_of_study < 5,
      },
      { name: "nationality", condition: formData.nationality !== "" },
      { name: "gender", condition: formData.gender !== "" },
      { name: "birthday", condition: formData.birthday !== null },
      { name: "location", condition: formData.location !== "" },
    ];

    // Find the first field that does not meet its condition
    const firstInvalidField = requiredFields.find((field) => !field.condition);

    if (!firstInvalidField) {
      // All required fields are valid
      console.log(formData);
    } else {
      // Handle the first invalid field
      console.error(
        `The field "${firstInvalidField.name}" is required and is not filled.`
      );
      // Optionally, set an error message in your state to display to the user
      // setFormErrors({ ...formErrors, [firstInvalidField.name]: 'This field is required.' });
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
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 ? (
                <AccountForm
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              ) : activeStep === 1 ? (
                <NUSInfoForm
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              ) : activeStep === 2 ? (
                <PersonalForm
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <PersonalityTest
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
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
          )}
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
