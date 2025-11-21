<template>
  <UTable :columns="columns" :data="services" class="h-80" sticky/>
</template>

<script lang="ts" setup>
import {h, resolveComponent} from 'vue'
import type {TableColumn} from '@nuxt/ui'
import type {service} from "~/types/admin/table";
import type {TableRow} from "@nuxt/ui";
import {LazyModalConfirm} from "#components";

const {n} = useI18n()
const UButton = resolveComponent('UButton')

const toast = useToast()
const overlay = useOverlay()
const modal = overlay.create(LazyModalConfirm)


const services = ref<service[]>([
  {id: 1, state: true, fee: 7, title: 'پرداخت قبض'},
  {id: 2, state: true, fee: 5, title: 'پرداخت اجاره'},
  {id: 3, state: false, fee: 10, title: 'کارت به کارت'},
  {id: 4, state: false, fee: 10, title: 'کارت به کارت'},
  {id: 5, state: false, fee: 10, title: 'کارت به کارت'},
  {id: 6, state: false, fee: 2, title: 'افزایش شارژ'},
]);

const columns: TableColumn<service>[] = [
  {
    accessorKey: 'id',
    header: 'ردیف',
    cell: ({row}) => n(Number(row.getValue('id')))
  },
  {
    accessorKey: 'title',
    header: 'عنوان',
  },
  {
    accessorKey: 'fee',
    header: 'کارمزد',
    maxSize: 10,
    cell: ({row}) => new Intl.NumberFormat('fa-IR', {useGrouping: false}).format(Number(row.getValue('fee'))) + '%'
  },
  {
    accessorKey: 'state',
    header: 'وضعیت سرویس',
    cell: ({row}) => {
      const {label, color} = {
        enabled: {color: 'success', label: 'فعال'},
        disabled: {color: 'neutral', label: 'غیرفعال'},
      }[row.getValue('state') ? 'enabled' : 'disabled'];

      return h(UButton,
          {
            color,
            variant: 'subtle',
            block: true,
            onClick: () => handleToggleService(row),
            label
          },
      )
    }
  },
  {
    accessorKey: 'id',
    header: 'عملیات',
    cell: ({row}) => {
      const divClassNames = 'flex space-x-2 justify-center';

      const editButton = h(
          UButton,
          {
            variant: 'ghost',
            color: 'neutral',
            onClick: () => handleEditService(row),
            class: 'p-1',
            icon: 'material-symbols:edit-square-outline',
          }
      );

      const deleteButton = h(
          UButton,
          {
            variant: 'ghost',
            color: 'error',
            onClick: () => handleDeleteService(row),
            class: 'p-1',
            icon: 'material-symbols:delete-outline'
          }
      );
      return h('div', {class: divClassNames}, [editButton, deleteButton]);
    },
  }]

async function handleDeleteService(row: TableRow<service>) {
  const id = row.getValue('id') as number
  const title = row.getValue('title') as string

  const instance = modal.open({
    title: 'حذف سرویس',
    message: `آیا مطمئن هستید که می‌خواهید سرویس "${title}" را حذف کنید؟ این عمل قابل بازگشت نیست.`,
    cancelLabel: 'خیر',
    confirmLabel: 'بله، حذف کن',
    confirmColor: 'error',
  })

  const confirmed = await instance.result

  if (confirmed) {
    const index = services.value.findIndex(o => o.id === id)
    if (index !== -1) {
      services.value.splice(index, 1)  // Remove from array
    }

    toast.add({
      title: 'سرویس حذف شد',
      color: 'success',
      icon: 'i-hero-trash'
    })
  }
}

function handleEditService(row: TableRow<service>) {

}

async function handleToggleService(row: TableRow<service>) {
  const id = row.getValue('id') as number;
  const service = services.value.find(service => service.id === id);


  if (service) {
    const phrase = service.state ? 'غیرفعال' : 'فعال';
    const instance = modal.open({
      title: `${phrase} سازی سرویس`,
      message: `سرویس "${service.title}" ${phrase} شود؟`,
      cancelLabel: 'خیر',
      confirmLabel: `${phrase} کن`,
      confirmColor: service.state ? 'error' : 'success',
    })

    const confirmed = await instance.result

    if (confirmed) service.state = !service.state;
  }
}
</script>