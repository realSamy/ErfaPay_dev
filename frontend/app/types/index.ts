export type UserRole =
  | 'regular'
  | 'simple_support'
  | 'senior_support'
  | 'main_admin'

export type ChargeMethod = 'paypal' | 'crypto' | 'voucher'
export type OrderStatus = 'pending' | 'processing' | 'done' | 'rejected'
export type TicketStatus = 'open' | 'in_progress' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high'

// Base User
export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: UserRole
  country_code: string
  phone?: string
  is_verified: boolean
  blocked: boolean
  date_joined: string
}

// Wallet
export interface Wallet {
  id: number
  user: number
  balance: string // IRR as string
  updated_at: string
}

// Charge Transaction
export interface ChargeTransaction {
  id: number
  wallet: number
  amount_usd: string
  amount_irr: string
  method: ChargeMethod
  status: 'pending' | 'completed' | 'failed'
  receipt_url?: string
  notes?: string
  created_at: string
}

// Product (Service)
export interface Product {
  id: number
  name: string
  name_fa: string
  description: string
  description_fa: string
  image?: string
  required_docs: string[] // e.g. ["card_photo", "car_card"]
  custom_form_fields: Record<string, any> // JSON from admin
  price_irr: string
  active: boolean
  created_by: User
}

// Order
export interface Order {
  id: number
  order_number: string
  user: User
  product: Product
  amount_irr: string
  tax_amount: string
  total_amount: string
  custom_data: Record<string, any>
  status: OrderStatus
  receipt_url?: string
  notes?: string
  processed_by?: User
  created_at: string
  updated_at: string
}

// Ticket
export interface Ticket {
  id: number
  user: User
  subject: string
  category: { id: number; name: string; name_fa: string }
  status: TicketStatus
  priority: TicketPriority
  assigned_to?: User
  created_at: string
  updated_at: string
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

// Site Settings (singleton)
export interface SiteSettings {
  id: number
  tax_rate: number // e.g. 10 for 10%
  min_paypal_usd: number
  order_open_hours: { start: string; end: string }[]
}

