import type {ChargeMethod, TicketPriority, TicketStatus} from "~/types/index";

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
  priority: TicketPriority
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
  priority?: TicketPriority
  status?: TicketStatus
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