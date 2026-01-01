<template>
  <div class="flex flex-col grow min-h-screen min-w-screen">
    <UDashboardGroup>
      <LayoutAdminSidebar />

      <UDashboardPanel resizable>
        <template #header>
          <LayoutAdminHeader/>
        </template>

        <template #body>
          <ClientOnly>
            <DynamicBreadcrumb />
            <slot/>
          </ClientOnly>
        </template>
        <template #footer>
          <UNavigationMenu
              class="lg:hidden"
              :ui="{list: 'w-screen flex justify-around', content:'grow'}"
          :items="menuItems">
            <template #item="{item}">
              <div class="flex flex-col items-center text-center">
                <UIcon :name="item.icon as string" size="30" />
                <span class="text-sm">{{item.label}}</span>
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
  {
    label: t('common.layouts.sidebars.admin.labels.online_chat'),
    icon: 'material-symbols:chat',
    to: localePath('admin-chat'),
  },
])


</script>