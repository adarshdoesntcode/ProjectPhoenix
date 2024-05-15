import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GOOGLE_CLIENT_ID, ROLES_LIST } from "./config";

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

export function getGoogleOAuthURL(redirect_uri, role) {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: role,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}

export function daysFromToday(targetDate) {
  const target = new Date(targetDate);
  const today = new Date();
  const differenceInMs = target.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  return differenceInDays;
}
