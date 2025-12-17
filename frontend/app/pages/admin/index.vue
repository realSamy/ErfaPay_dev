<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.index',
  middleware: ['auth', 'admin']
})

const localePath = useLocalePath()
</script>

<template><div></div></template>