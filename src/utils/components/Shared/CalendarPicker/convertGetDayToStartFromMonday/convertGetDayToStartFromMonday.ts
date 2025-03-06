export const convertGetDayToStartFromMonday = (
  nativeDayOrderRepresentation: number
): number => {
  if (nativeDayOrderRepresentation === 0) return 6;
  return nativeDayOrderRepresentation - 1;
};
