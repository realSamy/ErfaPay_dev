import type {User} from "~/types/admin/data";

export default async function () {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1000)
  });

  const agents: User[] = [
    {
      id: 3,
      email: "lucas.martin@example.fr",
      first_name: "Lucas",
      last_name: "Martin",
      role: "simple_support",
      is_verified: true,
      blocked: false,
      country_code: "FR"
    },
    {
      id: 5,
      email: "mohamed.ali@example.eg",
      first_name: "Mohamed",
      last_name: "Ali",
      role: "senior_support",
      is_verified: true,
      blocked: false,
      country_code: "EG"
    },

    {
      id: 7,
      email: "ava.wilson@example.com",
      first_name: "Ava",
      last_name: "Wilson",
      role: "main_admin",
      is_verified: true,
      blocked: false,
      country_code: "US"
    },
    {
      id: 9,
      email: "carlos.silva@example.br",
      first_name: "Carlos",
      last_name: "Silva",
      role: "simple_support",
      is_verified: true,
      blocked: false,
      country_code: "BR"
    },
    {
      id: 11,
      email: "noah.kim@example.kr",
      first_name: "Noah",
      last_name: "Kim",
      role: "senior_support",
      is_verified: true,
      blocked: false,
      country_code: "KR"
    },
    {
      id: 13,
      email: "diego.garcia@example.mx",
      first_name: "Diego",
      last_name: "Garcia",
      role: "simple_support",
      is_verified: true,
      blocked: false,
      country_code: "MX"
    },
    {
      id: 16,
      email: "sofia.santos@example.pt",
      first_name: "Sofia",
      last_name: "Santos",
      role: "main_admin",
      is_verified: true,
      blocked: false,
      country_code: "PT"
    },
    {
      id: 17,
      email: "amir.hassan@example.ae",
      first_name: "Amir",
      last_name: "Hassan",
      role: "senior_support",
      is_verified: true,
      blocked: true,
      country_code: "AE"
    },
    {
      id: 19,
      email: "liam.murphy@example.ie",
      first_name: "Liam",
      last_name: "Murphy",
      role: "simple_support",
      is_verified: true,
      blocked: false,
      country_code: "IE"
    },
  ]

  try {
    const store = useState<User[]>('admin.agents')
    if (!store.value.length || store.value.length != agents.length) {
      store.value = agents
    }
  } catch (error) {
  }

  return agents
}