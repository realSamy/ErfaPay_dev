<template>
  <ClientOnly>
    <UButton :to="$localePath('index')" class="font-extrabold text-2xl p-0" size="xl" variant="link">
      {{ $t('common.site_title') }}
    </UButton>
  </ClientOnly>
</template>
<script lang="ts" setup>
</script>