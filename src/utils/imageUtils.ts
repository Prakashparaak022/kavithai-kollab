export const getImageSrc = (image: string | null) => {
  return image || "/avatar-placeholder.png";
};

export const getUserImageSrc = (image: string | null) => {
  return image ? `data:image/jpeg;base64,${image}` : "/avatar-placeholder.png";
};
