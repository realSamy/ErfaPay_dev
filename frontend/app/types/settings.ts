import {type TimeString, WeekDayNumber} from "~/types/data";

export interface SocialLinkItem {
  link: string
  title: string
  icon: string
}

export interface GlobalSettings {
  time_from: TimeString;  // 'HH:MM:SS'
  time_to: TimeString;
  weekday_from: WeekDayNumber;  // 0-6
  weekday_to: WeekDayNumber;
  global_availability: boolean;
  enable_schedule: boolean;
  is_available_now: boolean;

  erfapay_phone: string;
  erfapay_phone2: string;
  erfapay_email: string;
  erfapay_address: string;
  erfapay_social: SocialLinkItem[];

  erfapay_phones: Readonly<string>;
}
