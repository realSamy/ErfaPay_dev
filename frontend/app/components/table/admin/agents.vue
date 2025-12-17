<template>
  <div class="w-full space-y-4 pb-4">
    <div class="flex justify-between px-4 py-3.5 border-b border-accented">
      <UInput type="search" v-model="globalFilter" class="max-w-sm" icon="material-symbols:search" placeholder="جستجو..."/>
    </div>
    <UTable
      ref="table"
      v-model:global-filter="globalFilter"
      v-model:pagination="pagination"
      v-model:row-selection="rowSelection"
      :columns="columns"
      :data="users"

      class="w-full h-100"
      sticky
  >
    <template #empty>
      <div class="text-center py-8">
        <UIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" name="i-hero-users"/>
        <h3 class="text-lg font-medium text-gray-900 mb-1">هیچ پشتیبانی یافت نشد</h3>
        <p class="text-sm text-gray-500">پشتیبان ها را اضافه کنید تا اینجا نمایش داده شوند.</p>
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
import type {User, UserRole} from '~/types/users'
import {h, resolveComponent} from 'vue'
import type {BadgeProps} from "#ui/components/Badge.vue";

const UButton = resolveComponent('UButton')
const UIcon = resolveComponent('UIcon')
const UCheckbox = resolveComponent('UCheckbox')
const UBadge = resolveComponent('UBadge')

const localePath = useLocalePath()
const users = await useLoadAdminAgentsStore()
const table = useTemplateRef('table')
const rowSelection = ref({})
const globalFilter = ref('')
const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})

const columns: TableColumn<User>[] = [
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
    size: 8,
  },
  {
    accessorKey: 'full_name',
    header: $t('common.tables.agent_name'),
    cell: ({row}) => {
      const code = row.original.country_code?.toLowerCase()
      const id = row.original.id
      return h(UButton, {
        icon: code ? `cif:${code}` : 'material-symbols:globe',
        label: row.original.full_name,
        variant: 'link',
        to: localePath({name: 'admin-users-id', params: {id}}),
      })
    },
    size: 24,
  },
  {
    accessorKey: 'email',
    header: tableSortableLabel($t('common.tables.email')),
    size: 32,
  },
  {
    accessorKey: 'role',
    header: tableSortableLabel($t('common.tables.role')),
    cell: ({row}) => {
      const props: Partial<BadgeProps> = ({
        main_admin: {label: $t('common.roles.main_admin'), class: "bg-yellow-500", ui: {base: "w-40 justify-center"}},
        senior_support: {label: $t('common.roles.senior_support'), class: "bg-blue-700", ui: {base: "w-40 justify-center"}},
        simple_support: {label: $t('common.roles.simple_support'), class: "bg-neutral-400", ui: {base: "w-40 justify-center"}},
      } as Record<UserRole, Partial<BadgeProps>>)[row.getValue<User['role']>('role')]

      return h(UBadge, props)
    }
  },
  {
    id: 'operations',
    header: $t('common.tables.operations'),
    enableSorting: false,
    size: 20,
    cell: ({row}) => {
      const userId = row.original.id
      return h('div', {class: 'flex gap-1'}, [
        h(UButton, {
          variant: 'ghost',
          color: 'neutral',
          icon: 'material-symbols:edit-square-outline',
          onClick: () => handleEdit(userId)
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

const handleEdit = (id: number) => {
  const user = users.value.find((u) => u.id === id)
  if (user) {

  }
}

const handleDelete = async (id: number) => {
  if (await useConfirm('آیا مطمئن هستید؟')) {
  }
}
</script>