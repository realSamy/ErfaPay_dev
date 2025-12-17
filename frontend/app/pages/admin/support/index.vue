<template>
  <div class="space-y-10">
    <section class="space-y-4">
      <h2 class="font-bold text-2xl">ارسال ایمیل همگانی</h2>
      <TiptapEditor v-model="mailContent"/>
      <UButton
          :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')"
          label="ارسال"
          size="xl"/>
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
  title: 'pages.admin.title.support'

})

const mailContent = ref('')
</script>

<style scoped>
</style>