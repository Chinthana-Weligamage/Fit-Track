import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentLoggedInUser() {
  const user = localStorage.getItem("authToken");
  return user ? JSON.parse(user) : null;
}
