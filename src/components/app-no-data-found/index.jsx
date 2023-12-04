import React from "react";

import "./style.css";

const AppNoDataFound = ({ icon, content }) => {
  return (
    <div>
      {icon && <p className="d-flex justify-content-center mb-0">{icon}</p>}
      <p className="fs-2 text-center">{content}</p>
    </div>
  );
};

export default AppNoDataFound;
