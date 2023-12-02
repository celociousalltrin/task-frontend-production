export const authenticateButtonName = (input) => {
  if (input.startsWith("u")) {
    return "User";
  } else {
    return "Admin";
  }
};

export const convertFileToDataURL = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => resolve(reader.result), false);
  });
};

export const generateCroppedImageDataURL = (imageDataURL, cropedSize) => {
  const image = new Image();
  image.src = imageDataURL;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = cropedSize.width;
  canvas.height = cropedSize.height;

  ctx.drawImage(
    image,
    cropedSize.x,
    cropedSize.y,
    cropedSize.width,
    cropedSize.height,
    0,
    0,
    cropedSize.width,
    cropedSize.height
  );

  const croppedImage = canvas.toDataURL("image/jpeg");
  return croppedImage;
};

export const imageDownload = (cloudinaryUrl, format = "jpg") => {
  fetch(cloudinaryUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `user-image.${format}`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    })
    .catch((error) => console.error("Error downloading image:", error));
};
