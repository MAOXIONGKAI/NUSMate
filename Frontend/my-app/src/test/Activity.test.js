import { screen, render } from "@testing-library/react";
import Activity from "../page/Activity";

let mockSetProfile = jest.fn();

describe("Activity", () => {
  const profile = {
    _id: "6665Ic10lbfab98689eb7f7o",
    username: "RandomUser",
    email: "random@gmail.com",
    password: "123456",
    first_major: "Computer Science",
    second_major: "",
    education_status: "Undergraduate",
    year_of_study: 2,
    nationality: "Chinese",
    gender: "Male",
    birthday: "1000-12-10T16:00:00.000Z",
    location: "Kent Ridge",
    interests: [],
    description: "This is Random User.",
    personality: "ESFP",
  };

  const renderComponent = (profile) => {
    render(<Activity profile={profile} setProfile={mockSetProfile} />);
  };

  it("correctly displays background when user has no activity in each section", () => {
    renderComponent(profile);
    expect(screen.getByText(/No activity found at the moment.../i)).toBeInTheDocument();
    expect(
      screen.getByText(/Perhaps you can try add your first one?/i)
    ).toBeInTheDocument();
    expect(screen.getByAltText(/Background for blank Activity Page/i)).toBeInTheDocument();
  });
});
