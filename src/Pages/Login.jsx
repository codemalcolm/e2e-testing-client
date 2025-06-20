import { useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import useLoginUser from "../hooks/useLoginUser";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { isLoading, error, loginUser } = useLoginUser();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(form);

    if (error) {
      console.log("EBJBHEA");
      toast({
        title: "This user doesn't exist",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // navigate("/dashboard");
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
