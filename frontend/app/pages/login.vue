<template>
  <div class="flex items-center justify-center p-4 grow">
    <UCard class="w-full max-w-md shadow-xl rounded-xl" :class="{'animate-shake bg-error': errorShake}">
      <template #header>
        <h1 class="text-xl font-semibold text-center ">{{ t('common.titles.login') }}</h1>
      </template>

      <form @submit.prevent="handleLogin" class="space-y-4" method="post">
        <UFormField :label="t('common.labels.username')" >
          <UInput
              class="w-full"
              v-model="username"
              placeholder="you@example.com | YourUserName"
              type="text"
              name="username"
              required
          />
        </UFormField>

        <UFormField :label="t('common.labels.password')">
          <UInput
              class="w-full"
              v-model="password"
              placeholder="••••••••"
              type="password"
              name="password"
              required
          />
        </UFormField>

        <UButton v-if="success" color="success" block loading>
          {{ t('common.titles.redirecting') }}
        </UButton>
        <UButton class="" v-else type="submit" color="primary" block :loading="loading">
          {{ t('common.labels.login') }}
        </UButton>

        <div v-if="error" class="text-error text-sm text-center">
          {{ error }}
        </div>

        <span>{{t('common.titles.signup_notice')}}</span>
        <UButton variant="link" :to="localePath('signUp')" :label="t('common.labels.signup')"/>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type {Tokens} from "~/types/http";

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const errorShake = ref(false)
const success = ref(false)
const localePath = useLocalePath()

const {t} = useI18n()
useHead({
  title: t('common.titles.login'),
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  const { data, error: fetchError }: {data: Ref<Tokens>, error: Ref<any>} = await useFetch('/api/token/', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
    },
  })

  loading.value = false

  if (fetchError.value || !data.value?.access) {
    error.value = t('error.invalid_login')
    errorShake.value = true;
    setTimeout(() => {
      errorShake.value = false;
    }, 500)
    return
  }

  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')

  accessToken.value = data.value.access
  refreshToken.value = data.value.refresh

  await loadAuth()

  success.value = true
  await router.push(localePath('index'))
}
</script>
