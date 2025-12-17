import type {User} from "~/types/auth";
import type {SimpleError, HTTPUserResponse} from "~/types/http";

export default async (forceLogin: boolean = false) => {
  const user = useState<User|null>('auth.user', () => null)
  const error = useState<SimpleError | null>('auth.error', () => null)

  if (!user.value) {
    try {
      const {data, error: fetchError} = await useAuthApi<HTTPUserResponse>('/api/auth/users/me/', {forceLogin})
      if (fetchError.value || !data.value) {
        error.value = {
          message: fetchError.value?.message,
          statusCode: fetchError.value?.statusCode,
          stack: import.meta.dev ? fetchError.value?.stack : undefined,
        }
        user.value = null
      } else {
        if (data.value.ok) {
          user.value = data.value.data
          error.value = null
        } else {
          error.value = {
            message: 'Failed to load user data.',
            statusCode: 500,
            stack: import.meta.dev ? new Error().stack : undefined,
          }
          user.value = null
        }
      }
    } catch (e: any) {
      error.value = {
          message: e.value?.message,
          statusCode: e.value?.statusCode,
          stack: import.meta.dev ? e.value?.stack : undefined,
        }
        console.log({e})
      user.value = null
    }
  }
  return {user, error}
}
