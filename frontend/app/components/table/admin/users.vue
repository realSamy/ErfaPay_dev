<template>
  <div class="w-full space-y-4 pb-4">
    <div class="flex justify-between px-4 py-3.5 border-b border-accented">
      <UInput type="search" v-model="globalFilter" class="max-w-sm" icon="material-symbols:search" placeholder="جستجو..."/>
      <UButton icon="material-symbols:download" label="دانلود" />
    </div>
    <UTable
      ref="table"
      v-model:global-filter="globalFilter"
      v-model:pagination="pagination"
      v-model:row-selection="rowSelection"
      :columns="columns"
      :data="users"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"

      class="w-full h-100"
      sticky
  >
    <template #empty-state>
      <div class="text-center py-8">
        <UIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" name="i-hero-users"/>
        <h3 class="text-lg font-medium text-gray-900 mb-1">هیچ کاربری یافت نشد</h3>
        <p class="text-sm text-gray-500">کاربران را اضافه کنید تا اینجا نمایش داده شوند.</p>
      </div>
    </template>
  </UTable>
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
import type {TableColumn} from '@nuxt/ui'
import type {User} from '~/types/admin/data'
import {h, resolveComponent} from 'vue'
import {getPaginationRowModel} from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const UIcon = resolveComponent('UIcon')
const UCheckbox = resolveComponent('UCheckbox')

const localePath = useLocalePath()
const users = useState<User[]>('admin--users')
const table = useTemplateRef('table')
const rowSelection = ref({})
const globalFilter = ref('')
const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})

const columns: TableColumn<User>[] = [
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
    header: '#',
    size: 8,
  },
  {
    accessorKey: 'first_name',
    header: 'نام کاربر',
    cell: ({row}) => {
      const code = row.original.country_code.toLowerCase()
      const id = row.original.id
      const fullName = `${row.original.first_name} ${row.original.last_name}`;
      return h(UButton, {
        icon: `cif:${code}`,
        label: fullName,
        variant: 'link',
        to: localePath({name: 'admin-users-id', params: {id}}),
      })
    },
    size: 24,
  },
  {
    accessorKey: 'email',
    header: 'ایمیل',
    size: 32,
  },
  {
    id: 'operations',
    header: 'عملیات',
    enableSorting: false,
    size: 20,
    cell: ({row}) => {
      const userId = row.original.id
      return h('div', {class: 'flex gap-1'}, [
        h(UButton, {
          variant: 'ghost',
          color: row.original.blocked ? 'warning' : 'success',
          title: row.original.blocked ? 'فعال‌سازی' : 'غیرفعال‌سازی',
          icon: row.original.blocked ? 'material-symbols:account-circle-off-outline-rounded' : 'material-symbols:account-circle-outline',
          onClick: () => handleDeactivate(userId)
        }),
        h(UButton, {
          variant: 'ghost',
          color: 'error',
          icon: 'material-symbols:delete-outline',
          onClick: () => handleDelete(userId)
        })
      ])
    },
  }
]

const handleDeactivate = (id: number) => {
  const user = users.value.find((u) => u.id === id)
  if (user) user.blocked = !user.blocked
}

const handleDelete = (id: number) => {
  if (confirm('آیا مطمئن هستید؟')) {
  }
}
</script>