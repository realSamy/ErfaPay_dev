<template>
  <section class="page-section">
    <h2 class="font-bold text-2xl">ایجاد پشتیبان جدید</h2>

    <UForm class="w-full md:w-lg space-y-4">
      <UFormField size="xl" label="نام">
        <UInput class="w-full" variant="subtle" required />
      </UFormField>

      <UFormField size="xl" label="نام خانوادگی">
        <UInput class="w-full" variant="subtle" required />
      </UFormField>

      <UFormField size="xl" label="ایمیل">
        <UInput type="email" class="w-full" variant="subtle" autocomplete="off" required />
      </UFormField>

      <UFormField size="xl" label="رمز عبور">
        <UInput type="password" class="w-full" variant="subtle" autocomplete="off" required />
      </UFormField>

      <UFormField size="xl" label="تکرار رمز عبور">
        <UInput type="password" class="w-full" variant="subtle" autocomplete="off" required />
      </UFormField>

      <UFormField size="xl" label="سطح دسترسی">
        <USelect :items="agentRoles" v-model="newAgent.role" class="w-full" variant="subtle" required />
      </UFormField>



      <UFormField>
        <UButton :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')" label="تعریف پشتیبان"
                 size="lg"
                 type="submit"/>
      </UFormField>
    </UForm>
  </section>
</template>

<script lang="ts" setup>
import type {UserRole} from "~/types/admin/data";

definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.agents_new'

})

interface RoleItem {
  label: string
  value: UserRole
}

const agentRoles: RoleItem[] = [
  {label: "مدیر سایت", value: "main_admin"},
  {label: "ارشد", value: "senior_support"},
  {label: "ساده", value: "simple_support"},
]

const newAgent = ref({
  role: "simple_support"
})
</script>

<style scoped>

</style>