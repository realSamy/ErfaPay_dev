<template>
  <div class="max-h-full p-2 overflow-y-auto">
    <FormAdminService
        :payload="servicePayload"
        :pending="pending"
        @submit="submit"
    />
  </div>
</template>

<script lang="ts" setup>
import type {ServiceFormPayload} from '~/types/payload'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
  title: 'pages.admin.title.orders_new',
})

const {create, pending} = useAdminCreateService()

const servicePayload = ref<ServiceFormPayload>({
  title_fa: '',
  title_en: '',
  description_fa: '',
  description_en: '',
  icon: '',
  banner: null as any,
  commission_type: 'percent',
  commission_percent: 0.12,
  commission_fixed: 0,
  min_amount: 10000,
  max_amount: 100000000,
  tax_rate: 0.05,
  user_pricing: true,
  is_active: true,
  required_fields: [],
  order: 0,
})

const submit = async (payload: ServiceFormPayload) => {
  const {data, error} = await create(payload)
  if (data.value) {
    useToast().add({title: 'سرویس با موفقیت ایجاد شد', color: 'success'})
    await navigateTo(useLocalePath()('admin-services'))
  } else {
    useToast().add({
      title: 'خطا در ایجاد سرویس',
      description: error.value?.data?.errors?.[0] || 'خطای ناشناخته',
      color: 'error',
    })
  }
}
</script>