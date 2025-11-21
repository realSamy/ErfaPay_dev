<template>
  <div v-if="user" class="space-y-6">
    <section class="space-y-8">
      <h2 class="text-2xl font-medium">مشخصات کاربر</h2>
      <div class="profile-section">
        <div class="flex align-middle gap-2">
          <UIcon :name="`cif:${user.country_code.toLowerCase()}`" class="rounded-md" size="25"/>
          <span class="text-xl font-bold">{{ user.first_name }} {{ user.last_name }}</span>
        </div>
      </div>
      <div class="profile-section">
        <h3 class="profile-title">ایمیل</h3>
        <span>{{ user.email }}</span>
      </div>
    </section>

    <section class="page-section">
      <h2 class="text-2xl font-medium">سفارشات کاربر</h2>
      <ClientOnly>
        <TableAdminOrders :user="user.id" />
      </ClientOnly>
    </section>
  </div>
  <section v-else></section>
</template>

<script lang="ts" setup>
import type {User} from "~/types/admin/data";

definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.users_id',
})

const route = useRoute()
const userId = Number(route.params.id)
const users = useState<User[]>('admin--users')
const user = computed(() => users.value.find((u) => u.id === userId))

if (!user.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'User not found',
    message: 'errors.userNotFound',
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