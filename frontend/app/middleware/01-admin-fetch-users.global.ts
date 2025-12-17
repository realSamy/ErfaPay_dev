import type {User} from "~/types/users"

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.name?.toString().startsWith('admin-')) return

  const usersState = useState<User[]>('admin.users', () => [])

  // If already loaded → skip
  if (usersState.value.length > 0) return

  // Load users (now a plain function)
  try {
    const {listUsers} = useAdminUsers()
    const response = await listUsers()
    if (response.data.value?.results.ok) {
      usersState.value = response.data.value?.results.data
    }
  } catch (error) {
    console.error('Failed to load users:', error)
  }
})
