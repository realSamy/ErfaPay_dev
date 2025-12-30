import { o as useRouter } from './server.mjs';
import { ref } from 'vue';

const useApi = async (url, redirectToLogin = false, options = {}) => {
  const router = useRouter();
  const data = ref(null);
  const error = ref(null);
  try {
    data.value = await $fetch(url, {
      headers: {
        ...options.headers || {}
      }
    });
  } catch (err) {
    error.value = err;
    if (err?.statusCode === 401 && redirectToLogin) {
      await router.push("/login");
      return { data: ref(null), error: ref(null) };
    }
  }
  return { data, error };
};

export { useApi as u };
//# sourceMappingURL=useApi-_4dZBB2A.mjs.map
