export interface Country {
  name: { en: string, fa: string }
  code: string
  emoji: string
  phone: string
  search: string
}

export interface ServiceSlide {
  title: string
  message: string
  cta_label: string
  image: string
}

export interface CurrencyItem {
  code: string
  name: string
  icon: string
  rate: number
}

export type BenefitItem = {
  title: string
  description: string
  icon: string
  cta_label: string
  cta_icon: string | [string, string]
}

export type ServiceItem = {
    title: string
    description: string
    icon: string
}

export type FooterLogo = {
  img: string
  alt: string
  href: string
}

export type Order = {
  id: string
  date: string
  status: 'pending' | 'processing' | 'done' | 'rejected'
  orderNumber: string
  amount: number
  type: 'recharge' | 'exchange' | 'bills'
}
