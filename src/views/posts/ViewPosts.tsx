import PostCard from "@/components/cards/PostCard";

const samplePosts = [
  {
    title: "Beautiful sunset at the beach",
    description: "Chasing the sun and making memories with my loved ones",
    imageUrls: [
      "https://images.unsplash.com/photo-1514963019544-64b2f377c1a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
    ],
  },
  {
    title: "Delicious salmon sashimi",
    description:
      "Savoring the freshness of raw salmon and the flavors of soy sauce and wasabi",
    imageUrls: [
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
    ],
  },
  {
    title: "A peaceful walk in the forest",
    description: "Being surrounded by nature and the sound of birds chirping",
    imageUrls: [
      "https://images.unsplash.com/photo-1514963019544-64b2f377c1a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
    ],
  },
];

const ViewPosts = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto my-10 gap-6 px-4 overflow-y-auto">
      {samplePosts.map((post, index) => (
        <PostCard key={index} data={post} />
      ))}
    </div>
  );
};

export default ViewPosts;
