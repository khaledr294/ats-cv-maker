import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneDisplay(phone?: string | null) {
  if (!phone) return "";
  return phone
    .replace(/\s+/g, " ")
    .replace(/-+/g, (match) => (match.length > 1 ? "-" : match))
    .trim();
}
