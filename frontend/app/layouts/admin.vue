<template>
  <div class="flex flex-col grow min-h-screen min-w-screen">
    <UDashboardGroup>
      <LayoutAdminSidebar />

      <UDashboardPanel resizable>
        <template #header>
          <LayoutAdminHeader/>
        </template>

        <template #body>
          <DynamicBreadcrumb />
          <slot/>
        </template>
        <template #footer>
          <UNavigationMenu
              class="lg:hidden"
              :ui="{list: 'w-screen flex justify-around', content:'grow'}"
          :items="menuItems">
            <template #item="{item}">
              <div class="flex flex-col items-center">
                <UIcon :name="item.icon as string" size="30" />
                <span>{{item.label}}</span>
              </div>
            </template>
          </UNavigationMenu>
        </template>
      </UDashboardPanel>
    </UDashboardGroup>
  </div>
</template>
<style scoped>

</style>

<script lang="ts" setup>
import type {NavigationMenuItem, BreadcrumbItem} from "@nuxt/ui";
import DynamicBreadcrumb from "~/components/DynamicBreadcrumb.vue";

const {t} = useI18n()
const route = useRoute()
const localePath = useLocaleRoute()

const menuItems = computed<NavigationMenuItem[]>(() => [])
const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  // Skip if not an admin route
  if (!route.name.startsWith('admin')) {
    return []
  }

  // Split path, skip empty and 'admin'
  const segments = route.path.split('/').slice(2).filter(Boolean)

  const items: BreadcrumbItem[] = []

  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    // Add 'to' only if not the current (last) segment
    const item: BreadcrumbItem = { label }
    if (currentPath !== route.path) {
      item.to = localePath(route.name as string)
    }
    items.push(item)
  })

  return items
})

</script>