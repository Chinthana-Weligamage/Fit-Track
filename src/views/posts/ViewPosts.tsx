import { useState, useEffect } from "react";
import PostCard from "@/components/cards/PostCard";
import AddPostModal from "./AddPosts";
import axios from "axios";
import type { Post } from "@/components/cards/PostCard";

const ViewPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/workoutPost");
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div className="relative w-full">
      <div className="fixed top-10 right-10 z-50">
        <AddPostModal />
      </div>
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto my-10 gap-6 px-4 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center w-full h-64">
            <p className="text-lg text-gray-500">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-gray-500 text-center mt-20">
            No posts available.
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default ViewPosts;
