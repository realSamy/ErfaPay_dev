<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.index'
})
const localePath = useLocalePath()
navigateTo(localePath('admin-financial'))
</script>

<template><div></div></template>