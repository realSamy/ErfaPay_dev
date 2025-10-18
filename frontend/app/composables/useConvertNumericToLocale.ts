export default function (input: string, locale: string, useGrouping: boolean = false) {
  return input.replace(/\d+/g, (match) =>
      Number(match).toLocaleString(locale, {useGrouping})
  );
}