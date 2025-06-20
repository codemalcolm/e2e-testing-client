import { useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Input } from "@chakra-ui/react";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", form);
      alert("Registered!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box width="320px">
      <form onSubmit={handleSubmit}>
        <Flex flexDirection={"column"} gap={"16px"}>
          <h2>Register</h2>
          <Input
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit">Register</Button>
        </Flex>
      </form>
    </Box>
  );
}
