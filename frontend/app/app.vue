<template>
  <UApp :locale="resolvedLocale">
    <NuxtLoadingIndicator class="bg-primary dark:bg-primary-300" :color="false"/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>

    <ModalSignup />
    <ModalSignin />
    <Modal2faCode />
    <ModalProfileSetup />
  </UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
import type {Locale, Messages} from "#ui/types";

const {locale, t} = useI18n()

const getLocale = (_l: string): Locale<Messages> => {
  const map: Record<string, string> = {
    fa: 'fa_ir',
  }

  // @ts-ignore
  return locales[map[_l] || _l]
}

const resolvedLocale = computed(() => getLocale(locale.value))

const lang = computed(() => resolvedLocale.value.code)
const dir = computed(() => resolvedLocale.value.dir)
useHead({
  htmlAttrs: {
    lang,
    dir,
  },
  titleTemplate: (titleChunk) => {
    const siteName = t('common.site_title')
    const separator = '-'
    return titleChunk ? `${titleChunk} ${separator} ${siteName}` : siteName;
  },

  meta: [
    {charset: 'utf-8'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {name: 'theme-color', content: '#0f52ba'}
  ]
})
const currencyCheckInterval = ref<any>(null)
onMounted(async () => {
  await loadCurrencies()
  await loadBenefits()
  await loadFooterLogos()
  currencyCheckInterval.value = setInterval(async() => await loadCurrencies(), 1000 * 60 * 2)
  await loadAuth()
  await loadServices()
})
onBeforeUnmount(async () => {
  clearInterval(currencyCheckInterval.value)
})
</script>

<!--suppress CssUnusedSymbol -->
<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
html, body {
  @apply overflow-x-hidden;
}
html[dir="rtl"] body {
  padding-right: 0 !important;
}
</style>