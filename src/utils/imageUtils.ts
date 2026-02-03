export const getImageSrc = (image: string | null) => {
  return image || "/avatar-placeholder.png";
};

export const getBase64ImageSrc = (image: string | null) => {
  return image ? `data:image/jpeg;base64,${image}` : "/fallback_placeholder.svg";
};

export const getUserImageSrc = (image: string | null) => {
  return image ? `data:image/jpeg;base64,${image}` : "/avatar-placeholder.png";
};
