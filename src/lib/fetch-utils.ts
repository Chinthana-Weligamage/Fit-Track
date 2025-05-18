import API_SERVICES from "@/lib/api_services";
import axios from "axios";

export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_SERVICES.Posts);
    console.log("Fetched Posts:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Posts:", error);
  }
};
export const fetchWorkouts = async () => {
  try {
    const response = await axios.get(API_SERVICES.WorkoutPlans);
    console.log("Fetched workouts:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
  }
};

export const fetchAchievements = async () => {
  try {
    const response = await axios.get(API_SERVICES.Achievements);
    console.log("Fetched achievements:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching achievements:", error);
  }
};

export const fetchQuiz = async () => {
  try {
    const response = await axios.get(API_SERVICES.Quiz);
    console.log("Fetched quizs:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizs:", error);
  }
};

export const fetchWorkoutComments = async (workoutPlanId: string) => {
  try {
    const response = await axios.get(
      API_SERVICES.WorkoutComments.replace("{workoutPlanId}", workoutPlanId)
    );
    console.log("Fetched workout comments:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching workout comments:", error);
  }
};

// export const deleteAchievement = async (id: string) => {
//   try {
//     await axios.delete(
//       `http://localhost:8080/api/achievements/users/1/achievements/${id}`
//     );
//   } catch (error) {
//     console.error("Error deleting achievement:", error);
//     throw error;
//   }
// };
