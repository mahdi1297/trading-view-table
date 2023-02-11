export function isString(
  value: string | number | string[] | { min: number; max: number }
): value is string {
  if (typeof value === "string") {
    return true;
  }
}

export function isNumber(
  value: string | number | string[] | { min: number; max: number }
): value is number {
  if (typeof value === "number") {
    return true;
  }
}

export function isArrayOfStrings(
  value: string | number | string[] | { min: number; max: number }
): value is string[] {
  if (
    typeof value !== "number" &&
    typeof value !== "string" &&
    Array.isArray(value) &&
    value[0]
  ) {
    return true;
  }
}

export function isObject(
  value: string | number | string[] | { min: number; max: number }
): value is { min: number; max: number } {
  if (
    typeof value === "object" &&
    !Array.isArray(value) &&
    value.min &&
    value.max
  ) {
    return true;
  }
}
