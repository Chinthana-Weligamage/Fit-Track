import { RegisterForm } from "@/components/forms/auth/register-form";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const RegisterPage = () => {
  return (
    <div className="flex min-h-svh w-full bg-amber-400 items-center justify-center p-6 md:p-10">
      <Link
        to={"/"}
        className="flex flex-col gap-6 text-2xl text-black fixed top-6 left-6"
      >
        <ArrowLeft />
      </Link>
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
