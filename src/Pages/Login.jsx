import { useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import useLoginUser from "../hooks/useLoginUser";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { isLoading, error, loginUser } = useLoginUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(form);
    setTimeout(() => {
      alert("Logged in!");
      if (error) alert("Error occured :", error);
      if (!isLoading) window.location.href = "/dashboard";
    }, [500]);
  };

  return (
    <Box width="320px">
      <form onSubmit={handleSubmit}>
        <Flex flexDirection={"column"} gap={"16px"}>
          <Text fontSize="18px">Login</Text>
          <Input
            id="username-input"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            id="password-input"
            placeholder="Password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" width="100%">
            Login
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
