import { ref } from 'vue';
import { y as useAuthApi, c as createError, k as useAuth } from './server.mjs';

const buildOrderFormData = (form) => {
  const fd = new FormData();
  const textFields = [
    "service_id",
    "user_amount_irt"
  ];
  textFields.forEach((key) => {
    const value = form[key];
    if (value !== void 0 && value !== null && value !== "") {
      fd.append(key, String(value));
    }
  });
  if (form.custom_data?.length) {
    fd.append("custom_data", JSON.stringify(form.custom_data));
  }
  if (form.attachments?.length) {
    form.attachments.forEach((attachment) => fd.append("attachments", attachment));
  }
  return fd;
};
const useCreateOrder = () => {
  const loading = ref(false);
  const error = ref(null);
  const orderId = ref(null);
  const createOrder = async (payload) => {
    loading.value = true;
    error.value = null;
    try {
      const fd = buildOrderFormData(payload);
      const { data } = await useAuthApi("/api/orders/create/", {
        method: "POST",
        body: fd
      });
      if (data.value?.ok) {
        orderId.value = data.value.order_id;
        return data.value;
      } else {
        error.value = data.value?.error || "Failed to create order";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  return { loading, error, orderId, createOrder };
};
const useAdminFetchOrder = async (order_id) => {
  const { data: response } = await useAuthApi(`/api/orders/admin/${order_id}/`);
  if (response.value?.ok) {
    const order = ref(response.value.data);
    return { order };
  }
  throw createError({
    message: "Order not found"
  });
};
const useUpdateAdminOrder = () => {
  const loading = ref(false);
  const error = ref(null);
  const updatedOrder = ref(null);
  const updateOrder = async (pk, payload) => {
    if (!useAuth().isAdmin.value) return;
    loading.value = true;
    error.value = null;
    try {
      const { data } = await useAuthApi(`/api/orders/admin/${pk}/`, {
        method: "PATCH",
        body: payload
      });
      if (data.value?.ok) {
        updatedOrder.value = data.value.data;
        return data.value;
      } else {
        error.value = data.value?.error || "Failed to update order";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  return { loading, error, updatedOrder, updateOrder };
};

export { useAdminFetchOrder as a, useUpdateAdminOrder as b, useCreateOrder as u };
//# sourceMappingURL=useOrders-C3kKfnWR.mjs.map
