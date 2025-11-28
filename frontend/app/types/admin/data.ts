export type UserRole = 'regular' | 'simple_support' | 'senior_support' | 'main_admin'

// Base User (from Django auth)
export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: UserRole
  is_verified: boolean
  blocked: boolean
  country_code: string
}

// Wallet
export interface Wallet {
  id: number
  user: number | User  // ID or full object
  balance: number  // IRR
  created_at: string  // ISO datetime
  updated_at: string
}

// ChargeTransaction
export interface ChargeTransaction {
  id: number
  wallet: number | Wallet
  amount_usd: number
  amount_irr: number
  method: 'paypal' | 'crypto' | 'voucher'
  exchange_rate: number
  status: 'pending' | 'approved' | 'rejected'
  receipt_url?: string
  notes?: string
  created_at: string
}

// Product
export interface Product {
  id: number
  name: string
  description?: string
  image?: string  // URL
  required_docs?: string
  custom_form_fields: Record<string, any>
  price_irr: number
  is_active: boolean
  created_by?: number | User
  created_at: string
}

export interface OrderType {
  title: {
    fa: string
    en: string
  }
  description: {
    fa: string
    en: string
  }
}
// Order
export interface Order {
  id: number
  user: number | User
  product?: number | Product
  orderNumber: number
  amount_irr: number
  tax_amount?: number
  custom_data?: Record<string, any>
  status: 'pending' | 'processing' | 'done' | 'rejected'
  receipt_url?: string
  notes?: string
  type: OrderType
  created_at: string
  updated_at?: string
  processed_by?: number | User
}

export interface TicketCategory {
  id: number
  name: string
}

export interface TicketAttachment {
  id: number
  file: string  // URL to the uploaded file
}

export interface TicketMessage {
  id: number
  ticket: number
  sender: string  // String representation of user (e.g., "email" or "first_name last_name")
  message: string
  is_staff: boolean
  created_at: string  // ISO datetime string
  attachments: TicketAttachment[]
}

export interface TicketItem {
  id: number
  subject: string
  category: TicketCategory | null
  status: 'open' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
  user: string  // String representation of the user who created the ticket
  assigned_to: number | null  // User ID if assigned, null if not
  created_at: string
  updated_at: string
  messages: TicketMessage[]
}

// SiteSettings (Global, singleton-like)
export interface SiteSettings {
  id: number
  tax_rate: number
  min_paypal_charge_usd: number
  order_open_hours: Array<{ start: string; end: string }>
  last_monthly_report_date?: string
}

// CurrencyRate
export interface CurrencyRate {
  id: number
  base_currency: string  // e.g., 'USD'
  target_currency: string  // e.g., 'IRR'
  rate: number
  fetched_at: string
}