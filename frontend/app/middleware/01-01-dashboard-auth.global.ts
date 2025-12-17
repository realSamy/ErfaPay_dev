import type {User} from "~/types/users";

export default defineNuxtRouteMiddleware(async (to, from) => {
  return
  if (!to.name?.toString().startsWith('dashboard')) return
  await loadAuth()
  const {user} = useAuth()
  const {open, currentModalProps} = useAuthModal()
  if (!user.value) {
    return open('signin', {keepOpen: true})
  } else {
    if (currentModalProps.value?.keepOpen)
    currentModalProps.value.keepOpen = false
  }
})