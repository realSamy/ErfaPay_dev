import { u as useApi } from './useApi-_4dZBB2A.mjs';

const useServices = () => {
  return useApi("/api/services/");
};
const useService = (id) => {
  return useApi(`/api/services/${id}/`);
};

export { useService as a, useServices as u };
//# sourceMappingURL=useServices-BjUETh0c.mjs.map
