<template>
  <div class="space-y-10">
    <section>
      <h2 class="font-bold text-2xl">{{ $t('pages.tickets.titles.new_ticket') }}</h2>
      <p>{{ $t('pages.tickets.messages.notice_faq') }}</p>
      <UButton
          :label="$t('pages.tickets.labels.faq')"
          :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')"
          class="mt-4"
          size="xl"/>
    </section>
    <section>
      <ClientOnly>
        <UForm class="w-full md:w-lg space-y-4" @submit.prevent="submit">
          <UFormField :label="$t('pages.tickets.labels.choose_category')" required size="xl">
            <USelectMenu
                v-model="payload.category"
                :items="categories"
                :label-key="labelKey"
                :placeholder="$t('pages.tickets.placeholders.choose_category')"
                class="w-full"
                required
                value-key="id"/>
          </UFormField>

          <UFormField :label="$t('pages.tickets.labels.choose_priority')" required size="xl">
            <USelectMenu
                v-model="payload.priority"
                :items="priorityItems"
                class="w-full"
                label-key="label"
                required
                value-key="value"
            />
          </UFormField>


          <UFormField :label="$t('pages.tickets.labels.new_ticket_topic')" required size="xl">
            <UInput
                v-model="payload.subject"
                class="w-full"
                required
            />
          </UFormField>

          <UFormField :label="$t('pages.tickets.labels.new_ticket_description')" required size="xl">
            <UTextarea
                v-model="payload.message"
                class="w-full"
                required
            />
          </UFormField>

          <UFormField size="xl">
            <UFileUpload
                v-model="payload.attachments"
                class="w-full"
                multiple
            />
          </UFormField>

          <UFormField size="xl">
            <UButton
                :label="$t('common.labels.send')"
                :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')"
                size="xl"
                :loading="pending"
                type="submit"/>
          </UFormField>
        </UForm>
      </ClientOnly>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type {TicketCategory} from "~/types/tickets";
import type {CreateTicketPayload} from "~/types/payload";

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
})
const categories = ref<TicketCategory[]>([])

const priorityItems = computed(() => [
  {value: 'low', label: $t('common.priorities.low')},
  {value: 'medium', label: $t('common.priorities.medium')},
  {value: 'high', label: $t('common.priorities.high')},
])
const {pending, create} = useCreateTicket()

const {locale} = useI18n()

const labelKey = computed<keyof TicketCategory>(() => `title_${locale.value.toLowerCase()}` as keyof TicketCategory)

if (!import.meta.server)
  categories.value = (await useLoadTicketCategoryList()).value

const other_category = computed(() => categories.value.find(cat => cat.slug === 'other'))

const payload = ref<CreateTicketPayload>({
  subject: '',
  message: '',
  category: other_category.value?.id || undefined as unknown as number,
  attachments: undefined,
  priority: 'low',
})

const submit = async () => {
  const response = await create(payload.value)
  if (response?.data.value?.ok) {
    navigateTo(useLocalePath()('dashboard-support'))
    useToast().add({
      title: $t('pages.tickets.titles.created'),
      description: $t('pages.tickets.messages.created', [response.data.value.ticket_id]),
      color: 'success',
    })
  }
}

</script>
