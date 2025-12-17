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
import type {User} from '~/types/users';
import {getPaginationRowModel} from "@tanstack/vue-table";
import type {TableColumn, TableRow} from "@nuxt/ui";
import {h, resolveComponent} from "vue";
import type {Ticket} from "~/types/tickets";

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const items = reactive<Ticket[]>([])
const loading = ref<boolean>(true)

useAdminGetTickets().then(response => {
  if (response.data.value?.ok) {
    items.splice(0, items.length, ...response.data.value.data)
  }
}).finally(() => loading.value = false)

const {d, n, t, locale} = useI18n()

const localePath = useLocalePath()
const table = useTemplateRef('table')
const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})
const users = useState<User[]>('admin.users')
const cats = await useLoadTicketCategoryList()
const categoryItems = computed(() => {
  return cats.value.map(c => ({value: c.id, label: locale.value === 'en' ? c.title_en : c.title_fa}))
})

const statusItems = computed(() => [
  {value: 'open', label: t('common.ticket_status.open')},
  {value: 'in_progress', label: t('common.ticket_status.in_progress')},
  {value: 'closed', label: t('common.ticket_status.closed')},
  {value: 'resolved', label: t('common.ticket_status.resolved')},
  {value: 'waiting_user', label: t('common.ticket_status.waiting_user')},
])

const priorityItems = computed(() => [
  {value: 'low', label: t('common.priorities.low')},
  {value: 'medium', label: t('common.priorities.medium')},
  {value: 'high', label: t('common.priorities.high')},
])

const userItems = computed(() =>
    users.value.map(u => ({value: u.id, label: u.full_name}))
)

// Filter refs
const categoryFilter = ref<string[]>([])
const statusFilter = ref<string[]>([])
const priorityFilter = ref<string[]>([])
const userFilter = ref<string[]>([])

const columns: Ref<TableColumn<Ticket>[]> = ref([
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
  {
    accessorKey: 'ticket_id',
    header: tableSortableLabel(t('common.tables.ticket_number')),
    cell: ({row}) => {
      const ticket_id = row.getValue<Ticket['ticket_id']>('ticket_id')
      return h(UButton, {
        label: useConvertNumericToLocale(ticket_id, locale.value),
        variant: 'link',
        to: localePath({name: 'admin-support-tickets-ticket-id', params: {id: ticket_id}})
      })
    },
  },
  {
    accessorKey: 'subject',
    header: t('common.tables.topic'),
    cell: ({row}) => {
      const ticket_id = row.getValue<Ticket['ticket_id']>('ticket_id')
      const label = row.getValue<Ticket['subject']>('subject')
      return h(UButton, {
        label,
        variant: 'link',
        to: localePath({name: 'admin-support-tickets-ticket-id', params: {id: ticket_id}})
      })
    },
  },
  {
    accessorKey: 'user',
    header: tableFilterableLabel(t('common.tables.user'), userItems, userFilter),
    enableColumnFilter: true,
    filterFn: (row: TableRow<Ticket>, columnId: string, filterValue: Number[]) => {
      const user = row.getValue<Ticket['user']>(columnId)
      if (!user) return false
      return filterValue.includes(user.id)
    },
    cell: ({row}) => {
      const user = row.getValue<Ticket['user']>('user')
      const code = user?.country_code?.toLowerCase()
      const id = user?.id
      return user ? h(UButton, {
        icon: code ? `cif:${code}` : 'material-symbols:globe',
        label: user.full_name,
        variant: 'link',
        to: localePath({name: 'admin-users-id', params: {id}}),
      }) : '—'
    },
  },
  {
    accessorKey: 'category',
    header: tableFilterableLabel(t('common.tables.category'), categoryItems, categoryFilter),
    enableColumnFilter: true,
    filterFn: (row: TableRow<Ticket>, columnId: string, filterValue: Number[]) => {
      const category = row.getValue<Ticket['category']>(columnId)
      if (!category) return false
      return filterValue.includes(category.id)
    },
    sortingFn: (rowA: TableRow<Ticket>, rowB: TableRow<Ticket>, columnId: string) => {
      const typeA = rowA.getValue<Ticket['category']>(columnId)
      const typeB = rowB.getValue<Ticket['category']>(columnId)

      if (!typeA || !typeB) return 0

      const textA = typeA[`title_${locale.value}`]
      const textB = typeB[`title_${locale.value}`]

      return textA.localeCompare(textB)
    },
    cell: ({row}) => row.getValue<Record<string, string>>('category')?.[`title_${locale.value}`] || '—',
  },
  {
    accessorKey: 'status',
    header: tableFilterableLabel(t('common.tables.state'), statusItems, statusFilter),
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
    cell: ({row}) => {
      const status = row.getValue<Ticket['status']>('status')
      const {color, label} = {
        open: {color: 'warning', label: t('common.ticket_status.open')},
        in_progress: {color: 'info', label: t('common.ticket_status.in_progress')},
        closed: {color: 'success', label: t('common.ticket_status.closed')},
        resolved: {color: 'success', label: t('common.ticket_status.resolved')},
        waiting_user: {color: 'info', label: t('common.ticket_status.waiting_user')},
      }[status]

      return h(UBadge, {class: 'capitalize w-full justify-center', variant: 'subtle', color}, () => label)
    },
  },
  {
    accessorKey: 'priority',
    header: tableFilterableLabel(t('common.tables.priority'), priorityItems, priorityFilter),
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
    cell: ({row}) => {
      const priority = row.getValue<Ticket['priority']>('priority')
      const {color, label} = {
        low: {color: 'success', label: t('common.priorities.low')},
        medium: {color: 'warning', label: t('common.priorities.medium')},
        high: {color: 'error', label: t('common.priorities.high')},
      }[priority]

      return h(UBadge, {class: 'capitalize w-full justify-center', variant: 'subtle', color}, () => label)
    },
  },
  {
    accessorKey: 'assigned_to',
    header: tableSortableLabel(t('common.tables.assigned_to')),
    cell: ({row}) => {
      const assignedUser = row.getValue<Ticket['assigned_to']>('assigned_to')
      return assignedUser ? assignedUser.full_name : '—'
    },
  },
  {
    accessorKey: 'created_at',
    header: tableSortableLabel(t('common.tables.created_at')),
    cell: ({row}) => {
      return d(row.getValue<Ticket['created_at']>('created_at'), {
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
    id: keyof Ticket
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