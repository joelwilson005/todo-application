import { useState, useEffect } from "react";

const useCheckUserStatus = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    setIsUserSignedIn(Boolean(localStorage.getItem("isUserSignedIn")));
  }, [isUserSignedIn]);

  return isUserSignedIn;
};

export default useCheckUserStatus;
