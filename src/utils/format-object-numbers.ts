import { formatTwoDigitsAfterDecimal, numberFormatter } from "./number-formatter";

export const formatNumbersOfObject = (item: any) => {
  const newItem = {
    ...item,
    EMPLOYEES: numberFormatter(item.EMPLOYEES, 2),
    CHG: formatTwoDigitsAfterDecimal(item.CHG),
    VOLUME: numberFormatter(item.VOLUME, 3),
    MKT_CAP: numberFormatter(item.MKT_CAP, 3),
    "CHG%": formatTwoDigitsAfterDecimal(item["CHG%"]),
    "P/E": formatTwoDigitsAfterDecimal(item["P/E"]),
    "VOLUME*PRICE": numberFormatter(item["VOLUME*PRICE"], 2),
  };

  return newItem;
};
