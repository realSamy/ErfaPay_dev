import type {BenefitItem} from "~/types/data";

export default async function () {
  const store = useState<BenefitItem[]>('benefits', () => []);
  const benefits: BenefitItem[] = [
    {
      title: 'pages.home.benefits.pay_expenses_title',
      description: 'pages.home.benefits.pay_expenses_desc',
      icon: "material-symbols:paid-outline",
      cta_icon: ['mdi:chevron-left', 'mdi:chevron-right'],
      cta_label: 'pages.home.hero_section_cta',
    },
    {
      title: 'pages.home.benefits.money_transfer_title',
      description: 'pages.home.benefits.money_transfer_desc',
      icon: "material-symbols:send-money",
      cta_icon: ['mdi:chevron-left', 'mdi:chevron-right'],
      cta_label: 'pages.home.hero_section_cta',
    },
    {
      title: 'pages.home.benefits.buy_charge_title',
      description: 'pages.home.benefits.buy_charge_desc',
      icon: "material-symbols:payments-outline",
      cta_icon: ['mdi:chevron-left', 'mdi:chevron-right'],
      cta_label: 'pages.home.hero_section_cta',
    },
    {
      title: 'pages.home.benefits.transparent_reports_title',
      description: 'pages.home.benefits.transparent_reports_desc',
      icon: "material-symbols:overview-outline",
      cta_icon: ['mdi:chevron-left', 'mdi:chevron-right'],
      cta_label: 'pages.home.hero_section_cta',
    },
    {
      title: 'pages.home.benefits.support_24h_title',
      description: 'pages.home.benefits.support_24h_desc',
      icon: "material-symbols:call-outline",
      cta_icon: ['mdi:chevron-left', 'mdi:chevron-right'],
      cta_label: 'pages.home.hero_section_cta',
    },
  ]

  store.value = benefits;
  return {benefits, store}
}