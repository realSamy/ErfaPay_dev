<template>
  <FormAdminService
    v-if="service"
    :payload="servicePayload"
    :existing-service="service"
    :pending="pending"
    :is-edit="true"
    @submit="submit"
  />
</template>

<script setup lang="ts">
import type { ServiceFormPayload } from '~/types/payload'
import type { Service } from '~/types/services'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
  title: 'pages.admin.title.services_edit',
})

const route = useRoute()
const serviceId = route.params.id as string
const pending = ref(false)

const { data: response } = await useAdminServiceDetail(serviceId)
const service = ref<Service | null>(null)
const servicePayload = ref<ServiceFormPayload>({} as any)

if (response.value?.ok) {
  service.value = response.value.data
  servicePayload.value = {
    ...service.value,
    commission_fixed: Number(service.value.commission_fixed),
    commission_percent: Number(service.value.commission_percent),
    min_amount: Number(service.value.min_amount),
    max_amount: Number(service.value.max_amount),
    tax_rate: Number(service.value.tax_rate),
    banner: undefined,
    required_fields: service.value.required_fields || [],
  }
}

const { update } = useAdminUpdateService(serviceId)

const submit = async (payload: ServiceFormPayload) => {
  pending.value = true
  const { data, error } = await update(payload)
  if (data.value) {
    useToast().add({ title: 'تغییرات سرویس با موفقیت ثبت شد', color: 'success' })
    await navigateTo(useLocalePath()('admin-services'))
  } else {
    useToast().add({
      title: 'خطا در ثبت تغییرات سرویس',
      description: error.value?.data?.errors?.[0] || 'خطای ناشناخته',
      color: 'error',
    })
  }
  pending.value = false
}
</script>