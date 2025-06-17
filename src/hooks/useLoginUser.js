import axios from "axios";
import React, { useState } from "react";

const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, loginUser };
};

export default useLoginUser;
