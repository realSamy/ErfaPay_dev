<template>
  <section class="page-section">
    <h2 class="font-bold text-2xl">ایجاد پشتیبان جدید</h2>

    <UForm class="w-full md:w-lg space-y-4" @submit.prevent="submit">
      <UFormField :label="$t('modals.profile_setup.label_firstname')" size="xl">
        <UInput v-model="payload.first_name" class="w-full" dir="auto" required variant="subtle"/>
      </UFormField>

      <UFormField :label="$t('modals.profile_setup.label_lastname')" size="xl">
        <UInput v-model="payload.last_name" class="w-full" dir="auto" required variant="subtle"/>
      </UFormField>

      <UFormField :label="$t('modals.profile_setup.label_email')" size="xl">
        <UInput v-model="payload.email" autocomplete="new-email" class="w-full" dir="auto" required type="email"
                variant="subtle"/>
      </UFormField>

      <UFormField :label="$t('modals.profile_setup.label_username')" size="xl">
        <UInput v-model="payload.username"
                :value="!payload.username ? payload.email : payload.username"
                autocomplete="new-username"
                class="w-full"
                dir="auto"
                required
                variant="subtle"
        />
      </UFormField>

      <UFormField :label="$t('modals.profile_setup.label_password')" size="xl">
        <UInput v-model="payload.password" autocomplete="new-password" class="w-full" dir="auto" required
                type="password" variant="subtle"/>
      </UFormField>

      <UFormField :label="$t('modals.profile_setup.label_password_retype')" size="xl">
        <UInput v-model="payload.confirm_password" autocomplete="new-password" class="w-full" dir="auto" required
                type="password" variant="subtle"/>
      </UFormField>

      <UFormField :label="$t('modals.profile_setup.label_role')" size="xl">
        <USelect v-model="payload.role" :items="agentRoles" class="w-full" required variant="subtle"/>
      </UFormField>

      <UFormField>
        <UButton :label="$t('pages.admin.title.agents_new')"
                 :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')"
                 size="lg"
                 type="submit"/>
      </UFormField>
    </UForm>
  </section>
</template>

<script lang="ts" setup>
import type {AdminCreateUserPayload, UserRole} from "~/types/users";

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
  title: 'pages.admin.title.agents_new'
})

interface RoleItem {
  label: string
  value: UserRole
}

const agentRoles: RoleItem[] = [
  {label: $t("common.roles.main_admin"), value: "main_admin"},
  {label: $t("common.roles.senior_support"), value: "senior_support"},
  {label: $t("common.roles.simple_support"), value: "simple_support"},
]

const {createSupportUser} = useAdminUsers()
const payload = ref<AdminCreateUserPayload>({
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  password: '',
  confirm_password: '',
  role: 'simple_support'
})

const submit = async (): Promise<void> => {
  const {data: response} = await createSupportUser(payload.value)

  if (response.value?.ok) {
    useToast().add({
      title: $t('pages.admin.title.agents_new') as string,
      description: $t('pages.users.messages.created') as string,
      color: 'success',
    })
    await useLoadAdminAgentsStore(true)
    navigateTo(useLocalePath()('admin-agents'))
  } else {
    useToast().add({
      title: $t('error.title') as string,
      description: response.value?.error || ($t('error.unexpected') as string),
      color: 'error',
    })
  }
}

</script>