import type {Order} from "~/types/admin/data";

export default async function () {
  const store = useState<Order[]>('admin--orders', () => []);
  const orders: Order[] = await adminLoadOrders()

  store.value = orders;
  return {orders, store}
}