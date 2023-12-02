import Cropper from "react-easy-crop";
import React, { useState } from "react";

import "./style.css";

const AppImageCropper = ({
  width = 1,
  height = 1,
  image,
  shape = "rect",
  setCroppedAreaPixels,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea, cp) => {
    setCroppedAreaPixels(cp);
  };

  return (
    <div style={{ height: "25rem" }}>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={width / height}
        cropShape={shape}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  );
};

export default AppImageCropper;
