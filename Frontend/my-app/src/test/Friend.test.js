import { screen, render } from "@testing-library/react";
import Friend from "../page/Friend";

let mockSetProfile = jest.fn();

describe("Friend", () => {
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
    render(<Friend profile={profile} setProfile={mockSetProfile} />);
  };

  it("correctly displays background when user has no friend/request/profiles in each section", () => {
    renderComponent(profile);
    expect(screen.getByText(/Nothing found over here.../i)).toBeInTheDocument();
    expect(
      screen.getByText(/Maybe you can discover more friends/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/through our discover page?/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Background when friend page is empty/i)).toBeInTheDocument();
  });

  it("correctly displays each sections of the toggle menu", () => {
    renderComponent(profile);
    expect(screen.getByText(/^My Friend$/i)).toBeInTheDocument();
    expect(screen.getByText(/My Friend Request/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending Request/i)).toBeInTheDocument();
    expect(screen.getByText(/Favorite/i)).toBeInTheDocument();
  })
});
