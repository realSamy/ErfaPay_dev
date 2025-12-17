<template>
  <div class="space-y-20">
    <section>
      <h1 class="font-bold text-3xl">{{ $t('common.titles.tickets') }}</h1>
      <p>{{ $t('common.titles.tickets_desc') }}</p>
    </section>
    <section>
      <UButton :label="$t('common.labels.new_ticket')" :to="useLocalePath()('dashboard-support-new')" size="xl"
               trailing-icon="mdi:plus"/>
      <ClientOnly>
        <TableDashboardTickets/>
      </ClientOnly>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
})

</script>

<style scoped>

</style>