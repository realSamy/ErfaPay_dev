import type {User, UserResponse} from "~/types/auth";
import type {SimpleError} from "~/types/http";

export default async (forceLogin: boolean = false) => {
  const user = useState<User|null>('user', () => null)
  const error = useState<SimpleError | null>('auth_error', () => null)

  if (!user.value) {
    try {
      const {data, error: fetchError} = await useAuthApi<UserResponse>('/api/users/me/', forceLogin)

      if (fetchError.value || !data.value) {
        error.value = {
          message: fetchError.value?.message,
          statusCode: fetchError.value?.statusCode,
          stack: import.meta.dev ? fetchError.value?.stack : undefined,
        }
        user.value = null
      } else {
        user.value = (data.value.data as User)
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
