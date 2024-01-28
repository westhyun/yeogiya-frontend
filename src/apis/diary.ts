import { URL } from "@/constants/url";
import { httpClient } from "./httpClient";

export const getDiaryList = (year: string, month: string) => {
  return httpClient.get(`${URL.DIARY_LIST}?year=${year}&month=${month}`);
};

export const getDiaryDetail = async (diaryId: number) => {
  return await httpClient.get(`${URL.DIARY_LIST}/${diaryId}`);
};

export const deleteDiary = async (diaryId: number) => {
  return await httpClient.delete(`${URL.DIARY_LIST}/${diaryId}`);
};

export const postDiary = (data: FormData) => {
  return httpClient.post(URL.DIARY_LIST, data);
};

export const patchDiary = (data: FormData, diaryId: number) => {
  return httpClient.patch(`${URL.DIARY_LIST}/${diaryId}`, data);
};
