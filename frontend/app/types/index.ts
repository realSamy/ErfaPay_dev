import type { User } from '~/types/users'

export type ChargeMethod = 'paypal' | 'crypto' | 'voucher'
export type OrderStatus = 'pending' | 'processing' | 'done' | 'rejected'


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


// Site Settings (singleton)
export interface SiteSettings {
  id: number
  tax_rate: number // e.g. 10 for 10%
  min_paypal_usd: number
  order_open_hours: { start: string; end: string }[]
}

