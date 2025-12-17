import type {Ticket, TicketCategory, TicketMessage} from '~/types/tickets'
import type {
  AdminUpdateTicketPayload,
  CreateTicketPayload,
  ReplyTicketPayload,
  TicketCategoryPayload, TicketCategoryUpdatePayload
} from '~/types/payload'
import type {
  HTTPTicketCategoriesResponse,
  HTTPTicketCategoryResponse, HTTPTicketCreateResponse,
  HTTPTicketResponse,
  HTTPTicketsResponse
} from "~/types/http";


/**
 * Fetch all tickets (user or admin view)
 */
export const useMyTickets = (filters?: { status?: Ticket['status']; priority?: Ticket['priority'] }) => {
  const query = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : ''

  return useAuthApi<HTTPTicketsResponse>(`/api/tickets/${query}`)
}

/**
 * Fetch single ticket with messages
 */
export const useGetTicket = async (id: number | string) => {
  const {data, ...rest} = await useAuthApi<HTTPTicketResponse>(`/api/tickets/admin/${id}/`)

  return {
    data,
    ...rest,
  }
}

/**
 * Create a new ticket
 */
export const useCreateTicket = () => {
  const pending = ref(false)
  const error = ref<any>(null)
  const data = ref<any>(null)

  const create = async (payload: CreateTicketPayload) => {
    pending.value = true
    error.value = null

    const fd = new FormData()
    fd.append('subject', payload.subject)
    fd.append('category', String(payload.category))
    fd.append('priority', payload.priority)
    fd.append('message', payload.message)
    payload.attachments?.forEach((file) => fd.append('attachments', file))

    try {
      const res = await useAuthApi<HTTPTicketCreateResponse>('/api/tickets/', {
        method: 'POST',
        body: fd,
      })
      if (res.data.value?.ok) {
        data.value = res.data.value.data
        return res
      } else {
        error.value = res.data.value?.errors
      }
    } catch (err) {
      error.value = err
      throw err
    } finally {
      pending.value = false
    }
  }

  return {create, data, pending, error}
}

/**
 * Reply to a ticket
 */
export const useReplyTicket = (ticketId: number | string) => {
  const pending = ref(false)
  const error = ref<any>(null)

  const reply = async (payload: ReplyTicketPayload) => {
    pending.value = true
    error.value = null

    const fd = new FormData()
    fd.append('message', payload.message)
    payload.attachments?.forEach((file) => fd.append('attachments', file))

    try {
      return await useAuthApi<HTTPTicketResponse>(`/api/tickets/${ticketId}/reply/`, {
        body: fd,
        method: 'POST',
      })
    } catch (err) {
      error.value = err
      throw err
    } finally {
      pending.value = false
    }
  }

  return {reply, pending, error}
}
export const useCloseTicket = (ticketId: string) => {
  const close = async () => {
    return await useAuthApi<HTTPTicketResponse>(`/api/tickets/${ticketId}/close/`, {
      method: 'POST',
    })
  }
  return {close}
}


export const useAdminGetTickets = () => {
  return useAuthApi<HTTPTicketsResponse>('/api/tickets/admin/')
}

export const useAdminGetTicket = useGetTicket

export const useAdminUpdateTicket = (ticketId: string) => {
  const update = async (payload: AdminUpdateTicketPayload) => {
    return await useAuthApi<HTTPTicketResponse>(`/api/tickets/admin/${ticketId}/update/`, {
      method: 'PATCH',
      body: payload,
    })
  }
  return {update}
}

export const useAdminReplyTicket = (ticketId: string) => {
  const isLoading = ref(false)

  const reply = async (payload: ReplyTicketPayload) => {
    const fd = new FormData()
    fd.append('message', payload.message)
    payload.attachments?.forEach(f => fd.append('attachments', f))

    isLoading.value = true
    const {data} = await useAuthApi<HTTPTicketResponse>(`/api/tickets/admin/${ticketId}/reply/`, {
      method: 'POST',
      body: fd,
    })
    isLoading.value = false
    return data
  }

  return {reply, isLoading: readonly(isLoading)}
}

export const useTicketCategoryList = async () => {
  return await useApi<HTTPTicketCategoriesResponse>('/api/tickets/categories/')
}

export const useLoadTicketCategoryList = async (force_replace: boolean = false) => {
  const cats = useState<TicketCategory[]>('data.tickets.categories', () => [])
  if (!force_replace && cats.value.length > 0) {
    return cats
  }
  const {data} = await useTicketCategoryList()
  if (data.value?.ok) {
    cats.value = data.value?.data
  }
  return cats
}

export const useTicketCategoryDetail = async (id: number) => {
  return await useApi<HTTPTicketCategoryResponse>(`/api/tickets/categories/${id}/`)
}

export const useAdminCreateTicketCategory = async (payload: TicketCategoryPayload) => {
  return await useAuthApi<HTTPTicketCategoryResponse>('/api/tickets/categories/', {
    method: 'POST',
    body: payload
  })
}

export const useAdminUpdateTicketCategory = async (
  id: number,
  payload: TicketCategoryUpdatePayload
) => {
  return await useAuthApi<HTTPTicketCategoryResponse>(`/api/tickets/categories/${id}/`, {
    method: 'PATCH',
    body: payload
  })
}

export const useAdminDeleteTicketCategory = async (id: number) => {
  return await useAuthApi<HTTPTicketCategoryResponse>(`/api/tickets/categories/${id}/`, {
    method: 'DELETE'
  })
}

