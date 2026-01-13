import React from "react";
import { ToastContainer } from "react-toastify";

const Toast = () => {
  return (
    <ToastContainer
      theme="colored"
      style={{
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: 100,
        zIndex: 99999,
      }}
      position="top-center"
      autoClose={3000}
    />
  );
};

export default React.memo(Toast);
