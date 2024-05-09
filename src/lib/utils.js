import { ROLES_LIST } from "@/config/roleList";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isTabActive = (currentPath, tab) => {
  return currentPath.includes(tab);
};

export const getRoleByValue = (value) => {
  for (const role in ROLES_LIST) {
    if (value.includes(ROLES_LIST[role])) {
      return role.charAt(0).toUpperCase() + role.slice(1);
    }
  }
  return "Home";
};

export const getInitials = (fullName) => {
  const parts = fullName.split(" ");
  const firstNameInitial = parts[0].charAt(0).toUpperCase();
  const lastNameInitial = parts[parts.length - 1].charAt(0).toUpperCase();
  return `${firstNameInitial}${lastNameInitial}`;
};
