export default function <L extends string, R extends string>(leftIcon: L, rightIcon: R): L | R {
  const { locale } = useI18n()
  const isRTL = computed(() => ['fa', 'ar'].includes(locale.value))
  return isRTL.value ? leftIcon : rightIcon
}