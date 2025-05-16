// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";
import Loadable from "@/views/common/loadable/Loadable";

/* ***Layouts**** */
const MainLayout = Loadable(
  lazy(() => import("../layouts/main-layout/MainLayout"))
);
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank-layout/BlankLayout"))
);

// Main Pages
const HomePage = Loadable(lazy(() => import("../views/home/HomePage")));
const ViewPosts = Loadable(lazy(() => import("../views/posts/ViewPosts")));
const ViewWorkouts = Loadable(
  lazy(() => import("../views/workouts/ViewWorkouts"))
);
const ViewAchievements = Loadable(
  lazy(() => import("../views/achievements/ViewAchievements"))
);
const ViewQuiz = Loadable(lazy(() => import("../views/quiz/ViewQuiz")));
const AiAdvisor = Loadable(lazy(() => import("../views/ai-advisor/AiAdvisor")));
const Settings = Loadable(lazy(() => import("../views/settings/Settings")));

// // Dashboard
// const Dashboard = Loadable(lazy(() => import("../views/dashboards/Dashboard")));

// // authentication
const Login = Loadable(lazy(() => import("../views/auth/Login")));
const Register = Loadable(lazy(() => import("../views/auth/Register")));
// const Logout = Loadable(lazy(() => import("../views/auth/logout/Logout")));
const PageNotFound = Loadable(lazy(() => import("../views/404/PageNotFound")));

// // admin
// const ViewAllCourses = Loadable(
//   lazy(() => import("../views/admin/ViewAllCourses"))
// );
// const ViewAllPurchases = Loadable(
//   lazy(() => import("../views/admin/ViewAllPurchases"))
// );

const Router = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", exact: true, element: <HomePage /> },
      { path: "/posts", exact: true, element: <ViewPosts /> },
      { path: "/workouts", exact: true, element: <ViewWorkouts /> },
      { path: "/achievements", exact: true, element: <ViewAchievements /> },
      { path: "/quiz", exact: true, element: <ViewQuiz /> },
      { path: "/ai", exact: true, element: <AiAdvisor /> },
      { path: "/settings", exact: true, element: <Settings /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  // {
  //   path: "/",
  //   element: <BlankLayout />,
  //   children: [
  //     { path: "/admin", exact: true, element: <Dashboard /> },
  //     { path: "/admin/courses", exact: true, element: <ViewAllCourses /> },
  //     { path: "/admin/purshases", exact: true, element: <ViewAllPurchases /> },
  //     { path: "*", element: <Navigate to="/404" /> },
  //   ],
  // },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      { path: "/login", exact: true, element: <Login /> },
      { path: "/register", exact: true, element: <Register /> },
      // { path: "/logout", exact: true, element: <Logout /> },
      { path: "/404", element: <PageNotFound /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router, { basename: "/" });
export default router;
