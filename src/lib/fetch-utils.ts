import API_SERVICES from "@/lib/api_services";
import axios from "axios";

export const fetchWorkouts = async () => {
  try {
    const response = await axios.get(API_SERVICES.getWorkoutPlans);
    console.log("Fetched workouts:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
  }
};

export const fetchAchievements = async () => {
  try {
    const response = await axios.get(API_SERVICES.getAchievements);
    console.log("Fetched achievements:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching achievements:", error);
  }
};

export const fetchQuizs = async () => {
  try {
    const response = await axios.get(API_SERVICES.getQuizs);
    console.log("Fetched quizs:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizs:", error);
  }
};

export const fetchWorkoutComments = async (workoutPlanId: string) => {
  try {
    const response = await axios.get(
      API_SERVICES.getWorkoutComments.replace("{workoutPlanId}", workoutPlanId)
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
