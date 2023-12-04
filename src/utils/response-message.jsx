import toast from "react-hot-toast";

const responseData = [
  { code: "OK001", message: "User is Created" },
  { code: "OK002", message: "Admin User is Created" },
  {
    code: "OK003",
    message: "Logged in successfully",
  },
  {
    code: "OK004",
    message: "Verified User",
  },
  {
    code: "OK005",
    message: "User has been Deleted",
  },
  {
    code: "OK006",
    message: "Loggout  successfully",
  },
  {
    code: "OK007",
    message:
      "Verification Code is sent to your email address.Check your email Inbox or Spam",
  },
  {
    code: "OK008",
    message: "The OTP is Verified",
  },
  {
    code: "OK009",
    message: "Notification is Readed",
  },
  {
    code: "OK010",
    message: "All the Notifications is Cleared",
  },
  {
    code: "OK011",
    message: "Notification is Cleared",
  },
  { code: "ER999", message: "Something went wrong" },
  { code: "ER001", message: "Requested Page not found" },
  { code: "ER002", message: "Email Does Not have any account" },
  { code: "ER003", message: "InCorrect Password" },
  {
    code: "ER004",
    message: "There is an issue while sending mail. Please try again.",
  },
  {
    code: "ER005",
    message: "Email already exist",
  },
  {
    code: "ER006",
    message: "Your User Account has been Deleted By Admin",
  },
  {
    code: "ER007",
    message: "There is an issue while sending mail. Please try again.",
  },
  {
    code: "ER008",
    message: "The OTP you have got is Expired.Please, generate a new OTP",
  },
  {
    code: "ER009",
    message:
      "Oops! It looks like you entered the wrong OTP. Please verify your email or request a new",
  },
  { code: "ER901", message: "Please Autheticate" },
];

const responseType = (code) => {
  let type;
  if (code.startsWith("O")) {
    type = "success";
  } else {
    type = "error";
  }
  return type;
};
export const responseMessage = (code, duration = 2000) => {
  const info = responseData.find((o) => o.code === code);
  return toast[responseType(info.code)](info.message, { duration });
};
