import type {Service} from "~/types/services";

export default async function () {
  const services = useState<Service[]>('services.list', () => []);

  if (!services.value.length) {
    const {data: response} = await useServices()

    if (response.value?.ok) {
      services.value = response.value.data;
    }
  }

  return {services}
}