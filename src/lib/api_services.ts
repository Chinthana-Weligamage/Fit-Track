const BASE_URL = "http://localhost:8080";

const API_SERVICES = {
  // Google OAuth Endpoints
  GoogleLogin: `${BASE_URL}/api/auth/google`,
  GoogleCallback: `${BASE_URL}/login/oauth2/code/google`,
  LoginSuccess: `${BASE_URL}/api/auth/login-success`,

  // User Endpoints
  UserProfile: `${BASE_URL}/api/users/me`,

  // Authentication Endpoints
  Logout: `${BASE_URL}/api/auth/logout`,

  // Email Login
  EmailLogin: `${BASE_URL}/api/users/login`,

  // Workout plans
  getWorkoutPlans: `${BASE_URL}/api/workoutPlan`,

  getAchievements: `${BASE_URL}/api/achievements`,

  getQuizs: `${BASE_URL}/api/questions`,

  getWorkoutComments: `${BASE_URL}/api/workoutPlans/{workoutPlanId}/comments`,
};
export default API_SERVICES;
