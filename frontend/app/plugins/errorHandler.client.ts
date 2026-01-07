import type {VueI18n} from 'vue-i18n'

const ignoreList = [
    'errors.authentication_failed',
    'errors.token_not_valid',
]

export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();
  const {t} = nuxtApp.$i18n as VueI18n
  globalThis.$fetch = $fetch.create({
    onResponseError({response}) {
      if (!!response._data?.errors) {
        response._data.errors.forEach((_err: any) => {
          if (ignoreList.includes(_err.code)) return
          toast.add({
            title: t('error.title'),
            description: t(_err.code, _err.detail),
            color: 'error'
          })
        })
      } else {
        const errorMessage = response.statusText || 'An unexpected error occurred';
        console.error(`Fetch error: ${errorMessage}`);

      }
    }
  });
});
