import type {Category, Service} from '~/types/services'
import type {GenericHTTPResponse} from "~/types/http";
import type {ServiceFormPayload} from "~/types/payload";

// ── CATEGORIES ──
export const useAdminCategories = () => {
  return useAuthApi<GenericHTTPResponse<Category[]>>('/api/services/admin/categories/')
}

export const useAdminCreateCategory = () => {
  const create = async (payload: FormData) => {
    return await useAuthApi<GenericHTTPResponse<Category>>('/api/services/admin/categories/', {
      method: 'POST',
      body: payload,
    })
  }
  return {create}
}

export const useAdminUpdateCategory = (id: number) => {
  const update = async (payload: FormData) => {
    return await useAuthApi<GenericHTTPResponse<Category>>(`/api/services/admin/categories/${id}/`, {
      method: 'PATCH',
      body: payload,
    })
  }
  return {update}
}

export const useAdminDeleteCategory = (id: number) => {
  const remove = async () => {
    return await useAuthApi(`/api/services/admin/categories/${id}/`, {
      method: 'DELETE',
    })
  }
  return {remove}
}

// ── SERVICES ──
export const useAdminServices = () => {
  return useAuthApi<GenericHTTPResponse<Service[]>>('/api/services/admin/services/')
}

export const useAdminServiceDetail = (id: number) => {
  return useAuthApi<GenericHTTPResponse<Service>>(`/api/services/admin/services/${id}/`)
}

export const useAdminCreateService = () => {
  const pending = ref<boolean>(false)
  const error = ref<any>(null)
  const create = async (payload: ServiceFormPayload) => {
    const fd = buildServiceFormData(payload)
    pending.value = true
    try {
      const result = await useAuthApi<GenericHTTPResponse<Service>>('/api/services/admin/services/', {
        method: 'POST',
        body: fd,
      })
      pending.value = false
      return result
    } catch (_error) {
      error.value = _error
      return {data: ref(null), error}
    } finally {
      pending.value = false
    }

  }
  return {create, pending, error}
}

export const useAdminUpdateService = (id: number) => {
  const update = async (payload: Partial<ServiceFormPayload>) => {
    const fd = buildServiceFormData(payload as ServiceFormPayload)
    return await useAuthApi<GenericHTTPResponse<Service>>(`/api/services/admin/services/${id}/`, {
      method: 'PATCH',
      body: fd,
    })
  }
  return {update}
}

export const useAdminDeleteService = (id: number) => {
  const remove = async () => {
    return await useAuthApi<GenericHTTPResponse>(`/api/services/admin/services/${id}/`, {
      method: 'DELETE',
    })
  }
  return {remove}
}