import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useDiaryForm = () => {
  const { pathname } = useLocation();
  const createDate = pathname.split("/").at(-1);
  const [textCount, setTextCount] = useState<number>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [tagValue, setTagValue] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(createDate);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const [contents, setContents] = useState<string>("");

  const onTextCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);

    const count = e.target.value?.length;
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    setTextCount(Number(count.toString().replace(regexp, ",")));
  };

  useEffect(() => {
    textCount >= 20 ? setIsValid(true) : setIsValid(false);
  }, [textCount, tagValue]);

  return {
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
  };
};
