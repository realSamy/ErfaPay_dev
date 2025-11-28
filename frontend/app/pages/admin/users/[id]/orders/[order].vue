<template>
  <div class="space-y-12">
    <section class="flex flex-col xl:flex-row justify-between gap-12">
      <!-- User Information Column -->
      <div class="column">
        <div class="has-hr">
          <h2 class="title">کاربر سفارش دهنده:</h2>
          <div class="tr-value">
            <span class="font-bold">{{ user.first_name }} {{ user.last_name }}</span>
            <UIcon :name="`cif:${user.country_code.toLowerCase()}`" class="rounded-md" size="20"/>
          </div>
        </div>

        <div>
          <h2 class="title">مشخصات کاربری:</h2>
          <div class="tr">
            <span class="tr-title">ایمیل:</span>
            <span class="tr-value">{{ user.email }}</span>
          </div>
          <div class="tr">
            <span class="tr-title">وضعیت تأیید:</span>
            <span class="tr-value">
              <UBadge :color="user.is_verified ? 'success' : 'error'" variant="subtle">
                {{ user.is_verified ? 'تأیید شده' : 'تأیید نشده' }}
              </UBadge>
            </span>
          </div>
          <div class="tr">
            <span class="tr-title">وضعیت حساب:</span>
            <span class="tr-value">
              <UBadge :color="user.blocked ? 'error' : 'success'" variant="subtle">
                {{ user.blocked ? 'مسدود شده' : 'فعال' }}
              </UBadge>
            </span>
          </div>
        </div>
      </div>

      <!-- Order General Info Column -->
      <div class="column">
        <h2 class="title">مشخصات کلی سفارش:</h2>
        <div>
          <div class="tr has-hr">
            <span class="tr-title">شماره سفارش:</span>
            <span class="tr-value">
              {{ $n(order.orderNumber, {useGrouping: false}) }}
            </span>
          </div>
          <div class="tr has-hr">
            <span class="tr-title">نوع درخواست:</span>
            <span class="tr-value">
              {{ order.type.title[locale.toLowerCase()] }}
            </span>
          </div>
          <div class="tr has-hr">
            <span class="tr-title">مبلغ سفارش:</span>
            <span class="tr-value">
              {{ $n(order.amount_irr) }} ریال
            </span>
          </div>
          <div class="tr has-hr">
            <span class="tr-title">مالیات:</span>
            <span class="tr-value">
              {{ order.tax_amount ? $n(order.tax_amount) + ' ریال' : '—' }}
            </span>
          </div>
          <div class="tr has-hr">
            <span class="tr-title">تاریخ ثبت:</span>
            <span class="tr-value">
              {{ formatJalaliDate(order.created_at) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Order Status Column -->
      <div class="column">
        <h2 class="title">وضعیت سفارش:</h2>
        <div>
          <div class="tr has-hr">
            <span class="tr-title">اپراتور:</span>
            <span class="tr-value">
              {{
                order.processed_by ? `${(order.processed_by as User).first_name} ${(order.processed_by as User).last_name}` : '—'
              }}
            </span>
          </div>
          <div class="tr has-hr">
            <span class="tr-title">آخرین وضعیت:</span>
            <div class="tr-value">
              <UBadge :color="statusBadge.color" class="capitalize">
                {{ statusBadge.label }}
              </UBadge>
              <UModal v-model="openStatusModal">
                <UButton
                    class="mr-2"
                    icon="material-symbols:edit-square-outline"
                    size="xs"
                    variant="link"
                    @click="openStatusModal = true"
                />
                <template #body>
                  <div class="p-6">تغییر وضعیت سفارش (در آینده پیاده‌سازی می‌شود)</div>
                </template>
              </UModal>

            </div>
          </div>
          <div class="tr has-hr">
            <span class="tr-title">تاریخ بروزرسانی:</span>
            <span class="tr-value">
              {{ order.updated_at ? formatJalaliDate(order.updated_at) : '—' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-2">
      <h2 class="title">توضیحات:</h2>
      <div class="w-full h-30 bg-ui-highlight p-4">
        <p class="text-sm">توضیحات کاربر</p>
      </div>
      <div class="inline-flex gap-2">
        <UButton icon="material-symbols:attachment" variant="soft" label="فایل ضمیمه 1" />
        <UButton icon="material-symbols:attachment" variant="soft" label="فایل ضمیمه 2" />
      </div>
    </section>

  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.orders_id',
})

// Demo data — in real app this comes from API
const {locale} = useI18n()

const user = ref<User>({
  id: 42,
  email: 'niyako@example.com',
  first_name: 'نیاکو',
  last_name: 'منوچهری',
  role: 'regular',
  is_verified: true,
  blocked: false,
  country_code: 'DE',
})

const order = ref<Order>({
  id: 187,
  user: user.value,
  orderNumber: 1000333,
  amount_irr: 2850000,
  tax_amount: 256500,
  status: 'done',
  type: {
    title: {fa: 'پرداخت قبض', en: 'Electricity Bill Payment'},
    description: {fa: 'پرداخت قبوض خدماتی', en: 'Utility bill payment'},
  },
  created_at: '2025-02-11T14:30:00Z',
  updated_at: '2025-02-12T09:15:00Z',
  processed_by: {
    id: 5,
    first_name: 'علی',
    last_name: 'رضایی',
    email: 'ali.support@erfapay.ir',
    role: 'senior_support',
    is_verified: true,
    blocked: false,
    country_code: 'IR',
  } as User,
})

// Helpers
const formatJalaliDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const statusBadge = computed(() => {
  const map = {
    pending: {label: 'در انتظار', color: 'neutral' as const},
    processing: {label: 'در حال انجام', color: 'info' as const},
    done: {label: 'انجام شده', color: 'success' as const},
    rejected: {label: 'رد شده', color: 'error' as const},
  }
  return map[order.value.status]
})

const openStatusModal = ref(false)
</script>

<style scoped>
@reference "@/assets/css/main.css";

.title {
  @apply text-lg font-bold text-primary mb-3;
}

.column {
  @apply flex-1 space-y-6 min-w-0;
}

.tr {
  @apply grid grid-cols-2 py-2;
}

.tr-title {
  @apply text-gray-600 dark:text-gray-400;
}

.tr-value {
  @apply font-medium text-gray-900 dark:text-white flex items-center gap-2 justify-end xl:justify-start;
}

.has-hr {
  @apply border-b border-gray-300 dark:border-gray-700 pb-3;
}
</style>