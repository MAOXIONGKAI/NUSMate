import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountForm from "../page/build-profile-forms/AccountForm";

describe("Account Menu", () => {
  // Mock Data to test in the test environment
  let formData;
  let error;
  let mockSetFormData;
  let mockHandleChange;
  let mockHandleSubmit;

  // Reset States of data before each test
  beforeEach(() => {
    formData = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    error = {
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
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
      <AccountForm
        formData={formData}
        error={error}
        setFormData={mockSetFormData}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    );
  };

  it("correctly updates changes in Username Field", async () => {
    renderComponent();

    const inputElement = screen.getByLabelText(/Username/i);

    await userEvent.type(inputElement, "RandomUser1");

    expect(mockHandleChange).toHaveBeenCalledTimes(11);
    expect(formData.username).toBe("RandomUser1");
  });

  it("correctly updates changes in Email Field", async () => {
    renderComponent();

    const inputElement = screen.getByLabelText(/Email Address/i);

    await userEvent.type(inputElement, "RandomAccount@gmail.com");

    expect(mockHandleChange).toHaveBeenCalledTimes(23);
    expect(formData.email).toBe("RandomAccount@gmail.com");
  });

  it("correctly updates changes in Password Field", async () => {
    renderComponent();

    const inputElement = screen.getByLabelText(/^Password.*\*$/i);

    await userEvent.type(inputElement, "123456ABCDEF!@#$%^");

    expect(mockHandleChange).toHaveBeenCalledTimes(18);
    expect(formData.password).toBe("123456ABCDEF!@#$%^");
  });

  it("correctly updates changes in Confirm Password Field", async () => {
    renderComponent();

    const inputElement = screen.getByLabelText(/Confirm Password/i);

    await userEvent.type(inputElement, "!@#$%^ABCDEF123456");

    expect(mockHandleChange).toHaveBeenCalledTimes(18);
    expect(formData.confirmPassword).toBe("!@#$%^ABCDEF123456");
  });
});
