import type {User} from "~/types/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!to.name?.toString().startsWith('dashboard')) return
  await loadAuth()
  const {open, currentModalProps} = useAuthModal()
  const self = useState<User>('user')
  console.log({self: self.value})
  if (!self.value?.email) {
    return open('signin', {keepOpen: true})
  } else {
    currentModalProps.value.keepOpen = false
  }
})