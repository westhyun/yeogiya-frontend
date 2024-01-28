import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { DiaryFormProps } from "./useCreateDiary";
import { patchDiary } from "@/apis/diary";

export const useModifyDiary = (
  diaryId: number,
  option?: UseMutationOptions<any, any, DiaryFormProps>
) => {
  return useMutation({
    mutationFn: ({ diaryContent }: DiaryFormProps) => {
      const {
        fileImages,
        tagValue,
        selectedDate,
        star,
        isActive,
        contents,
        kakaoId,
        name,
        address,
      } = diaryContent;
      console.log(diaryContent, "diaryContent>");

      const DiaryFormData = new FormData();

      let diaryData = {
        content: contents,
        openYn: isActive ? "Y" : "N",
        date: selectedDate,
        star: star, // optional
        hashtags: tagValue, // optional
      };

      let placeData = {
        kakaoId: 1,
        name, // optional
        address, // optional
      };

      const diaryBlob = new Blob([JSON.stringify(diaryData)], {
        type: "application/json",
      });

      const placeBlob = new Blob([JSON.stringify(placeData)], {
        type: "application/json",
      });

      fileImages.forEach((image: File, index: number) => {
        DiaryFormData.append("diaryImage", image);
      });

      DiaryFormData.append("diary", diaryBlob);
      DiaryFormData.append("place", placeBlob);

      return patchDiary(DiaryFormData, diaryId);
    },
    ...option,
  });
};
