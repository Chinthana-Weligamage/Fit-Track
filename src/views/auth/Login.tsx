import { LoginForm } from "@/components/forms/auth/login-form";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import API_SERVICES from "@/lib/api_services";
// import { googleSignIn } from "@/config/login";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const res = await axios.get(API_SERVICES.GoogleLogin);
      if (res.status === 200) {
        // Redirect to Google OAuth
        console.log("Redirecting to Google OAuth...");
      } else {
        console.error("Failed to initiate Google login");
        // Handle error (show message to user)
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      // Handle error (show message to user)
    }
  };

  // const handleGoogleLogin = () => {
  //   const res = googleSignIn();
  // };

  // Handle the redirect back from Google OAuth
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const error = urlParams.get("error");

    if (token) {
      // Store the token and redirect
      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    } else if (error) {
      console.error("OAuth error:", error);
      // Handle error (show message to user)
    }
  }, [navigate]);

  return (
    <div className="flex min-h-svh w-full bg-yellow-400 items-center justify-center p-6 md:p-10">
      <Link
        to={"/"}
        className="flex flex-col gap-6 text-2xl text-black fixed top-6 left-6"
      >
        <ArrowLeft />
      </Link>
      <div className="w-full max-w-sm">
        <LoginForm handleGoogleLogin={handleGoogleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
