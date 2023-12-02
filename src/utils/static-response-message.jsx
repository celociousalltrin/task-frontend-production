import toast from "react-hot-toast";

const staticResponseData = [
  {
    code: "SUCC001",
    message: "Image Uploaded Successfully",
  },
  {
    code: "FA001",
    message: "Only the Image size within 1 mb is allowed to upload",
  },
  {
    code: "FA002",
    message: "Please Enter a email address to Generate Code",
  },
  {
    code: "FA003",
    message: "Enter the all the OTP code ",
  },
  {
    code: "FA004",
    message: "Enter OTP",
  },
  {
    code: "FA005",
    message: "Need to Generate and Verify your email to create a Account",
  },
  {
    code: "FA006",
    message: "You need to Upload a Profile image to create a Account",
  },
];

const staticResponseType = (code) => {
  let type;
  if (code.startsWith("S")) {
    type = "success";
  } else {
    type = "error";
  }
  return type;
};

export const staticResponseMessage = (code, duration = 2500) => {
  const info = staticResponseData.find((o) => o.code === code);
  return toast[staticResponseType(info.code)](info.message, { duration });
};
