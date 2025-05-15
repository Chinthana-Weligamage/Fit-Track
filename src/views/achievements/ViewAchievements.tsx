import { useEffect, useState } from "react";
import AchievementCard from "@/components/cards/AchievementCard";
import AddAchievementModal from "./AddAchievements";
import { Achievement } from "@/types/CardTypes";
import { fetchAchievements } from "@/lib/fetch-utils";

const ViewAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetchAchievements();
        setAchievements(res);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto my-10 gap-6 px-4 overflow-y-auto">
      <div className="fixed top-10 right-10 z-50">
        <AddAchievementModal />
      </div>
      {loading ? (
        <p>Loading achievements...</p>
      ) : (
        achievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} />
        ))
      )}
    </div>
  );
};

export default ViewAchievements;
