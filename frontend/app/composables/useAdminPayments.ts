import type {Charge, ChargeStatus} from "~/types/payments";
import type {WalletAdjustmentPayload} from "~/types/payload";

export const useAdminPayments = () => {
  const charges = ref<Charge[]>([])
  const loading = ref(false)

  const fetchAdminCharges = async (status?: ChargeStatus) => {
    loading.value = true
    const params = status ? { status } : {}
    try {
      const { data } = await useAuthApi('/api/payments/admin/charges/', { params })
      charges.value = data.value?.data || []
    } catch (err) {
      useToast().add({ title: 'خطا در بارگذاری شارژها', color: 'error' })
    } finally {
      loading.value = false
    }
  }

  const approveCharge = async (id: number | string) => {
    const { error } = await useAuthApi(`/api/payments/admin/charges/${id}/approve/`, {
      method: 'POST',
    })
    if (!error.value) {
      useToast().add({ title: 'شارژ تایید شد', color: 'success' })
      await fetchAdminCharges()
    }
  }

  const rejectCharge = async (id: number | string) => {
    const { error } = await useAuthApi(`/api/payments/admin/charges/${id}/reject/`, {
      method: 'POST',
    })
    if (!error.value) {
      useToast().add({ title: 'شارژ رد شد', color: 'error' })
      await fetchAdminCharges()
    }
  }

  const adjustWallet = async (payload: WalletAdjustmentPayload) => {
    const { data, error } = await useAuthApi('/api/payments/admin/adjustment/', {
      method: 'POST',
      body: payload,
    })

    if (error.value) {
      useToast().add({ title: 'خطا در تنظیم کیف پول', color: 'error' })
      return null
    }

    useToast().add({ title: 'کیف پول تنظیم شد', color: 'success' })
    return data.value
  }

  return {
    charges: readonly(charges),
    loading: readonly(loading),
    fetchAdminCharges,
    approveCharge,
    rejectCharge,
    adjustWallet,
  }
}