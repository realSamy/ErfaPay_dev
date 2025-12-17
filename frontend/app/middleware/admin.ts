import type {UserRole} from "~/types/users";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return
  await loadAuth()
  const {user} = useAuth()


  const allowedRoles: UserRole[] = ['senior_support', 'main_admin']

  if (!user.value || !allowedRoles.includes(user.value.role)) {
    useToast().add({
      title: 'Permission denied',
      description: 'You are not allowed to access this page.',
      color: 'error',
    })
    return navigateTo(useLocalePath()('index'))
  }
})