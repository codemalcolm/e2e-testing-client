import { Avatar, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isLoggedIn, authError, logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <div className="navbar">
      <Link to="/">
        <Text fontWeight={700}>E2E-TESTING</Text>
      </Link>
      <Link to="/dashboard">
        <Text _hover={{ color: "gray.400" }}>Dashboard</Text>
      </Link>
      <div className="navbar-action-section">
        {isLoggedIn ? (
          <>
            <Button
              onClick={() => {
                handleLogoutClick();
              }}
            >
              Logout
            </Button>
            <Link to="/user-page">
              <Avatar size="sm" cursor="pointer" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Text _hover={{ color: "gray.400" }}>Sign In</Text>
            </Link>
            <Button
              backgroundColor="#929896"
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
