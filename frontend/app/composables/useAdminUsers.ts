import type {User, AdminCreateUserPayload, AdminUserUpdatePayload, UserListFilters} from '~/types/users'
import type {GenericHTTPExtendedResponse, GenericHTTPPaginationResponse, GenericHTTPResponse} from "~/types/http";
import {FetchError} from "ofetch";


export const useAdminUsers = () => {
  // List with filters/pagination
  const listUsers = async (filters: UserListFilters = {}) => {
    const query = new URLSearchParams(filters as any).toString()
    return await useAuthApi<GenericHTTPPaginationResponse<User[]>>(`/api/auth/admin/users/?${query}`)
  }

  const listActiveUsers = async () => {
    return await listUsers({active: true})
  }

  // Detail
  const getUserDetail = async (id: number): Promise<Ref<User>> => {
    const {data: response, error} = await useAuthApi<GenericHTTPResponse<User>>(`/api/auth/admin/users/${id}/`)
    if (response.value?.ok) return ref<User>(response.value.data)
    throw createError({
      message: 'User not found',
    })
  }

  // Create Support User (Main Admin only)
  const createSupportUser = async (payload: AdminCreateUserPayload) => {
    return await useAuthApi<GenericHTTPResponse<User>>('/api/auth/admin/users/create/', { method: 'POST', body: payload })
  }

  // Update
  const updateUser = async (id: number, payload: AdminUserUpdatePayload) => {
    return await useAuthApi<GenericHTTPResponse<User>>(`/api/auth/admin/users/${id}/`, { method: 'PATCH', body: payload })
  }

  // Delete (Deactivate + Block)
  const deleteUser = async (id: number) => {
    return await useAuthApi<GenericHTTPResponse>(`/api/auth/admin/users/${id}/`, { method: 'DELETE' })
  }

  return { listUsers, listActiveUsers, getUserDetail, createSupportUser, updateUser, deleteUser }
}