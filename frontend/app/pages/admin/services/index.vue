<template>
  <div class="space-y-12">
    <section v-if="settings" class="page-section">
      <h2 class="font-bold text-2xl">تنظیم ساعات قبول سفارشات</h2>
      <ClientOnly>
        <UForm @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <div class="space-x-2">
              <span>ثبت سفارش در حال حاضر</span>
              <USelect
                  v-model="payload.global_availability"
                  :items="a"
                  value-key="value"/>
              <span>میباشد</span>
            </div>
            <UCollapsible :open="payload.global_availability">
              <template #content>
                <div class="space-x-2">
                  <div class="space-x-2">
                    <span>زمان بندی سفارش در حال حاضر</span>
                    <USelect
                        v-model="payload.enable_schedule"
                        :items="a"
                        value-key="value"/>
                    <span>میباشد</span>
                  </div>
                  <UCollapsible :open="payload.enable_schedule">
                    <template #content>
                      <div class="space-x-2">
                        <span>ساعات ثبت سفارش در حال حاضر از ساعت</span>
                        <InputTime v-model="payload.time_from"/>
                        <span>الی</span>
                        <InputTime v-model="payload.time_to"/>
                        <span>در روز های</span>
                        <PickerWeekDay v-model="payload.weekday_from"/>
                        <span>تا</span>
                        <PickerWeekDay v-model="payload.weekday_to"/>
                        <span>میباشد</span>
                      </div>
                    </template>
                  </UCollapsible>
                </div>
              </template>
            </UCollapsible>
            <UButton :loading="loading" label="اعمال تغییرات" size="xl" type="submit"/>
          </div>
        </UForm>
      </ClientOnly>
      <span class="text-sm text-muted">با توجه به تنظیمات، ثبت سفارش در حال حاضر {{
          settings.is_available_now ? 'فعال' : 'غیرفعال'
        }} میباشد.</span>
    </section>
    <section class="page-section">
      <div class="flex justify-between pe-6 py-2">
        <h2 class="font-bold text-2xl">لیست خدمات</h2>
        <UButton :label="$t('pages.admin.labels.services.button_new_service')"
                 :to="useLocalePath()({name: 'admin-services-new'})" size="xl"
                 trailing-icon="material-symbols:add"/>
      </div>
      <ClientOnly>
        <TableAdminServices/>
      </ClientOnly>
    </section>

    <section class="page-section">
      <h2 class="font-bold text-2xl">لیست سفارشات</h2>
      <ClientOnly>
        <TableAdminOrders/>
      </ClientOnly>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type {UpdateGlobalSettingsPayload} from "~/types/payload";

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
  title: 'pages.admin.title.orders'

})
const {t} = useI18n()

const {settings, fetchSettings} = useGlobalSettings()
await fetchSettings()
const {loading, updateSettings, updatedSettings} = useUpdateGlobalSettings()

const payload = ref(<UpdateGlobalSettingsPayload>{
  ...settings.value,
  is_available_now: undefined,
})

const a = ref([
  {label: t('common.states.enabled'), value: true},
  {label: t('common.states.disabled'), value: false},
])

const handleSubmit = async () => {
  await updateSettings(payload.value)
  settings.value = updatedSettings.value
  payload.value = {
    ...settings.value,
    is_available_now: undefined,
  }
}

</script>