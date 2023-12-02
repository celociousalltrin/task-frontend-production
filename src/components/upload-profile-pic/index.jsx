import React, { useState } from "react";

import { TbCameraPlus } from "react-icons/tb";

import avatar from "../../assets/avatar/avatar-icon.png";
import { convertFileToDataURL } from "../../utils/common-function";
import { staticResponseMessage } from "../../utils/static-response-message";

import AppImageDialogueBox from "../../components/app-image-dialogue-box";

import "./style.css";

const UploadProfilePicture = ({ image_uri, setFieldValue, activeTab }) => {
  const [date, setDate] = useState(new Date());
  const [selectedImageDataURL, setSelectedImageDataURL] = useState();
  const [isOpenDialogueBox, setIsOpenDialogueBox] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const maxSizeInBytes = 1024 * 1024;
    if (selectedFile.size > maxSizeInBytes) {
      staticResponseMessage("FA001");
      return;
    }
    setDate(new Date());

    if (selectedFile) {
      const imageURL = await convertFileToDataURL(selectedFile);
      setSelectedImageDataURL(imageURL);
      setIsOpenDialogueBox(true);
    }
  };

  return (
    <div className="text-start p-4 pt-1 pb-0 mb-4">
      <div>
        <div className="signup-edit-prof">
          <img
            src={!image_uri ? avatar : image_uri}
            alt="profile-img"
            width="130px"
            height="130px"
            className="rounded-circle signup-edit-prof-img"
          />

          <div>
            <label htmlFor="fileInput">
              <TbCameraPlus
                size={50}
                className="signup-edit-prof__camicon1 position-absolute start-50 top-50 translate-middle"
              />
            </label>
            <input
              type="file"
              id="fileInput"
              key={date}
              style={{ display: "none" }}
              onChange={handleFileChange}
              name="myFile"
            />
          </div>
        </div>
      </div>

      <AppImageDialogueBox
        show={isOpenDialogueBox}
        setShow={setIsOpenDialogueBox}
        setSelectedImageDataURL={setSelectedImageDataURL}
        selectedImageDataURL={selectedImageDataURL}
        callback={(url) => {
          setFieldValue("image_uri", url);
        }}
        isProfile
      />
    </div>
  );
};

export default UploadProfilePicture;
