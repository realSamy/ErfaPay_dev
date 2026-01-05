<template>
<div class="space-y-8">
  <section>
    <UButton label="پشتیبان جدید" :to="$localePath('admin-agents-new')" size="lg" trailing-icon="material-symbols:add"/>
  </section>

  <section class="page-section">
    <TableAdminAgents />
  </section>
</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
  title: 'pages.admin.title.agents'

})
</script>