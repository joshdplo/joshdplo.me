/**
 * Format Date
 */
type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'long', locales = 'en') {
  // Safari is mad about dashes in the date
  const dateToFormat = new Date(date.replaceAll('-', '/'));
  const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return dateFormatter.format(dateToFormat);
}

/**
 * Get CSS Clamp
 * https://clamp-generator.netlify.app/
 */
export function getCssClamp(
  minValue: number,
  maxValue: number,
  minVw: number = 500,
  maxVw: number = 1000,
  defRem: number = 16,
): string {
  let diffValues = maxValue - minValue;
  let diffVw = maxVw - minVw;
  let partialPreferred = 100 * diffValues;
  let preferredValue = partialPreferred / diffVw;

  let factor1 = minVw * maxValue;
  let factor2 = maxVw * minValue;

  let diffFactor = factor1 - factor2;
  let diffVwInverse = minVw - maxVw;
  let partialRelative = diffFactor / diffVwInverse;
  let relativeValue = partialRelative / defRem;

  let firstTerm = minValue / defRem;
  firstTerm = parseFloat(firstTerm.toFixed(3));
  let secondTerm = parseFloat(preferredValue.toFixed(3));
  let thirdTerm = parseFloat(relativeValue.toFixed(3));
  let fourthTerm = maxValue / defRem;
  fourthTerm = parseFloat(fourthTerm.toFixed(3));

  if (thirdTerm >= 0) {
    let clampFc = `clamp(${firstTerm}rem, ${secondTerm}vw + ${thirdTerm}rem, ${fourthTerm}rem)`;
    return clampFc;
  } else {
    thirdTerm = Math.abs(thirdTerm);
    let clampFc = `clamp(${firstTerm}rem, ${secondTerm}vw - ${thirdTerm}rem, ${fourthTerm}rem)`;
    return clampFc;
  }
};