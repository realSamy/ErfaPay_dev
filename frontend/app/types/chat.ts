export interface ChatRoom {
  id: number
  customer_name: string
  customer_username: string
  agent_name: string | null
  is_active: boolean
  messages: ChatMessage[]
  last_message_at: string
  last_message: { text: string } | null
}

export interface ChatMessage {
  id: number
  text: string
  sender: string
  sender_id: number
  date_time: string
  read: boolean
}