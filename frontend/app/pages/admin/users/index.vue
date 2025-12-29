<template>
  <div class="space-y-12">
    <div class="flex gap-2">
      <UButton label="دانلود CSV" size="lg" trailing-icon="material-symbols:download-rounded"/>
      <UButton label="کاربر جدید" :to="$localePath('admin-users-new')" size="lg" trailing-icon="material-symbols:add"/>
    </div>

    <div class="flex flex-col md:flex-row gap-6" v-if="userStats">
      <CardAdminSimpleReport header="سفارش های فعال" :body="userStats.total_active_orders" />
      <CardAdminSimpleReport header="اعضای خریدار" :body="userStats.total_active_users" :stats="userStats.active_users_growth"/>
      <CardAdminSimpleReport header="تعداد کل اعضا" :body="userStats.total_users" :stats="userStats.new_users_growth"/>
    </div>

    <section class="page-section">
      <ClientOnly>
        <TableAdminUsers />
      </ClientOnly>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type {GenericHTTPResponse} from "~/types/http";
import type {UsersStats} from "~/types/users";

definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.users',
})


const userStats = ref<UsersStats>()
const {data: response} = await useAuthApi<GenericHTTPResponse<UsersStats>>('/api/auth/admin/users/stats/')
if (response.value?.ok) {
  userStats.value = response.value.data
}
</script>