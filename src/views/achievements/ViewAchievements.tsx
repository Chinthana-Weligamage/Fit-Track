import AchievementCard from "@/components/cards/AchievementCard";
import AddAchievementModal from "./AddAchievements";

const ViewAchievements = () => {
  const sampleAchievements = [
    {
      metadata: {
        authorName: "John Doe",
        publishedDate: "07th May 2023",
        authorImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      description: "I completed my first 5k run in under 30 minutes!",
      imageUrls: [
        "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      video: "",
    },
    {
      metadata: {
        authorName: "John Doe",
        publishedDate: "07th May 2023",
        authorImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      description: "Achieved a new personal best in deadlifts at 300 lbs!",
      imageUrls: [
        "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      video:
        "https://cdn.pixabay.com/video/2023/01/27/148204-793717940_large.mp4",
    },
    {
      metadata: {
        authorName: "John Doe",
        publishedDate: "07th May 2023",
        authorImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      description: "Completed a 30-day yoga challenge with daily sessions!",
      imageUrls: [
        "https://images.unsplash.com/photo-1518609571773-39b7d303a87b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1674605378401-dbf2af9e9c5c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1518310790390-836058cb000b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      video: "https://www.youtube.com/shorts/6BvSuOSCrhs",
    },
    {
      metadata: {
        authorName: "John Doe",
        publishedDate: "07th May 2023",
        authorImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      description: "Successfully completed a triathlon!",
      imageUrls: [
        "https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      video: "",
    },
    {
      metadata: {
        authorName: "John Doe",
        publishedDate: "07th May 2023",
        authorImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      description: "Reached my goal of 10,000 steps every day for a month!",
      imageUrls: [
        "https://images.unsplash.com/photo-1523394643039-a2770cf4a2a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      video: "",
    },
  ];
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto my-10 gap-6 px-4 overflow-y-auto">
      <div className="fixed top-10 right-10 z-50">
        <AddAchievementModal />
      </div>
      {sampleAchievements.map((achievement, index) => (
        <AchievementCard key={index} achievement={achievement} />
      ))}
    </div>
  );
};

export default ViewAchievements;
