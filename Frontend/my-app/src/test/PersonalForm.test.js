import { fireEvent, render, screen, within, moment } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PersonalForm from "../page/build-profile-forms/PersonalForm";

describe("PersonalForm", () => {
  // Mock Data to test in the test environment
  let formData;
  let error;
  let mockSetFormData;
  let mockHandleChange;
  let mockHandleSubmit;

  // Reset States of data before each test
  beforeEach(() => {
    formData = {
      gender: "",
      birthday: "",
      location: "",
      interests: [],
      description: ""
    };
    error = {
        gender: false,
        birthday: false,
        location: false,
        interests: false,
        description: false,
    };
    mockSetFormData = jest.fn();
    mockHandleChange = jest.fn((event) => {
      const { name, value } = event.target;
      formData = { ...formData, [name]: formData[name] + value };
      mockSetFormData(formData);
    });
    mockHandleSubmit = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  const renderComponent = () => {
    render(
      <PersonalForm
        formData={formData}
        error={error}
        setFormData={mockSetFormData}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    );
  };

  it("correctly updates Gender Field", () => {
    renderComponent();
    const selectElement = screen.getByLabelText(/Gender/i);

    fireEvent.mouseDown(selectElement);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(/Female/i));

    expect(formData.gender).toBe("Female");
  });

  it("correctly updates Birthday Field", async () => {
    renderComponent();
    const chooseDate = await screen.findByRole("button", {name: /Choose Date/i});
    fireEvent.mouseDown(chooseDate);
    const dateInput = await screen.findByLabelText("Birthday");
    fireEvent.change(dateInput, "01/01/2024");
    expect(dateInput).toBeInTheDocument();
})

  it("correctly updates Location Field", () => {
    renderComponent();
    const selectElement = screen.getByLabelText(/Location/i);

    fireEvent.mouseDown(selectElement);
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("Paya Lebar"));

    expect(formData.location).toBe("Paya Lebar");
  });

  it("correctly updates Description Field", async () => {
    renderComponent();
    const inputElement = await screen.findByLabelText(/Description/i);

    const description = "Hi, this is RandomUser1. He is just for testing purpose.";
    await userEvent.type(inputElement, description);

    expect(mockHandleChange).toHaveBeenCalledTimes(description.length);
    expect(formData.description).toBe(description);
  })
});