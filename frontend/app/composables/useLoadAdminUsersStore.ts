import type {User} from "~/types/users";

export default async function (force: boolean=false) {
  const users = useState<User[]>('admin.users', () => [])

  if (force || !users.value.length) {
    const {listUsers} = useAdminUsers()
    const response = await listUsers()
    if (response.data.value?.results) {
      users.value = response.data.value?.results
    }
  }
  return users
}