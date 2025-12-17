import type {User, UserOwnUpdatePayload} from '~/types/users'

export const useUserProfile = () => {
  const getProfile = async () => {
    return await useAuthApi<{ data: User }>('/auth/profile/')
  }

  const updateProfile = async (payload: UserOwnUpdatePayload) => {
    return await useAuthApi<{ data: User }>('/auth/profile/', { method: 'PATCH', body: payload })
  }

  return { getProfile, updateProfile }
}