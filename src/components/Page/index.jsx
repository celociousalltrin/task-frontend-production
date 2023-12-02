import React from "react";
import Header from "../header";

import "./style.css";

const Page = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mt-4">
        <div className="page-container ">
          <div className="center-Page-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
