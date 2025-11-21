<script setup lang="ts">
import type {NuxtError} from '#app'

defineProps<{
  error: NuxtError
}>()

const {t, locale} = useI18n()
const redirectHome = () => clearError({redirect: '/'})

const isRTL = computed(() => ['fa', 'ar'].includes(locale.value)) // Example logic

useHead({
  htmlAttrs: {
    dir: isRTL.value ? 'rtl' : 'ltr',
    lang: locale.value,
  },
});

</script>

<template>
  <NuxtLayout>
    <div class="grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <UCard class="w-full max-w-lg shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800">
        <div class="text-center space-y-4 py-6">
          <div class="text-red-500 text-5xl font-bold">
            {{ error?.statusCode || 'Error' }}
          </div>
          <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {{ error?.message }}
          </h1>

          <UButton @click="redirectHome" size="md" color="primary" icon="mdi:home-outline">
            {{ t('navigation.home') }}
          </UButton>
        </div>
      </UCard>
    </div>
  </NuxtLayout>
</template>
