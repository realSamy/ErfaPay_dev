<template>
  <UButton class="font-extrabold text-2xl" size="xl" variant="link" :label="collapsed ? 'E' : $t('common.site_title')" />
</template>

<script setup lang="ts">
defineProps<{
  collapsed?: boolean;
}>()
</script>