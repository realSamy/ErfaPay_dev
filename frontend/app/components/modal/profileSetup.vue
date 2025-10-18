<template>
  <UModal v-model:open="isOpen">
    <template #title>
      <span class="font-extrabold text-xl">{{ $t('common.site_title') }}</span>
    </template>

    <template #body>
      <div class="flex flex-col">
        <h2 class="font-bold text-xl">{{ $t('modals.signup.title_new_account') }}</h2>

        <form class="p-6 space-y-6">
          <UFormField  :label="$t('modals.profile_setup.label_fullname')">
            <UInput class="w-full" :placeholder="$t('modals.profile_setup.placeholder_fullname')" required autofocus type="" autocomplete="no" />
          </UFormField>

          <UFormField  :label="$t('modals.profile_setup.label_email')">
            <UInput class="w-full" :placeholder="$t('modals.profile_setup.placeholder_email')" required type="email" autocomplete="no" />
          </UFormField>

          <UFormField  :label="$t('modals.profile_setup.label_password')">
            <UInput class="w-full" :placeholder="$t('modals.profile_setup.placeholder_password')" required type="password" autocomplete="no" />
          </UFormField>

          <UFormField  :label="$t('modals.profile_setup.label_password_retype')">
            <UInput class="w-full" :placeholder="$t('modals.profile_setup.placeholder_password')" required type="password" autocomplete="no" />
          </UFormField>



          <UCheckbox>
            <template #label>
              <I18nT keypath="modals.profile_setup.text_tos_agreement">
                <ULink to="/">{{ $t('modals.profile_setup.label_tos') }}</ULink>
              </I18nT>
            </template>
          </UCheckbox>

          <div class="w-full text-center">
            <UButton :label="$t('modals.profile_setup.label_create_account')" size="xl" :trailing-icon="directionalIcon('mdi:arrow-back', 'mdi:arrow-forward')" />
          </div>

        </form>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { currentModal, open, close } = useAuthModal()

const isOpen = computed({
  get: () => currentModal.value === 'profileSetup',
  set: (val) => !val && close()
})

function switchToSignin() {
  open('signin')
}
</script>
