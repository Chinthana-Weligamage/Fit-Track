import { LoginForm } from "@/components/forms/auth/login-form";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Use window.location.href for OAuth flow (not Axios)
    window.location.href = "http://localhost:8080/api/auth/google";
  };

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

  const handleEmailLogin = () => {
    window.location.href = "http://localhost:8080/api/users/login";
  };

  return (
    <div className="flex min-h-svh w-full bg-yellow-400 items-center justify-center p-6 md:p-10">
      <Link
        to={"/"}
        className="flex flex-col gap-6 text-2xl text-black fixed top-6 left-6"
      >
        <ArrowLeft />
      </Link>
      <div className="w-full max-w-sm">
        <LoginForm
          handleGoogleLogin={handleGoogleLogin}
          handleEmailLogin={handleEmailLogin}
        />
      </div>
    </div>
  );
};

export default LoginPage;
