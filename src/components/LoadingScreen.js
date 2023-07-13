import React, { useState } from "react";
import { useEffect } from "react";
import Button from "./Button";

const LoadingScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleRefresh = () => {
    setShow(true);
    // Add any additional logic you need for refreshing the website
    window.location.reload();
  };

  return (
    <div className="loading-screen">
      {show ? (
        <div className="spinner" />
      ) : (
        <>
          <h3>Network Error!</h3>
          <Button text={"Refresh"} color={"light"} onClick={handleRefresh}/>
        </>
      )}
    </div>
  );
};

export default LoadingScreen;
