<template>
  <UBreadcrumb :items="breadcrumbItems"/>
</template>
<script lang="ts" setup>
import type {NavigationMenuItem, BreadcrumbItem} from "@nuxt/ui";

const route = useRoute()
const localePath = useLocaleRoute()

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  if (!(route.name as string).startsWith('admin')) {
    return []
  }

  const segments = route.path.split('/').slice(2).filter(Boolean)

  const items: BreadcrumbItem[] = []

  segments.forEach((segment, index) => {
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    // Add 'to' only if not the current (last) segment
    const item: BreadcrumbItem = {label}
    item.to = localePath(route.name as string)
    items.push(item)
  })

  return items
})
</script>