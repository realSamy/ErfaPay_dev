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
    title: {
      en: string
      fa: string
    }
    description: {
      en: string
      fa: string
    }
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

type TwoDigit<N extends number> = `${N}` extends `${infer D}`
  ? D extends `${number}`
    ? N extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
      ? `0${N}`
      : `${N}`
    : never
  : never

type Hour = TwoDigit<
    | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
>
type Minute = TwoDigit<
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
  | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27
  | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53
  | 54 | 55 | 56 | 57 | 58 | 59
>
export type TimeString = `${Hour}:${Minute}`

export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
