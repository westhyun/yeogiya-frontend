const STATIC = {
  HOME: "/",
  SEARCH: "/search",
  SEARCH_RESULT_LIST: "/location/list",
  SEARCH_RESULT_DETAIL: "/location",
  LOGIN: "/login",
  KAKAO_LOGIN: "/login/kakao",
  JOIN: "/join",
  DIARY: "/diary",
  DIARY_CREATE: "/diary/create",
  DIARY_LIST: "/diary/list",
  FIND_ID: "/find/id",
  FIND_PW: "/find/pw",
  RESET_PASSWORD: "/reset",
  DIARY_MAP: "/diary/map",
  DIARY_MAP_SEARCH: "/diary/map/search",
  MY: "/my",
  MY_PASSWORD: "/my/pw",
  MY_PASSWORD_UPDATE: "/my/pw/update",
  MY_WITHDRAWAL: "/my/withdrawal",
  CONFIRM_MY_WITHDRAWAL: "/my/withdrawal/confirm",
  NOT_FOUND: "/notfound",
};

const DYNAMIC = {
  DIARY_CREATE_MAP: `${STATIC.DIARY_MAP}/:date`,
  DIARY_CREATE_DATE: `${STATIC.DIARY}/create/:date`,
  DIARY_MODIFY_DATE: `${STATIC.DIARY}/modify/:diaryId`,
  DIARY_DETAIL: `${STATIC.DIARY}/:diaryId`,
  DIARY_MAP_SEARCH_DATE: `${STATIC.DIARY_MAP}/search/:date`,
  RESULT_LIST: `${STATIC.SEARCH_RESULT_LIST}/:searchID`,
  RESULT_DETAIL: `${STATIC.SEARCH_RESULT_DETAIL}/:searchDetail`,
  SNS_LOGIN: `${STATIC.LOGIN}/:token`,
};

export const PATH = {
  ...STATIC,
  ...DYNAMIC,
} as const;
