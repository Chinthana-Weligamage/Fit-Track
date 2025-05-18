import { useState, useEffect } from "react";
import PostCard from "@/components/cards/PostCard";
import AddPostModal from "./AddPosts";
import { Post } from "@/types/CardTypes";
import { fetchPosts } from "@/lib/fetch-utils";

const samplePosts = [
  {
    metadata: {
      authorName: "John Doe",
      publishedDate: "07th May 2023",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    title: "Strength training session",
    description:
      "Building power one rep at a time – today’s sweat is tomorrow’s strength",
    imageUrls: [
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];

const ViewPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchPosts();
      setPosts(res);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto my-10 gap-6 px-4 overflow-y-auto">
      <div className="fixed top-10 right-10 z-50">
        <AddPostModal />
      </div>
      {loading && (
        <div className="flex items-center justify-center w-full h-64">
          <p className="text-lg text-gray-500">Loading posts...</p>
        </div>
      )}
      {samplePosts?.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
};

export default ViewPosts;
