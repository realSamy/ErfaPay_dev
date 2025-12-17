<template>
  <div>
    <div class="w-full flex justify-end">
      <UButton :label="$t('common.labels.add')" size="xl" trailing-icon="material-symbols:add" @click="handleCreate"/>
    </div>
    <UTable
        v-model:columns="columns"
        :data="items"
        :loading="loading"
    />
  </div>
</template>

<script lang="ts" setup>
import {h, resolveComponent} from 'vue'

import type {TicketCategory} from "~/types/tickets";
import type {TicketCategoryPayload, TicketCategoryUpdatePayload} from "~/types/payload";
import type {TableColumn} from "@nuxt/ui";

const items = useState<TicketCategory[]>('data.tickets.categories')
const loading = ref(true)

const UButton = resolveComponent('UButton')

useLoadTicketCategoryList().finally(() => loading.value = false)

const handleDelete = async (id: number) => {
  const category = items.value.find(i => i.id === id)
  if (!category) {
    return
  }
  const confirmed = await useConfirm({
    title: $t('modals.confirms.delete_ticket_category.title'),
    message: $t('modals.confirms.delete_ticket_category.description'),
    confirmLabel: $t('common.labels.delete'),
    confirmColor: 'error',
    confirmIcon: 'material-symbols:delete-outline'
  })

  if (confirmed) {
    const {data: response} = await useAdminDeleteTicketCategory(id)
    if (response.value?.ok) {
      await useLoadTicketCategoryList(true)
    }
  }
}
const handleEdit = async (id: number) => {
  const category = items.value.find(i => i.id === id)
  if (!category) {
    return
  }
  const payload = await usePrompt<TicketCategoryUpdatePayload>()({
    title_en: category.title_en,
    title_fa: category.title_fa,
  }, {
    title_fa: {label: $t('common.labels.title_fa')},
    title_en: {label: $t('common.labels.title_en')},
  }, {
    title: 'modals.prompts.edit_ticket_category.title',
    confirmLabel: 'common.labels.edit',
    confirmIcon: 'material-symbols:edit-outline'
  })
  if (payload) {
    const {data: response} = await useAdminUpdateTicketCategory(id, payload)
    if (response.value?.ok) {
      await useLoadTicketCategoryList(true)
    }
  }
}

const handleCreate = async () => {
  const tc_payload: TicketCategoryPayload = {
    title_en: '',
    title_fa: '',
  }

  const payload = await usePrompt<TicketCategoryPayload>()(tc_payload, {
    title_fa: {label: $t('common.labels.title_fa')},
    title_en: {label: $t('common.labels.title_en')},
  }, {
    title: 'modals.prompts.add_ticket_category.title',
    confirmLabel: 'common.labels.create',
    confirmIcon: 'material-symbols:add',
  })

  if (payload) {
    const {data} = await useAdminCreateTicketCategory(payload)
    if (data.value?.ok) {
      await useLoadTicketCategoryList(true)
    } else {
      useToast().add({
        title: $t('error.title'),
        description: JSON.stringify(data.value?.errors)
      })
    }
  } else {
  }
}

const columns = ref<TableColumn<TicketCategory>[]>([
      {
        accessorKey: 'id',
        header: '#',
        cell: ({row}) => row.original.id,
      },
      {
        accessorKey: 'title_fa',
        header: $t('common.labels.title_fa'),
        cell: ({row}) => row.original.title_fa,
      },
      {
        accessorKey: 'title_en',
        header: $t('common.labels.title_en'),
        cell: ({row}) => row.original.title_en,
      },
      {
        accessorKey: 'actions',
        header: $t('common.tables.operations'),
        cell: ({row}) => {
          const divClassNames = 'space-x-2';

          const editButton = h(
              UButton,
              {
                variant: 'ghost',
                color: 'neutral',
                onClick: () => handleEdit(row.original.id),
                class: 'p-1',
                icon: 'material-symbols:edit-square-outline',
              }
          );

          const deleteButton = h(
              UButton,
              {
                variant: 'ghost',
                color: 'error',
                onClick: () => handleDelete(row.original.id),
                class: 'p-1',
                icon: 'material-symbols:delete-outline'
              }
          );
          return h('div', {class: divClassNames}, [editButton, deleteButton]);
        }
      }
    ]
)
</script>
