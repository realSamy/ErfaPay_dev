// composables/useServices.ts
import type { Category, Service } from '~/types/services'

// Public: Get all active categories with services
export const useCategories = () => {
  return useApi<{ data: Category[] }>('/api/services/categories/')
}

// Public: Get all active services
export const useServices = () => {
  return useApi<{ data: Service[] }>('/api/services/')
}

// Public: Get single service detail
export const useService = (id: number) => {
  return useApi<{ data: Service }>(`/api/services/${id}/`)
}

// Public: Calculate final price (used in order form)
export const useCalculatePrice = () => {
  const calculate = async (serviceId: number, userAmountIrt: number) => {
    const service = await useService(serviceId)
    if (!service.data.value?.data) return null

    const s = service.data.value.data
    const amount = Number(userAmountIrt)

    if (amount < Number(s.min_amount)) throw new Error(`حداقل ${s.min_amount} تومان`)
    if (amount > Number(s.max_amount)) throw new Error(`حداکثر ${s.max_amount} تومان`)

    const commission = s.commission_type === 'percent'
      ? amount * (Number(s.commission_percent) / 100)
      : Number(s.commission_fixed)

    const subtotal = amount + commission
    const tax = subtotal * (Number(s.tax_rate) / 100)
    const total = Math.round(subtotal + tax)

    return {
      user_amount: amount,
      commission: Math.round(commission),
      tax: Math.round(tax),
      total_payable: total,
    }
  }

  return { calculate }
}