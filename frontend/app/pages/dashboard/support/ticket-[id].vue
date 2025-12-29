<template>
  <div class="max-h-full h-full flex flex-col lg:flex-row-reverse gap-4 relative">
    <section
        v-if="ticket"
        class="bg-blue-400 text-white dark:bg-blue-900 w-full p-2 h-100 lg:w-[400px] lg:h-full rounded-md shadow-sm">
      <div class="justify-end lg:hidden flex">
        <UButton
              variant="link"
              class="text-white"
              :label="$t('navigation.back_tickets')"
              :to="useLocalePath()('dashboard-support')"
              :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')" />
      </div>
      <div class="w-full flex justify-center items-center py-8 font-bold text-xl">
          <span>
            {{ ticket.user.full_name }}
          </span>
      </div>

      <div class="flex lg:flex-col justify-between gap-6">
        <div class="space-y-4">
          <div class="flex flex-col lg:flex-row lg:justify-between">
            <h2>{{ $t('pages.tickets.titles.subject') }}</h2>
            <span class="font-bold text-lg">{{ ticket.subject }}</span>
          </div>
          <div class="flex flex-col lg:flex-row lg:justify-between">
            <h2>{{ $t('common.tables.operations') }}</h2>
            <div class="space-x-2">
              <UButton
                  :disabled="['closed', 'resolved'].includes(ticket.status) || !ticket.assigned_to"
                  :title="$t('pages.tickets.labels.mark_as_closed')"
                  color="success"
                  icon="material-symbols:task-rounded"
                  size="xl"
                  variant="soft"
                  @click="handleCloseTicket"/>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h2 class="font-medium text-center">جزییات تیکت ارسالی</h2>
          <div class="space-y-1">
            <div class="grid grid-cols-2">
              <span>زمان ایجاد تیکت:</span>
              <span class="font-bold text-end">{{ $d(new Date(ticket.created_at), fullDate) }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span>زمان آخرین بروزرسانی:</span>
              <span class="font-bold text-end">{{ $d(new Date(ticket.updated_at), fullDate) }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span>نام پشتیبان:</span>
              <span class="font-bold text-end">
                  {{ ticket.assigned_to ? ticket.assigned_to.full_name : '-' }}
                </span>
            </div>
            <div class="grid grid-cols-2">
              <span>{{ $t('common.tables.category') }}:</span>
              <span class="font-bold text-end">{{ ticket.category.title_fa }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span>{{ $t('pages.tickets.titles.current_state') }}:</span>
              <span class="font-bold text-end">{{ statusMap[ticket.status] }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="h-full flex flex-col grow contain-size">
      <div class="justify-between hidden lg:flex">
        <div>
          <h2 class="font-bold">{{ ticket?.subject }}</h2>
        </div>
        <div>
          <UButton
              variant="link"
              color="neutral"
              :label="$t('navigation.back_tickets')"
              :to="useLocalePath()('dashboard-support')"
              :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')" />
        </div>
      </div>
      <UChatPalette>
        <UChatMessages
            :assistant="{variant: 'subtle', icon: 'material-symbols:support-agent-rounded', ui: {container: 'rtl:flex-row-reverse rtl:justify-start'}}"
            :messages="messages"
            :user="{variant: 'subtle', icon: 'material-symbols:person', ui: {container: 'rtl:ms-0 ltr:flex-row-reverse ltr:justify-start'}}"
            auto-scroll
        >
          <template #content="{ message }">
            <div class="space-y-2">
              <div v-for="part in message.parts">
                <p v-if="part.type === 'text'" :class="{'mb-6': message.parts.length > 1}">
                  {{ part.text }}
                </p>
                <a
                    v-else-if="part.type === 'file'"
                    :href="part.url"
                    class="rounded-md font-medium w-40 inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors cursor-pointer dark:text-white px-2.5 py-1.5 text-sm gap-1.5 text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10"
                    target="_blank"
                >
                  <UIcon name="material-symbols:attach-file"/>
                  <span class="truncate max-w-30">{{ part.filename || 'Download file' }}</span>
                </a>
              </div>

            </div>
          </template>
        </UChatMessages>

        <template #prompt>
          <UButton
              v-if="['closed', 'resolved'].includes(ticket?.status || '')"
              :label="$t('pages.tickets.messages.is_closed')"
              block
              color="warning"
              disabled/>
          <UButton
              v-if="!ticket?.assigned_to"
              :label="$t('pages.tickets.messages.is_waiting_assign')"
              block
              color="neutral"
              disabled/>
          <UChatPrompt
              v-else
              v-model="payload.message"
              :disabled="isSendDisabled"
              :maxrows="4"
              autofocus
              variant="subtle"
              @submit.prevent="replyHandler">
            <template #header>
              <ul v-if="payload.attachments?.length" class="inline-flex gap-2 flex-wrap">
                <li v-for="attachment in payload.attachments">
                  <UChip :ui="{root: 'rounded-none'}" color="neutral" size="xl">
                    <div>
                      <UBadge :label="attachment.name" class="text-white" icon="material-symbols:attach-file"/>
                    </div>
                    <template #content>
                      <UIcon
                          class="cursor-pointer"
                          name="material-symbols:close"
                          @click="() => {
                                payload.attachments = payload.attachments?.filter(a => a.name !== attachment.name)
                              }"
                      />
                    </template>
                  </UChip>
                </li>
              </ul>
            </template>

            <UFileUpload
                v-slot="{open}"
                v-model="payload.attachments"
                :disabled="isSendDisabled"
                :ui="{base: 'border-transparent'}"
                class="border-transparent"
                multiple
                variant="button"
            >
              <UChatPromptSubmit
                  :disabled="isSendDisabled"
                  class="rtl:rotate-180" icon="material-symbols:attach-file" variant="ghost"
                  @click.prevent="open()"/>
            </UFileUpload>
            <UChatPromptSubmit
                :disabled="isSendDisabled"
                class="rtl:rotate-180"
                icon="material-symbols:send-rounded"
                variant="ghost"/>
          </UChatPrompt>
        </template>
      </UChatPalette>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type {TicketMessage, Ticket} from "~/types/tickets";
import type {ReplyTicketPayload} from '~/types/payload';
import {useCloseTicket} from "~/composables/useTickets";
import {useBreadcrumbStore} from "~/composables/useBreadcrumbStore";

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
})

const fullDate = {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
}
const ticket_id = useRoute().params.id as string
const payload = ref<ReplyTicketPayload>({
  message: '',
  attachments: []
})

const breadcrumbState = useBreadcrumbStore()
breadcrumbState.value = {ticket: ticket_id}

const ticket = ref<Ticket>();
const {reply: ticketReply, pending: ticketReplyLoading} = useReplyTicket(ticket_id)
const {close} = useCloseTicket(ticket_id)

const messages = computed<TicketMessage[]>(() => ticket.value?.messages || [])
const {user} = useAuth()
const statusMap = computed<Record<Ticket['status'], string>>(() => ({
      open: $t('pages.tickets.titles.waiting_open'),
      in_progress: $t('common.ticket_status.in_progress'),
      closed: $t('common.ticket_status.closed'),
      resolved: $t('common.ticket_status.resolved'),
      waiting_user: $t('common.ticket_status.waiting_user'),
    }
))

const isSendDisabled = computed(() => {
  if (ticket.value?.assigned_to?.id !== user.value?.id && user.value?.role !== 'main_admin') {
    return true
  }
  if (['closed', 'resolved'].includes(ticket.value?.status ?? '')) {
    return true
  }

  return false
})
const replyHandler = async () => {
  if (!ticket.value)
    return;
  const {data: response, error} = await ticketReply(payload.value)
  if (response.value?.ok) {
    ticket.value = response.value.data
    payload.value = {
      message: '',
      attachments: [],
    }
  }
}

const handleCloseTicket = async () => {
  const confirmed = await useConfirm({
    title: $t('pages.tickets.labels.mark_as_closed'),
    message: $t('pages.tickets.messages.mark_as_closed', [ticket_id]),
    confirmLabel: $t('pages.tickets.labels.mark_as_closed'),
    confirmColor: 'error',
  })
  if (!confirmed) {
    return
  }
  const {data: response} = await close()
  if (response.value?.ok)
    ticket.value = response.value.data
}

if (!import.meta.server) {
  const {data: response} = await useGetTicket(ticket_id)
  if (response.value?.ok) {
    ticket.value = response.value.data
  }
}

</script>