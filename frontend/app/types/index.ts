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

// Site Settings (singleton)
export interface SiteSettings {
  id: number
  tax_rate: number // e.g. 10 for 10%
  min_paypal_usd: number
  order_open_hours: { start: string; end: string }[]
}

