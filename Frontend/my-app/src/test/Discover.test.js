import { screen, fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Discover from "../page/Discover";

let mockSetProfile = jest.fn();

describe("Discover Page", () => {
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
    description:
      "This is Random User.",
    personality: "ESFP",
  };

  const renderComponent = (profile) => {
    render(<Discover profile={profile} setProfile={mockSetProfile} />)
  }

  it("correctly displays search features and background", () => {
    renderComponent(profile);
    expect(screen.getByLabelText("First Major")).toBeInTheDocument();
    expect(screen.getByLabelText("Second Major")).toBeInTheDocument();
    expect(screen.getByLabelText("Education Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Nationality")).toBeInTheDocument();
    expect(screen.getByLabelText("Location")).toBeInTheDocument();
    expect(screen.getByLabelText("Personality")).toBeInTheDocument();
    expect(screen.getByLabelText("Personality")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search by Interests...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search by Username...")).toBeInTheDocument();
    expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
    expect(screen.getByTestId("PersonSearchIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ShuffleIcon")).toBeInTheDocument();
    expect(screen.getByAltText("Discover page background when no result is shown")).toBeInTheDocument();
  });

  it("correctly adds interests when user type and press enter in interest field", async () => {
    renderComponent(profile);

    let interestField = await screen.findByTestId("interest-input");
    await userEvent.type(interestField, "Coding")
    await fireEvent.keyDown(interestField, {key: 'Enter', code: 'Enter', charCode: 13});

    expect(screen.getByText("Coding")).toBeInTheDocument();

    interestField = await screen.findByTestId("interest-input");
    await userEvent.type(interestField, "Reading");
    await fireEvent.keyDown(interestField, {key: 'Enter', code: 'Enter', charCode: 13});

    expect(screen.getByText("Reading")).toBeInTheDocument();
  })

  it("correctly remove interests when user clicks delete button for each interest", async () => {
    renderComponent(profile);

    let interestField = await screen.findByTestId("interest-input");
    await userEvent.type(interestField, "Coding")
    await fireEvent.keyDown(interestField, {key: 'Enter', code: 'Enter', charCode: 13});

    expect(screen.getByText("Coding")).toBeInTheDocument();

    await fireEvent.click(screen.getByTestId("CancelIcon"));
    expect(screen.queryByText("Coding")).not.toBeInTheDocument();

  })
});
