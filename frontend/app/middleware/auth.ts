export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return
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