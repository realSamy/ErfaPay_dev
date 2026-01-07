<template>
  <div class="space-y-10 max-h-full p-2 overflow-y-auto">
    <section>
      <h2 class="font-bold text-2xl">{{ $t('common.titles.ticket_categories') }}</h2>
      <ClientOnly>
        <TableAdminTicketCategories />
      </ClientOnly>
    </section>
    <section>
      <h2 class="font-bold text-2xl">{{ $t('common.titles.tickets') }}</h2>
      <ClientOnly>
        <TableAdminTickets/>
      </ClientOnly>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'support'],
  title: 'pages.admin.title.tickets'

})
</script>
