<template>
  <div class="space-y-10">
    <section>
      <h2 class="font-bold text-2xl">لیست تیکت های پشتیبانی</h2>
      <ClientOnly>
        <TableAdminTickets/>
      </ClientOnly>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.support'

})
</script>
