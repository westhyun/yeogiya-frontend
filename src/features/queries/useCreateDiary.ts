import { postDiary } from "@/apis/diary";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

interface CreateDiaryProps {
  diaryContent: {
    fileImages?: File[];
    tagValue?: string[];
    selectedDate: string;
    star?: number;
    isActive: boolean;
    contents: string;
    kakaoId: number;
    name: string;
    address: string;
  };
}

export const usePostDiary = (
  option?: UseMutationOptions<any, any, CreateDiaryProps>
) => {
  return useMutation({
    mutationFn: ({ diaryContent }: CreateDiaryProps) => {
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
      const DiaryFormData = new FormData();

      let diaryData = {
        content: contents,
        openYn: isActive ? "Y" : "N",
        date: selectedDate,
        star: star, // optional
        hashtags: tagValue, // optional
      };

      let placeData = {
        kakaoId,
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

      return postDiary(DiaryFormData);
    },
    ...option,
  });
};
