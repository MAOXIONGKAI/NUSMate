import { screen, render } from "@testing-library/react";
import UserCard from "../component/Friend/UserCard";
import { BrowserRouter } from "react-router-dom";

describe("User Card", () => {
  const profile = {
    _id: "6665Ic10lbfab98689eb7f7o",
    username: "RandomUser",
    email: "random@gmail.com",
    password: "123456",
    first_major: "Computer Science",
    second_major: "English Literature",
    education_status: "Undergraduate",
    year_of_study: 2,
    nationality: "Chinese",
    gender: "Male",
    birthday: "1000-12-10T16:00:00.000Z",
    location: "Kent Ridge",
    interests: ["Cooking", "Coding", "Running"],
    description: "This is Random User.",
    personality: "ESFP",
  };

  const renderComponent = (profile) => {
    render(
      <BrowserRouter>
        <UserCard
          profile={profile}
          sx={{ flexGrow: 1 }}
          refreshPage={() => {}}
        />
      </BrowserRouter>
    );
  };

  it("correctly displays the username", () => {
    renderComponent(profile);
    expect(screen.getByText(/RandomUser/i)).toBeInTheDocument();
  });
  it("correctly displays the first major", () => {
    renderComponent(profile);
    expect(screen.getByText(/Computer Science/i)).toBeInTheDocument();
  });
  it("correctly displays the second major", () => {
    renderComponent(profile);
    expect(screen.getByText(/English Literature/i)).toBeInTheDocument();
  });
  it("correctly displays the description", () => {
    renderComponent(profile);
    expect(screen.getByText(/This is Random User./i)).toBeInTheDocument();
  });
  it("correctly displays the education status", () => {
    renderComponent(profile);
    expect(screen.getByText(/(BA)/i)).toBeInTheDocument();
  });
  it("correctly displays the interests", () => {
    renderComponent(profile);
    expect(screen.getByText(/Cooking/i)).toBeInTheDocument();
    expect(screen.getByText(/Coding/i)).toBeInTheDocument();
    expect(screen.getByText(/Running/i)).toBeInTheDocument();
  });
});