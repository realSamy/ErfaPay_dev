<template>
  <div>
    <div v-if="service" class="space-y-8">
      <section class="flex justify-between items-center">
        <h2 class="font-bold text-2xl">{{ service[`title_${locale}`] }}</h2>
        <UButton
            :label="$t('navigation.back_orders')"
            :to="useLocalePath()('dashboard-orders')"
            :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')"
            color="neutral"
            variant="link"
        />
      </section>

      <section class="max-w-2xl">
        <UForm @submit="submitOrder">
          <div class="space-y-6">
            <!-- Dynamic Required Fields -->
            <template v-for="(field, index) in orderPayload.custom_data" :key="index">
              <InputServiceField
                  v-if="orderPayload.custom_data?.[index]"
                  v-model="orderPayload.custom_data[index].value"
                  :field="field"
              />
            </template>

            <UFormField
                :description="$t('services.messages.order_attachments')"
                :label="$t('services.labels.order_attachments')"
                size="xl">
              <UFileUpload
                  v-model="orderPayload.attachments"
                  multiple
                  layout="list"
              />
            </UFormField>

            <!-- User Pricing Input -->
            <UFormField
                v-if="service.user_pricing"
                :description="$t('services.messages.order_price')"
                :label="$t('services.labels.order_price')"
                required
                size="xl"
            >
              <UFieldGroup class="w-full">
                <UInputNumber
                    v-model="orderPayload.user_amount_irt"
                    :decrement="false"
                    :increment="false"
                    :max="Number(service.max_amount)"
                    :min="Number(service.min_amount)"
                    :placeholder="$t('services.labels.order_price')"
                    class="w-full"
                    dir="ltr"
                    required
                />
                <UBadge :label="$t('common.currencies.text.toman')" color="neutral"/>
              </UFieldGroup>
            </UFormField>


            <!-- Calculated Breakdown -->
            <div class="rounded-lg border border-accented bg-ui-highlight p-6 space-y-4">
              <h3 class="font-semibold text-lg">{{ $t('orders.labels.payment_summary') }}</h3>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>{{ $t('orders.labels.base_amount') }}</span>
                  <span class="font-medium" dir="ltr">{{ formatIRT(userAmount) }}</span>
                </div>

                <div class="flex justify-between">
                  <span>{{ $t('orders.labels.commission') }} ({{ commissionShow }})</span>
                  <span class="font-medium" dir="ltr">{{ formatIRT(commissionAmount) }}</span>
                </div>

                <div class="flex justify-between">
                  <span>{{ $t('orders.labels.tax') }} ({{ taxShow }})</span>
                  <span class="font-medium" dir="ltr">{{ formatIRT(taxAmount) }}</span>
                </div>

                <USeparator/>

                <div class="flex justify-between text-base font-bold">
                  <span>{{ $t('orders.labels.total_payable') }}</span>
                  <span class="text-primary" dir="ltr">{{ formatIRT(totalPayable) }}</span>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end pt-4">
              <UButton
                  :disabled="loading || !isFormValid"
                  :loading="loading"
                  color="primary"
                  size="xl"
                  trailing-icon="material-symbols:credit-card"
                  type="submit"
              >
                {{ $t('orders.labels.pay_and_submit') }}
              </UButton>
            </div>
          </div>
        </UForm>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {Service} from '~/types/services'
import type {CreateOrderPayload} from '~/types/payload'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
})

const {t, locale, n} = useI18n()
const service_id = useRoute().params.id as string

const {createOrder, loading} = useCreateOrder()

const service = ref<Service>()
const orderPayload = ref<CreateOrderPayload>({
  service_id: Number(service_id),
  user_amount_irt: 0,
  custom_data: [],
  attachments: [],
})

const {data: response, error} = await useService(service_id)

if (response.value?.ok) {
  service.value = response.value.data

  // Initialize custom_data with value fields
  orderPayload.value.custom_data = service.value.required_fields.map(
      ({label_en, label_fa, description_en, description_fa, is_required, type, options}) => ({
        label_fa,
        label_en,
        description_fa,
        description_en,
        is_required,
        type,
        options,
        value: type === 'number' ? 0 : '',
      })
  )

  // Set default user_amount_irt if not user_pricing
  if (!service.value.user_pricing) {
    orderPayload.value.user_amount_irt = Number(service.value.min_amount)
  }
} else {
  throw createError({
    statusCode: 404,
    statusMessage: error.value?.message || 'Unknown error',
    data: {returnRoute: 'dashboard-orders'},
  })
}

// Computed values for payment calculation
const userAmount = computed(() => {
  return service.value?.user_pricing
      ? Number(orderPayload.value.user_amount_irt || 0)
      : Number(service.value?.min_amount || 0)
})

const commissionAmount = computed(() => {
  if (!service.value) return 0
  if (service.value.commission_type === 'percent') {
    return Math.round(userAmount.value * Number(service.value.commission_percent))
  }
  return Number(service.value.commission_fixed)
})

const commissionShow = computed(() => {
  if (!service.value) return ''
  if (service.value.commission_type === 'percent') {
    return n(Number(service.value.commission_percent), {
      style: 'percent'
    })
  } else {
    return n(Number(service.value.commission_fixed)) + ' ' + t('common.currencies.text.toman')
  }
})

const taxShow = computed(() => {
  if (!service.value) return ''
  return n(Number(service.value.tax_rate), {
    style: 'percent'
  })
})

const taxAmount = computed(() => {
  if (!service.value) return 0
  const subtotal = userAmount.value //+ commissionAmount.value
  return Math.round(subtotal * Number(service.value.tax_rate))
})

const totalPayable = computed(() => {
  return userAmount.value + commissionAmount.value + taxAmount.value
})

// Validation
const isFormValid = computed(() => {
  if (!service.value) return false

  // Check required custom fields
  const hasMissingRequired = orderPayload.value.custom_data?.some(field => {
    if (!field.is_required) return false
    return field.value === '' || field.value === undefined || field.value === null
  })

  if (hasMissingRequired) return false

  // Check user pricing amount within bounds
  if (service.value.user_pricing) {
    const amount = Number(orderPayload.value.user_amount_irt)
    return amount >= Number(service.value.min_amount) && amount <= Number(service.value.max_amount)
  }

  return true
})

// Formatting
const formatIRT = (amount: number): string => {
  return n(amount) + ' تومان'
}

const submitOrder = async () => {
  if (!isFormValid.value) return

  // Clean custom_data: only send fields with values or required
  const payload = {
    ...orderPayload.value,
    custom_data: orderPayload.value.custom_data?.map(({value, ...field}) => ({
      ...field,
      value,
    })),
  }

  const data = await createOrder(payload)

  if (data.ok) {
    useToast().add({
      title: t('orders.messages.order_created'),
      color: 'success',
    })
    await navigateTo(useLocalePath()('dashboard-orders'))
  } else {
    useToast().add({
      title: t('common.titles.error'),
      description: data.errors?.[0] || t('common.errors.unknown'),
      color: 'error',
    })
  }
}
</script>