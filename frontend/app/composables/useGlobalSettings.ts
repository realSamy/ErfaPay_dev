import type {GlobalSettings} from "~/types/settings";
import type {UpdateGlobalSettingsPayload} from "~/types/payload";

export const useGlobalSettings = () => {
  const settings = ref<GlobalSettings | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchSettings = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useApi('/api/global-settings/')
      if (data.value?.ok) {
        settings.value = data.value.data
        return data.value.data
      }
    } catch (err) {
      error.value = (err as Error).message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { settings, loading, error, fetchSettings }
}

export const useUpdateGlobalSettings = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const updatedSettings = ref<GlobalSettings | null>(null)
  const {t} = useI18n()

  const updateSettings = async (payload: UpdateGlobalSettingsPayload) => {
    loading.value = true
    error.value = null
    try {
      // Use FormData for future-proofing (even if no files now)
      const fd = new FormData()
      Object.entries(payload).forEach(([key, value]) => {
        fd.append(key, value instanceof File ? value : ['string', 'number'].includes(typeof value) ? String(value) : JSON.stringify(value))
      })

      const { data } = await useAuthApi('/api/global-settings/', {
        method: 'PATCH',
        body: fd,
      })

      if (data.value?.ok) {
        updatedSettings.value = data.value.data
        useToast().add({
          description: t('common.messages.global_settings_applied'),
          color: 'success',
        })
        return data.value
      } else {
        error.value = data.value?.errors || 'Update failed'
      }
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  return { loading, error, updatedSettings, updateSettings }
}