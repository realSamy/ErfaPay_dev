<script lang="ts" setup>
import type {NavigationMenuItem} from '@nuxt/ui'

const {t} = useI18n()
const localePath = useLocaleRoute()
const {user, logout} = useAuth()
const route = useRoute()

const menuItems = computed<NavigationMenuItem[]>(() => [
  {
    label: t('layout.sidebar.label_dashboard'),
    icon: 'material-symbols:dashboard-outline',
    to: localePath('dashboard'),
  },
  {
    label: t('layout.sidebar.label_orders'),
    icon: 'material-symbols:receipt-outline',
    to: localePath('dashboard-orders'),
    active: route.name?.toString().startsWith('dashboard-orders'),
  },
  {
    label: t('layout.sidebar.label_support'),
    icon: 'material-symbols:contact-support-outline',
    to: localePath('dashboard-support'),
    active: route.name?.toString().startsWith('dashboard-support'),
    children: [
      {
        label: t('pages.tickets.titles.new_ticket'),
        to: localePath('dashboard-support-new')
      }
    ],
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

