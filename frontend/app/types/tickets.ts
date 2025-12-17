import type {User} from "~/types/users";

export interface TicketCategory {
  id: number
  title_fa: string
  title_en: string
  slug: string
  order: number
  is_active: boolean
}

export interface TicketCategoryCreate {
  title_fa: string
  title_en: string
  order?: number
  is_active?: boolean
}

export interface TicketCategoryUpdate {
  title_fa?: string
  title_en?: string
  order?: number
  is_active?: boolean
}

type TicketStatus = 'open' | 'in_progress' | 'closed' | 'waiting_user' | 'resolved'
type TicketPriority = 'low' | 'medium' | 'high'

export interface Ticket {
  id: number
  ticket_id: string
  user: User
  subject: string
  category: TicketCategory
  status: TicketStatus
  priority: TicketPriority
  assigned_to?: User
  created_at: string
  updated_at: string
  messages?: TicketMessage[]
}

export interface TicketMessage {
  id: number
  ticket: number
  sender: User
  message: string
  is_staff: boolean
  created_at: string
  attachments: { id: number; file: string; name: string }[]
}