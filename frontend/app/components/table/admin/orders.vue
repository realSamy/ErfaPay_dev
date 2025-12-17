<template>
  <div class="w-full space-y-4 pb-4">
    <div class="flex justify-between px-4 py-3.5 border-b border-accented">
      <UInput v-model="globalFilter" class="max-w-sm" icon="material-symbols:search" :placeholder="$t('common.tables.search')"
              type="search"/>
      <UButton icon="material-symbols:download" :label="$t('common.tables.download')"/>
    </div>
    <UTable
        ref="table"
        v-model:column-filters="columnFilters"
        v-model:global-filter="globalFilter"
        v-model:pagination="pagination"
        v-model:row-selection="rowSelection"
        :columns="columns"
        :data="items"
        :filtering="true"
        :loading="loading"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        class="h-100"
        sticky
    />
    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {h, resolveComponent} from 'vue'
import type {TableColumn, TableRow} from '@nuxt/ui'
import type {Order, OrderType, User} from "~/types/admin/data";
import {getPaginationRowModel} from '@tanstack/vue-table'

const props = defineProps<{
  user?: number
}>()

const items = reactive<Order[]>([])
const loading = ref<boolean>(true)
adminLoadOrders({user: props.user})
    .then((orders) => {
      items.splice(0, items.length, ...orders)
    })
    .finally(() => {
      loading.value = false
    })

const {t, n, d, locale} = useI18n()
const localePath = useLocalePath()
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UCheckbox = resolveComponent('UCheckbox')


const typeIncludesFFN = (row: TableRow<Order>, columnId: string, filterValues: string[]) => {
  const type: OrderType = row.getValue<Order['type']>(columnId)
  if (!type || !filterValues.length) return true

  return filterValues.includes(type.title[locale.value.toLowerCase()  as 'fa' | 'en'])
}

const typeSortSFN = (rowA: TableRow<Order>, rowB: TableRow<Order>, columnId: string) => {
  const typeA = rowA.getValue<Order['type']>(columnId)
  const typeB = rowB.getValue<Order['type']>(columnId)

  if (!typeA || !typeB) return 0

  const textA = typeA.title[locale.value.toLowerCase() as 'fa' | 'en'] || ''
  const textB = typeB.title[locale.value.toLowerCase() as 'fa' | 'en'] || ''

  return textA.localeCompare(textB, locale.value, {sensitivity: 'base'})
}

const typeItems = computed(() => {
  if (items.length) return [...new Set<string>(items.map((order: Order) => order.type.title[locale.value.toLowerCase() as 'fa' | 'en']))]
  else return []
})

const typeFilter = ref<string[]>([])

const statusItems = ref([
  {value: 'done', label: t('common.states.orders.done')},
  {value: 'rejected', label: t('common.states.orders.rejected')},
  {value: 'pending', label: t('common.states.orders.pending')},
  {value: 'processing', label: t('common.states.orders.processing')}
])
const statusFilter = ref<string[]>([])

const userStore = useState<User[]>('admin.users')
// const userItems = computed(() => {
//   if (userStore.value?.length)
//     return userStore.value.map(user => ({label: user.first_name + user.last_name, value: user.id}))
//   else return []
// })

const userFilter = ref<string[]>([])
const columns = computed<TableColumn<Order>[]>(() => {
  const columns: TableColumn<Order>[] = [
    // {
    //   id: 'select',
    //   header: ({table}) =>
    //       h(UCheckbox, {
    //         modelValue: table.getIsSomeRowsSelected()
    //             ? 'indeterminate'
    //             : table.getIsAllRowsSelected(),
    //         'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
    //             table.toggleAllRowsSelected(!!value),
    //         'aria-label': 'Select all'
    //       }),
    //   cell: ({row}) =>
    //       h(UCheckbox, {
    //         modelValue: row.getIsSelected(),
    //         'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
    //         'aria-label': 'Select row'
    //       })
    // },
    {
      accessorKey: 'id',
      header: tableSortableLabel('#'),
      cell: ({row}) => n(Number(row.getValue<Order['id']>('id')))
    },


    {
      accessorKey: 'orderNumber',
      header: tableSortableLabel(t('common.titles.order_number')),
      cell: ({row}) => {
        const label = n(Number(row.getValue<Order['orderNumber']>('orderNumber')), {useGrouping: false})
        const user = userStore.value.find(u => u.id == Number(row.getValue<Order['user']>('user')))
        return h(UButton, {variant: 'link', label, to: localePath({name: 'admin-users-id-orders-order', params: {order: row.getValue<Order['orderNumber']>('orderNumber'), id: user?.id}})})
      }
    },
    {
      accessorKey: 'type',
      header: tableFilterableLabel(t('common.titles.request_type'), typeItems, typeFilter),
      enableColumnFilter: true,
      filterFn: typeIncludesFFN,
      sortingFn: typeSortSFN,
      cell: ({row}) => row.getValue<OrderType>('type').title[locale.value.toLowerCase() as 'fa' | 'en']
    },
    {
      accessorKey: 'amount_irr',
      header: tableSortableLabel(t('common.titles.payment_amount')),
      cell: ({row}) => {
        const amount = n(Number(row.getValue<Order['amount_irr']>('amount_irr')))

        return `${amount} ${t('common.currencies.symbol.toman')}`;
      }
    },
    {
      accessorKey: 'created_at',
      header: tableSortableLabel(t('common.tables.date')),
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
      header: tableFilterableLabel(t('common.tables.state'), statusItems, statusFilter),
      filterFn: 'arrIncludesSome',
      cell: ({row}) => {
        const {color, label} = {
          done: {color: 'success', label: t('common.states.orders.done')},
          rejected: {color: 'error', label: t('common.states.orders.rejected')},
          pending: {color: 'neutral', label: t('common.states.orders.pending')},
          processing: {color: 'info', label: t('common.states.orders.processing')},
        }[row.getValue<Order['status']>('status')]

        return h(UBadge, {class: 'capitalize w-full justify-center', variant: 'subtle', color}, () => label)
      }
    }
  ]

  if (!props.user) {
    columns.splice(2, 0, {
      accessorKey: 'user',
      header: tableSortableLabel(t('common.tables.user')),
      cell: ({row}) => {
        const user = userStore.value.find(u => u.id == Number(row.getValue<Order['user']>('user')))
        return user ? h(UButton, {label: user.full_name, variant: 'link', to: localePath({name: 'admin-users-id', params: {id: user?.id}})}) : t('error.user_not_found')
      }
    },)
  }
  return columns
})
const table = useTemplateRef('table')
const globalFilter = ref('')

const columnFilters = computed(() => {
  const filters = []

  if (typeFilter.value.length) {
    filters.push({
          id: 'type',
          value: typeFilter.value
        }
    )
  }
  if (statusFilter.value.length) {
    filters.push({
          id: 'status',
          value: statusFilter.value
        }
    )
  }
  if (userFilter.value.length) {
    filters.push({
          id: 'status',
          value: userFilter.value
        }
    )
  }


  return filters
})

const rowSelection = ref({})
const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})

</script>