import { fireEvent, render, screen } from "@testing-library/react";
import ProfilePage from "../component/ProfilePage";

describe("Profile Page", () => {
  let mockSetProfile = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (profile) => {
    render(<ProfilePage profile={profile} setProfile={mockSetProfile} />);
  };

  it("correctly display user profile with single major", () => {
    const profile = {
      username: "RandomUser1",
      first_major: "Mathematics",
      education_status: "Master",
      year_of_study: 4,
      nationality: "American",
      gender: "Female",
      birthday: "06/22/2024",
      location: "Bukit Gombak",
      interests: ["Cooking", "Dancing", "Swimming"],
      description: "This is RandomUser1, for testing purpose",
      personality: "ESFP",
    };

    renderComponent(profile);

    expect(screen.getByText("RandomUser1")).toBeInTheDocument();
    expect(screen.getByText("(she/her)")).toBeInTheDocument();
    expect(
      screen.getByText("This is RandomUser1, for testing purpose")
    ).toBeInTheDocument();
    expect(screen.getByText("Mathematics")).toBeInTheDocument();
    expect(screen.queryByText("Second Major")).not.toBeInTheDocument();
    expect(screen.getByText("Master")).toBeInTheDocument();
    expect(screen.getByText("4th year")).toBeInTheDocument();
    expect(screen.getByText("American")).toBeInTheDocument();
    expect(screen.getByText("Bukit Gombak")).toBeInTheDocument();
    expect(screen.getByText("Jun 22 2024")).toBeInTheDocument();
    expect(screen.getByText("Cooking")).toBeInTheDocument();
    expect(screen.getByText("Dancing")).toBeInTheDocument();
    expect(screen.getByText("Swimming")).toBeInTheDocument();
    expect(screen.getByText("ESFP")).toBeInTheDocument();
  });

  it("correctly display user profile with double majors", () => {
    const profile = {
      username: "RandomUser2",
      first_major: "Computer Science",
      second_major: "Business Analytics",
      education_status: "Undergraduate",
      year_of_study: 1,
      nationality: "Chinese",
      gender: "Male",
      birthday: "01/01/2024",
      location: "Admiralty",
      interests: ["Sing", "Dance", "Rap", "Basketball", "Music"],
      description: "This is RandomUser2, for testing purpose",
      personality: "INTJ",
    };

    renderComponent(profile);

    expect(screen.getByText("RandomUser2")).toBeInTheDocument();
    expect(screen.getByText("(he/him)")).toBeInTheDocument();
    expect(
      screen.getByText("This is RandomUser2, for testing purpose")
    ).toBeInTheDocument();
    expect(screen.getByText("Computer Science")).toBeInTheDocument();
    expect(screen.getByText("Business Analytics")).toBeInTheDocument();
    expect(screen.getByText("Undergraduate")).toBeInTheDocument();
    expect(screen.getByText("1st year")).toBeInTheDocument();
    expect(screen.getByText("Chinese")).toBeInTheDocument();
    expect(screen.getByText("Admiralty")).toBeInTheDocument();
    expect(screen.getByText("Jan 1 2024")).toBeInTheDocument();
    expect(screen.getByText("Sing")).toBeInTheDocument();
    expect(screen.getByText("Dance")).toBeInTheDocument();
    expect(screen.getByText("Rap")).toBeInTheDocument();
    expect(screen.getByText("Basketball")).toBeInTheDocument();
    expect(screen.getByText("Music")).toBeInTheDocument();
    expect(screen.getByText("INTJ")).toBeInTheDocument();
  });

  it("correctly enter edit mode when edit button is clicked", async () => {
    const profile = {
      username: "RandomUser3",
      first_major: "Chinese Studies",
      second_major: "Communication and New Media",
      education_status: "Doctorate",
      year_of_study: 4,
      nationality: "British",
      gender: "Male",
      birthday: "05/23/2024",
      location: "Paya Lebar",
      interests: [],
      description: "This is RandomUser3, for more complex testing",
      personality: "INTP",
    };

    renderComponent(profile);

    await fireEvent.click(screen.getByText("Edit Profile"));

    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Username/i })
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Male")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Description/i })
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Chinese Studies")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Communication and New Media")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doctorate")).toBeInTheDocument();
    expect(screen.getByDisplayValue("4")).toBeInTheDocument();
    expect(screen.getByDisplayValue("British")).toBeInTheDocument();
    expect(screen.getByDisplayValue("05/23/2024")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Paya Lebar")).toBeInTheDocument();
    expect(screen.getByText("Retake Test")).toBeInTheDocument();
  });

  it("correctly shows a confirmation prompt when user click retake test button", async () => {
    const profile = {
      username: "RandomUser4",
      first_major: "Chinese Studies",
      second_major: "Communication and New Media",
      education_status: "Doctorate",
      year_of_study: 4,
      nationality: "British",
      gender: "Male",
      birthday: "05/23/2024",
      location: "Paya Lebar",
      interests: [],
      description: "This is RandomUser4, for more complex testing",
      personality: "INTP",
    };

    renderComponent(profile);

    await fireEvent.click(screen.getByText("Edit Profile"));
    await fireEvent.click(screen.getByText("Retake Test"));

    expect(
      screen.getByText("Confirm Proceed to Retake the Test?")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByText("Return")).toBeInTheDocument();
  });
});
