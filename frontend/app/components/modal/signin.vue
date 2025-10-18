<template>
  <UModal v-model:open="isOpen">
    <template #title>
      <span class="font-extrabold text-xl">{{ $t('common.site_title') }}</span>
    </template>

    <template #body>
      <div class="flex flex-col">
        <h2 class="font-bold text-xl">{{ $t('modals.signin.title_login') }}</h2>
        <form class="p-6 space-y-4" @submit.prevent="switchTo2fa">
          <UFormField :label="$t('modals.signin.label_email')">
            <UInput class="w-full" :placeholder="$t('modals.signin.placeholder_email')" required type="email" />
          </UFormField>

          <UFormField :label="$t('modals.signin.label_password')">
            <UInput class="w-full" :placeholder="$t('modals.signin.placeholder_password')" required type="password" />
            <template #help>
              <UButton class="px-0" variant="link" :ui="{label: 'dark:text-primary-300', base: 'dark:text-primary-300'}">{{ $t('modals.signin.label_restore_password') }}</UButton>
            </template>
          </UFormField>

          <div class="w-full text-center">
            <UButton type="submit" :label="$t('modals.2fa.label_code_get')" size="xl" :trailing-icon="directionalIcon('mdi:arrow-back', 'mdi:arrow-forward')" />
          </div>

          <div class="text-sm text-muted">
            <span>{{ $t('modals.signin.text_has_no_account_yet') }}</span>
            <UButton variant="link" @click="switchToSignup" :ui="{label: 'dark:text-primary-300', base: 'dark:text-primary-300'}">
              {{ $t('modals.signin.label_switch_signup') }}
            </UButton>
          </div>
        </form>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { currentModal, open, close } = useAuthModal()

const isOpen = computed({
  get: () => currentModal.value === 'signin',
  set: (val) => !val && close()
})

function switchToSignup() {
  open('signup')
}

function switchTo2fa() {
  open('2fa')
}
</script>
