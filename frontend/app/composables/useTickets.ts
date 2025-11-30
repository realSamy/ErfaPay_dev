import type {Ticket, TicketMessage, TicketPriority, TicketStatus} from '~/types'
import type {AdminUpdateTicketPayload, CreateTicketPayload, ReplyTicketPayload} from '~/types/payload'
import type {HTTPTicketResponse, HTTPTicketsResponse} from "~/types/http";


/**
 * Fetch all tickets (user or admin view)
 */
export const useMyTickets = (filters?: { status?: TicketStatus; priority?: TicketPriority }) => {
  const query = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : ''

  return useAuthApi<HTTPTicketsResponse>(`/tickets/${query}`)
}

/**
 * Fetch single ticket with messages
 */
export const useGetTicket = async (id: number | string) => {
  const {data: ticket, ...rest} = await useAuthApi<Ticket>(`/tickets/${id}/`)
  const {data: messages} = await useAuthApi<TicketMessage[]>(
      `/tickets/${id}/messages/`
  )

  const sortedMessages = computed(() =>
      messages.value?.sort((a, b) => a.id - b.id) || []
  )

  return {
    ticket,
    messages: sortedMessages,
    ...rest,
  }
}

/**
 * Create a new ticket
 */
export const useCreateTicket = () => {
  const pending = ref(false)
  const error = ref<any>(null)
  const data = ref<Ticket | null>(null)

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
      const res = await useAuthApi<HTTPTicketResponse>('/tickets/', {
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
      return await useAuthApi<TicketMessage>(`/api/tickets/${ticketId}/reply/`, {
        body: fd,
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


export const useAdminGetTickets = () => {
  return useAuthApi<Ticket[]>('/api/tickets/admin/')
}

export const useAdminGetTicket = useGetTicket

export const useAdminUpdateTicket = (ticketId: string) => {
  const update = async (payload: AdminUpdateTicketPayload) => {
    return await useAuthApi<Ticket>(`/api/tickets/admin/${ticketId}/update/`, {
      method: 'PATCH',
      body: payload,
    })
  }
  return { update }
}

export const useAdminReplyTicket = (ticketId: string) => {
  const isLoading = ref(false)

  const reply = async (payload: ReplyTicketPayload) => {
    const fd = new FormData()
    fd.append('message', payload.message)
    payload.attachments?.forEach(f => fd.append('attachments', f))

    isLoading.value = true
    const { data } = await useAuthApi<TicketMessage>(`/api/tickets/admin/${ticketId}/reply/`, {
      method: 'POST',
      body: fd,
    })
    isLoading.value = false
    return data
  }

  return { reply, isLoading: readonly(isLoading) }
}