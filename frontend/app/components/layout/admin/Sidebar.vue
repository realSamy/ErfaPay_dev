<script lang="ts" setup>
import type {NavigationMenuItem} from '@nuxt/ui'

const {t} = useI18n()
const localePath = useLocaleRoute()
const route = useRoute()
const {user, logout} = useAuth()

const menuItems = computed<NavigationMenuItem[]>(() => [
  {
    label: t('common.layouts.sidebars.admin.labels.finance'),
    icon: 'material-symbols:finance-mode',
    to: localePath('admin-financial')
  },
  {
    label: t('common.layouts.sidebars.admin.labels.services'),
    icon: 'material-symbols:receipt-outline',
    to: localePath('admin-services'),
    active: route.name?.toString().startsWith('admin-services'),
    children: [
      {
        label: t('common.layouts.sidebars.admin.labels.services_new'),
        to: localePath('admin-services-new')
      }
    ]
  },
  {
    label: t('common.layouts.sidebars.admin.labels.users'),
    icon: 'material-symbols:dashboard-outline',
    to: localePath('admin-users'),
    active: route.name?.toString().startsWith('admin-users'),
    children: [
      {
        label: t('common.layouts.sidebars.admin.labels.users_new'),
        to: localePath('admin-users-new')
      }
    ]
  },
  {
    label: t('common.layouts.sidebars.admin.labels.agents'),
    icon: 'material-symbols:contact-support-outline',
    to: localePath('admin-agents'),
    active: route.name?.toString().startsWith('admin-agents'),
    children: [
      {
        label: t('common.layouts.sidebars.admin.labels.agents_new'),
        to: localePath('admin-agents-new')
      }
    ]
  },
  {
    label: t('common.layouts.sidebars.admin.labels.support'),
    icon: 'material-symbols:campaign-outline',
    to: localePath('admin-support'),
    children: [
      {
        label: t('layout.sidebar.label_tickets'),
        to: localePath('admin-support-tickets')
      }
    ]
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
        <UDashboardSidebarCollapse/>
      </div>
      <AdminLogo v-else :collapsed="collapsed" @click="collapse(false)"/>
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu
          :collapsed="collapsed"
          :items="menuItems"
          orientation="vertical"
      />

      <UNavigationMenu
          v-if="false"
          :collapsed="collapsed"
          :items="menuLinks"
          class="mt-auto"
          orientation="vertical"
      />


    </template>

    <template #footer="{ collapsed }">
      <ClientOnly>
        <div class="w-full flex justify-between">
          <UButton
              :block="collapsed"
              :label="collapsed ? undefined : user?.full_name"
              class="w-full"
              color="neutral"
              icon="material-symbols:person"
              variant="ghost"
          />
          <UButton v-if="!collapsed" :title="$t('common.labels.logout')" color="neutral" icon="material-symbols:logout"
                   variant="link" @click="() => logout(true, $t)"/>
        </div>
      </ClientOnly>
    </template>
  </UDashboardSidebar>
</template>

