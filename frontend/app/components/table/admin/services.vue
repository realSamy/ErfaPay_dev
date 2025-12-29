<template>
  <UTable :columns="columns" :data="services" class="h-80" sticky/>
</template>

<script lang="ts" setup>
import {h, resolveComponent} from 'vue'
import type {TableColumn} from '@nuxt/ui'
import type {Service} from "~/types/services";
import type {TableRow} from "@nuxt/ui";

const {n, t, locale} = useI18n()
const UButton = resolveComponent('UButton')

const toast = useToast()

const services = reactive<Service[]>([])

const columns = ref<TableColumn<Service>[]>([
  {
    accessorKey: 'id',
    header: '#',
    cell: ({row}) => n(Number(row.getValue('id')))
  },
  {
    accessorKey: 'title_en',
    header: t('common.tables.title'),
    cell: ({row}) => {
      const titleFa = row.original.title_fa;
      const titleEn = row.original.title_en;
      return locale.value === 'en' ? titleEn : titleFa;
    }
  },
  {
    accessorKey: 'commission_type',
    header: t('common.tables.commission'),
    maxSize: 10,
    cell: ({row}) => {
      if (row.original.commission_type === 'percent') {
        return n(Number(row.original.commission_percent), {
          style: 'percent'
        })
      } else {
        return n(Number(row.original.commission_fixed)) + ' ' + t('common.currencies.symbol.toman')
      }
    }
  },
  {
    accessorKey: 'tax_rate',
    header: t('common.tables.tax'),
    maxSize: 10,
    cell: ({row}) => n(Number(row.original.tax_rate), {
      style: 'percent'
    })
  },
  {
    accessorKey: 'is_active',
    header: t('common.tables.state'),
    cell: ({row}) => {
      const {label, color}: Record<string, string> = {
        enabled: {color: 'success', label: t('common.states.enabled')},
        disabled: {color: 'neutral', label: t('common.states.disabled')},
      }[row.getValue('is_active') ? 'enabled' : 'disabled'];

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
    header: t('common.tables.operations'),
    cell: ({row}) => {
      const divClassNames = 'flex space-x-2 justify-center';

      const editButton = h(
          UButton,
          {
            variant: 'ghost',
            color: 'neutral',
            to: useLocalePath()({name: 'admin-services-id', params: {id: row.original.id}}),
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
)

async function loadServices() {
  const {data: response} = await useAdminServices()
  if (response.value?.ok) {
    services.splice(0, services.length, ...response.value.data)
  }
}

async function handleDeleteService(row: TableRow<Service>) {
  const id = row.getValue('id') as number
  const titleFa = row.original.title_fa;
  const titleEn = row.original.title_en;
  const title = locale.value === 'en' ? titleEn : titleFa;

  const confirmed = await useConfirm({
    title: 'حذف سرویس',
    message: `آیا مطمئن هستید که می‌خواهید سرویس "${title}" را حذف کنید؟ این عمل قابل بازگشت نیست.`,
    cancelLabel: 'خیر',
    confirmLabel: 'بله، حذف کن',
    confirmColor: 'error',
  })

  if (confirmed) {
    const {data: response} = await useAdminDeleteService(id).remove()
    if (response.value?.ok) {
      await loadServices()

      toast.add({
        title: 'سرویس حذف شد',
        color: 'success',
        icon: 'i-hero-trash'
      })
    } else {
      toast.add({
        title: 'خطا در حذف سرویس',
        description: response.value?.error || 'خطای ناشناخته',
        color: 'error',
        icon: 'i-hero-x-circle'
      })
    }

  }
}

function handleEditService(row: TableRow<Service>) {

}

async function handleToggleService(row: TableRow<Service>) {
  const id = row.getValue('id') as number;
  const service = services.find(service => service.id === id);
  const titleFa = row.original.title_fa;
  const titleEn = row.original.title_en;
  const title = locale.value === 'en' ? titleEn : titleFa;

  if (service) {
    const phrase = service.is_active ? 'غیرفعال' : 'فعال';

    const confirmed = await useConfirm({
      title: `${phrase} سازی سرویس`,
      message: `سرویس "${title}" ${phrase} شود؟`,
      cancelLabel: 'خیر',
      confirmLabel: `${phrase} کن`,
      confirmColor: service.is_active ? 'error' : 'success',
    })

    if (confirmed) {
      await useAdminUpdateService(id).update({is_active: !service.is_active})
      await loadServices()
    }
  }
}

onMounted(async () => {
  await loadServices()
})
</script>