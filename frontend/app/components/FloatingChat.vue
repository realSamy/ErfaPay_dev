<template>
  <!-- Floating Chat Button -->
  <div class="fixed bottom-6 end-6 z-50">
    <!-- Toggle Button -->
    <UButton
        v-if="user"
      @click="isOpen = !isOpen"
      size="xl"
      :class="{'animate-bounce': !isOpen}"
      class="rounded-full justify-center items-center shadow-lg p-4 hover:scale-110 transition-transform"
      :icon="isOpen ? 'material-symbols:close-rounded' : 'material-symbols:chat-rounded'"
    />

    <!-- Chat Window -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed md:absolute bottom-0 md:bottom-20 end-0 w-screen h-screen md:w-96 md:h-96 lg:w-96 lg:h-128 bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col overflow-hidden"
      >
        <!-- Header -->
        <div class="bg-primary-600 text-white p-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <UIcon name="material-symbols:support-agent-rounded" class="text-2xl" />
            <div>
              <h3 class="font-semibold">{{ $t('live_chat.title') }}</h3>
              <p class="text-sm opacity-90">
                <span v-if="currentRoom?.agent_name">{{currentRoom.agent_name}}</span>
                <span v-else>{{ $t('live_chat.description') }}</span>
              </p>
            </div>
          </div>
          <UButton
            @click="isOpen = false"
            variant="ghost"
            color="neutral"
            size="sm"
            icon="material-symbols:close-rounded"
          />
        </div>

        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          <div v-if="messages.length === 0" class="text-center text-gray-500 mt-8">
            {{$t('live_chat.messages.send_to_start')}}
          </div>

          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="[
              'flex',
              msg.sender_id === user?.id ? 'justify-end' : 'justify-start'
            ]"
          >
            <div
              :class="[
                'max-w-xs px-4 py-2 rounded-2xl',
                msg.sender_id === user?.id
                  ? 'bg-primary-600 text-white ltr:rounded-br-none rtl:rounded-bl-none'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white ltr:rounded-bl-none rtl:rounded-br-none'
              ]"
            >
              <p class="text-sm">{{ msg.text }}</p>
              <p class="text-xs opacity-70 mt-1">
                {{ $d(new Date(msg.date_time), { hour: '2-digit', minute: '2-digit' }) }}
                <span v-if="msg.sender_id === user?.id">✓</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
          <UChatPrompt
            v-model="newMessage"
            @submit="sendMessage"
            :placeholder="$t('live_chat.placeholders.write_message')"
            :disabled="isSending || !currentRoom"
            variant="subtle"
          >
            <UChatPromptSubmit
              :disabled="isSending || !currentRoom || !newMessage.trim()"
              icon="material-symbols:send-rounded"
              class="rtl:rotate-180"
            />
          </UChatPrompt>

          <p v-if="!currentRoom" class="text-xs text-center text-gray-500 mt-2">
            {{ $t('live_chat.messages.starting_new') }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type {ChatRoom} from "~/types/chat";

const { user } = useAuth()

const isOpen = ref(false)
const newMessage = ref('')
const isSending = ref(false)

interface ChatMessage {
  id: number
  text: string
  sender_id: number
  date_time: string
}

const currentRoom = ref<ChatRoom | null>(null)
const messages = ref<ChatMessage[]>([])
let ws: WebSocket | null = null

// Start a new chat room if not exists
const startChat = async () => {
  if (currentRoom.value) return

  const {data} = await useAuthApi<ChatRoom>('/api/chat/current/', { method: 'GET' })
  if (data.value?.id) {
    currentRoom.value = data.value
    messages.value = data.value.messages || []
    connectWebSocket()
    return
  } else {
    const {data} = await useAuthApi<ChatRoom>('/api/chat/start/', {method: 'POST'})
    if (data.value) {
      currentRoom.value = data.value
      connectWebSocket()
    }
  }
}

// Connect to WebSocket when chat opens
watch(isOpen, (open) => {
  if (open && !currentRoom.value) {
    startChat()
  }
  if (!open && ws) {
    ws.close()
    ws = null
  }
})

// WebSocket connection
const connectWebSocket = () => {
  if (!currentRoom.value) return
  if (ws) ws.close()

  const token = useCookie('token').value || ''
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
  ws = new WebSocket(`${protocol}://${window.location.host.replace(':3000', ':8000')}/ws/chat/${currentRoom.value.id}/?token=${token}`)

  ws.onopen = () => console.log('Chat WS connected')
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.type === 'new_message') {
      messages.value.push(data.message)
    }
  }
  ws.onclose = () => console.log('Chat WS closed')
}

// Send message
const sendMessage = async () => {
  if (!newMessage.value.trim() || !currentRoom.value) return

  isSending.value = true
  await useAuthApi('/api/chat/message/send/', {
    method: 'POST',
    body: {
      text: newMessage.value,
      room_id: currentRoom.value.id
    }
  })

  newMessage.value = ''
  isSending.value = false
}

// Close chat when unmounting
onUnmounted(() => {
  if (ws) ws.close()
})
</script>

<style scoped>
.h-128 {
  height: 32rem;
}
</style>