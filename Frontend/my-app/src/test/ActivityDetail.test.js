import { screen, render } from "@testing-library/react";
import ActivityDetail from "../component/Activity/ActivityDetail";

let mockSetProfile = jest.fn();
let mockSetHasModified = jest.fn();

describe("Activity Detail", () => {
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

  const activity = {
    _id: "668e31a00bc49ea722ee6f8a",
    hostID: "66651f101bfad98689eb7f70",
    hostName: "MAO XIONGKAI",
    activityName: "Unit 704 SIR Reservist",
    pax: 15,
    startDate: "2025-06-15T16:00:00.000Z",
    endDate: "2025-06-19T16:00:00.000Z",
    location: "Kranji Camp II",
    description: "Don't be late and I will see you in the ARMY!",
    createdAt: "2024-07-10T07:00:48.474+00:00",
    updatedAt: "2024-07-16T10:20:06.447+00:00",
    __v: 0,
  };

  const renderComponent = (profile) => {
    render(
        <ActivityDetail
        open={true}
        refresh={true}
        profile={profile}
        _id={"66651f101bfad98689eb7f70"}
        hostID={"66651f101bfad98689eb7f70"}
        hostName={activity.hostName}
        activityName={activity.activityName}
        pax={activity.pax}
        startDate={activity.startDate}
        endDate={activity.endDate}
        location={activity.location}
        description={activity.description}
        triggerNotification={activity.triggerNotification}
      />
    );
  };

  it("correctly displays the activity name", () => {
    renderComponent(profile);
    expect(screen.getByText(/Unit 704 SIR Reservist/i)).toBeInTheDocument();
  });
  it("correctly displays the activity location", () => {
    renderComponent(profile);
    expect(screen.getByText(/Kranji Camp II/i)).toBeInTheDocument();
  });
  it("correctly displays the activity description", () => {
    renderComponent(profile);
    expect(
      screen.getByText(/Don't be late and I will see you in the ARMY!/i)
    ).toBeInTheDocument();
  });
  it("correctly displays the edit activity button", () => {
    renderComponent(profile);
    expect(
      screen.getByText(/Don't be late and I will see you in the ARMY!/i)
    ).toBeInTheDocument();
  });
  it("correctly displays the edit activity form when edit activity button is clicked", () => {
    renderComponent(profile);
    expect(
      screen.getByText(/Don't be late and I will see you in the ARMY!/i)
    ).toBeInTheDocument();
  });
});
