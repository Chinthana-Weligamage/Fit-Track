import { LoginForm } from "@/components/forms/auth/login-form";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div className="flex min-h-svh w-full bg-yellow-400 items-center justify-center p-6 md:p-10">
      <Link
        to={"/"}
        className="flex flex-col gap-6 text-2xl text-black fixed top-6 left-6"
      >
        <ArrowLeft />
      </Link>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
