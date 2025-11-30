import { useStorage } from '@vueuse/core'
import type {LoginPayload} from "~/types/payload";
import type {User} from "~/types";

export const useAuth = () => {
  const user = useState<User | null>('auth.user', () => null)
  const accessToken = useStorage('auth.access_token', '')
  const refreshToken = useStorage('auth.refresh_token', '')

  const isLoggedIn = computed(() => !!user.value && !!accessToken.value)
  const isAdmin = computed(() => ['senior_support', 'main_admin'].includes(user.value?.role || ''))

  const login = async (payload: LoginPayload) => {
    const { data } = await useAuthApi<{ access: string; refresh: string; user: User }>('/auth/login/', {
      method: 'POST',
      body: payload,
    })
    if (data.value) {
      accessToken.value = data.value.access
      refreshToken.value = data.value.refresh
      user.value = data.value.user
    }
  }

  const logout = () => {
    accessToken.value = ''
    refreshToken.value = ''
    user.value = null
    navigateTo('/')
  }

  return {
    user: readonly(user),
    isLoggedIn,
    isAdmin,
    accessToken,
    refreshToken,
    login,
    logout,
    setUser: (u: User) => (user.value = u),
  }
}