<template>
  <section class="page-section max-h-full p-2 overflow-y-auto">
    <h2 class="font-bold text-2xl">ایجاد کاربر جدید</h2>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
  title: 'pages.admin.title.users_new'

})

</script>

<style scoped>

</style>