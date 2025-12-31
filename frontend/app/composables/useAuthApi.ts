export const useAuthApi = async <T = any>(
  url: string,
  opts: any = {}
): Promise<{ data: Ref<T | null>; error: Ref<any | null> }> => {
  const data = ref<T | null>(null)
  const error = ref<any | null>(null)

  const { accessToken, refreshToken, logout } = useAuth()

  const makeRequest = async (token: string) => {
    return await $fetch<T>(url, {
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
        const res = await $fetch<{ access: string }>('/api/auth/refresh/', {
          method: 'POST',
          body: { refresh: refreshToken.value },
        })
        accessToken.value = res.access
        data.value = await makeRequest(res.access)
      } catch {
        await logout()
        if (opts.forceLogin) {
          useAuthModal().open('signin')
        }
      }
    } else {
      error.value = err
    }
  }

  return { data, error } as { data: Ref<T | null>; error: Ref<any | null> }
}