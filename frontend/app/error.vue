<script setup lang="ts">
import type {GenericError} from "~/types/errors";

const props = defineProps<{
  error: GenericError
}>()
const {t, n, locale} = useI18n()

const redirectHome = () => clearError({redirect: useLocalePath()(props.error.data?.returnRoute || 'index')})
const isRTL = computed(() => ['fa', 'ar'].includes(locale.value)) // Example logic
const errorMessage = computed(() => t(`error.${props.error.statusCode}`, props.error.message))

useHead({
  htmlAttrs: {
    dir: isRTL.value ? 'rtl' : 'ltr',
    lang: locale.value,
  },
});


</script>

<template>
  <div class="grow flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <UCard class="w-full max-w-lg shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800">
        <div class="text-center space-y-4 py-6">
          <div class="text-red-500 text-5xl font-bold">
            {{ n(error?.statusCode) || t('common.titles.error') }}
          </div>
          <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {{ errorMessage }}
          </h1>

          <UButton @click="redirectHome" size="md" color="primary" icon="mdi:home-outline">
            {{ t('navigation.home') }}
          </UButton>
        </div>
      </UCard>
    </div>
</template>
