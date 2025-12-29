import type {CurrencyItem} from "~/types/data";
import type {HTTPCurrencyResponse} from "~/types/http";

export const useLoadCurrenciesStore = async (forced = false) => {
  const store = useState<CurrencyItem[]>('currencies', () => [])
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    const response = await useApi<HTTPCurrencyResponse>('/api/currencies/latest/')
    return response.data.value?.data ?? [];
  }

  try {
    if (forced || !store.value?.length) {
      store.value = await fetchData();
    } else {
      const newCurr = await fetchData();
      store.value.forEach((item) => {
        item.rate = newCurr.find(_i => _i.code === item.code)?.rate || 0
      })
    }

  } catch (e: any) {
    console.error('Failed to fetch currencies:', e);
    error.value = e.message || 'Failed to load currency data.';
  } finally {
    loading.value = false;
  }

  return store
}