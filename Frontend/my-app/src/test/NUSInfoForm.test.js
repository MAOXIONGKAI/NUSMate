import { fireEvent, render, screen, within } from "@testing-library/react";
import NUSInfoForm from "../page/build-profile-forms/NUSInfoForm";

describe("NUSInfoForm", () => {
  // Mock Data to test in the test environment
  let formData;
  let error;
  let mockSetFormData;
  let mockHandleChange;
  let mockHandleSubmit;

  // Reset States of data before each test
  beforeEach(() => {
    formData = {
      first_major: "",
      second_major: "",
      education_status: "",
      year_of_study: "",
      nationality: ""
    };
    error = {
        first_major: false,
        second_major: false,
        education_status: false,
        year_of_study: false,
        nationality: false
    };
    mockSetFormData = jest.fn();
    mockHandleChange = jest.fn((event) => {
      const { name, value } = event.target;
      formData = { ...formData, [name]: formData[name] + value };
      mockSetFormData(formData);
    });
    mockHandleSubmit = jest.fn();
  });

  const renderComponent = () => {
    render(
      <NUSInfoForm
        formData={formData}
        error={error}
        setFormData={mockSetFormData}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    );
  };

  it("correctly updates First Major Field", () => {
    renderComponent();
    const selectElement = screen.getByLabelText(/First Major/i);

    fireEvent.mouseDown(selectElement);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(/Computer Science/i));

    expect(formData.first_major).toBe("Computer Science");
  });

  it("correctly updates Second Major Field", () => {
    renderComponent();
    const selectElement = screen.getByLabelText(/Second Major/i);

    fireEvent.mouseDown(selectElement);
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText(/Computer Science/i));

    expect(formData.second_major).toBe("Computer Science")
  })

  it("correctly updates Education Status Field", () => {
    renderComponent();
    const selectElement = screen.getByLabelText(/Education Status/i);

    fireEvent.mouseDown(selectElement);
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("Undergraduate"));

    expect(formData.education_status).toBe("Undergraduate");
  })

  it("correctly updates Year of Study Field", () => {
    renderComponent();
    const selectElement = screen.getByLabelText(/Year of Study/i);

    fireEvent.mouseDown(selectElement);
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("1"));

    expect(formData.year_of_study).toBe("1");
  })

  it("correctly updates Nationality Field", () => {
    renderComponent();
    const selectElement = screen.getByLabelText(/Nationality/i);

    fireEvent.mouseDown(selectElement);
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("Chinese"));

    expect(formData.nationality).toBe("Chinese");
  })
});
