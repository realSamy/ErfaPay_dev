import {FetchError} from "ofetch";
import {ref} from 'vue';
import {useStorage} from '@vueuse/core';

export const useAuthApi = async <T>(
    url: string,
    redirectToLogin: boolean = false,
    options: any = {}
): Promise<{ data: Ref<T | null>, error: Ref<any | null> }> => {
  const data = ref<T | null>(null);
  const error = ref<any | null>(null);
  const accessToken = useStorage('auth.access_token', '');
  const refreshToken = useStorage('auth.refresh_token', '');

  const config = useRuntimeConfig();
  const {open: openModal} = useAuthModal();

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken.value}`,
  };

  try {
    data.value = await $fetch<T>(url, {
      ...options,
      headers,
    });
  } catch (err) {
    const fetchError = err as FetchError;

    if (fetchError.status === 401) {
      if (refreshToken.value) {
        try {
          const refreshResponse = await $fetch<{ access: string }>('/api/auth/refresh/', {
            method: 'POST',
            body: {refresh: refreshToken.value},
          });

          if (refreshResponse?.access) {
            accessToken.value = refreshResponse.access;

            // Retry the original request with new token
            const retryHeaders = {
              ...headers,
              Authorization: `Bearer ${accessToken.value}`,
            };

            data.value = await $fetch<T>(url, {
              ...options,
              headers: retryHeaders,
            });
            return {data, error} as {data: Ref<T>, error: any};
          }
        } catch (refreshErr) {
          // Refresh failed, log out user
          accessToken.value = '';
          refreshToken.value = '';
        }
      }

      // No valid refresh or refresh failed
      error.value = fetchError;
      if (redirectToLogin) {
        openModal('signin');
      }
    } else {
      // Other errors
      error.value = fetchError;
    }
  }

  return {data, error} as {data: Ref<T>, error: any};
};