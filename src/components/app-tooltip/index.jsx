import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const AppToolTip = ({ children, title, position = "top" }) => {
  return (
    <OverlayTrigger placement={position} overlay={<Tooltip>{title}</Tooltip>}>
      <span>{children}</span>
    </OverlayTrigger>
  );
};

export default AppToolTip;
