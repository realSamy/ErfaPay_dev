<template>
  <div class="w-full space-y-4 pb-4">
    <UTable
        ref="table"
        v-model:column-filters="columnFilters"
        v-model:pagination="pagination"
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
import type {TicketItem, User} from '~/types/admin/data';
import {getPaginationRowModel} from "@tanstack/vue-table";
import type {TableColumn, TableRow} from "@nuxt/ui";
import {resolveComponent} from "vue";

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const items = reactive<TicketItem[]>([])
const loading = ref<boolean>(true)
adminLoadTickets()
    .then((orders) => {
      items.splice(0, items.length, ...orders)
    })
    .finally(() => {
      loading.value = false
    })

const {d, n} = useI18n()

const localePath = useLocalePath()
const table = useTemplateRef('table')
const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})
const users = useState<User[]>('admin--users')
const categoryItems = computed(() =>
    []
)

const statusItems = computed(() => [
  {value: 'open', label: 'باز'},
  {value: 'in_progress', label: 'در حال انجام'},
  {value: 'closed', label: 'بسته شده'},
])

const priorityItems = computed(() => [
  {value: 'low', label: 'کم'},
  {value: 'medium', label: 'متوسط'},
  {value: 'high', label: 'بالا'},
])

const userItems = computed(() =>
    users.value.map(u => ({value: u.id, label: `${u.first_name} ${u.last_name}`}))
)

// Filter refs
const categoryFilter = ref<string[]>([])
const statusFilter = ref<string[]>([])
const priorityFilter = ref<string[]>([])
const userFilter = ref<string[]>([])

const columns: Ref<TableColumn<TicketItem>[]> = ref([
  // Selection Checkbox
  // {
  //   id: 'select',
  //   header: ({ table }) =>
  //     h(UCheckbox, {
  //       modelValue: table.getIsSomeRowsSelected()
  //         ? 'indeterminate'
  //         : table.getIsAllRowsSelected(),
  //       'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
  //         table.toggleAllRowsSelected(!!value),
  //       'aria-label': 'انتخاب همه',
  //     }),
  //   cell: ({ row }) =>
  //     h(UCheckbox, {
  //       modelValue: row.getIsSelected(),
  //       'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
  //       'aria-label': 'انتخاب تیکت',
  //     }),
  // },
  // Ticket ID
  {
    accessorKey: 'id',
    header: tableSortableLabel('شماره تیکت'),
    cell: ({row}) => {
      const ticket = row.getValue<TicketItem['id']>('id')
      return h(UButton, {
        label: n(ticket, {useGrouping: false}),
        variant: 'link',
        to: localePath({name: 'admin-support-tickets-id', params: {id: ticket}})
      })
    },
  },
  // Subject
  {
    accessorKey: 'subject',
    header: 'موضوع',
    cell: ({row}) => {
      const ticket = row.getValue<TicketItem['id']>('id')
      const label = row.getValue<TicketItem['subject']>('subject')
      return h(UButton, {
        label,
        variant: 'link',
        to: localePath({name: 'admin-support-tickets-id', params: {id: ticket}})
      })
    },
  },
  // Category
  {
    accessorKey: 'category',
    header: tableFilterableLabel('دسته‌بندی', categoryItems, categoryFilter),
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
    sortingFn: (rowA: TableRow<TicketItem>, rowB: TableRow<TicketItem>, columnId: string) => {
      const typeA = rowA.getValue<TicketItem['category']>(columnId)
      const typeB = rowB.getValue<TicketItem['category']>(columnId)

      if (!typeA || !typeB) return 0

      const textA = typeA.name
      const textB = typeB.name

      return textA.localeCompare(textB)
    },
    cell: ({row}) => row.getValue<Record<string, string>>('category')?.name || '—',
  },
  // Status
  {
    accessorKey: 'status',
    header: tableFilterableLabel('وضعیت', statusItems, statusFilter),
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
    cell: ({row}) => {
      const status = row.getValue<TicketItem['status']>('status')
      const {color, label} = {
        open: {color: 'warning', label: 'باز'},
        in_progress: {color: 'info', label: 'در حال انجام'},
        closed: {color: 'success', label: 'بسته شده'},
      }[status]

      return h(UBadge, {class: 'capitalize w-full justify-center', variant: 'subtle', color}, () => label)
    },
  },
  // Priority
  {
    accessorKey: 'priority',
    header: tableFilterableLabel('اولویت', priorityItems, priorityFilter),
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
    cell: ({row}) => {
      const priority = row.getValue<TicketItem['priority']>('priority')
      const {color, label} = {
        low: {color: 'success', label: 'کم'},
        medium: {color: 'warning', label: 'متوسط'},
        high: {color: 'error', label: 'بالا'},
      }[priority]

      return h(UBadge, {class: 'capitalize w-full justify-center', variant: 'subtle', color}, () => label)
    },
  },
  // Assigned To
  {
    accessorKey: 'assigned_to',
    header: tableSortableLabel('متصل به'),
    cell: ({row}) => {
      const assignedId = row.getValue<TicketItem['assigned_to']>('assigned_to')
      const assignedUser = users.value.find(u => u.id === assignedId)
      return assignedUser ? `${assignedUser.first_name} ${assignedUser.last_name}` : '—'
    },
  },
  // Created At
  {
    accessorKey: 'created_at',
    header: tableSortableLabel('تاریخ ایجاد'),
    cell: ({row}) => {
      return d(row.getValue<TicketItem['created_at']>('created_at'), {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
])

const columnFilters = computed(() => {
  interface TicketFilter {
    id: keyof TicketItem
    value: any
  }

  const filters: TicketFilter[] = []

  if (categoryFilter.value.length) {
    filters.push({
      id: 'category',
      value: categoryFilter.value,
    })
  }

  if (statusFilter.value.length) {
    filters.push({
      id: 'status',
      value: statusFilter.value,
    })
  }

  if (priorityFilter.value.length) {
    filters.push({
      id: 'priority',
      value: priorityFilter.value,
    })
  }

  if (userFilter.value.length) {
    filters.push({
      id: 'user',
      value: userFilter.value,
    })
  }

  return filters
})
</script>

<style scoped>

</style>