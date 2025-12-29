import {useStorage} from '@vueuse/core'
import type {LoginPayload} from "~/types/payload";
import type {User} from "~/types/users";

export const useAuth = () => {
  const user = useState<User | null>('auth.user', () => null)
  const accessToken = useStorage('auth.access_token', '')
  const refreshToken = useStorage('auth.refresh_token', '')

  const isLoggedIn = computed(() => !!user.value && !!accessToken.value)
  const isMainAdmin = computed(() => (user.value?.role || '') === 'main_admin')
  const isAdmin = computed(() => ['senior_support', 'main_admin'].includes(user.value?.role || ''))
  const isSupport = computed(() => ['simple_support', 'senior_support', 'main_admin'].includes(user.value?.role || ''))

  const login = (keepOpen = false) => {
    useAuthModal().open('signin', {keepOpen})
  }

  const logout = async (askConfirm: boolean = false, t: (key: string) => string = () => '') => {
    if (askConfirm) {
      const confirmed = await useConfirm({
        title: t('common.labels.logout'),
        message: t('common.messages.confirm_logout'),
        confirmColor: 'error',
        confirmLabel: t('common.labels.logout'),
        cancelLabel: t('common.labels.cancel')
      })
      if (confirmed) {
        accessToken.value = ''
        refreshToken.value = ''
        user.value = null
        navigateTo(useLocalePath()('index'))
      }
    } else {
      accessToken.value = ''
      refreshToken.value = ''
      user.value = null
      navigateTo(useLocalePath()('index'))
    }

  }

  return {
    user: readonly(user),
    isLoggedIn,
    isMainAdmin,
    isAdmin,
    isSupport,
    accessToken,
    refreshToken,
    login,
    logout,
    setUser: (u: User) => (user.value = u),
  }
}