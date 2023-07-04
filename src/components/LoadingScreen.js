import React from "react";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p className="loading-text">Checking authentication...</p>
    </div>
  );
};

export default LoadingScreen;
