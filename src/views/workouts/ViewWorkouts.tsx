import { useEffect, useState } from "react";
import WorkoutCard from "@/components/cards/WorkoutCard";
import AddWorkoutModal from "./AddWorkout";
import { Workout } from "@/types/CardTypes";
import { fetchWorkouts } from "@/lib/fetch-utils";

const ViewWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchWorkouts();
      setWorkouts(res);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
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
        <AddWorkoutModal />
      </div>
      {loading && (
        <div className="flex items-center justify-center w-full h-64">
          <p className="text-lg text-gray-500">Loading workouts...</p>
        </div>
      )}
      {workouts?.map((workout, index) => (
        <WorkoutCard
          key={index}
          workout={workout}
          onDeleted={fetchData}
          onUpdated={fetchData}
        />
      ))}
    </div>
  );
};

export default ViewWorkouts;
