<template>
  <div v-if="order" class="space-y-12">
    <section class="flex flex-col xl:flex-row justify-between gap-12">
      <!-- User Information Column -->
      <div class="column">
        <div class="has-hr">
          <h2 class="title">کاربر سفارش دهنده:</h2>
          <div class="tr-value">
            <span class="font-bold">{{ order.user.full_name }}</span>
            <UIcon :name="userFlag" class="rounded-md" size="20"/>
          </div>
        </div>

        <div>
          <h2 class="title">مشخصات کاربری:</h2>
          <div class="tr">
            <span class="tr-title">ایمیل:</span>
            <span class="tr-value">{{ order.user.email }}</span>
          </div>
          <div class="tr">
            <span class="tr-title">وضعیت حساب:</span>
            <span class="tr-value">
              <UBadge :color="order.user.is_blocked ? 'error' : 'success'" variant="subtle">
                {{ order.user.is_blocked ? 'مسدود شده' : 'فعال' }}
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
              {{ $n(Number(order.id), {useGrouping: false}) }}
            </span>
          </div>
          <div class="tr has-hr">
            <span class="tr-title">نوع درخواست:</span>
            <span class="tr-value">
              {{ order.service[`title_${locale}`] }}
            </span>
          </div>
          <div class="tr has-hr">
            <span class="tr-title">مبلغ سفارش:</span>
            <span class="tr-value">
              {{ $n(Number(order.user_amount_irt)) }} تومان
            </span>
          </div>
          <div class="tr has-hr">
            <span class="tr-title">تاریخ ثبت:</span>
            <span class="tr-value">
              {{ $d(new Date(order.created_at), DATEFORMAT) }}
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
              {{ order.processed_by?.full_name || '—' }}
            </span>
          </div>
          <div class="tr has-hr">
            <span class="tr-title">آخرین وضعیت:</span>
            <div class="tr-value">
              <UBadge :color="statusBadge.color" :label="statusBadge.label" class="capitalize"/>
              <UButton
                  v-if="user && order.processed_by?.id === user.id"
                  class="mr-2"
                  icon="material-symbols:edit-square-outline"
                  size="xs"
                  variant="link"
                  @click="handleUpdateStatus"
              />
            </div>
          </div>
          <div v-if="order.admin_notes" class="tr has-hr">
            <span class="tr-title">توضیحات پشتیبان:</span>
            <div class="tr-value">

              <UPopover mode="hover">
                <span class="text-info tr-value max-h-6 overflow-hidden truncate ">
                  {{ order.admin_notes }}
                </span>

                <template #content>
                  <div class="w-100 p-2">
                    <span class="max-w-10 wrap-normal">{{ order.admin_notes }}</span>
                  </div>
                </template>
              </UPopover>

              <UButton
                  v-if="order.admin_attachment"
                  :href="order.admin_attachment"
                  :title="$t('common.labels.attachment')"
                  download
                  icon="material-symbols:attach-file"
                  target="_blank"/>
            </div>
          </div>

          <div class="tr has-hr">
            <span class="tr-title">تاریخ بروزرسانی:</span>
            <span class="tr-value">
              {{ order.updated_at ? $d(new Date(order.updated_at), DATEFORMAT) : '—' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-2">
      <h2 class="title">توضیحات:</h2>
      <div class="w-full bg-ui-highlight p-4 grid md:grid-cols-2 gap-4">
        <div v-for="data in order.custom_data" class="space-y-2">
          <div>
            <h4 class="font-bold">{{ data[`label_${locale}`] }}</h4>
            <p class="text-muted">{{ data[`description_${locale}`] }}</p>
          </div>
          <p class="font-medium bg-elevated p-2 rounded-md">
            {{ data.value }}
          </p>
        </div>
      </div>
      <div v-if="order.attachments" class="inline-flex gap-2 flex-wrap">
        <UButton v-for="attachment in order.attachments"
                 :href="attachment.url"
                 :label="attachment.filename"
                 external
                 icon="material-symbols:attachment"
                 target="_blank"
                 variant="soft"
        />
      </div>
    </section>

    <section>
      <UButton
          v-if="!order.processed_by"
          :label="$t('services.labels.button_assign_order')"
          size="xl"
          trailing-icon="material-symbols:deployed-code-history-outline"
          @click="handleAssignOrder"
      />
    </section>

  </div>
</template>

<script lang="ts" setup>
import type {Order} from "~/types/orders";
import type {UpdateOrderPayload} from "~/types/payload";

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'support'],
  title: 'pages.admin.title.orders_id',
})

const route = useRoute()
const order_id = route.params.order as string

const breadcrumbStore = useBreadcrumbStore()
const {locale, t} = useI18n()
const {order} = await useAdminFetchOrder(order_id)
const {updateOrder, updatedOrder} = useUpdateAdminOrder()
const {user} = useAuth()

const userFlag = computed(() => {
  const code = order.value.user.country_code.toLowerCase()
  return code ? `cif:${code}` : 'material-symbols:globe'
})

breadcrumbStore.value = {
  name: order.value.user.full_name,
  order: order_id
}

const DATEFORMAT = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}

const statusBadge = computed(() => {
  const map = {
    pending: {label: t('common.states.orders.pending'), color: 'neutral' as const},
    processing: {label: t('common.states.orders.processing'), color: 'info' as const},
    done: {label: t('common.states.orders.done'), color: 'success' as const},
    rejected: {label: t('common.states.orders.rejected'), color: 'error' as const},
  }
  return map[order.value.status]
})

const statusItems = ref<{ label: string, value: Order['status'] }[]>([
  {label: t('common.states.orders.pending'), value: 'pending'},
  {label: t('common.states.orders.processing'), value: 'processing'},
  {label: t('common.states.orders.done'), value: 'done'},
  {label: t('common.states.orders.rejected'), value: 'rejected'},
])

const handleAssignOrder = async () => {
  const confirmed = await useConfirm({
    title: t('services.labels.button_assign_order'),
    message: t('services.messages.assign_order_confirm', {name: order.value.user.full_name}),
    confirmLabel: t('services.labels.button_assign_order'),
    confirmColor: 'success',
  })

  if (!confirmed) return

  const payload = <UpdateOrderPayload>{
    status: 'processing',
  }
  await updateOrder(order_id, payload)
  order.value = updatedOrder.value || order.value
}

const handleUpdateStatus = async () => {
  const payload = await usePrompt<UpdateOrderPayload>()({
        status: order.value.status as Exclude<Order['status'], 'pending'>,
        admin_notes: order.value.admin_notes,
        admin_attachment: undefined,
      }, {
        status: {label: t('common.labels.order_status'), type: 'select', options: statusItems},
        admin_notes: {label: t('common.labels.admin_notes'), type: 'textarea'},
        admin_attachment: {label: t('common.labels.attachment'), type: 'file'},
      },
      {
        title: 'common.titles.orders_update',
      })

  if (payload) {
    console.log(payload)

    await updateOrder(order_id, payload)
    order.value = updatedOrder.value || order.value
  }
}
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