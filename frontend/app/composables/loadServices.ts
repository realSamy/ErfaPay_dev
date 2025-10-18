import type {ServiceItem} from "~/types/data";

export default async function () {
  const store = useState<ServiceItem[]>('services', () => []);
  const services: ServiceItem[] = [
    {
      title: 'pages.home.benefits.pay_expenses_title',
      description: 'pages.home.benefits.pay_expenses_desc',
      icon: "material-symbols:paid-outline",
    },
    {
      title: 'pages.home.benefits.money_transfer_title',
      description: 'pages.home.benefits.money_transfer_desc',
      icon: "material-symbols:send-money",
    },
    {
      title: 'pages.home.benefits.buy_charge_title',
      description: 'pages.home.benefits.buy_charge_desc',
      icon: "material-symbols:payments-outline",
    },

  ]

  store.value = services;
  return {services, store}
}