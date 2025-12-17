<template>
  <UModal v-model:open="isOpen" :close="currentModalProps?.keepOpen !== true" :dismissible="currentModalProps?.keepOpen !== true">
    <template #title>
      <span class="font-extrabold text-xl">{{ $t('common.site_title') }}</span>
    </template>

    <template #body>
      <div class="flex flex-col">
        <h2 class="font-bold text-xl">{{ $t('modals.signup.title_new_account') }}</h2>

        <form @submit.prevent="submit" class="p-6 space-y-6">
          <UFormField size="xl" :label="$t('modals.profile_setup.label_firstname')">
            <UInput dir="auto" v-model="authInfo.first_name" :placeholder="$t('modals.profile_setup.placeholder_firstname')"
                    autocomplete="off" autofocus class="w-full" required
                    type="text"/>
          </UFormField>
          <UFormField size="xl" :label="$t('modals.profile_setup.label_lastname')">
            <UInput dir="auto" v-model="authInfo.last_name" :placeholder="$t('modals.profile_setup.placeholder_lastname')"
                    autocomplete="off" autofocus class="w-full"
                    required type="text"/>
          </UFormField>

          <UFormField size="xl" :label="$t('modals.profile_setup.label_email')">
            <UInput dir="auto" disabled v-model="authInfo.email" :placeholder="$t('modals.profile_setup.placeholder_email')" autocomplete="off"
                    class="w-full" required type="email"/>
          </UFormField>

          <UFormField size="xl" :label="$t('modals.profile_setup.label_password')">
            <UInput dir="auto" v-model="authInfo.password" :placeholder="$t('modals.profile_setup.placeholder_password')"
                    autocomplete="off" class="w-full" required
                    type="password"/>
          </UFormField>

          <UFormField size="xl" :label="$t('modals.profile_setup.label_password_retype')">
            <UInput dir="auto" v-model="authInfo.confirm_password" :placeholder="$t('modals.profile_setup.placeholder_password')"
                    autocomplete="off" class="w-full" required
                    type="password"/>
          </UFormField>

          <UCheckbox v-model="authInfo.tos_agreed" required>
            <template #label>
              <I18nT keypath="modals.profile_setup.text_tos_agreement">
                <ULink to="/">{{ $t('modals.profile_setup.label_tos') }}</ULink>
              </I18nT>
            </template>
          </UCheckbox>

          <div class="w-full text-center">
            <UButton type="submit" :label="$t('modals.profile_setup.label_create_account')" :trailing-icon="directionalIcon('mdi:arrow-back', 'mdi:arrow-forward')"
                     size="xl"/>
          </div>

        </form>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type {AuthState, CompleteSignupInfo, LoginResponse} from "~/types/auth";

const {currentModal, close, currentModalProps} = useAuthModal()

const isOpen = computed({
  get: () => currentModal.value === 'profileSetup',
  set: (val) => !val && close()
})
const loading = ref(false);
const authState = useState<AuthState>('login-state')

const authInfo = ref<CompleteSignupInfo>({
  first_name: '',
  last_name: '',
  email: authState.value?.loginInfo?.email || '',
  password: '',
  confirm_password: '',
  tos_agreed: false,
} satisfies CompleteSignupInfo)

async function submit() {
  loading.value = true
  try {
    const response = await $fetch<LoginResponse>('/api/auth/signup/complete/', {
      method: 'POST',
      body: authInfo.value,
    })

    if (response.ok) {
      useState<AuthState>('login-state', () => ({
        state: 'complete',
        loginInfo: authInfo.value,
      } satisfies AuthState))
      const store = useStorage()


      return close()
    }

  } catch (error) {
  } finally {
    loading.value = false
  }
}

</script>
