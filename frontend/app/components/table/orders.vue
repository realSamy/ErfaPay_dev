<script lang="ts" setup>
import {h, resolveComponent} from 'vue'
import type {TableColumn} from '@nuxt/ui'
import type {Order} from "~/types/orders";

const {n, d, locale} = useI18n()
const UBadge = resolveComponent('UBadge')

const {orders, fetchOrders} = useFetchUserOrders()
await fetchOrders()
const columns = ref<TableColumn<Order>[]>([
      {
        accessorKey: 'id',
        header: '#',
        cell: ({row}) => n(Number(row.getValue<Order['id']>('id')))
      },
      {
        accessorKey: 'service',
        header: 'نوع درخواست',
        cell: ({row}) => row.getValue<Order['service']>('service')[`title_${locale.value}`]
      },
      {
        accessorKey: 'user_amount_irt',
        header: () => 'مبلغ سفارش',
        cell: ({row}) => {
          const amount = Number.parseFloat(row.getValue<Order['user_amount_irt']>('user_amount_irt'))

          const formatted = n(amount)
          return `${formatted} ${$t('common.currencies.text.toman')}`;
        }
      },
      {
        accessorKey: 'created_at',
        header: sortableLabel($t('common.tables.date')),
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
        header: $t('common.tables.state'),
        cell: ({row}) => {
          const {color, label} = {
            done: {color: 'success', label: 'انجام شده'},
            rejected: {color: 'error', label: 'رد شده'},
            pending: {color: 'neutral', label: 'در انتظار'},
            processing: {color: 'info', label: 'در حال انجام'},
          }[row.getValue<Order['status']>('status') as 'done' | 'rejected' | 'pending' | 'processing']

          return h(UBadge, {class: 'capitalize w-full justify-center', variant: 'subtle', color}, () => label)
        }
      }
    ]
)
</script>

<template>
  <UTable :columns="columns" :data="orders" class="h-150" sticky/>
</template>

<style scoped>

</style>