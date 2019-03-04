// from 1 to '01'
export const padNumber = (digit) => (digit < 10 ? '0' + digit.toString() : digit.toString());

// to handle year navigation
export const funcHandleYear = (prevYear, prevMonth, bool) => {
	if (prevMonth !== 0 && prevMonth !== 11) return prevYear;
	else if (prevMonth === 11) return bool ? prevYear + 1 : prevYear;
	else if (prevMonth === 0) return bool ? prevYear : prevYear - 1;
};

// to handle month navigation
export const funcHandleMonth = (prevMonth, bool) => {
	if (prevMonth === 0) return bool ? prevMonth + 1 : 11;
	else if (prevMonth === 11) return bool ? 0 : prevMonth - 1;
	else return bool ? prevMonth + 1 : prevMonth - 1;
};
