import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useFetchUserProfile from "../hooks/useFetchUserProfile";
import UserPosts from "../components/UserPosts";
import CreatePostModal from "../components/CreatePostModal";

const UserPage = () => {
  const { userData, loading, error, fetchProfileData } = useFetchUserProfile();

  const [isEditting, setIsEditting] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const [refreshKey, setRefreshKey] = useState(0);

  const handleEditClick = () => {
    setNewUsername(userData?.username || "");
    setIsEditting(true);
  };

  const handleChangeUsername = async () => {
    if (!newUsername.trim()) return;

    setIsUpdating(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found.");

      await axios.patch(
        "http://localhost:5000/user-info",
        { username: newUsername },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsEditting(false);
      await fetchProfileData();
    } catch (error) {
      console.error("Error changing username:", error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePostCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={8}
    >
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">Failed to load profile.</Text>
      ) : (
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold">
            User Profile
          </Text>

          {isEditting ? (
            <>
              <Input
                placeholder="Enter new username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                width="250px"
                mt={4}
              />
              <Flex mt={2} gap={2} justify="center">
                <Button
                  isLoading={isUpdating}
                  onClick={handleChangeUsername}
                  colorScheme="green"
                >
                  Save
                </Button>
                <Button onClick={() => setIsEditting(false)} colorScheme="gray">
                  Cancel
                </Button>
              </Flex>
            </>
          ) : (
            <>
              <Text fontSize={18} mt={4}>
                Username: {userData?.username}
              </Text>
              <Button mt={2} onClick={handleEditClick} colorScheme="blue">
                Edit Username
              </Button>
            </>
          )}
        </Box>
      )}

      <Button mt={6} colorScheme="teal" onClick={onCreateOpen}>
        Create Post
      </Button>

      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        onPostCreated={handlePostCreated}
      />

      <UserPosts refreshKey={refreshKey} />
    </Flex>
  );
};

export default UserPage;
