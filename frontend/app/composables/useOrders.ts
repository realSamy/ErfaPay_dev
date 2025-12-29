import {ref} from 'vue';
import type {Order} from '~/types/orders';
import type {CreateOrderPayload, UpdateOrderPayload} from "~/types/payload";
import type {GenericHTTPResponse} from "~/types/http";
import {buildOrderFormData} from "~/utils/orderForm";

export const useFetchUserOrders = () => {
  const orders = ref<Order[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchOrders = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await useAuthApi('/api/orders/', {
      });
      orders.value = data.value?.data || [];
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return { orders, loading, error, fetchOrders };
};

interface PaginatedResponse {
  count: number
  next: string | null
  previous: string | null
  results: Order[]
}

export const useFetchAdminOrders = (
  status?: Ref<string | string[] | undefined>,
  search?: Ref<string>,
  sorting?: Ref<any[] | undefined>,
  pageSize: number|Ref<number> = 20,
  user_id?: number | string,
) => {
  const orders = ref<Order[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  if (typeof pageSize !== 'number') pageSize = pageSize.value

  // Pagination state
  const currentPage = ref(1)
  const totalItems = ref(0)
  const pageCount = computed(() => Math.ceil(totalItems.value / pageSize))

  const refresh = async (page: number = currentPage.value) => {
    if (!useAuth().isAdmin.value) return

    loading.value = true
    error.value = null

    try {
      const params: Record<string, any> = {
        page,
        page_size: pageSize,
        user_id,
      }

      if (status?.value) params.status = status.value
      if (search?.value) params.search = search.value
      if (sorting?.value) params.sorting = sorting.value

      const { data } = await useAuthApi<PaginatedResponse>('/api/orders/admin/', {
        method: 'GET',
        params,
      })

      if (data.value) {
        orders.value = data.value.results
        totalItems.value = data.value.count
        currentPage.value = page
      } else {
        orders.value = []
        totalItems.value = 0
      }
    } catch (err) {
      error.value = (err as Error).message
      orders.value = []
      totalItems.value = 0
    } finally {
      loading.value = false
    }
  }

  // Go to specific page
  const goToPage = async (page: number) => {
    if (page >= 1 && page <= pageCount.value && page !== currentPage.value) {
      await refresh(page)
    }
  }

  // Reset to page 1 when filters change
  watch([status, search, sorting], async () => {
    currentPage.value = 1
    await refresh(1)
  })

  // Initial load
  onMounted(async () => await refresh(1))

  return {
    orders,
    loading,
    error,
    refresh,
    currentPage: currentPage,
    totalItems: readonly(totalItems),
    pageCount: readonly(pageCount),
    goToPage,
  }
}

export const useCreateOrder = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const orderId = ref<number | null>(null);

  const createOrder = async (payload: CreateOrderPayload) => {
    loading.value = true;
    error.value = null;
    try {
      const fd = buildOrderFormData(payload)
      const { data } = await useAuthApi('/api/orders/create/', {
        method: 'POST',
        body: fd,
      });
      if (data.value?.ok) {
        orderId.value = data.value.order_id;
        return data.value;
      } else {
        error.value = data.value?.error || 'Failed to create order';
      }
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, orderId, createOrder };
};

export const useAdminFetchOrder = async (order_id: string|number) => {
  const {data: response} = await useAuthApi<GenericHTTPResponse<Order>>(`/api/orders/admin/${order_id}/`,);

  if (response.value?.ok) {
    const order = ref<Order>(response.value.data)
    return {order};
  }

  throw createError({
    message: 'Order not found',
  })
}

export const useUpdateAdminOrder = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const updatedOrder = ref<Order | null>(null);

  const updateOrder = async (pk: number|string, payload: UpdateOrderPayload) => {
    if (!useAuth().isAdmin.value) return;

    loading.value = true;
    error.value = null;
    try {
      const { data } = await useAuthApi(`/api/orders/admin/${pk}/`, {
        method: 'PATCH',
        body: payload,
      });
      if (data.value?.ok) {
        updatedOrder.value = data.value.data;
        return data.value;
      } else {
        error.value = data.value?.error || 'Failed to update order';
      }
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, updatedOrder, updateOrder };
};

export const useFetchOrderReceipt = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchReceipt = async (pk: number) => {
    loading.value = true;
    error.value = null;
    try {
      const response: Blob = await $fetch(`/api/orders/${pk}/receipt/`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${useAuth().accessToken}` },
        responseType: 'blob',
      });
      return URL.createObjectURL(response); // Return blob URL for download/display
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, fetchReceipt };
};