<template>
  <div class="w-full space-y-4 pb-4">
    <div class="flex justify-between px-4 py-3.5 border-b border-accented">
      <UInput
          v-model="globalSearch"
          :placeholder="$t('common.tables.search')"
          class="max-w-sm"
          icon="material-symbols:search"
          type="search"
      />
      <UButton :label="$t('common.tables.download')" icon="material-symbols:download"/>
    </div>

    <UTable
        v-model:sorting="globalSort"
        :column-filters="globalFilter"
        :columns="columns"
        :data="orders"
        :filtering="false"
        :loading="loading"
        sticky
    />

    <!-- Server-side Pagination -->
    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
          v-model="currentPage"
          :items-per-page="pageSize"
          :page-count="pageCount"
          :total="totalItems"
          show-edges
          @update:page="onPageChange"
      />
    </div>
    <pre>{{ totalItems }}</pre>
  </div>
</template>

<script lang="ts" setup>
import type {TableColumn} from "@nuxt/ui";
import type {Order} from "~/types/orders";
import {h} from "vue";

const props = defineProps<{
  user?: number | string
}>()

const UBadge = resolveComponent("UBadge")
const UButton = resolveComponent("UButton")

// Pagination state
const pageSize = ref(10)
const statusFilter = ref<string[]>([])

const statusItems = computed(() => [
  {value: 'done', label: $t('common.states.orders.done')},
  {value: 'rejected', label: $t('common.states.orders.rejected')},
  {value: 'pending', label: $t('common.states.orders.pending')},
  {value: 'processing', label: $t('common.states.orders.processing')},
])

const globalSearch = ref('')
const globalSort = ref([])
const globalFilter = ref([])

const {d, n, locale} = useI18n()

const {
  orders,
  loading,
  totalItems,
  pageCount,
  currentPage,
  goToPage,
  refresh,
} = useFetchAdminOrders(statusFilter, globalSearch, globalSort, pageSize, props.user)
await refresh()

// For UPagination
const onPageChange = (page: number) => {
  goToPage(page)
}

// Columns definition (adjust to your Order model)
const columns = ref<TableColumn<Order>[]>([
      {
        accessorKey: 'id',
        enableSorting: false,
        header: sortableLabel('#'),
        cell: ({row}) => {
          const order_id = row.getValue<Order['id']>('id')
          const user_id = row.getValue<Order['user']>('user').id
          const label = n(Number(order_id))

          return h(
              UButton,
              {
                label,
                icon: 'material-symbols:open-in-new',
                variant: 'link',
                to: useLocalePath()({name: 'admin-users-id-orders-order', params: {order: order_id, id: user_id}})
              }
          )
        }
      },
      {
        accessorKey: 'service',
        header: $t('common.tables.service'),
        cell: ({row}) => row.getValue<Order['service']>('service')[`title_${locale.value}`]
      },
      {
        id: 'user',
        accessorKey: 'user',
        header: sortableLabel($t('common.tables.user')),
        enableSorting: false,
        cell: ({row}) => {
          const user = row.original.user
          const label = user.full_name || user.email
          return h(UButton, {label, variant: 'link', to: useLocalePath()({name: 'admin-users-id', params: {id: user.id}})})
        },
      },
      {
        accessorKey: 'user_amount_irt',
        header: sortableLabel($t('services.labels.order_price')),
        enableSorting: false,
        cell: ({row}) => {
          const amount = Number.parseFloat(row.getValue<Order['user_amount_irt']>('user_amount_irt'))

          const formatted = n(amount)
          return `${formatted} ${$t('common.currencies.text.toman')}`;
        }
      },
      {
        accessorKey: 'total_irt',
        header: sortableLabel($t('services.labels.order_total_price')),
        enableSorting: false,
        cell: ({row}) => {
          const amount = Number.parseFloat(row.getValue<Order['total_irt']>('total_irt'))

          const formatted = n(amount)
          return `${formatted} ${$t('common.currencies.text.toman')}`;
        }
      },

      {
        accessorKey: 'created_at',
        header: sortableLabel($t('common.tables.date')),
        enableSorting: false,
        cell: ({row}) => {
          return d(row.getValue<Order['created_at']>('created_at'), {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
        }
      },

      {
        accessorKey: 'status',
        header: filterableLabel($t('common.tables.state'), statusItems, statusFilter),
        enableSorting: false,
        cell: ({row}) => {
          const {color, label} = {
            done: {color: 'success', label: 'انجام شده'},
            rejected: {color: 'error', label: 'رد شده'},
            pending: {color: 'neutral', label: 'در انتظار'},
            processing: {color: 'info', label: 'در حال انجام'},
          }[row.getValue<Order['status']>('status')]

          return h(UBadge, {class: 'capitalize w-full justify-center', variant: 'subtle', color}, () => label)
        }
      }
    ]
)

</script>