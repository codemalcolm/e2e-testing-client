import { useEffect } from "react";
import axios from "axios";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import useFetchUserProfile from "../hooks/useFetchUserProfile";

const UserPage = () => {
  const { userData, loading, error } = useFetchUserProfile();

  return (
    <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
      {loading ? <Spinner /> : <Box>User Profile</Box>}
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Text fontSize={18}>username : {userData?.username}</Text>
        <Button bgColor="green.400" color="white">Change name</Button>
      </Flex>
    </Flex>
  );
};

export default UserPage;
