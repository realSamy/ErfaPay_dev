<template>
  <div class="flex flex-col grow min-h-screen min-w-screen">
    <UDashboardGroup>
      <LayoutDashboardSidebar/>

      <UDashboardPanel resizable>
        <template #header>
          <LayoutDashboardHeader/>
        </template>

        <template #body>
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
import type {NavigationMenuItem} from "@nuxt/ui";

const {t} = useI18n()
const localePath = useLocaleRoute()
const route = useRoute()

const menuItems = computed<NavigationMenuItem[]>(() => [
  {
    label: t('layout.sidebar.label_dashboard'),
    icon: 'material-symbols:dashboard-outline',
    to: localePath('dashboard')
  },
  {
    label: t('layout.sidebar.label_orders'),
    icon: 'material-symbols:receipt-outline',
    active: route.name?.toString().startsWith('dashboard-orders'),
    to: localePath('dashboard-orders')
  },
  {
    label: t('layout.sidebar.label_support'),
    icon: 'material-symbols:contact-support-outline',
    active: route.name?.toString().startsWith('dashboard-support'),
    to: localePath('dashboard-support'),
    badge: '4'
  }
])
</script>