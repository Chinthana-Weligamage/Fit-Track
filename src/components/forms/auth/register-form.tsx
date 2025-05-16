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
import type { RegisterForm } from "@/types/FormTypes";

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterForm>({});
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(API_SERVICES.Register, formData);
      if (res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your account has been created successfully!",
          icon: "success",
          theme: "dark",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
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
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Create account with Fit-Track!</CardTitle>
          <CardDescription>
            Enter your name email and password below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="your name"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-yellow-400"
                  disabled={isLoading}
                >
                  Register
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
