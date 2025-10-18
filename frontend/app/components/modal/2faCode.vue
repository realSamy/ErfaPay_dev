<template>
  <UModal v-model:open="isOpen">
    <template #title>
      <span class="font-extrabold text-xl">{{ $t('common.site_title') }}</span>
    </template>

    <template #body>
      <div class="flex flex-col">
        <h2 class="font-bold text-xl">{{ $t( isSignup ? 'modals.2fa.title_verify_email' : 'modals.2fa.title_login') }}</h2>
        <span>{{$t('modals.2fa.text_code_sent_email', ['test@tgea.das'])}}</span>
        <UButton class="px-0" :ui="{label: 'dark:text-primary-300', base: 'dark:text-primary-300'}" variant="link" :label="$t('modals.2fa.label_change_email')" />

        <form class="p-6 space-y-8">
          <div class="w-full text-center">
            <UPinInput type="number" dir="ltr" size="xl" variant="subtle" required autofocus otp  />
          </div>

          <div class="w-full text-center">
            <UButton :label="$t('modals.2fa.label_code_check')" :trailing-icon="directionalIcon('mdi:arrow-back', 'mdi:arrow-forward')"
                     size="xl"/>
          </div>

          <div class="text-sm text-muted">
            <span>{{ $t('modals.2fa.text_code_not_received') }}</span>
            <UButton @click="codeResend" :ui="{base: 'dark:text-primary-300'}" variant="link" :disabled="!timer.done" :color="!timer.done ? 'neutral' : 'primary'">
              <span v-if="!timer.done">{{ $t('modals.2fa.text_code_timer', [timer.current]) }}</span>
              <span v-else>{{ $t('modals.2fa.label_code_resend') }}</span>
            </UButton>
          </div>
        </form>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
const {currentModal, open, close} = useAuthModal()

const isOpen = computed({
  get: () => currentModal.value === '2fa',
  set: (val) => !val && close()
})

const {isSignup} = defineProps({
  isSignup: {
    type: Boolean,
    default: true
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


onBeforeUnmount(() => {
  timer.value.stop()
})

function codeResend() {
  timer.value.start();
}
function switchToSignin() {
  open('signin')
}
</script>
