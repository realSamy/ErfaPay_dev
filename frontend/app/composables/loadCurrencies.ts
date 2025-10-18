import type {CurrencyItem} from "~/types/data";

export default async function () {
  const currencies = useState<CurrencyItem[]>('currencies', () => []);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  isLoading.value = true;
  error.value = null;
  const genCurr = async ():Promise<CurrencyItem[]> => {
    const response = await useApi<CurrencyItem[]>('/api/currencies/latest/')
    return response.data.value ?? [];
  }
  try {
    if (!currencies.value?.length) {
      currencies.value = await genCurr();
    } else {
      const newCurr = await genCurr();
      currencies.value.forEach((item) => {
        item.rate = newCurr.find(_i => _i.code === item.code)?.rate || 0
      })
    }

  } catch (e: any) {
    console.error('Failed to fetch currencies:', e);
    error.value = e.message || 'Failed to load currency data.';
  } finally {
    isLoading.value = false;
  }

  return {
    currencies,
    isLoading,
    error,
  };
}
