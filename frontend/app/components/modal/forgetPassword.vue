<template>
  <UModal v-model:open="isOpen" :close="currentModalProps?.keepOpen !== true"
          :dismissible="currentModalProps?.keepOpen !== true">
    <template #title>
      <span class="font-extrabold text-xl">{{ $t('common.site_title') }}</span>
    </template>

    <template #body>
      <div class="flex flex-col">
        <h2 class="font-bold text-xl">{{ $t('modals.forgetPassword.title') }}</h2>
        <form class="p-6 space-y-4" @submit.prevent="submit">
          <UFormField :label="$t('modals.signin.label_email')" size="xl">
            <UInput v-model="loginInfo.email" :placeholder="$t('modals.signin.placeholder_email')" class="w-full"
                    dir="auto"
                    required type="email"/>
          </UFormField>

          <div class="w-full text-center">
            <UButton :label="$t('modals.2fa.label_code_get')" :loading="loading"
                     :trailing-icon="directionalIcon('mdi:arrow-back', 'mdi:arrow-forward')" size="xl"
                     type="submit"/>
          </div>

          <div class="text-sm text-muted">
            <span>{{ $t('modals.signin.text_has_no_account_yet') }}</span>
            <UButton :ui="{label: 'dark:text-primary-300', base: 'dark:text-primary-300'}" variant="link"
                     @click="switchToSignup">
              {{ $t('modals.signin.label_switch_signup') }}
            </UButton>
          </div>
        </form>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type {LoginInfo, AuthState} from "~/types/auth";
import type {HTTPLoginResponse} from "~/types/http";

const {currentModal, open, close, currentModalProps} = useAuthModal()
const {t} = useI18n()
const loginInfo: Ref<LoginInfo> = ref({
  email: '',
  password: '',
})
const loading = ref<boolean>(false)

const isOpen = computed({
  get: () => currentModal.value === 'forgetPassword',
  set: (val) => !val && close()
})

function switchToSignup() {
  open('signup')
}

function switchTo2fa() {
  open('2fa', {nextStep: 'forgetPassword'})
}

async function submit() {
  loading.value = true
  try {
    const response = await $fetch<HTTPLoginResponse>('/api/auth/reset/request/', {
      method: 'POST',
      body: loginInfo.value,
    })

    if (response.ok) {
      useState<AuthState>('login-state', () => ({
        state: 'otp',
        loginInfo: loginInfo.value,
      }))

      switchTo2fa()
    } else {
      useToast().add({
        color: 'error',
        title: t('common.titles.error'),
        description: response.error,
      })
    }

  } catch (error) {
  } finally {
    loading.value = false
  }
}
</script>
