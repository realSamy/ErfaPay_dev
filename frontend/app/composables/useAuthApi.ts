export const useAuthApi = async <T = any>(
  url: string,
  opts: any = {}
): Promise<{ data: Ref<T | null>; error: Ref<any | null>; pending: Ref<boolean> }> => {
  const data = ref<T | null>(null)
  const error = ref<any | null>(null)
  const pending = ref(true)

  const { accessToken, refreshToken, logout } = useAuth()
  const config = useRuntimeConfig()

  const makeRequest = async (token: string) => {
    return await $fetch<T>(url, {
      baseURL: config.public.apiBase,
      ...opts,
      headers: {
        Authorization: `Bearer ${token}`,
        ...opts.headers,
      },
    })
  }

  try {
    data.value = await makeRequest(accessToken.value)
  } catch (err: any) {
    if (err.status === 401 && refreshToken.value) {
      try {
        const res = await $fetch<{ access: string }>('/auth/refresh/', {
          method: 'POST',
          baseURL: config.public.apiBase,
          body: { refresh: refreshToken.value },
        })
        accessToken.value = res.access
        data.value = await makeRequest(res.access)
      } catch {
        logout()
        useAuthModal().open('signin')
      }
    } else {
      error.value = err
    }
  } finally {
    pending.value = false
  }

  return { data, error, pending } as { data: Ref<T | null>; error: Ref<any | null>; pending: Ref<boolean> }
}