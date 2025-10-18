import type {FetchError, FetchOptions} from 'ofetch'

export const useApi = async <T = any>(
  url: string,
  redirectToLogin: boolean = false,
  options: FetchOptions<'json'> = {}
): Promise<{
  data: Ref<T | null>,
  error: Ref<FetchError | null>
}> => {
  const config = useRuntimeConfig()
  const router = useRouter()

  const data = ref<T | null>(null)
  const error = ref<FetchError | null>(null)

  try {
    data.value = await $fetch<T>(url, {
      baseURL: config.public.apiBase,
      headers: {
        ...(options.headers || {})
      },
    })
  } catch (err: any) {
    error.value = err

    if (err?.statusCode === 401 && redirectToLogin) {
      await router.push('/login')
      return { data: ref(null), error: ref(null) }
    }
  }

  // @ts-ignore
  return { data, error }
}
