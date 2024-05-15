export const API_BASE_URL = "https://project-phoenix-clz.vercel.app/api";
// export const API_BASE_URL = "http://localhost:3500";

export const GOOGLE_CLIENT_ID =
  "802396137377-5pfhl96kiru3ttesrvt52uqsq0631jma.apps.googleusercontent.com";

export const GOOGLE_OAUTH_REDIRECT_URL =
  "https://project-phoenix-clz.vercel.app/api/oauth/google";

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
  return Object.keys(PROGRAM_CODE).find((key) => PROGRAM_CODE[key] === value);
}

export const EVENT_TYPE = {
  FIRST: "0",
  MINOR: "1",
  MAJOR: "2",
};

export function getEventTypeByCode(value) {
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
