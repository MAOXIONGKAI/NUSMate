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
          year_of_study: "",
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  React.useEffect(() => {
    window.localStorage.setItem("signUpFormData", JSON.stringify(formData));
  }, [formData]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [submittable, setSubmittable] = React.useState(true);
  const [invalidField, setInvalidField] = React.useState("");
  const [invalidStep, setInvalidStep] = React.useState(-1);
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

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setCompleted((prev) => ({ ...prev, [activeStep]: true }));
    } else {
      setCompleted((prev) => ({ ...prev, [activeStep]: false }));
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (!validateStep(activeStep)) {
      setCompleted((prev) => ({ ...prev, [activeStep]: false }));
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

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
