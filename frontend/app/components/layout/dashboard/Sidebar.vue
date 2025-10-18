<script lang="ts" setup>
import type {NavigationMenuItem} from '@nuxt/ui'

const {t} = useI18n()
const localePath = useLocaleRoute()

const menuItems = computed<NavigationMenuItem[]>(() => [
  {
    label: t('layout.sidebar.label_dashboard'),
    icon: 'material-symbols:dashboard-outline',
    to: localePath('dashboard')
  },
  {
    label: t('layout.sidebar.label_orders'),
    icon: 'material-symbols:receipt-outline',
    to: localePath('dashboard-orders')
  },
  {
    label: t('layout.sidebar.label_support'),
    icon: 'material-symbols:contact-support-outline',
    to: localePath('dashboard-support'),
    badge: '4'
  }
])

const menuLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t('common.labels.contact_us'),
    icon: 'mdi:phone'
  }
])
</script>

<template>
  <UDashboardSidebar :ui="{ footer: 'border-t border-default', root: 'bg-white dark:bg-primary/20' }" collapsible resizable mode="slideover" :menu="{side: directionalIcon('right', 'left')}">
    <template #header="{ collapsed }">
      <Logo v-if="!collapsed" class="h-5 w-auto shrink-0"/>
      <UIcon v-else class="size-5 text-primary mx-auto" name="i-simple-icons-nuxtdotjs"/>
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu
          :collapsed="collapsed"
          :items="menuItems"
          orientation="vertical"
      />

      <UNavigationMenu
          :collapsed="collapsed"
          :items="menuLinks"
          orientation="vertical"
          class="mt-auto"
      />


    </template>

    <template #footer="{ collapsed }">
      <UButton
          :avatar="{
          src: 'https://github.com/realSamy.png'
        }"
          :block="collapsed"
          :label="collapsed ? undefined : 'Benjamin'"
          class="w-full"
          color="neutral"
          variant="ghost"
      />
    </template>
  </UDashboardSidebar>
</template>

