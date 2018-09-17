import * as R from "ramda";

function middle<T>(list: T[]): T {
  const middleIndex = Math.floor(list.length / 2);
  return list[middleIndex];
}

function plural(str: string, symbol: string): string {
  if (str.endsWith("s")) {
    return str;
  }
  return `${str}${symbol}`;
}

export default function pipeline(files: string[]): string {

  const result = R.compose(
    R.toUpper,
    (file) => plural(file, "s"),
    // tslint:disable-next-line
    (files: string[]) => middle(files),
    // tslint:disable-next-line
    (files: string[]) => files.sort(),
    // tslint:disable-next-line
    (files: string[]) => files.filter((f) => f.startsWith("."))
  )(files);

  return result;
}
