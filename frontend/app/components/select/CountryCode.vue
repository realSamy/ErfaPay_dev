<script lang="ts" setup>
import type {Country} from "~/types/data";

const countries: Ref<Country[]> = ref([])

function onOpen() {
  if (!countries.value?.length) {
    countries.value = getCountries()
  }
}

const {locale} = useI18n()
const selectedCountry = ref<Country | undefined>(undefined)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | undefined): void
}>()

defineProps<{
  modelValue: string | undefined
}>()

watch(selectedCountry, (val) => {
  emit('update:modelValue', val?.code)
})
</script>

<template>
  <USelectMenu
      dir="ltr"
      :arrow="false"
      :items="countries"
      v-model="selectedCountry"
      :search-input="{ icon: 'mdi:search' }"
      :ui="{itemLabel: 'w-full', content: 'w-64', input: 'direction-auto', arrow: 'text-black dark:text-white'}"
      label-key="search"
      trailing-icon=""
      @update:open="onOpen">
    <template #item-label="{ item }">
      <div class="flex justify-between w-full">
        <span>{{ item?.name[locale] }}</span>
      </div>
    </template>

    <template #default="{ modelValue }">
      <div class="w-full">
        <span v-if="modelValue" >{{ modelValue?.name[locale] }}</span>
        <span v-else class="text-muted" dir="ltr">{{ $t('common.labels.choose_country') }}</span>
      </div>
    </template>
    <template #leading="{ modelValue, ui }">
              <span v-if="modelValue" class="size-5 text-center">
                {{ modelValue?.emoji }}
              </span>
      <UIcon v-else :class="ui.leadingIcon()" name="mdi:earth"/>
    </template>
    <template #item-leading="{ item }">
      <span class="size-5 text-center">
        {{ item.emoji }}
      </span>
    </template>
  </USelectMenu>
</template>

<style scoped>

</style>