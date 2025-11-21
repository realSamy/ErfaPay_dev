<template>
  <div class="w-full space-y-4 pb-4">
    <div class="flex justify-between px-4 py-3.5 border-b border-accented">
      <UInput v-model="globalFilter" class="max-w-sm" icon="material-symbols:search" placeholder="جستجو..."
              type="search"/>
      <UButton icon="material-symbols:download" label="دانلود"/>
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
import type {TableColumn} from '@nuxt/ui'
import type {Order, User} from "~/types/admin/data";
import {getPaginationRowModel, filterFns, sortingFns} from '@tanstack/vue-table'

const props = defineProps<{
  user?: string | Number
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

const {n, locale} = useI18n()
const localePath = useLocalePath()
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UCheckbox = resolveComponent('UCheckbox')


filterFns.typeIncludes = (row, columnId, filterValues: string[]) => {
  const type: OrderType = row.getValue(columnId)
  if (!type || !filterValues.length) return true

  return filterValues.includes(type.title[locale.value.toLowerCase()])
}

sortingFns.typeSort = (rowA, rowB, columnId) => {
  const typeA: OrderType = rowA.getValue(columnId)
  const typeB: OrderType = rowB.getValue(columnId)

  if (!typeA || !typeB) return 0

  const textA = typeA.title[locale.value.toLowerCase()] || ''
  const textB = typeB.title[locale.value.toLowerCase()] || ''

  return textA.localeCompare(textB, locale.value, {sensitivity: 'base'})
}

const typeItems = computed(() => {
  if (items.length) return [...new Set<string>(items.map((order: Order) => order.type.title[locale.value.toLowerCase()]))]
  else return []
})

const typeFilter = ref<string[]>([])

const statusItems = ref([
  {value: 'done', label: 'انجام شده'},
  {value: 'rejected', label: 'رد شده'},
  {value: 'pending', label: 'در انتظار'},
  {value: 'processing', label: 'در حال انجام'}
])
const statusFilter = ref<string[]>([])

const userStore = useState<User[]>('admin--users')
// const userItems = computed(() => {
//   if (userStore.value?.length)
//     return userStore.value.map(user => ({label: user.first_name + user.last_name, value: user.id}))
//   else return []
// })

const userFilter = ref<string[]>([])
const columns = computed<TableColumn<Order>[]>(() => {
  const columns: TableColumn<Order>[] = [
    {
      id: 'select',
      header: ({table}) =>
          h(UCheckbox, {
            modelValue: table.getIsSomeRowsSelected()
                ? 'indeterminate'
                : table.getIsAllRowsSelected(),
            'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
                table.toggleAllRowsSelected(!!value),
            'aria-label': 'Select all'
          }),
      cell: ({row}) =>
          h(UCheckbox, {
            modelValue: row.getIsSelected(),
            'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
            'aria-label': 'Select row'
          })
    },
    {
      accessorKey: 'id',
      header: tableSortableLabel('ردیف'),
      cell: ({row}) => n(Number(row.getValue('id')))
    },


    {
      accessorKey: 'orderNumber',
      header: tableSortableLabel('شماره سفارش'),
      cell: ({row}) => {
        const label = new Intl.NumberFormat('fa-IR', {useGrouping: false}).format(Number(row.getValue('orderNumber')))
        const user = userStore.value.find(u => u.id == Number(row.getValue('user')))
        return h(UButton, {variant: 'link', label, to: localePath({name: 'admin-users-id-order', params: {order: row.getValue('orderNumber'), id: user?.id}})})
      }
    },
    {
      accessorKey: 'type',
      header: tableFilterableLabel('نوع درخواست', typeItems, typeFilter),
      enableColumnFilter: true,
      filterFn: 'typeIncludes',
      sortingFn: 'typeSort',
      cell: ({row}) => row.getValue('type').title[locale.value.toLowerCase()]
    },
    {
      accessorKey: 'amount_irr',
      header: tableSortableLabel('مبلغ سفارش'),
      cell: ({row}) => {
        const amount = Number.parseFloat(row.getValue('amount_irr'))

        const formatted = new Intl.NumberFormat('fa-IR').format(amount)
        return `${formatted} تومان`;
      }
    },
    {
      accessorKey: 'created_at',
      header: tableSortableLabel('تاریخ'),
      cell: ({row}) => {
        return new Date(row.getValue('created_at')).toLocaleString('fa-IR', {
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
      header: tableFilterableLabel('وضعیت', statusItems, statusFilter),
      filterFn: 'arrIncludesSome',
      cell: ({row}) => {
        const {color, label} = {
          done: {color: 'success', label: 'انجام شده'},
          rejected: {color: 'error', label: 'رد شده'},
          pending: {color: 'neutral', label: 'در انتظار'},
          processing: {color: 'info', label: 'در حال انجام'},
        }[row.getValue('status') as 'done' | 'rejected' | 'pending' | 'processing']

        return h(UBadge, {class: 'capitalize w-full justify-center', variant: 'subtle', color}, () => label)
      }
    }
  ]

  if (!props.user) {
    columns.splice(2, 0, {
      accessorKey: 'user',
      header: tableSortableLabel('کاربر'),
      cell: ({row}) => {
        const user = userStore.value.find(u => u.id == Number(row.getValue('user')))
        return user ? h(UButton, {label: `${user.first_name} ${user.last_name}`, variant: 'link', to: localePath({name: 'admin-users-id', params: {id: user?.id}})}) : "User not found!"
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