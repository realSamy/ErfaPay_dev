import type {ChargeStatus, Gateway} from "~/types/payments";

export const getGatewayIcon = (gateway: Gateway): string => {
  return {
    paypal: 'i-simple-icons:paypal',
    crypto: 'i-simple-icons:bitcoin',
    voucher: 'i-heroicons:gift',
  }[gateway] || 'i-heroicons:banknotes'
}

export const getStatusColor = (status: ChargeStatus): string => {
  return {
    pending: 'yellow',
    success: 'green',
    failed: 'red',
  }[status] || 'gray'
}