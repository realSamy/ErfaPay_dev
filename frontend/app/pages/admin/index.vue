<script lang="ts" setup>
import type {UpdateGlobalSettingsPayload} from "~/types/payload";
import type {SocialLinkItem} from "~/types/settings";

definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.index',
  middleware: ['auth', 'admin']
})

const {t} = useI18n()

const {settings, fetchSettings} = useGlobalSettings()
await fetchSettings()
const {loading, updateSettings, updatedSettings} = useUpdateGlobalSettings()

const payload = ref(<UpdateGlobalSettingsPayload>{
  ...settings.value,
  is_available_now: undefined,
})

const {hasPermission} = usePermissions()

if (!hasPermission('manage_site_settings')) {
  await navigateTo(useLocalePath()('admin-services'))
}

const availabilityItems = ref([
  {label: t('common.states.enabled'), value: true},
  {label: t('common.states.disabled'), value: false},
])

const addSocialLink = () => {
  if (!payload.value.erfapay_social)
    payload.value.erfapay_social = []
  payload.value.erfapay_social.push(<SocialLinkItem>{link: 'https://'})
}
const handleDeleteField = (index: number) => {
  payload.value.erfapay_social?.splice(index, 1)
}
const handleSubmit = async () => {
  await updateSettings(payload.value)
  settings.value = updatedSettings.value
  payload.value = {
    ...settings.value,
    is_available_now: undefined,
  }
}
</script>

<template>
  <div class="space-y-12 max-h-full p-2 overflow-y-auto">
    <section v-if="settings" class="page-section">
      <h2 class="font-bold text-2xl">تنظیم ساعات قبول سفارشات</h2>
      <ClientOnly>
        <UForm @submit.prevent="handleSubmit">
          <div class="space-y-6">
            <div class="space-y-2">
              <div class="space-x-2">
                <span>ثبت سفارش در حال حاضر</span>
                <USelect
                    v-model="payload.global_availability"
                    :items="availabilityItems"
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
                          :items="availabilityItems"
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

              <p class="text-sm text-muted py-2">
                با توجه به تنظیمات، ثبت سفارش در حال حاضر
                <span class="font-bold">
                  {{ settings.is_available_now ? 'فعال' : 'غیرفعال' }}
                </span>
                میباشد.
              </p>
            </div>

            <div class="space-y-6 max-w-lg">
              <h2 class="font-bold text-2xl">تنظیمات عمومی سایت</h2>
              <UFormField :label="$t('common.erfapay.email')" size="xl">
                <UInput v-model="payload.erfapay_email" :placeholder="$t('common.erfapay.email')" class="w-full" dir="ltr"
                        type="email"/>
              </UFormField>

              <UFormField :label="$t('common.erfapay.address')" size="xl">
                <UTextarea v-model="payload.erfapay_address" :placeholder="$t('common.erfapay.address')" class="w-full"
                           dir="auto"/>
              </UFormField>

              <UFormField :label="$t('common.erfapay.phone')" size="xl">
                <UInput v-model="payload.erfapay_phone" :placeholder="$t('common.erfapay.phone')" class="w-full" dir="ltr"
                        type="phone"/>
              </UFormField>

              <UFormField v-if="payload.erfapay_phone2 || payload.erfapay_phone" :label="$t('common.erfapay.phone')"
                          size="xl">
                <UInput v-model="payload.erfapay_phone2" :placeholder="$t('common.erfapay.phone')" class="w-full"
                        dir="ltr" type="phone"/>
              </UFormField>

              <UFormField :label="$t('common.erfapay.social')" :ui="{container: 'space-x-2'}" size="xl">
                <UButton icon="material-symbols:add" size="xl" @click="addSocialLink"/>
                <template v-for="i in payload.erfapay_social?.keys()">
                  <ModalSocialLink
                      v-if="payload.erfapay_social?.[i]"
                      v-model="payload.erfapay_social[i]"
                      @delete="handleDeleteField(i)"
                  />
                </template>
              </UFormField>
            </div>


            <UButton :loading="loading" label="اعمال تغییرات" size="xl" type="submit"/>

          </div>
        </UForm>
      </ClientOnly>

    </section>
  </div>
</template>