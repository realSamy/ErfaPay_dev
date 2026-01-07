<template>
  <UModal v-model:open="isOpen" :close="currentModalProps?.keepOpen !== true"
          :dismissible="currentModalProps?.keepOpen !== true">
    <template #title>
      <span class="font-extrabold text-xl">{{ $t('common.site_title') }}</span>
    </template>

    <template #body>
      <div class="flex flex-col">
        <h2 class="font-bold text-xl">
          {{ $t(title) }}
        </h2>
        <span>{{ $t('modals.2fa.text_code_sent_email', [loginState.loginInfo.email]) }}</span>
        <UButton :label="$t('modals.2fa.label_change_email')"
                 :ui="{label: 'dark:text-primary-300', base: 'dark:text-primary-300'}"
                 class="px-0" variant="link"
                 @click="changeEmail"/>

        <UForm class="p-6 space-y-8" @submit.prevent="handleSubmit">
          <div class="w-full text-center">
            <UPinInput v-model="otpCode" autofocus dir="ltr" otp required size="xl" type="number"
                       variant="subtle"/>
          </div>

          <div class="w-full text-center">
            <UButton :label="$t('modals.2fa.label_code_check')"
                     :loading="loading"
                     :trailing-icon="directionalIcon('mdi:arrow-back', 'mdi:arrow-forward')"
                     size="xl"
                     type="submit"/>
          </div>

          <div class="text-sm text-muted">
            <span>{{ $t('modals.2fa.text_code_not_received') }}</span>
            <UButton :color="!timer.done ? 'neutral' : 'primary'" :disabled="!timer.done"
                     :ui="{base: 'dark:text-primary-300'}" variant="link"
                     @click="codeResend">
              <span v-if="!timer.done">{{ $t('modals.2fa.text_code_timer', [timer.current]) }}</span>
              <span v-else>{{ $t('modals.2fa.label_code_resend') }}</span>
            </UButton>
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type {AuthState, OTPInfo} from "~/types/auth";
import type {HTTPOTPLoginResponse, HTTPOTPSignupResponse} from "~/types/http";
import type {User} from "~/types/users";

import {useStorage} from "@vueuse/core";
import {watch} from "vue";


const {currentModal, open, close, currentModalProps} = useAuthModal()

const isOpen = computed({
  get: () => currentModal.value === '2fa',
  set: (val) => !val && close()
})

const loading = ref(false);

const loginState = useState<AuthState>('login-state')
const otpCode = ref<number[]>([])
const otpInfo = computed<OTPInfo>(() => ({
  otp: Number(otpCode.value.join('')),
  ...loginState.value?.loginInfo,
}))

const {nextStep} = defineProps({
  nextStep: {
    type: String,
    default: undefined
  }
})

const duration = 75 // seconds
const remaining = ref(0)
const interval = ref<any>(null)

const timer = ref({
      done: computed(() => remaining.value <= 0),
      current: computed(() => {
        const minutes = Math.floor(remaining.value / 60)
        const seconds = remaining.value % 60
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      }),
      start() {
        remaining.value = duration
        if (interval.value) clearInterval(interval.value)
        interval.value = setInterval(() => {
          if (remaining.value > 0) {
            remaining.value--
          } else {
            clearInterval(interval.value)
            interval.value = null
          }
        }, 1000)
      },
      stop() {
        if (interval.value) {
          clearInterval(interval.value)
          interval.value = null
        }
      }
    }
)

watch(isOpen, () => {
  if (currentModal.value === '2fa') {
    timer.value.start()
  }
})

onBeforeUnmount(() => {
  timer.value.stop()
})

async function codeResend() {
  loading.value = true
  try {
    const response = await $fetch('/api/auth/otp-resend/', {
      method: 'POST',
      body: {
        ...loginState.value?.loginInfo
      }
    })
    timer.value.start();
  } catch (e) {
  } finally {
    loading.value = false
  }

}

function switchToSignin() {
  otpCode.value = []
  open('signin')
}

function switchToSignup() {
  otpCode.value = []
  open('signup')
}

function switchToCompleteSignup() {
  otpCode.value = []
  open('profileSetup')
}

function switchToForgetPassword() {
  otpCode.value = []
  open('forgetPassword')
}

function switchToResetPassword() {
  otpCode.value = []
  open('resetPassword')
}


const changeEmail = computed(() => {
  switch (currentModalProps.value?.nextStep || nextStep) {
    case 'signin':
      return switchToSignin
    case 'signup':
      return switchToSignup
    case 'forgetPassword':
      return switchToForgetPassword
    default:
      return switchToSignin
  }
})

const title = computed(() => {
  switch (currentModalProps.value?.nextStep || nextStep) {
    case 'signin':
      return 'modals.2fa.title_login'
    case 'signup':
      return 'modals.2fa.title_verify_email'
    case 'forgetPassword':
      return 'modals.forgetPassword.title'
    default:
      return ''
  }

})

async function submitLogin() {
  loading.value = true
  try {
    const response = await $fetch<HTTPOTPLoginResponse>('/api/auth/signin/otp/', {
      method: 'POST',
      body: otpInfo.value,
    })

    if (response.ok) {
      const accessToken = useStorage('auth.access_token', '');
      const refreshToken = useStorage('auth.refresh_token', '');
      const user = useState<User | null>('auth.user', () => null)

      accessToken.value = response.data.access
      refreshToken.value = response.data.refresh
      user.value = response.data.user

      close()
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

async function submitSignup() {
  loading.value = true
  try {
    const response = await $fetch<HTTPOTPSignupResponse>('/api/auth/signup/otp/', {
      method: 'POST',
      body: otpInfo.value,
    })

    if (response.ok) {
      useState<AuthState>('login-state', () => ({
        state: 'otp',
        loginInfo: otpInfo.value,
      } satisfies AuthState))
      return switchToCompleteSignup()
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

async function submitResetPassword() {
  loading.value = true
  try {
    const response = await $fetch<HTTPOTPLoginResponse>('/api/auth/reset/otp/', {
      method: 'POST',
      body: otpInfo.value,
    })

    if (response.ok) {
      useState<AuthState>('login-state', () => ({
        state: 'otp',
        loginInfo: otpInfo.value,
      } satisfies AuthState))
      return switchToResetPassword()
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = computed(() => {
  switch (currentModalProps.value?.nextStep) {
    case 'signin':
      return submitLogin
    case 'signup':
      return submitSignup
    case 'forgetPassword':
      return submitResetPassword
    default:
      return submitLogin
  }
})

</script>
