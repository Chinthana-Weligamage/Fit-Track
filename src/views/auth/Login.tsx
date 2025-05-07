import { LoginForm } from "@/components/forms/auth/login-form";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import axios from "axios";
import API_SERVICES from "@/lib/api_services";

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(API_SERVICES.GoogleLogin);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEmailLogin = () => {};
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
