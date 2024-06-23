import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../page/Login";
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

describe("Login Page", () => {
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <Login
          profile={profile}
          setProfile={mockSetProfile}
          setLoggedIn={mockSetProfile}
        />
      </BrowserRouter>
    );
  };

  it("correctly shows wallpaper at the left side with proper attribution", () => {
    renderComponent();
    expect(screen.getByText("Unsplash")).toBeInTheDocument();
  });

  it("correctly shows the login input fields", () => {
    renderComponent();

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Remember Me/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign/i })).toBeInTheDocument();
  });
});
