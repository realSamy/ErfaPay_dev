<script lang="ts" setup>
import {h, resolveComponent} from 'vue'
import type {TableColumn} from '@nuxt/ui'
import type {Order} from "~/types/data";

const {n} = useI18n()
const UBadge = resolveComponent('UBadge')


const orders: Order[] = [
  {id: '1', orderNumber: '432891', date: '2024-02-18T10:15:00', status: 'pending', type: 'recharge', amount: 192000},
  {id: '2', orderNumber: '893120', date: '2024-03-22T13:40:00', status: 'processing', type: 'exchange', amount: 845000},
  {id: '3', orderNumber: '124589', date: '2024-04-05T09:05:00', status: 'done', type: 'bills', amount: 594000},
  {id: '4', orderNumber: '912457', date: '2024-05-10T16:25:00', status: 'rejected', type: 'recharge', amount: 310000},
  {id: '5', orderNumber: '381290', date: '2024-06-03T08:45:00', status: 'processing', type: 'exchange', amount: 712500},
  {id: '6', orderNumber: '729154', date: '2024-06-20T12:00:00', status: 'done', type: 'bills', amount: 256000},
  {id: '7', orderNumber: '547812', date: '2024-07-01T14:30:00', status: 'pending', type: 'recharge', amount: 485000},
  {id: '8', orderNumber: '618293', date: '2024-07-14T11:15:00', status: 'done', type: 'exchange', amount: 923000},
  {id: '9', orderNumber: '835792', date: '2024-07-29T18:50:00', status: 'rejected', type: 'bills', amount: 142000},
  {
    id: '10',
    orderNumber: '291573',
    date: '2024-08-08T09:40:00',
    status: 'processing',
    type: 'recharge',
    amount: 367500
  },
  {id: '11', orderNumber: '918372', date: '2024-08-20T07:20:00', status: 'done', type: 'exchange', amount: 781000},
  {id: '12', orderNumber: '472815', date: '2024-09-05T19:10:00', status: 'pending', type: 'bills', amount: 198000},
  {id: '13', orderNumber: '239187', date: '2024-09-15T15:25:00', status: 'done', type: 'recharge', amount: 605000},
  {
    id: '14',
    orderNumber: '754932',
    date: '2024-10-01T10:50:00',
    status: 'processing',
    type: 'exchange',
    amount: 952000
  },
  {id: '15', orderNumber: '613829', date: '2024-10-18T13:35:00', status: 'rejected', type: 'bills', amount: 279000},
  {id: '16', orderNumber: '589173', date: '2024-11-02T08:05:00', status: 'done', type: 'recharge', amount: 431000},
  {id: '17', orderNumber: '827461', date: '2024-11-20T17:00:00', status: 'pending', type: 'exchange', amount: 665000},
  {id: '18', orderNumber: '374615', date: '2024-12-03T20:15:00', status: 'done', type: 'bills', amount: 311000},
  {
    id: '19',
    orderNumber: '951284',
    date: '2024-12-15T09:55:00',
    status: 'processing',
    type: 'recharge',
    amount: 224000
  },
  {id: '20', orderNumber: '164729', date: '2024-12-29T11:45:00', status: 'rejected', type: 'exchange', amount: 875000}
];

const columns: TableColumn<Order>[] = [
  {
    accessorKey: 'id',
    header: 'ردیف',
    cell: ({row}) => n(Number(row.getValue('id')))
  },
  {
    accessorKey: 'orderNumber',
    header: 'شماره سفارش',
    cell: ({row}) => new Intl.NumberFormat('fa-IR', {useGrouping: false}).format(Number(row.getValue('orderNumber')))
  },
  {
    accessorKey: 'type',
    header: 'نوع درخواست',
    cell: ({row}) => ({
      recharge: 'شارژ حساب' as const,
      exchange: 'انتقال پول' as const,
      bills: 'پرداخت قبض' as const,
    }[row.getValue('type') as string])
  },
  {
    accessorKey: 'amount',
    header: () => h('div', {class: 'text-right'}, 'مبلغ سفارش'),
    cell: ({row}) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('fa-IR').format(amount)
      return `${formatted} تومان`;
    }
  },
  {
    accessorKey: 'date',
    header: 'تاریخ',
    cell: ({row}) => {
      return new Date(row.getValue('date')).toLocaleString('fa-IR', {
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
    header: 'وضعیت',
    cell: ({row}) => {
    const { color, label } = {
        done: { color: 'success', label: 'انجام شده' },
        rejected: { color: 'error', label: 'رد شده' },
        pending: { color: 'neutral', label: 'در انتظار' },
        processing: { color: 'info', label: 'در حال انجام' },
      }[row.getValue('status') as 'done' | 'rejected' | 'pending' | 'processing']

      return h(UBadge, {class: 'capitalize w-full justify-center', variant: 'subtle', color}, label)
    }
  }
]
</script>

<template>
  <UTable :columns="columns" :data="orders" class="h-150" sticky/>
</template>

<style scoped>

</style>