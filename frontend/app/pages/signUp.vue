<template>isIndexRoute
  <div class="flex items-center justify-center p-4 grow">
    <UCard :class="{'animate-shake bg-error': errorShake}" class="w-full max-w-md shadow-xl rounded-xl ">
      <template #header>
        <h1 class="text-xl font-semibold text-center ">{{ t('common.titles.signup') }}</h1>
      </template>

      <form class="space-y-4" method="post" @submit.prevent="handleSignUp">
        <UFormField :label="t('common.labels.phone')">
          <UFieldGroup dir="ltr" class="w-full">
            <SelectCountryCode v-model="selectedCountry" />
            <UInput
                v-model="phone"
                class="w-full"
                name="phone"
                placeholder=""
                required
                type="phone"
            />
          </UFieldGroup>
        </UFormField>

        <UButton v-if="success" block color="success" loading>
          {{ t('common.titles.redirecting') }}
        </UButton>
        <UButton v-else :loading="loading" block class="" color="primary" type="submit">
          {{ t('common.labels.signup') }}
        </UButton>

        <div v-if="error" class="text-error text-sm text-center">
          {{ error }}
        </div>

        <span>{{ t('common.titles.login_notice') }}</span>
        <UButton :label="t('common.labels.login')" :to="localePath('login')" variant="link"/>
      </form>
    </UCard>
  </div>
</template>

<script lang="ts" setup>

import type {Country} from "~/types/data";

const phone = ref('')
const error = ref('')
const loading = ref(false)
const errorShake = ref(false)
const success = ref(false)
const localePath = useLocalePath()

const {t, locale} = useI18n()
const selectedCountry = ref<Country | undefined>(undefined)

useHead({
  title: t('common.titles.signup'),
})

const handleSignUp = () => {
}
</script>
