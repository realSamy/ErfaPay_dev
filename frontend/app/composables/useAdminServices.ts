import type { Service } from '~/types/services'

export const useAdminServices = () => {
  return useAuthApi<{ data: Service[] }>('/api/services/admin/list/')
}

export const useAdminServiceDetail = (id: number) => {
  return useAuthApi<{ data: Service }>(`/api/services/admin/${id}/`)
}

export const useUpdateService = () => {
  const update = async (id: number, payload: Partial<Service>) => {
    const fd = new FormData()
    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof File) {
        fd.append(key, value)
      } else if (value !== undefined && value !== null) {
        fd.append(key, String(value))
      }
    })

    return await useAuthApi<{ data: Service }>(`/api/services/admin/${id}/`, {
      method: 'PATCH',
      body: fd,
    })
  }

  return { update }
}

export const useDeactivateService = (id: number) => {
  const deactivate = async () => {
    return await useAuthApi(`/api/services/admin/${id}/`, {
      method: 'DELETE',
    })
  }
  return { deactivate }
}