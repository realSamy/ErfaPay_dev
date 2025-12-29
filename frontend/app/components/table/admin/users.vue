<template>
  <div class="w-full space-y-4 pb-4">
    <div class="flex justify-between px-4 py-3.5 border-b border-accented">
      <UInput v-model="globalFilter" :placeholder="$t('common.tables.search')" class="max-w-sm"
              icon="material-symbols:search"
              type="search"/>
      <UButton :label="$t('common.tables.download')" icon="material-symbols:download"/>
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
      <template #empty>
        <div class="text-center py-8">
          <UIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" name="i-hero-users"/>
          <h3 class="text-lg font-medium text-gray-900 mb-1">{{ $t('common.messages.warn_no_user') }}</h3>
          <p class="text-sm text-gray-500">{{ $t('common.messages.warn_add_users_to_show') }}</p>
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
import type {User} from '~/types/users'
import {h, resolveComponent} from 'vue'
import {getPaginationRowModel} from '@tanstack/vue-table'
import type {WalletAdjustmentPayload} from "~/types/payload";

const UButton = resolveComponent('UButton')
const UIcon = resolveComponent('UIcon')
const UCheckbox = resolveComponent('UCheckbox')
const {t, d} = useI18n()

const localePath = useLocalePath()
const users = await useLoadAdminUsersStore()
const table = useTemplateRef('table')
const rowSelection = ref({})
const globalFilter = ref('')
const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})

const columns = ref<TableColumn<User>[]>([
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
        header: '#',
        size: 8,
      },
      {
        accessorKey: 'full_name',
        header: t('common.tables.user_name'),
        cell: ({row}) => {
          const code = row.original.country_code?.toLowerCase()
          const id = row.original.id
          const fullName = `${row.original.first_name} ${row.original.last_name}`;
          return h(UButton, {
            icon: code ? `cif:${code}` : 'material-symbols:globe',
            label: fullName,
            variant: 'link',
            to: localePath({name: 'admin-users-id', params: {id}}),
          })
        },
        size: 24,
      },
      {
        accessorKey: 'email',
        header: t('common.tables.email'),
        size: 32,
      },
      {
        accessorKey: 'role',
        header: t('common.tables.role'),
        cell: ({row}) => ({
          main_admin: t('common.roles.main_admin'),
          senior_support: t('common.roles.senior_support'),
          simple_support: t('common.roles.simple_support'),
          regular: t('common.roles.regular'),
        } [row.getValue<User['role']>('role')] || row.original.role)
      },
      {
        accessorKey: 'last_login',
        header: t('common.tables.last_login'),
        cell: ({row}) => {
          const last_login = row.getValue<User['last_login']>('last_login')
          if (last_login) {
            return d(last_login, {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })
          } else return '-'
        },
      },
      {
        id: 'operations',
        header: t('common.tables.operations'),
        enableSorting: false,
        size: 20,
        cell: ({row}) => {
          const userId = row.original.id
          return h('div', {class: 'flex gap-1'}, [
            h(UButton, {
              variant: 'ghost',
              color: 'info',
              icon: 'material-symbols:attach-money',
              onClick: () => handleAdjustWallet(userId)
            }),
            h(UButton, {
              variant: 'ghost',
              color: row.original.is_blocked ? 'warning' : 'success',
              title: (row.original.is_blocked ? 'common.states.enable' : 'common.states.disable'),
              icon: row.original.is_blocked ? 'material-symbols:account-circle-off-outline-rounded' : 'material-symbols:account-circle-outline',
              onClick: () => handleDeactivate(userId)
            }),
            h(UButton, {
              variant: 'ghost',
              color: 'error',
              icon: 'material-symbols:delete-outline',
              onClick: () => handleDelete(userId)
            }),

          ])
        },
      }
    ]
)
const handleDeactivate = (id: number) => {
  const user = users.value.find((u) => u.id === id)
  if (user) user.is_blocked = !user.is_blocked
}

const handleDelete = (id: number) => {
  if (confirm('آیا مطمئن هستید؟')) {
  }
}

const handleAdjustWallet = async (id: number) => {
  const {adjustWallet} = useAdminPayments()

  const wa_payload = <WalletAdjustmentPayload>{
    amount: 0,
    reason: '',
  }

  const payload = await usePrompt<WalletAdjustmentPayload>()(wa_payload, {
    amount: {label: 'Amount'},
    reason: {label: 'Reason'},
    user_id: {label: 'User'},
  })

  if (payload) {
    const response = await adjustWallet({
      ...payload,
      user_id: id
    })

    console.log(response)
  }

}
</script>