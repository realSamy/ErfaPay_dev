import type {User} from "~/types/admin/data";

export default async function () {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1000)
  });

  const users: User[] = [
    {
      id: 1,
      email: "emma.johnson@example.com",
      first_name: "Emma",
      last_name: "Johnson",
      role: "regular",
      is_verified: true,
      blocked: false,
      country_code: "US"
    },
    {
      id: 2,
      email: "li.wei@example.cn",
      first_name: "Wei",
      last_name: "Li",
      role: "regular",
      is_verified: false,
      blocked: false,
      country_code: "CN"
    },
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
      id: 4,
      email: "sofia.rossi@example.it",
      first_name: "Sofia",
      last_name: "Rossi",
      role: "regular",
      is_verified: true,
      blocked: false,
      country_code: "IT"
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
      id: 6,
      email: "oliver.brown@example.co.uk",
      first_name: "Oliver",
      last_name: "Brown",
      role: "regular",
      is_verified: false,
      blocked: false,
      country_code: "GB"
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
      id: 8,
      email: "yuki.tanaka@example.jp",
      first_name: "Yuki",
      last_name: "Tanaka",
      role: "regular",
      is_verified: true,
      blocked: false,
      country_code: "JP"
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
      id: 10,
      email: "mia.novak@example.hr",
      first_name: "Mia",
      last_name: "Novak",
      role: "regular",
      is_verified: false,
      blocked: true,
      country_code: "HR"
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
      id: 12,
      email: "eva.schmidt@example.de",
      first_name: "Eva",
      last_name: "Schmidt",
      role: "regular",
      is_verified: false,
      blocked: false,
      country_code: "DE"
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
      id: 14,
      email: "fatima.khan@example.pk",
      first_name: "Fatima",
      last_name: "Khan",
      role: "regular",
      is_verified: true,
      blocked: false,
      country_code: "PK"
    },
    {
      id: 15,
      email: "ethan.davis@example.com",
      first_name: "Ethan",
      last_name: "Davis",
      role: "regular",
      is_verified: true,
      blocked: false,
      country_code: "US"
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
      id: 18,
      email: "chloe.dupont@example.fr",
      first_name: "Chloe",
      last_name: "Dupont",
      role: "regular",
      is_verified: false,
      blocked: false,
      country_code: "FR"
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
    {
      id: 20,
      email: "hana.al-farsi@example.om",
      first_name: "Hana",
      last_name: "Al-Farsi",
      role: "regular",
      is_verified: true,
      blocked: false,
      country_code: "OM"
    }
  ]

  try {
    const store = useState<User[]>('admin.users')
    if (!store.value.length || store.value.length != users.length) {
      store.value = users
    }
  } catch (error) {}

  return users
}