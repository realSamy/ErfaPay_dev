<template>
  <div v-if="user" class="flex flex-row-reverse max-h-full grow relative bg-gray-50 dark:bg-gray-900">
    <!-- Left Sidebar: Active Chats List -->
    <aside :class="{'hidden': selectedRoom}"
           class="w-full flex flex-col max-h-full md:w-80 border-l relative contain-strict border-accented md:block bg-ui-highlight">
      <div class="p-4 h-20 flex items-center border-b border-accented">
        <h2 class="text-lg font-semibold">Active Chats</h2>
      </div>
      <div class="overflow-hidden overflow-y-auto h-full">
        <div
            v-for="room in chatRooms"
            :key="room.id"
            :class="[
            'p-4 border-b border-accented cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
            selectedRoom?.id === room.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
          ]"
            @click="selectRoom(room)"
        >
          <div class="flex justify-between items-start">
            <div>
              <p class="font-medium">{{ room.customer_name || room.customer_username }}</p>
              <p class="text-sm text-gray-500 truncate">
                {{ room.last_message?.text || 'No messages yet' }}
              </p>
            </div>
            <UBadge v-if="!room.is_active" color="neutral" size="sm">{{ $t('live_chat.labels.ended') }}</UBadge>
            <UBadge v-else-if="!room.agent_name" color="secondary" size="sm">{{
                $t('live_chat.labels.unassigned')
              }}
            </UBadge>
            <UBadge v-else-if="room.agent_name === user.full_name" color="success" size="sm">
              {{ $t('live_chat.labels.assigned_you') }}
            </UBadge>
            <UBadge v-else color="success" size="sm">{{ $t('live_chat.labels.assigned_busy') }}</UBadge>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            {{ formatDate(room.last_message_at) }}
          </p>
        </div>
      </div>
    </aside>

    <!-- Main Chat Area -->
    <div :class="{'hidden': !selectedRoom}" class="flex-1 flex flex-col">
      <div v-if="!selectedRoom" class="flex-1 flex items-center justify-center text-gray-500">
        Select a chat to start messaging
      </div>

      <div v-else class="flex flex-col h-full grow contain-size">
        <div class="p-4 h-20 border-b border-accented bg-white dark:bg-gray-800 flex justify-between">
          <div>
            <h2 class="font-bold text-xl">{{ selectedRoom.customer_name || selectedRoom.customer_username }}</h2>
            <p class="text-sm text-gray-500">
              {{
                selectedRoom.agent_name ? $t('live_chat.labels.assigned_to', [selectedRoom.agent_name]) : $t('live_chat.labels.unassigned')
              }}
            </p>
          </div>
          <div>
            <UButton
                :title="$t('live_chat.labels.end_chat')"
                color="error"
                icon="material-symbols:block-outline"
                size="xl"
                variant="link"
                @click="handleEndChat"/>
            <UButton
                :icon="directionalIcon('material-symbols:arrow-back', 'material-symbols:arrow-forward')"
                color="neutral"
                size="xl"
                variant="link"
                @click="handleCloseChat"/>
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
                <p>{{ message.text }}</p>
                <p class="text-xs text-muted">
                  {{ formatDate(message.date_time) }}
                </p>
              </div>
            </template>
          </UChatMessages>

          <template #prompt>
            <UButton
                v-if="!selectedRoom?.agent_name"
                :label="$t('live_chat.labels.assign_me')"
                block
                color="primary"
                @click="assignSelectedRoom"
            />
            <UButton
                v-else-if="selectedRoom?.agent_name !== user.full_name"
                :label="$t('live_chat.messages.assigned_else')"
                block
                color="primary"
                disabled
                @click="assignSelectedRoom"
            />

            <UButton v-if="!selectedRoom.is_active" :label="$t('live_chat.messages.chat_ended')" block color="neutral"
                     disabled size="xl"/>
            <UChatPrompt
                v-else-if="selectedRoom?.agent_name === user.full_name"
                v-model="newMessage"
                :disabled="!selectedRoom.agent_name || selectedRoom.agent_name !== user.full_name"
                placeholder="Type your message..."
                @submit="sendMessage"
            >
              <UChatPromptSubmit icon="material-symbols:send-rounded"/>
            </UChatPrompt>
          </template>
        </UChatPalette>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {ChatMessage, ChatRoom} from "~/types/chat";

definePageMeta({
  middleware: ['auth', 'admin'],
  layout: 'admin'
})

const {user} = useAuth()
const {t, d} = useI18n()
const chatRooms = ref<ChatRoom[]>([])
const selectedRoom = ref<ChatRoom | null>(null)
const messages = ref<ChatMessage[]>([])
const newMessage = ref('')
let ws: WebSocket | null = null

// Fetch active chats
const fetchChats = async () => {
  const {data} = await useAuthApi('/api/chat/admin/list/')
  if (data.value) chatRooms.value = data.value
}

const fetchRoom = async (roomId: number | string) => {
  const {data} = await useAuthApi<ChatRoom>(`/api/chat/admin/room/${roomId}/`)
  if (data.value?.id) {
    return data.value
  }
  throw createError(`Room ${roomId} not found`)
}

// Select room
const selectRoom = async (room: ChatRoom) => {
  room = await fetchRoom(room.id)
  selectedRoom.value = room
  messages.value = room.messages
  connectWebSocket(room.id)
}

// Connect to WebSocket
const connectWebSocket = (roomId: number | string) => {
  if (ws) ws.close()

  const {accessToken: token} = useAuth()
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
  ws = new WebSocket(`${protocol}://${window.location.host.replace(':3000', ':8000')}/ws/chat/${roomId}/`)

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.type === 'new_message') {
      messages.value.push(data.message)
    }
  }

  ws.onopen = () => console.log('WS connected')
  ws.onclose = () => console.log('WS closed')
}

// Send message
const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedRoom.value) return

  useAuthApi('/api/chat/message/send/', {
    method: 'POST',
    body: {
      text: newMessage.value,
      room_id: selectedRoom.value.id
    }
  })

  newMessage.value = ''
}

// Assign chat to current agent
const assignSelectedRoom = async () => {
  if (!selectedRoom.value) return
  const {data} = await useAuthApi<ChatRoom>(`/api/chat/admin/room/${selectedRoom.value.id}/`, {method: 'PATCH'})
  if (data.value) {
    await fetchChats()
    selectRoom(data.value) // refresh
  }

}

const handleEndChat = async () => {
  if (!selectedRoom.value) return
  const confirmed = await useConfirm({
    title: t('live_chat.labels.end_chat'),
    message: t('live_chat.messages.confirm_end'),
    confirmLabel: t('live_chat.labels.end_chat'),
    confirmColor: 'error',
    cancelLabel: t('common.labels.cancel')
  })
  if (!confirmed) return
  await useAuthApi(`/api/chat/admin/room/${selectedRoom.value.id}/`, {method: 'DELETE'})
  selectedRoom.value = null
  await fetchChats()
}

const handleCloseChat = () => {
  selectedRoom.value = null
  if (ws) {
    ws.close()
  }
}

const formatDate = (date: Date | string) => {
  if (typeof date === 'string') date = new Date(date)
  const now = new Date()

  const isToday =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()

  if (isToday) {
    return d(date, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  return d(date, {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
    hour12: false,
  })
}

onMounted(() => {
  fetchChats()
  setInterval(fetchChats, 10000) // poll every 10s
})
</script>