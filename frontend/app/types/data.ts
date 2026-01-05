export interface Country {
  name: { en: string, fa: string }
  code: string
  emoji: string
  phone: string
  search: string
}

export interface ServiceSlide {
  id: string|number
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

type TwoDigit<N extends number> =
  N extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    ? `0${N}`
    : `${N}`

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<
  From extends number,
  To extends number
> = Exclude<Enumerate<To>, Enumerate<From>> | From

type _Hour = TwoDigit<Range<0, 12>>
type _Minute = TwoDigit<Range<0, 59>>
type _Second = TwoDigit<Range<0, 59>>

type Hour = `${0 | 1}${number}` | `2${0 | 1 | 2 | 3}`
type MinuteSecond = `${0 | 1 | 2 | 3 | 4 | 5}${number}`

export type TimeString = `${Hour}:${MinuteSecond}:${MinuteSecond}`

export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export enum WeekDayNumber {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}