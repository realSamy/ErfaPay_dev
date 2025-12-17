import type {ChargeMethod} from "~/types";
import type {Ticket} from '~/types/tickets';

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  first_name: string
  last_name: string
  email: string
  password: string
  password2: string
  tos: boolean
}

export interface RefreshTokenPayload {
  refresh: string
}

export interface ChargeWalletPayload {
  amount_usd: number
  method: ChargeMethod
  receipt?: File // for voucher/crypto
}

export interface CreateProductPayload {
  name: string
  name_fa: string
  description: string
  description_fa: string
  image?: File
  required_docs: string[]
  custom_form_fields: Record<string, any>
  price_irr: string
  active: boolean
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {}

export interface CreateOrderPayload {
  product: number
  amount_irr?: string
  custom_data: Record<string, any>
  files?: Record<string, File> // key = required_doc name
}

export interface CreateTicketPayload {
  subject: string
  category: number
  priority: Ticket['priority']
  message: string
  attachments?: File[]
}

export interface ReplyTicketPayload {
  message: string
  attachments?: File[]
}

export interface CreateSupportUserPayload {
  email: string
  first_name: string
  last_name: string
  role: 'simple_support' | 'senior_support'
  password: string
}
export interface AdminUpdateTicketPayload {
  assigned_to?: number | null
  priority?: Ticket['priority']
  status?: Ticket['status']
}

export interface CalculatePricePayload {
  service_id: number
  user_amount_irt: number
}

export interface CalculatePriceResponse {
  user_amount: number
  commission: number
  tax: number
  total_payable: number
}

export interface CategoryFormPayload {
  name_fa: string
  name_en: string
  slug: string
  icon?: File | null
  order?: number
  is_active?: boolean
}

// For Service create/update
export interface ServiceFormPayload {
  // Foreign key
  // category?: number | string | null // Category ID

  // Bilingual fields
  title_fa: string
  title_en?: string
  description_fa: string
  description_en?: string

  // Visual
  icon: string
  banner: File

  // Pricing
  commission_type: 'percent' | 'fixed'
  commission_percent?: string | number
  commission_fixed?: string | number

  min_amount: number
  max_amount: number
  tax_rate: number

  // Config
  delivery_time_fa?: string
  delivery_time_en?: string
  requires_manual_review?: boolean
  is_active?: boolean
  order?: number
}

export interface TicketCategoryPayload {
  title_fa: string
  title_en: string
}

export type TicketCategoryUpdatePayload = Partial<TicketCategoryPayload>