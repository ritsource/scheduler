
import moment from 'moment';

export const funcHandleMonth = (prevMonth, bool) => {
  if (prevMonth === 1) return bool ? prevMonth + 1 : 12;
  else if (prevMonth === 12) return bool ? 1 : prevMonth - 1;
  else return bool ? prevMonth + 1 : prevMonth - 1;
}

export const funcHandleYear = (prevYear, prevMonth, bool) => {
  if (prevMonth !== 1 && prevMonth !== 12) return prevYear;
  else if (prevMonth === 12) return bool ? prevYear + 1 : prevYear;
  else if (prevMonth === 1) return bool ? prevYear : prevYear - 1
}

export const generateMomentMonth = (year, month) => {
  let temp_text;
  if (month.toString().length === 1) temp_text = `${year}-0${month}`;
  else temp_text = `${year}-${month}`;
  return moment(temp_text);
}