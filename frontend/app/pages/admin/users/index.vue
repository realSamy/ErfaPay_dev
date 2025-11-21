<template>
  <div class="space-y-12">
    <div class="flex gap-2">
      <UButton label="دانلود CSV" size="lg" trailing-icon="material-symbols:download-rounded"/>
      <UButton label="کاربر جدید" :to="$localePath('admin-users-new')" size="lg" trailing-icon="material-symbols:add"/>
    </div>

    <div class="flex flex-col md:flex-row gap-6">
      <CardAdminSimpleReport header="سفارش های فعال" :body="2420" />
      <CardAdminSimpleReport header="اعضای خریدار" :body="2420" :badge="20" dec/>
      <CardAdminSimpleReport header="تعداد کل اعضا" :body="2420" :badge="20"/>
    </div>

    <section class="page-section">
      <ClientOnly>
        <TableAdminUsers />
      </ClientOnly>
    </section>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.users',
})
</script>