import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const AllPostsList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/posts");
        setPosts(res.data.posts);
      } catch (err) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  if (loading) return <Text>Loading posts...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;
  if (posts.length === 0) return <Text>No posts available.</Text>;

  return (
    <VStack spacing={4} mt={6}>
      {posts.map((post) => (
        <Box
          key={post._id}
          borderWidth={1}
          borderRadius="lg"
          p={4}
          w="100%"
          maxW="600px"
          textAlign="left"
          boxShadow="md"
        >
          <Heading size="md">{post.title}</Heading>
          <Text mt={2}>{post.postText}</Text>
          <Text mt={2} fontSize="sm" color="gray.500">
            Author: {post.authorId.username}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};

export default AllPostsList;
