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

</script>