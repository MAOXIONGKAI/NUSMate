import { screen, render, fireEvent } from "@testing-library/react";
import PersonalityTest from "../page/build-profile-forms/PersonalityTest";

let error;
let formData;
let mockSetFormData = jest.fn();
let mockHandleChange = jest.fn();
let mockHandleSubmit = jest.fn();

beforeEach(() => {
  error = {};
  formData = { personality: "" };
  mockSetFormData = jest.fn();
  mockHandleChange = jest.fn();
  mockHandleSubmit = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Personality Test Page in Sign Up Page", () => {
  const renderComponent = () => {
    render(
      <PersonalityTest
        formData={formData}
        setFormData={mockSetFormData}
        error={error}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    );
  };

  it("correctly show test info when user first get prompted the page", () => {
    renderComponent();

    expect(
        screen.getByText(
          /You are almost there!Now just help us fill up a personality test formto help us understand you better!/i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Please take note this quiz takes around 20 mins to finish.For accuracy of test result, please fill up majority of the questions.However, it is not compulsory to finish all the questions.As long as the form is not empty, a test result can be generated.If you are unsatisfied with the test result, you can always retake test in edit profile section./i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/START THE TEST/i)).toBeInTheDocument();
  });
});
