import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountForm from "../page/build-profile-forms/AccountForm";

test("Username Textfield should correct record user's change", async () => {
  const formData = { username: "" };
  const error = { username: false };
  const mockSetFormData = jest.fn();
  const mockHandleChange = jest.fn((event) => {
    formData.username += event.target.value;
    mockSetFormData(formData);
  });
  const mockHandleSubmit = jest.fn();

  render(
    <AccountForm
      formData={formData}
      error={error}
      setFormData={mockSetFormData}
      handleChange={mockHandleChange}
      handleSubmit={mockHandleSubmit}
    />
  );

  const inputElement = await screen.findByLabelText(/Username/i);
  expect(inputElement.value).toBe("");

  await userEvent.type(inputElement, "RandomUsername1");

  expect(mockHandleChange).toHaveBeenCalledTimes(15);
  expect(formData.username).toBe("RandomUsername1");
});

test("Email Textfield should correct record user's change", async () => {
  const formData = { email: "" };
  const error = { email: false };
  const mockSetFormData = jest.fn();
  const mockHandleChange = jest.fn((event) => {
    formData.email += event.target.value;
    mockSetFormData(formData);
  });
  const mockHandleSubmit = jest.fn();

  render(
    <AccountForm
      formData={formData}
      error={error}
      setFormData={mockSetFormData}
      handleChange={mockHandleChange}
      handleSubmit={mockHandleSubmit}
    />
  );

  const inputElement = await screen.findByLabelText(/Email Address/i);
  expect(inputElement.value).toBe("");

  await userEvent.type(inputElement, "RandomEmail@gmail.com");

  expect(mockHandleChange).toHaveBeenCalledTimes(21);
  expect(formData.email).toBe("RandomEmail@gmail.com");
});

test("Password Textfield should correct record user's change", async () => {
  const formData = { password: "" };
  const error = { password: false };
  const mockSetFormData = jest.fn();
  const mockHandleChange = jest.fn((event) => {
    formData.password += event.target.value;
    mockSetFormData(formData);
  });
  const mockHandleSubmit = jest.fn();

  render(
    <AccountForm
      formData={formData}
      error={error}
      setFormData={mockSetFormData}
      handleChange={mockHandleChange}
      handleSubmit={mockHandleSubmit}
    />
  );

  const inputElement = await screen.findByLabelText(/^Password.*\*/i);
  expect(inputElement.value).toBe("");

  await userEvent.type(inputElement, "123456@654321!");

  expect(mockHandleChange).toHaveBeenCalledTimes(14);
  expect(formData.password).toBe("123456@654321!");
});

test("Confirm Password Textfield should correct record user's change", async () => {
  const formData = { confirmPassword: "" };
  const error = { confirmPassword: false };
  const mockSetFormData = jest.fn();
  const mockHandleChange = jest.fn((event) => {
    formData.confirmPassword += event.target.value;
    mockSetFormData(formData);
  });
  const mockHandleSubmit = jest.fn();

  render(
    <AccountForm
      formData={formData}
      error={error}
      setFormData={mockSetFormData}
      handleChange={mockHandleChange}
      handleSubmit={mockHandleSubmit}
    />
  );

  const inputElement = await screen.findByLabelText(/Confirm Password/i);
  expect(inputElement.value).toBe("");

  await userEvent.type(inputElement, "123456@654321!");

  expect(mockHandleChange).toHaveBeenCalledTimes(14);
  expect(formData.confirmPassword).toBe("123456@654321!");
});
