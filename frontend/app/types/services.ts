// types/services.ts
export interface Category {
  id: number
  name_fa: string
  name_en: string
  slug: string
  icon: string | null
}

export interface Service {
  id: number
  category: Category
  title_fa: string
  title_en: string
  description_fa: string
  description_en: string
  icon: string
  banner: string | null

  // Pricing
  commission_type: 'percent' | 'fixed'
  commission_percent: string
  commission_fixed: string
  min_amount: string
  max_amount: string
  tax_rate: string

  // Config
  delivery_time_fa: string
  delivery_time_en: string
  requires_manual_review: boolean
  is_active: boolean

  // Frontend helper
  price_example?: {
    example_user_amount: number
    commission: number
    tax: number
    total: number
    note: string
  }
}

