<template>
  <UBreadcrumb :items="breadcrumbItems" :separator-icon="directionalIcon('material-symbols:chevron-left-rounded', 'material-symbols:chevron-right-rounded')"/>
</template>

<script lang="ts" setup>
import {useRoute, useLocalePath, useI18n, useBreadcrumbStore} from '#imports'
import type {BreadcrumbItem} from '@nuxt/ui'

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const {t} = useI18n()
const breadcrumbState = useBreadcrumbStore()


function normalizeName(name: string) {
  return name.replace(/___[a-z]{2}$/, '') // remove locale suffix
}

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const name = route.name as string
  if (!name) return []

  const baseName = normalizeName(name)

  const parts = baseName.split('-')

  const items: BreadcrumbItem[] = []
  let current = ''

  parts.forEach((p, index) => {
    current = index === 0 ? p : `${current}-${p}`

    const staticRoute = router.getRoutes()
      .find(r => normalizeName(r.name as string) === current)
    if (!staticRoute) return

    // ✅ dynamic match from the current active route
    const activeMatch = route.matched
      .find(r => normalizeName(r.name as string) === current)

    const metaTitle = activeMatch?.meta?.title || staticRoute.meta?.title
    if (!metaTitle) return

    const label = t(metaTitle as string, breadcrumbState.value as Record<string, unknown>)
    const isLast = index === parts.length - 1
    items.push({ label, ...(isLast ? {} : {to: localePath(normalizeName(staticRoute?.name as string))}) })
  })

  return items
})
</script>
