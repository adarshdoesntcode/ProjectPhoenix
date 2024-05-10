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

export function newEventDateMatcher(subEvent) {
  const proposalReportMatcher = { before: new Date() };

  const proposalreport = subEvent.proposal.reportDeadline
    ? new Date(subEvent.proposal.reportDeadline)
    : new Date();

  const propoalDefensetMatcher = {
    before: proposalreport,
  };

  // =========================

  const midreport = subEvent.proposal.defenseDate
    ? new Date(subEvent.proposal.defenseDate)
    : new Date();

  const middefense = subEvent.mid.reportDeadline
    ? new Date(subEvent.mid.reportDeadline)
    : new Date();

  const midReportMatcher = {
    before: midreport,
  };

  const midDefenseMatcher = {
    before: middefense,
  };
  // ===========================
  const finalreport = subEvent.mid.defenseDate
    ? new Date(subEvent.mid.defenseDate)
    : subEvent.proposal.defenseDate
    ? new Date(subEvent.proposal.defenseDate)
    : new Date();

  const finaldefense = subEvent.final.reportDeadline
    ? new Date(subEvent.final.reportDeadline)
    : new Date();

  const finalReportMatcher = {
    before: finalreport,
  };

  const finalDefenseMatcher = {
    before: finaldefense,
  };

  return {
    proposalReportMatcher,
    propoalDefensetMatcher,
    midReportMatcher,
    midDefenseMatcher,
    finalReportMatcher,
    finalDefenseMatcher,
  };
}
