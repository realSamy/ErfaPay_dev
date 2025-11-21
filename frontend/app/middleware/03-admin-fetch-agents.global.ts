import type {User} from "~/types/admin/data"
import {adminLoadAgents} from "~/utils";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.name?.toString().startsWith('admin-agents')) return

  const agentsState = useState<User[]>('admin--agents', () => [])

  // If already loaded → skip
  if (agentsState.value.length > 0) return

  // Load agents (now a plain function)
  try {
    agentsState.value = await adminLoadAgents()
  } catch (error) {
    console.error('Failed to load agents:', error)
  }
})
