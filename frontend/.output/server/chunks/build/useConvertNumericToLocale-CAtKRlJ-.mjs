function __unimport_useConvertNumericToLocale(input, locale, useGrouping = false) {
  return input.replace(
    /\d+/g,
    (match) => Number(match).toLocaleString(locale, { useGrouping })
  );
}

export { __unimport_useConvertNumericToLocale as _ };
//# sourceMappingURL=useConvertNumericToLocale-CAtKRlJ-.mjs.map
