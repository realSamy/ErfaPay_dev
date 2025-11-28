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
    <template #header="{ collapsed, collapse }">
      <div v-if="!collapsed" class="w-full flex justify-between">
        <AdminLogo class="h-5 w-auto shrink-0"/>
        <UDashboardSidebarCollapse />
      </div>
      <AdminLogo :collapsed="collapsed" @click="collapse(false)" v-else/>
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
      <div class="w-full flex justify-between">
        <UButton
            :avatar="{
          src: 'https://github.com/realSamy.png'
        }"
            :block="collapsed"
            :label="collapsed ? undefined : 'سامان هودجی'"
            class="w-full"
            color="neutral"
            variant="ghost"
        />
        <UButton v-if="!collapsed" color="neutral" icon="material-symbols:logout" variant="link"/>
      </div>
    </template>
  </UDashboardSidebar>
</template>

