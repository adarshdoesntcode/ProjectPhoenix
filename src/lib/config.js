export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://project-phoenix-clz.vercel.app/api";

console.log(import.meta.env.VITE_API_BASE_URL);
// export const API_BASE_URL = "https://project-phoenix-omega.vercel.app/api";
// export const API_BASE_URL = "http://localhost:3500/api";

export const GOOGLE_CLIENT_ID =
  "802396137377-5pfhl96kiru3ttesrvt52uqsq0631jma.apps.googleusercontent.com";

export const GOOGLE_OAUTH_REDIRECT_URL = `${API_BASE_URL}/oauth/google`;

// export const GOOGLE_OAUTH_REDIRECT_URL =
// "http://localhost:3500/api/oauth/google";

export const ROLES_LIST = {
  admin: 5150,
  supervisor: 1984,
  student: 2001,
  defense: 4334,
};

export const PROGRAM_CODE = {
  BESE: "700",
  BECE: "200",
  BEIT: "300",
  BEELX: "500",
  BCA: "400",
  ALL: "72354",
};

export function getProgramByCode(value) {
  const input = value?.toString();
  return Object.keys(PROGRAM_CODE).find((key) => PROGRAM_CODE[key] === input);
}

export const EVENT_TYPE = {
  FIRST: "0",
  MINOR: "1",
  MAJOR: "2",
};

export const EVALUATOR_TYPE = {
  INTERNAL: "88",
  EXTERNAL: "99",
};

export function getEvaluatorTypeByCode(value) {
  return Object.keys(EVALUATOR_TYPE).find(
    (key) => EVALUATOR_TYPE[key] === value
  );
}

export function getEventTypeByCode(value) {
  // console.log(value);
  // const input = value.toString() || value;

  return Object.keys(EVENT_TYPE).find((key) => EVENT_TYPE[key] === value);
}

export const EVENT_STATUS = {
  Active: "101",
  Complete: "105",
  Archive: "100",
};

export function getEventStatusByCode(value) {
  return Object.keys(EVENT_STATUS).find((key) => EVENT_STATUS[key] === value);
}

export const PROGRESS_STATUS = () => {
  return {
    0: {
      ELIGIBLE_FOR_TEAM_CREATION: [0, "0000"],
      ELIGIBLE_FOR_PROPOSAL_REPORT_SUBMISSION: [1, "0001"],
      ELIGIBLE_FOR_PROPOSAL_DEFENSE: [2, "0002"],
      ELIGIBLE_FOR_FINAL_REPORT_SUBMISSION: [3, "0010"],
      ELIGIBLE_FOR_FINAL_DEFENSE: [4, "0011"],
    },
    1: {
      ELIGIBLE_FOR_TEAM_CREATION: [0, "1000"],
      ELIGIBLE_FOR_PROPOSAL_REPORT_SUBMISSION: [1, "1001"],
      ELIGIBLE_FOR_PROPOSAL_DEFENSE: [2, "1002"],
      ELIGIBLE_FOR_SUPERVISOR_APPROVAL_FOR_MID: [3, "1010"],
      ELIGIBLE_FOR_MID_REPORT_SUBMISSION: [4, "1011"],
      ELIGIBLE_FOR_MID_DEFENSE: [5, "1012"],
      ELIGIBLE_FOR_SUPERVISOR_APPROVAL_FOR_FINAL: [6, "1020"],
      ELIGIBLE_FOR_FINAL_REPORT_SUBMISSION: [7, "1021"],
      ELIGIBLE_FOR_FINAL_DEFENSE: [8, "1022"],
    },
    2: {
      ELIGIBLE_FOR_TEAM_CREATION: [0, "2000"],
      ELIGIBLE_FOR_PROPOSAL_REPORT_SUBMISSION: [1, "2001"],
      ELIGIBLE_FOR_PROPOSAL_DEFENSE: [2, "2002"],
      ELIGIBLE_FOR_SUPERVISOR_APPROVAL_FOR_MID: [3, "2010"],
      ELIGIBLE_FOR_MID_REPORT_SUBMISSION: [4, "2011"],
      ELIGIBLE_FOR_MID_DEFENSE: [5, "2012"],
      ELIGIBLE_FOR_SUPERVISOR_APPROVAL_FOR_FINAL: [6, "2020"],
      ELIGIBLE_FOR_FINAL_REPORT_SUBMISSION: [7, "2021"],
      ELIGIBLE_FOR_FINAL_DEFENSE: [8, "2022"],
    },
  };
};

export const getRankbyStatus = (rank) => {
  for (const phase in PROGRESS_STATUS()) {
    const statuses = PROGRESS_STATUS()[phase];
    for (const key in statuses) {
      if (statuses[key][1] === rank) {
        return statuses[key][0];
      }
    }
  }
  return null;
};

export const animationProps = () => {
  return {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
      duration: 0.2,
    },
  };
};

export const DESCRIPTION_CATEGORY_SET = [
  { id: 1, category: "Web Dev", selected: false },
  { id: 2, category: "Mobile Dev", selected: false },
  { id: 3, category: "AI/ML", selected: false },
  { id: 4, category: "Data Science", selected: false },
  { id: 5, category: "Cybersecurity", selected: false },
  { id: 6, category: "SQL/NoSQL", selected: false },
  { id: 7, category: "IoT", selected: false },
  { id: 8, category: "Blockchain", selected: false },
  { id: 9, category: "Game Dev", selected: false },
  { id: 10, category: "AR/VR", selected: false },
  { id: 11, category: "Robotics", selected: false },
  { id: 12, category: "NLP", selected: false },
  { id: 13, category: "E-commerce", selected: false },
  { id: 14, category: "Financial", selected: false },
  { id: 15, category: "Health", selected: false },
  { id: 16, category: "Education", selected: false },
];
