import type {User} from "~/types/admin/data"

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.name?.toString().startsWith('admin-')) return

  const usersState = useState<User[]>('admin--users', () => [])

  // If already loaded → skip
  if (usersState.value.length > 0) return

  // Load users (now a plain function)
  try {
    usersState.value = await adminLoadUsers()
  } catch (error) {
    console.error('Failed to load users:', error)
  }
})
