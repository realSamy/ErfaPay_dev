import type {BulkEmailPayload} from "~/types/payload";

interface BulkEmailResponse {
  ok: boolean
  message: string
}

export const useAdminBulkEmail = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<BulkEmailResponse | null>(null)

  const sendBulkEmail = async (payload: BulkEmailPayload): Promise<BulkEmailResponse|undefined> => {
    loading.value = true
    error.value = null
    data.value = null

    try {
      const response = await $fetch<BulkEmailResponse>('/api/tickets/admin/bulk-email/', {
        method: 'POST',
        body: payload,
      })

      const {t} = useNuxtApp().$i18n

      data.value = response
      useToast().add({
        title: t('common.labels.bulk_email'),
        description: t('common.messages.bulk_email_started'),
        color: 'success',
      })
      return response
    } catch (err: any) {
      error.value = err?.data?.error || 'An error occurred while sending bulk email'
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),
    sendBulkEmail,
  }
}