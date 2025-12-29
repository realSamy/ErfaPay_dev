import type {Wallet, WalletTransaction, Charge} from "~/types/payments";
import type {CreateChargePayload} from "~/types/payload";

export const useWallet = () => {
  const wallet = ref<Wallet | null>(null)
  const transactions = ref<WalletTransaction[]>([])
  const charges = ref<Charge[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchWallet = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useAuthApi('/api/payments/wallet/')
      wallet.value = data.value as Wallet
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchTransactions = async () => {
    loading.value = true
    try {
      const { data } = await useAuthApi('/api/payments/wallet/transactions/')
      transactions.value = data.value as WalletTransaction[]
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchCharges = async () => {
    loading.value = true
    try {
      const { data } = await useAuthApi('/api/payments/charges/')
      charges.value = data.value?.data || []
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createCharge = async (payload: CreateChargePayload) => {
    const { data, error } = await useAuthApi('/api/payments/charges/create/', {
      method: 'POST',
      body: payload,
    })

    if (error.value) {
      useToast().add({
        title: 'خطا در ایجاد شارژ',
        description: error.value?.data?.error || 'خطای ناشناخته',
        color: 'error',
      })
      return null
    }

    // PayPal returns approve_url
    if (data.value?.approve_url) {
      return { approve_url: data.value.approve_url as string }
    }

    return data.value
  }

  return {
    wallet: readonly(wallet),
    transactions: readonly(transactions),
    charges: readonly(charges),
    loading: readonly(loading),
    error: readonly(error),
    fetchWallet,
    fetchTransactions,
    fetchCharges,
    createCharge,
  }
}