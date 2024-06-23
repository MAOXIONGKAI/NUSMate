import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "../page/SignUp";
import { BrowserRouter } from "react-router-dom";

let profile;
let mockSetProfile;
let mockSetLoggedIn;

beforeEach(() => {
  profile = {};
  mockSetProfile = jest.fn();
  mockSetLoggedIn = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Sign Up", () => {
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <SignUp
          profile={profile}
          setProfile={mockSetProfile}
          setLoggedIn={mockSetLoggedIn}
        />
      </BrowserRouter>
    );
  };

  it("correctly shows the stepper", () => {
    renderComponent();

    expect(screen.getByText("Start creating an account")).toBeInTheDocument();
    expect(screen.getByText("Build your NUS profile")).toBeInTheDocument();
    expect(screen.getByText("Fill up personal info")).toBeInTheDocument();
    expect(
      screen.getByText("Complete our personality test")
    ).toBeInTheDocument();
  });

  it("correctly shows step 1 when user enter the page", () => {
    renderComponent();

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password.*\*$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  });

  it("correctly shows step 1 when clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Start creating an account"));

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password.*\*$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  });

  it("correctly shows step 2 when clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Build your NUS profile"));

    expect(screen.getByLabelText(/First Major/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Second Major/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Education Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year of Study/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nationality/i)).toBeInTheDocument();
  });

  it("correctly shows step 3 when clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Fill up personal info"));

    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  it("correctly shows step 4 when clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Complete our personality test"));

    expect(
      screen.getByText(
        /You are almost there!Now just help us fill up a personality test formto help us understand you better!/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Please take note this quiz takes around 20 mins to finish.For accuracy of test result, please fill up majority of the questions.Too many missing field may cause the test result to be voided./i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/START THE TEST/i)).toBeInTheDocument();
  });

  it("correctly disable the back button at step 1", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Start creating an account"));

    expect(screen.getByText("Back")).toBeDisabled();
  });

  it("correctly replace next button with submit button at step 4", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Complete our personality test"));

    expect(screen.queryByText("Next")).not.toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("correctly navigates between steps by clicking back and next button", async () => {
    renderComponent();

    await fireEvent.click(screen.getByText("Start creating an account"));

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password.*\*$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();

    await fireEvent.click(screen.getByText("Next"));

    expect(screen.getByLabelText(/First Major/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Second Major/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Education Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year of Study/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nationality/i)).toBeInTheDocument();

    await fireEvent.click(screen.getByText("Next"));

    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();

    await fireEvent.click(screen.getByText("Next"));

    expect(
      screen.getByText(
        /You are almost there!Now just help us fill up a personality test formto help us understand you better!/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Please take note this quiz takes around 20 mins to finish.For accuracy of test result, please fill up majority of the questions.Too many missing field may cause the test result to be voided./i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/START THE TEST/i)).toBeInTheDocument();

    await fireEvent.click(screen.getByText("Back"));

    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();

    await fireEvent.click(screen.getByText("Back"));

    expect(screen.getByLabelText(/First Major/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Second Major/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Education Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year of Study/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nationality/i)).toBeInTheDocument();

    await fireEvent.click(screen.getByText("Back"));

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password.*\*$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  });

  it("correctly warn user about missing fields when submitting form", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Complete our personality test"));
    fireEvent.click(screen.getByText("Submit"));

    expect(
      screen.getByText(
        /The field Username in step 1 is required but is not filled./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The personality test is required but not finished./i)
    ).toBeInTheDocument();
  });

  it("correctly warn user about invalid email format when typing in email field", async () => {
    renderComponent();
    fireEvent.click(screen.getByText("Start creating an account"));
    await userEvent.type(
      screen.getByLabelText(/Email Address/i),
      "InvalidEmailAddress"
    );

    expect(
      screen.getByText(/The email format is invalid./i)
    ).toBeInTheDocument();
  });

  it("correctly warn user about unmatching passwords when typing in password field", async () => {
    renderComponent();
    fireEvent.click(screen.getByText("Start creating an account"));
    await userEvent.type(screen.getByLabelText(/^Password.*\*$/), "Password1");
    await userEvent.type(
      screen.getByLabelText(/Confirm Password/),
      "Password2"
    );

    expect(
      screen.getByText(/The password and confirm password do not match./i)
    ).toBeInTheDocument();
  });

  it("correctly warn user about invalid birthday when enter a future date as birthday", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Fill up personal info"));
    fireEvent.change(screen.getByLabelText("Birthday"), {
      target: { value: "01/01/2030" },
    });
    expect(
      screen.getByText(
        /You cannot pick a date that is in the future as your birthday./i
      )
    ).toBeInTheDocument();
  });
});
