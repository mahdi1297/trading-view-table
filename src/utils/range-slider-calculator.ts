import { convertToString } from "./convert-to-string";
import { numberFormatter } from "./number-formatter";

type Value = {
  min: number;
  max: number;
};

export function calculateRangeSliderMinNumber(value: Value) {
  return value.min ? numberFormatter(convertToString(value.min), 0) : ">50K";
}

export function calculateRangeSliderMaxNumber(value: Value) {
  return value.max ? numberFormatter(convertToString(value.max), 0) : ">50M";
}
