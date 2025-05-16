import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Swal from "sweetalert2";
import API_SERVICES from "@/lib/api_services";
import type { LoginForm } from "@/types/FormTypes";

interface LoginFormProps extends React.ComponentProps<"div"> {
  handleGoogleLogin: () => void;
  handleEmailLogin: () => void;
}

export function LoginForm({ handleGoogleLogin }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginForm>({});
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(API_SERVICES.Login, formData);
      if (res.status === 200) {
        // Store the token in local storage
        localStorage.setItem("authToken", JSON.stringify(res.data));
        Swal.fire({
          title: "Success!",
          text: "You have logged in successfully!",
          icon: "success",
          theme: "dark",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setFormData({});

        const authTocken = localStorage.getItem("authToken");
        if (authTocken) {
          // Redirect to the dashboard or any other page
          window.location.href = "/";
        }
      } else {
        throw new Error(res.data);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error instanceof Error ? error.message : String(error),
        icon: "error",
        theme: "dark",
        showConfirmButton: true,
        confirmButtonColor: "#f59e0b",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to Fit-Track!</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your email"
                  onChange={handleInputChange}
                  name="email"
                  value={formData.email || ""}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={handleInputChange}
                  name="password"
                  value={formData.password || ""}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-yellow-400"
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
