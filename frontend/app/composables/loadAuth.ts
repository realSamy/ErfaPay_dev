import type {User} from "~/types/auth";
import type {SimpleError} from "~/types/http";

export default async () => {
  const user: Ref<User> | Ref<null> = useState('user', () => null as any)
  const error = useState('auth_error', () => null as SimpleError | null)

  if (!user.value) {
    try {
      const {data, error: fetchError} = await useAuthApi('/api/users/me/')

      if (fetchError.value) {
        error.value = {
          message: fetchError.value?.message,
          statusCode: fetchError.value?.statusCode,
          stack: import.meta.dev ? fetchError.value?.stack : undefined,
        }
        user.value = null
      } else {
        user.value = data.value
        error.value = null
      }
    } catch (e: any) {
      error.value = {
          message: e.value?.message,
          statusCode: e.value?.statusCode,
          stack: import.meta.dev ? e.value?.stack : undefined,
        }
      user.value = null
    }
  }
  return {user, error}
}
