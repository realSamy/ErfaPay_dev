import { y as useAuthApi } from './server.mjs';
import { ref, readonly } from 'vue';

const useCreateTicket = () => {
  const pending = ref(false);
  const error = ref(null);
  const data = ref(null);
  const create = async (payload) => {
    pending.value = true;
    error.value = null;
    const fd = new FormData();
    fd.append("subject", payload.subject);
    fd.append("category", String(payload.category));
    fd.append("priority", payload.priority);
    fd.append("message", payload.message);
    payload.attachments?.forEach((file) => fd.append("attachments", file));
    try {
      const res = await useAuthApi("/api/tickets/", {
        method: "POST",
        body: fd
      });
      if (res.data.value?.ok) {
        data.value = res.data.value.data;
        return res;
      } else {
        error.value = res.data.value?.errors;
      }
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      pending.value = false;
    }
  };
  return { create, data, pending, error };
};
const useReplyTicket = (ticketId) => {
  const pending = ref(false);
  const error = ref(null);
  const reply = async (payload) => {
    pending.value = true;
    error.value = null;
    const fd = new FormData();
    fd.append("message", payload.message);
    payload.attachments?.forEach((file) => fd.append("attachments", file));
    try {
      return await useAuthApi(`/api/tickets/${ticketId}/reply/`, {
        body: fd,
        method: "POST"
      });
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      pending.value = false;
    }
  };
  return { reply, pending, error };
};
const useCloseTicket = (ticketId) => {
  const close = async () => {
    return await useAuthApi(`/api/tickets/${ticketId}/close/`, {
      method: "POST"
    });
  };
  return { close };
};
const useAdminUpdateTicket = (ticketId) => {
  const update = async (payload) => {
    return await useAuthApi(`/api/tickets/admin/${ticketId}/update/`, {
      method: "PATCH",
      body: payload
    });
  };
  return { update };
};
const useAdminReplyTicket = (ticketId) => {
  const isLoading = ref(false);
  const reply = async (payload) => {
    const fd = new FormData();
    fd.append("message", payload.message);
    payload.attachments?.forEach((f) => fd.append("attachments", f));
    isLoading.value = true;
    const { data } = await useAuthApi(`/api/tickets/admin/${ticketId}/reply/`, {
      method: "POST",
      body: fd
    });
    isLoading.value = false;
    return data;
  };
  return { reply, isLoading: readonly(isLoading) };
};

export { useReplyTicket as a, useCloseTicket as b, useAdminReplyTicket as c, useAdminUpdateTicket as d, useCreateTicket as u };
//# sourceMappingURL=useTickets-CnXAgghv.mjs.map
