import { Image, Box, Heading } from "@chakra-ui/react";
import React from "react";
import meme from "../images/27w39b.jpg";
import AllPostsList from "../components/AllPostsList";

const Homepage = () => {
  return (
    <Box textAlign="center" mt={6}>
      <Heading size="lg">Homepage</Heading>
      <Image src={meme} width={500} height={500} alt="meme" mx="auto" my={4} />
      <AllPostsList />
    </Box>
  );
};

export default Homepage;
