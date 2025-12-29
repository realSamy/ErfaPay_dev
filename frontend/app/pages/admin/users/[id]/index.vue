<template>
  <div v-if="user" class="space-y-6">
    <section class="space-y-8">
      <h2 class="text-2xl font-medium">{{$t('common.titles.user_info')}}</h2>
      <div class="profile-section">
        <div class="flex align-middle gap-2">
          <UIcon :name="`cif:${user.country_code?.toLowerCase()}`" class="rounded-md" size="25"/>
          <span class="text-xl font-bold">{{ user.full_name }}</span>
        </div>
      </div>
      <div class="profile-section">
        <h3 class="profile-title">{{$t('common.titles.email')}}</h3>
        <span>{{ user.email }}</span>
      </div>
    </section>

    <section class="page-section">
      <h2 class="text-2xl font-medium">{{ $t('common.titles.user_orders') }}</h2>
      <ClientOnly>
        <TableAdminOrders :user="user.id" />
      </ClientOnly>
    </section>
  </div>
  <section v-else></section>
</template>

<script lang="ts" setup>
import type {User} from "~/types/users";
import {useBreadcrumbStore} from "~/composables/useBreadcrumbStore";

definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.users_id',
})

const route = useRoute()
const userId = Number(route.params.id)
const {getUserDetail} = useAdminUsers()
const user = await getUserDetail(userId)

const breadcrumbState = useBreadcrumbStore()
breadcrumbState.value.name = user.value.full_name || user.value.email

const {t} = useI18n()

if (!user.value) {
  useToast().add({
    title: t('error.title'),
    description: t('error.user_not_found'),
    color: 'error',
  })
  useRouter().back()
  throw createError({
    statusCode: 404,
    statusMessage: 'User not found',
    message: t('error.user_not_found'),
  })
}
</script>

<style scoped>
@reference "@/assets/css/main.css";

.profile-title {
  @apply text-xl font-medium;
}

.profile-section {
  @apply space-y-1;
}
</style>