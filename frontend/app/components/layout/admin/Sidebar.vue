<script lang="ts" setup>
import type {NavigationMenuItem} from '@nuxt/ui'

const {t} = useI18n()
const localePath = useLocaleRoute()
const route = useRoute()

const menuItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'مدیریت مالی و گزارشات',
    icon: 'material-symbols:finance-mode',
    to: localePath('admin-financial')
  },
  {
    label: 'مدیریت سفارشات',
    icon: 'material-symbols:receipt-outline',
    to: localePath('admin-services'),
    active: route.name.startsWith('admin-services'),
    children: [
      {
        label: 'سرویس جدید',
        to: localePath('admin-services-new')
      }
    ]
  },
  {
    label: 'مدیریت کاربران',
    icon: 'material-symbols:dashboard-outline',
    to: localePath('admin-users'),
    active: route.name.startsWith('admin-users'),
    children: [
      {
        label: 'کاربر جدید',
        to: localePath('admin-users-new')
      }
    ]
  },
  {
    label: 'مدیریت تیم پشتیبانی',
    icon: 'material-symbols:contact-support-outline',
    to: localePath('admin-agents'),
    active: route.name.startsWith('admin-agents'),
    children: [
      {
        label: 'پشتیبان جدید',
        to: localePath('admin-agents-new')
      }
    ]
  },
  {
    label: 'ارتباطات',
    icon: 'material-symbols:campaign-outline',
    to: localePath('admin-support'),
  },

])

const menuLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t('common.labels.contact_us'),
    icon: 'mdi:phone'
  }
])
</script>

<template>
  <UDashboardSidebar :menu="{side: directionalIcon('right', 'left')}"
                     :ui="{ footer: 'border-t border-default', root: 'bg-white dark:bg-primary/20' }"
                     collapsible mode="slideover" resizable>
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
          class="mt-auto"
          orientation="vertical"
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

