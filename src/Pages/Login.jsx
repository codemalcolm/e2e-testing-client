import { useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import useLoginUser from "../hooks/useLoginUser";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { isLoading, error, loginUser } = useLoginUser();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(form);

    if (error) {
      console.log("EBJBHEA");
      return toast({
        title: "This user doesn't exist",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if (!isLoading) window.location.href = "/dashboard";
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
