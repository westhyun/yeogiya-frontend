import DiaryForm from "../create/components/DiaryForm";
import { useParams } from "react-router-dom";
import { useDiaryDetail } from "@/features/queries/useDiaryDetail";
import { DiaryDetailProps } from "../detail/DiaryDetailPage";

const DiaryModifyPage = () => {
  const params = useParams();

  const diaryDetailData = useDiaryDetail(
    Number(params.diaryId)
  ) as DiaryDetailProps;

  const defaultValues = {
    selectedDate: diaryDetailData.body.date,
    clicked: diaryDetailData.body.star,
    contents: diaryDetailData.body.content,
    tagValue: diaryDetailData.body.hashtags,
    fileImages: diaryDetailData.body.diaryImages,
    isActive: diaryDetailData.body.openYn,
    placeName: diaryDetailData.body.placeName,
  };

  return <DiaryForm mode="MODE_MODIFY" defaultValues={defaultValues} />;
};

export default DiaryModifyPage;
