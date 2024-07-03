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

export function getGoogleOAuthURL(redirect_uri, role, home_path) {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const state = JSON.stringify({ role, home_path });
  const encodedState = encodeURIComponent(state);

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
    state: encodedState,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}

export function daysFromToday(targetDate) {
  let date1 = new Date(targetDate);
  let date2 = new Date();

  let utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  let utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  let timeDiff = utc1 - utc2;

  let daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
}

export function numberOfValues(objects, key, status) {
  const count = objects.reduce((acc, obj) => {
    if (obj[key] === status) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  return count;
}

export function formatDays(number) {
  if (number > 0) {
    return `in ${number}d`;
  } else if (number == 0) {
    return `Today`;
  } else if (number < 0) {
    return `${Math.abs(number)}d ago`;
  }
}

export function numberOfDevelopingProjects(objects, key, status) {
  const count = objects.reduce((acc, obj) => {
    if (obj[key] === status) {
      return (acc += obj.projects.length);
    } else {
      return acc;
    }
  }, 0);
  return count;
}

export function getOrdinal(n) {
  let ord = "th";

  if (n % 10 == 1 && n % 100 != 11) {
    ord = `${n}st`;
  } else if (n % 10 == 2 && n % 100 != 12) {
    ord = `${n}nd`;
  } else if (n % 10 == 3 && n % 100 != 13) {
    ord = `${n}rd`;
  }

  return ord;
}

export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good afternoon";
  } else if (currentHour >= 17 && currentHour < 22) {
    return "Good evening";
  } else {
    return "Goodnight";
  }
};
