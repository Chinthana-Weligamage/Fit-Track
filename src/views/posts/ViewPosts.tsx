import PostCard from "@/components/cards/PostCard";
import AddPostModal from "./AddPosts";

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
  {
    metadata: {
      authorName: "John Doe",
      publishedDate: "07th May 2023",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    title: "Early morning workout grind",
    description: "Starting the day strong with a full-body workout at sunrise",
    imageUrls: [
      "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    metadata: {
      authorName: "John Doe",
      publishedDate: "07th May 2023",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    title: "Leg day motivation",
    description: "No shortcuts on leg day – feel the burn and love the process",
    imageUrls: [
      "https://images.unsplash.com/photo-1571019613723-c7e5b75bd4c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    metadata: {
      authorName: "John Doe",
      publishedDate: "07th May 2023",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    title: "Outdoor HIIT session",
    description:
      "Pushing limits under the open sky – nothing beats an outdoor sweat session",
    imageUrls: [
      "https://images.unsplash.com/photo-1599552683573-9dc48255fe85?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    metadata: {
      authorName: "John Doe",
      publishedDate: "07th May 2023",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    title: "Post-workout recovery",
    description:
      "Cooling down and letting the gains sink in – hydration is key",
    imageUrls: [
      "https://images.unsplash.com/photo-1558017487-06bf9f82613a?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];
const ViewPosts = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto my-10 gap-6 px-4 overflow-y-auto">
      <div className="fixed top-10 right-10 z-50">
        <AddPostModal />
      </div>
      {samplePosts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
};

export default ViewPosts;
