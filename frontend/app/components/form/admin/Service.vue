<template>
  <section class="page-section">
    <h2 class="font-bold text-2xl mb-8">
      {{ isEdit ? 'ویرایش سرویس' : 'ایجاد سرویس جدید' }}
    </h2>

    <UForm :state="localPayload" class="max-w-4xl space-y-8" @submit.prevent="handleSubmit">
      <!-- Bilingual Title -->
      <UFormField label="عنوان سرویس" required>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UInput
              v-model="localPayload.title_fa"
              dir="rtl"
              icon="i-heroicons-language"
              placeholder="عنوان به فارسی (مثلاً: پرداخت قبض)"
              required
              size="xl"
          />
          <UInput
              v-model="localPayload.title_en"
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
              v-model="localPayload.description_fa"
              :rows="5"
              dir="rtl"
              placeholder="توضیحات کامل به فارسی..."
              required
          />
          <UTextarea
              v-model="localPayload.description_en"
              :rows="5"
              dir="ltr"
              placeholder="Description in English (optional)"
          />
        </div>
      </UFormField>

      <!-- Commission & Tax -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UFormField label="نوع کارمزد" required>
          <USelect v-model="localPayload.commission_type" :items="commissionTypes" size="lg"/>
        </UFormField>

        <UFormField
            :label="localPayload.commission_type === 'percent' ? 'درصد کارمزد (%)' : 'کارمزد ثابت (تومان)'"
            required
        >
          <UInputNumber
              v-model="commissionValue"
              :format-options="localPayload.commission_type === 'percent' ? { style: 'percent', minimumFractionDigits: 2 } : undefined"
              :max="localPayload.commission_type === 'percent' ? 1 : undefined"
              :min="0"
              :step="localPayload.commission_type === 'percent' ? 0.0001 : 1000"
              required
              size="xl"
          />
        </UFormField>

        <UFormField label="مالیات (%)" required>
          <UInputNumber
              v-model="localPayload.tax_rate"
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
          <UInputNumber v-model="localPayload.min_amount" :min="1000" :step="10000" size="xl"/>
        </UFormField>
        <UFormField label="حداکثر مبلغ (تومان)" required>
          <UInputNumber v-model="localPayload.max_amount" :min="100000" :step="10000" size="xl"/>
        </UFormField>
      </div>

      <!-- Files -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField label="نماد سرویس" required>
          <PickerIcon
              v-model="localPayload.icon"
              :max-size="5 * 1024 * 1024"
              accept="image/*"
              description="حداکثر ۵ مگابایت"
              size="xl"
          />
        </UFormField>

        <UFormField label="تصویر بنر" required>
          <div class="flex gap-4 items-start w-full">
            <UFileUpload
                v-model="localPayload.banner"
                :max-size="10 * 1024 * 1024"
                accept="image/*"
                class="flex-1"
                description="حداکثر ۱۰ مگابایت"
                size="xl"
            />
            <img
                v-if="!localPayload.banner && existingBanner"
                :src="existingBanner"
                alt="Current banner"
                class="w-32 h-32 object-cover rounded-lg border"
            />
          </div>
        </UFormField>
      </div>

      <!-- Required Fields -->
      <div class="space-y-4">
        <UFormField :label="$t('common.titles.required_fields')">
          <UButton
              :label="$t('common.labels.add')"
              size="xl"
              trailing-icon="material-symbols:add"
              @click="addNewField"
          />
        </UFormField>

        <div class="inline-flex gap-2 flex-wrap">
          <UCheckbox
              v-model="localPayload.user_pricing"
              :description="$t('services.messages.user_pricing')"
              :disabled="localPayload.commission_type === 'percent'"
              :label="$t('common.labels.user_pricing')"
              size="lg"
              variant="card"
          >
            <template #description="{ description }">
              <div>
                <p>{{ description }}</p>
                <p v-if="localPayload.commission_type === 'percent'">
                  {{ $t('services.messages.user_pricing_forced') }}
                </p>
              </div>
            </template>
          </UCheckbox>

          <template v-for="(field, index) in localPayload.required_fields">
            <ModalRequiredField
                v-if="localPayload.required_fields?.[index]"
                v-model="localPayload.required_fields[index]"
                @delete="handleDeleteField(index)"
            />
          </template>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-start pt-6">
        <UButton
            :disabled="pending"
            :label="isEdit ? $t('pages.admin.labels.services.button_save') : 'ایجاد سرویس جدید'"
            :loading="pending"
            color="primary"
            size="xl"
            trailing-icon="material-symbols:save"
            type="submit"
        />
      </div>
    </UForm>
  </section>
</template>

<script lang="ts" setup>
import type {ServiceFormPayload} from '~/types/payload'
import type {RequiredField, Service} from '~/types/services'

const props = defineProps<{
  payload: ServiceFormPayload
  existingService?: Service | null   // Only provided in edit mode
  pending?: boolean
  isEdit?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: ServiceFormPayload): void
}>()

const localPayload = ref<ServiceFormPayload>(JSON.parse(JSON.stringify(toRaw(props.payload))))
const existingBanner = computed(() => props.existingService?.banner || null)

const commissionTypes = [
  {label: 'درصدی', value: 'percent'},
  {label: 'مقداری ثابت', value: 'fixed'},
]

const commissionValue = computed<number>({
  get() {
    return localPayload.value.commission_type === 'percent'
        ? Number(localPayload.value.commission_percent)
        : Number(localPayload.value.commission_fixed)
  },
  set(val) {
    if (localPayload.value.commission_type === 'percent') {
      localPayload.value.commission_percent = val.toFixed(2)
    } else {
      localPayload.value.commission_fixed = val
    }
  },
})

watch(() => localPayload.value.commission_type, (newVal) => {
  if (newVal === 'percent') {
    localPayload.value.user_pricing = true
  }
})

const addNewField = () => {
  localPayload.value.required_fields ??= []
  localPayload.value.required_fields.push({
    type: 'text',
    label_fa: '',
    label_en: '',
    description_fa: '',
    description_en: '',
    is_required: true,
    options: [],
  } as RequiredField)
}

const handleDeleteField = (index: number) => {
  localPayload.value.required_fields?.splice(index, 1)
}

const handleSubmit = () => {
  emit('submit', localPayload.value)
}
</script>