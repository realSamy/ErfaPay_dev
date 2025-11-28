<template>
  <UModal v-model:open="isOpen" :close="currentModalProps?.keepOpen !== true" :dismissible="currentModalProps?.keepOpen !== true">
    <template #title>
      <span class="font-extrabold text-xl">{{ $t('common.site_title') }}</span>
    </template>

    <template #body>
      <div class="flex flex-col">
        <h2 class="font-bold text-xl">{{ $t('modals.signup.title_new_account') }}</h2>

        <form class="p-6 space-y-4" @submit.prevent="submit">
          <UFormField size="xl" :label="$t('modals.signup.label_email')">
            <UInput dir="auto" v-model="authInfo.email" :placeholder="$t('modals.signup.placeholder_email')" class="w-full"
                    required type="email"/>
          </UFormField>

          <div class="w-full text-center">
            <UButton :label="$t('modals.2fa.label_code_get')" :trailing-icon="directionalIcon('mdi:arrow-back', 'mdi:arrow-forward')" size="xl"
                     type="submit"/>
          </div>

          <div class="text-sm text-muted">
            <span>{{ $t('modals.signup.text_already_has_account') }}</span>
            <UButton :ui="{label: 'dark:text-primary-300', base: 'dark:text-primary-300'}" variant="link"
                     @click="switchToSignin">
              {{ $t('modals.signup.label_switch_signin') }}
            </UButton>
          </div>
        </form>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type {AuthState, LoginResponse, SignupInfo} from "~/types/auth";

const {currentModal, open, close, currentModalProps} = useAuthModal()

const isOpen = computed({
  get: () => currentModal.value === 'signup',
  set: (val) => !val && close()
})

const loading = ref(false)
const authInfo: Ref<SignupInfo> = ref({
  email: '',
})


function switchToSignin() {
  open('signin')
}

function switchTo2fa() {
  open('2fa', {isSignup: true})
}

async function submit() {
  loading.value = true
  try {
    const response = await $fetch<LoginResponse>('/api/auth/signup/', {
      method: 'POST',
      body: authInfo.value,
    })
    if (response.ok) {
      useState<AuthState>('login-state', () => ({
        state: 'otp',
        loginInfo: authInfo.value,
      }))
      switchTo2fa()
    }

  } catch (error) {
  } finally {
    loading.value = false
  }
}

</script>
