import {FetchError} from "ofetch";

export const useAuthApi = async (url: string, redirectToLogin: boolean = false, options: any = {}): Promise<{data: Ref<any>, error: Ref<any>}> => {
  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')
  const config = useRuntimeConfig()
  const router = useRouter()

  // Set default headers
  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken.value}`,
  }

  let response = await $fetch<any>(url, {
    baseURL: config.public.apiBase,
    ...options,
  })

  // If access token expired
  if (response.error.value?.statusCode === 401) {
    if (refreshToken.value) {
      const refreshResponse = await $fetch('/api/token/refresh/', {
        method: 'POST',
        baseURL: config.public.apiBase,
        body: {refresh: refreshToken.value},
      }).catch(() => null) as { access: string }

      if (refreshResponse?.access) {
        accessToken.value = refreshResponse.access

        // retry the original request with new token
        options.headers.Authorization = `Bearer ${accessToken.value}`
        response = await useFetch(url, {
          baseURL: config.public.apiBase,
          ...options,
        })
      } else {
        // Refresh failed, log out user
        accessToken.value = null
        refreshToken.value = null
      }
    } else {
      if (redirectToLogin) {
        router.push('/login')
        return {data: ref(null), error: ref(null)}
      }
    }
  }

  return response
}