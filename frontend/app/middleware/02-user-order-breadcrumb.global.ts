import type {User} from '~/types/users'

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.name?.toString().startsWith('admin-users-id')) return

  const id = Number(to.params.id)
  const users = useState<User[]>('admin.users')
  const user = users.value.find((u) => u.id === id)
  const state = useState('breadcrumb.state', () => ({}))
  if (!user) state.value = {name: 'Error 404'}
  else if (!to.name?.toString().startsWith('admin-users-id-order')) {
    state.value = {name: user.full_name}
  } else if (to.name?.toString().startsWith('admin-users-id-order')) {
    const order = Number(to.params.order)
    state.value = {name: user.full_name, order}
  }
})
