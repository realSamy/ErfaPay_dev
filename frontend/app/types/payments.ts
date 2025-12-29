// types/payments.ts
export type Gateway = 'paypal' | 'crypto' | 'voucher'
export type ChargeStatus = 'pending' | 'success' | 'failed'
export type TransactionType = 'charge' | 'spend' | 'adjustment'

export interface Wallet {
  balance: string
  created_at: string
  updated_at: string
}

export interface WalletTransaction {
  id: number
  amount: string
  transaction_type: TransactionType
  balance_after: string
  reference_id: string | null
  description: string
  adjusted_by: { username: string } | null
  created_at: string
}

export interface Charge {
  id: number
  foreign_amount: string
  irt_amount: string
  exchange_rate: string
  gateway: Gateway
  gateway_display: string
  status: ChargeStatus
  gateway_reference: string
  created_at: string
}

