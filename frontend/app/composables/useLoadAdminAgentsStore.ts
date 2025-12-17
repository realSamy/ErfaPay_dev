import type {User} from "~/types/users";


export default async function (force: boolean=false) {
  const users = await useLoadAdminUsersStore(force)
  const agents = useState<User[]>('admin.agents', () => [])

  if (force || !agents.value.length) {
    agents.value = users.value.filter(agent => agent.role !== 'regular')
  }
  return agents
}