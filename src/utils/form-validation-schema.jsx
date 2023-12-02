import * as yup from "yup";

const emailSchema = yup
  .string()
  .email("Please enter a valid email")
  .required("Email is required");

const passwordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(12, "Password cannot exceed 12 characters")
  .required("Password Required");

export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "name must be atleast 4 characters")
    .max(12, "name cannot exceed 12 characters")
    .required("Name is Required"),
  email: emailSchema,
  password: passwordSchema,
  phone_number: yup
    .string()
    .matches(
      /^[6-9]\d{9}$/,
      "Mobile number must be 10 digits and start with 6, 7, 8, or 9"
    )
    .required("Mobile number is required"),
});
