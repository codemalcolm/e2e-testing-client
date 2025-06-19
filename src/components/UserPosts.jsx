import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");

  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/user-info/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data.posts || []);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditedTitle(post.title);
    setEditedText(post.postText);
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/posts/${id}`,
        { title: editedTitle, postText: editedText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingPostId(null);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Spinner mt={10} />;

  return (
    <Flex flexDir="column" align="center" mt={8} w="100%">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Your Posts
      </Text>
      {posts.length === 0 ? (
        <Text>No posts yet.</Text>
      ) : (
        posts.map((post) => (
          <Box
            key={post._id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            mb={4}
            width="90%"
            maxW="600px"
            shadow="md"
          >
            {editingPostId === post._id ? (
              <>
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Title"
                  mb={2}
                />
                <Textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  placeholder="Post text"
                  mb={2}
                />
                <Flex gap={2}>
                  <Button
                    colorScheme="green"
                    onClick={() => handleSave(post._id)}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditingPostId(null)}
                    colorScheme="gray"
                  >
                    Cancel
                  </Button>
                </Flex>
              </>
            ) : (
              <>
                <Text fontSize="xl" fontWeight="bold">
                  {post.title}
                </Text>
                <Text mb={2}>{post.postText}</Text>
                <Flex gap={2}>
                  <Button onClick={() => handleEdit(post)} colorScheme="blue">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(post._id)}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </Flex>
              </>
            )}
          </Box>
        ))
      )}
    </Flex>
  );
};

export default UserPosts;
