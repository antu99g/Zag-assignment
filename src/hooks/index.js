import { useState } from "react";

// Custom hook for showing options list
export const useShowOptions = () => {
  const [show, setShow] = useState(false);

  const handleChange = () => {
    setShow((prevState) => !prevState);
  };

  return { show, handleChange };
};
