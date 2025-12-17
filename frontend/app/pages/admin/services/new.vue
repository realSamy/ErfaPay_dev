<template>
  <section class="page-section">
    <h2 class="font-bold text-2xl mb-8">ایجاد سرویس جدید</h2>

    <UForm :state="servicePayload" class="max-w-4xl space-y-8" @submit.prevent="submit">
            <!-- Bilingual Title -->
      <UFormField label="عنوان سرویس" required>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UInput
              v-model="servicePayload.title_fa"
              dir="rtl"
              icon="i-heroicons-language"
              placeholder="عنوان به فارسی (مثلاً: پرداخت قبض)"
              required
              size="xl"
          />
          <UInput
              v-model="servicePayload.title_en"
              dir="ltr"
              placeholder="Title in English (optional)"
              size="xl"
          />
        </div>
      </UFormField>

      <!-- Bilingual Description -->
      <UFormField label="توضیحات سرویس" required>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UTextarea
              v-model="servicePayload.description_fa"
              :rows="5"
              dir="rtl"
              placeholder="توضیحات کامل به فارسی..."
              required
          />
          <UTextarea
              v-model="servicePayload.description_en"
              :rows="5"
              dir="ltr"
              placeholder="Description in English (optional)"
          />
        </div>
      </UFormField>

      <!-- Commission Type & Values -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UFormField label="نوع کارمزد" required>
          <USelect
              v-model="servicePayload.commission_type"
              :items="commissionTypes"
              size="lg"
          />
        </UFormField>

        <UFormField
            :label="servicePayload.commission_type === 'percent' ? 'درصد کارمزد (%)' : 'کارمزد ثابت (تومان)'"
            required
        >
          <UInputNumber
              v-model="commissionValue"
              :format-options="servicePayload.commission_type === 'percent' ? { style: 'percent', minimumFractionDigits: 2 } : undefined"
              :max="servicePayload.commission_type === 'percent' ? 1 : undefined"
              :min="0"
              :step="servicePayload.commission_type === 'percent' ? 0.01 : 1000"
              required
              size="xl"
          />
        </UFormField>

        <UFormField label="مالیات (%)" required>
          <UInputNumber
              v-model="servicePayload.tax_rate"
              :format-options="{ style: 'percent', minimumFractionDigits: 2 }"
              :max="1"
              :min="0"
              :step="0.01"
              size="xl"
          />
        </UFormField>
      </div>

      <!-- Amount Limits -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField label="حداقل مبلغ (تومان)" required>
          <UInputNumber v-model="servicePayload.min_amount" :step="10000" :min="1000" class="w-full" size="xl"/>
        </UFormField>
        <UFormField label="حداکثر مبلغ (تومان)" required>
          <UInputNumber v-model="servicePayload.max_amount" :step="10000" :min="100000" class="w-full" size="xl"/>
        </UFormField>
      </div>

      <!-- Delivery Time -->
      <!--      <UFormField label="زمان تحویل تقریبی">-->
      <!--        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">-->
      <!--          <UInput-->
      <!--              v-model="servicePayload.delivery_time_fa"-->
      <!--              dir="rtl"-->
      <!--              placeholder="مثلاً: ۱ تا ۳ ساعت"-->
      <!--          />-->
      <!--          <UInput-->
      <!--              v-model="servicePayload.delivery_time_en"-->
      <!--              dir="ltr"-->
      <!--              placeholder="e.g. 1-3 hours"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </UFormField>-->

      <!-- Files -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField label="نماد سرویس" required class="w-full">
          <PickerIcon
              class="w-full"
              v-model="servicePayload.icon"
              :max-size="5 * 1024 * 1024"
              accept="image/*"
              description="حداکثر ۵ مگابایت"
              size="xl"
          />
        </UFormField>

        <UFormField label="تصویر بنر" required>
          <UFileUpload
              v-model="servicePayload.banner"
              :max-size="10 * 1024 * 1024"
              accept="image/*"
              description="حداکثر ۱۰ مگابایت"
              size="xl"
          />
        </UFormField>
      </div>

      <!-- Submit -->
      <div class="flex justify-end pt-6">
        <UButton
            :disabled="pending"
            :loading="pending"
            color="primary"
            size="xl"
            type="submit"
        >
          ایجاد سرویس جدید
        </UButton>
      </div>
    </UForm>
  </section>
</template>

<script lang="ts" setup>

import type {ServiceFormPayload} from "~/types/payload";

definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.orders_new',
  middleware: ['auth', 'admin'],
})

const {create, pending} = useAdminCreateService()

const servicePayload = ref<ServiceFormPayload>({
  title_fa: '',
  title_en: '',
  description_fa: '',
  description_en: '',
  icon: '',
  banner: null as unknown as File,

  commission_type: 'percent',
  commission_percent: 0.12,
  commission_fixed: 0,
  min_amount: 10000,
  max_amount: 100000000,
  tax_rate: 0.05,

  is_active: true,

  order: 0,
} satisfies ServiceFormPayload)

// Sync commission value
const commissionValue = computed<number>({
  get() {
    return servicePayload.value.commission_type === 'percent'
        ? Number(servicePayload.value.commission_percent)
        : Number(servicePayload.value.commission_fixed)
  },
  set(val) {
    if (servicePayload.value.commission_type === 'percent') {
      servicePayload.value.commission_percent = val.toFixed(2)
    } else {
      servicePayload.value.commission_fixed = val
    }
  },
})

const commissionTypes = [
  {label: 'درصدی', value: 'percent'},
  {label: 'مقداری ثابت', value: 'fixed'},
]

const submit = async () => {
  const {data, error} = await create(servicePayload.value)

  if (data.value) {
    useToast().add({title: 'سرویس با موفقیت ایجاد شد', color: 'success'})
    await navigateTo(useLocalePath()('admin-services'))
  } else {
    useToast().add({
      title: 'خطا در ایجاد سرویس',
      description: error.value?.data?.errors?.[0] || 'خطای ناشناخته',
      color: 'error'
    })
  }
}
</script>