import { j as useState, C as useAdminUsers } from './server.mjs';

async function useLoadAdminUsersStore(force = false) {
  const users = useState("admin.users", () => []);
  if (force || !users.value.length) {
    const { listUsers } = useAdminUsers();
    const response = await listUsers();
    if (response.data.value?.results) {
      users.value = response.data.value?.results;
    }
  }
  return users;
}
async function useLoadAdminAgentsStore(force = false) {
  const users = await useLoadAdminUsersStore(force);
  const agents = useState("admin.agents", () => []);
  if (force || !agents.value.length) {
    agents.value = users.value.filter((agent) => agent.role !== "regular");
  }
  return agents;
}

export { useLoadAdminAgentsStore as u };
//# sourceMappingURL=useLoadAdminAgentsStore-RzXeyMA9.mjs.map
