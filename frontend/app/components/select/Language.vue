<template>
  <UButton v-if="toggle" icon="mdi:globe" @click="toggleLocale">{{
      labelMap[availableLocales[nextIndex] ?? 'en']
    }}
  </UButton>
  <UDropdownMenu
      v-else
      v-model:open="isOpen"
      @update:open="(_i) => emit('update:modelValue', _i)"
      :items="localizedOptions"
      :ui="{content: 'rounded-none rounded-b-md p-0 shadow-lg shadow-primary/50 ring-transparent'}"
      dir="ltr"
      variant="soft"
      :content="{
        sideOffset: 20,
      }"
  >
    <UButton
        :label="selectedLocale.toUpperCase()"
        :trailing-icon="isOpen ? 'mdi:chevron-up': 'mdi:chevron-down'"
        dir="ltr"
        icon="mdi:globe"
        variant="outline"
        color="neutral"
    />
  </UDropdownMenu>
</template>

<script lang="ts" setup>
const {locale, availableLocales, setLocale} = useI18n()
defineProps({
  toggle: {type: Boolean, default: false},
})
const emit = defineEmits<{
  (event: 'update:modelValue', isOpen: boolean): void
}>()
const isOpen = ref(false);
const labelMap: Record<string, string> = {
  fa: 'فارسی',
  en: 'English',
}
const flagMap: Record<string, string> = {
  fa: 'flagpack:ir',
  en: 'flagpack:us',
}


// noinspection JSUnusedGlobalSymbols
const localizedOptions = computed(() =>
    availableLocales.map((loc) => ({
      label: labelMap[loc] ?? loc.toUpperCase(),
      value: loc,
      icon: flagMap[loc] ?? '',
      onSelect: () => setLocale(loc),
    }))
)

const nextIndex = computed(() => {
  const index = availableLocales.indexOf(locale.value)
  return (index + 1) % availableLocales.length
})

const toggleLocale = async (): Promise<void> => {
  await setLocale(availableLocales[nextIndex.value] ?? 'en')
}
const selectedLocale = computed({
  get: () => locale.value,
  set: (val) => setLocale(val),
})
</script>
