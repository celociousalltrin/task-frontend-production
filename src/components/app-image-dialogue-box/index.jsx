import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";

import { generateCroppedImageDataURL } from "../../utils/common-function";
import { staticResponseMessage } from "../../utils/static-response-message";

import AppImageCropper from "../app-image-cropper";

import "./style.css";

const AppImageDialogueBox = ({
  show,
  setShow,
  selectedImageDataURL,
  setSelectedImageDataURL,
  callback = () => {},
  isProfile,
  width,
  height,
}) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedImageDataURL("");
  };

  const handleGenerateCroppedImage = (crop, imageURL) => {
    const result = generateCroppedImageDataURL(imageURL, crop);

    callback(result);
    handleClose();
    staticResponseMessage("SUCC001");
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <AppImageCropper
            image={selectedImageDataURL}
            setCroppedAreaPixels={setCroppedAreaPixels}
            {...(isProfile && { shape: "round" })}
            {...(width && { width })}
            {...(height && { height })}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={() =>
              handleGenerateCroppedImage(
                croppedAreaPixels,
                selectedImageDataURL
              )
            }
          >
            Upload
          </button>

          <button className="btn btn-danger" onClick={handleClose}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppImageDialogueBox;
