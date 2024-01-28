import Button from "@/components/@common/Button";
import Layout from "@/components/@common/Layout";
import SubmitButton from "@/components/SubmitButton";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { Form } from "react-router-dom";
import usePageNavigation from "@/features/hooks/usePageNavigation";
import { PATH } from "@/utils/routes";
import { useAppSelector } from "@/features/hooks/useAppDispatch";
import { diary } from "@/store/diarySlice";
import ToggleButton from "./ToggleButton";
import UploadImage from "./UploadImage";
import InputTag from "./InputTag";
import TextArea from "./TextArea";
import Rating from "./Rating";
import DatePicker from "./DatePicker";
import { useDiaryForm } from "@/features/hooks/useDiaryForm";
import { useEffect } from "react";
import { useCreateDiary } from "@/features/queries/useCreateDiary";
import { useModifyDiary } from "@/features/queries/useModifyDiary";

const DiaryForm = ({ mode, defaultValues }) => {
  const { navigate } = usePageNavigation();

  const {
    isValid,
    clicked,
    fileImages,
    tagValue,
    selectedDate,
    isActive,
    contents,
    showDatePicker,
    textCount,
    setShowDatePicker,
    onTextCount,
    setSelectedDate,
    setClicked,
    setTagValue,
    setFileImages,
    setIsActive,
    setContents,
    showImages,
    setShowImages,
  } = useDiaryForm();

  const isModifyMode = mode === "MODE_MODIFY";
  const isCreateMode = !isModifyMode;

  useEffect(() => {
    if (isModifyMode) {
      setContents(defaultValues.contents);
      setSelectedDate(defaultValues.selectedDate);
      setClicked(
        Array.from({ length: 5 }, (_, index) => index < defaultValues.clicked)
      );
      setShowImages(defaultValues.fileImages);
      setIsActive(defaultValues.isActive);
      setTagValue(defaultValues.tagValue);
    }
  }, [mode, defaultValues]);

  const postDiary = useCreateDiary();
  const patchDiary = useModifyDiary(defaultValues.diaryId);
  const diaryState = useAppSelector(diary);

  const handleSubmit = () => {
    if (isCreateMode) return handleSubmitCreate();
    if (isModifyMode) return handleSubmitModify();
  };

  const handleSubmitModify = () => {
    if (!isValid) return;
    const newStar = clicked.filter((v) => v === true).length;

    patchDiary.mutate(
      {
        diaryContent: {
          fileImages,
          tagValue,
          selectedDate,
          star: newStar,
          isActive,
          contents,
          kakaoId: diaryState.kakaoId,
          name: defaultValues.placeName,
        },
      },
      {
        onSuccess: () => navigate(PATH.DIARY_LIST),
      }
    );
  };

  const handleSubmitCreate = () => {
    if (!isValid) return;

    const newStar = clicked.filter((v) => v === true).length;

    postDiary.mutate(
      {
        diaryContent: {
          fileImages,
          tagValue,
          selectedDate,
          star: newStar,
          isActive,
          contents,
          kakaoId: diaryState.kakaoId,
          name: diaryState.name,
          address: diaryState.address ?? "",
        },
      },
      {
        onSuccess: () => navigate(PATH.DIARY_LIST),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Layout maxWidth="800px" paddingTop="30px" paddingBottom="30px">
        <TextGuide>
          <Location>{diaryState?.name || defaultValues.placeName}</Location>에
          대한 솔직한 일기 혹은 리뷰를 적어주세요.
        </TextGuide>
        <TextDate>
          <DatePickerDate onClick={() => setShowDatePicker(!showDatePicker)}>
            {dayjs(selectedDate).format("YYYY년 MM월 DD일")}
          </DatePickerDate>
          {showDatePicker && (
            <DatePicker
              handleDatePicker={setShowDatePicker}
              handleClickedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          )}
        </TextDate>
        <ContentsStyle>
          <Rating clicked={clicked} setClicked={setClicked} />
          <TextArea
            name="content"
            placeholder="20자 이상 적어주세요."
            onChange={onTextCount}
            contents={contents}
          />
        </ContentsStyle>
        <TextCount>{textCount ?? 0} / 1,000</TextCount>
        <InputTag tagValue={tagValue} setTagValue={setTagValue} />
        <UploadImage
          fileImages={fileImages}
          setFileImages={setFileImages}
          showImages={showImages}
          setShowImages={setShowImages}
        />
        <ShareStyle>
          <p>공개 여부</p>
          <ToggleButton isActive={isActive} setIsActive={setIsActive} />
        </ShareStyle>
        <ButtonLayout>
          <CancelButton text="취소" />
          <SuccessButton type="submit" isValid={isValid} text="완료" />
        </ButtonLayout>
      </Layout>
    </Form>
  );
};

export default DiaryForm;

export const ContentsStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 300px;
  flex-direction: column;
  border: 1px solid ${theme.color.black35};
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 10px;
`;

export const TextCount = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${theme.color.black50};
  font-size: 0.875rem;
  margin-bottom: 32px;
  font-family: ${theme.font.number};
  font-weight: 600;
`;

const ShareStyle = styled.div`
  color: ${theme.color.black89};
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;

  p {
    margin-right: 24px;
  }
`;

export const Location = styled.span`
  display: flex;
  color: ${theme.color.purple};
  font-size: 1.75rem;
  font-weight: 700;
`;

const TextGuide = styled.div`
  display: flex;
  font-size: 1rem;
  align-items: baseline;
  margin-bottom: 1.25rem;
`;

const TextDate = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 20px;
`;

const DatePickerDate = styled.div`
  display: flex;
  padding: 9px 20px;
  border: 1px solid ${theme.color.black10};
  border-radius: 8px;
  width: fit-content;
  font-size: 14px;
  cursor: pointer;
`;

export const CancelButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.color.black30};
  color: ${theme.color.black89};
  max-width: 140px;
  max-height: 50px;
`;

export const SuccessButton = styled(SubmitButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 140px;
  min-height: 50px;
  margin: 0;
  padding: 0;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;
