import dayjs from "dayjs";

export default function CalculateTimesAgo(date) {
  const past = dayjs(date);
  const now = dayjs();
  let unit = "";
  let diff = 0;
  if ((diff = now.diff(past, "year")) !== 0) {
    unit = diff === 1 ? "year" : "years";
  } else if ((diff = now.diff(past, "month")) !== 0) {
    unit = diff === 1 ? "month" : "months";
  } else if ((diff = now.diff(past, "week")) !== 0) {
    unit = diff === 1 ? "week" : "weeks";
  } else if ((diff = now.diff(past, "day")) !== 0) {
    unit = diff === 1 ? "day" : "days";
  } else if ((diff = now.diff(past, "hour")) !== 0) {
    unit = diff === 1 ? "hour" : "hours";
  } else if ((diff = now.diff(past, "minute")) !== 0) {
    unit = diff === 1 ? "minute" : "minutes";
  } else {
    diff = now.diff(past, "second");
    unit = diff === 1 ? "second" : "seconds";
  }

  return `${diff} ${unit} ago`;
}
