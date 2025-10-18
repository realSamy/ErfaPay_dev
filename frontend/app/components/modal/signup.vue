<template>
  <UModal v-model:open="isOpen">
    <template #title>
      <span class="font-extrabold text-xl">{{ $t('common.site_title') }}</span>
    </template>

    <template #body>
      <div class="flex flex-col">
        <h2 class="font-bold text-xl">{{ $t('modals.signup.title_new_account') }}</h2>

        <form class="p-6 space-y-4" @submit.prevent="switchTo2fa">
          <UFormField  :label="$t('modals.signup.label_email')">
            <UInput class="w-full" :placeholder="$t('modals.signup.placeholder_email')" required type="email" />
          </UFormField>

          <div class="w-full text-center">
            <UButton type="submit" :label="$t('modals.2fa.label_code_get')" size="xl" :trailing-icon="directionalIcon('mdi:arrow-back', 'mdi:arrow-forward')" />
          </div>

          <div class="text-sm text-muted">
            <span>{{ $t('modals.signup.text_already_has_account') }}</span>
            <UButton variant="link" @click="switchToSignin" :ui="{label: 'dark:text-primary-300', base: 'dark:text-primary-300'}">
              {{ $t('modals.signup.label_switch_signin') }}
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
  get: () => currentModal.value === 'signup',
  set: (val) => !val && close()
})

function switchToSignin() {
  open('signin')
}

function switchTo2fa() {
  open('2fa')
}
</script>
