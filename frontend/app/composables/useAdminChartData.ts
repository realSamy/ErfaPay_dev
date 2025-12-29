import { ref } from 'vue'
import type { Ref } from 'vue'

interface ChartData {
  labels: string[]
  values: number[]
}

export const useAdminChartData = (
    chart: 'orders' | 'payments',
    mode: Ref<'daily' | 'weekly' | 'monthly'>,
    startDate: Ref<Date | null>,
    endDate: Ref<Date | null>,
) => {
  const data = ref<ChartData>({ labels: [], values: [] })
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchData = async () => {
    if (!useAuth().isAdmin) return

    loading.value = true
    error.value = null
    const query: Record<string, string> = { mode: mode.value }
    if (startDate.value) {
      // en-CA format is yyyy-MM-dd
      query.start_date = new Intl.DateTimeFormat('en-CA').format(startDate.value)
    }
    if (endDate.value) {
      query.end_date = new Intl.DateTimeFormat('en-CA').format(endDate.value)
    }
    try {
      const { data: response } = await useAuthApi(`/api/${chart}/admin/charts/`, {
        method: 'GET',
        query,
      })
      if (response.value?.ok) {
        data.value = response.value.data
      }
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchData)

  return { data, loading: loading, error, refresh: fetchData }
}


