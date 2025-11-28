import type {TicketItem} from "~/types/admin/data";


export default async function () {
  // demo records (truncate for clarity)
  const tickets: TicketItem[] = [
  {
    id: 142,
    subject: "مشکل در شارژ کیف پول با PayPal",
    category: { id: 1, name: "مشکلات پرداخت" },
    status: "open",
    priority: "high",
    user: "محمد رضایی",
    assigned_to: 5,
    created_at: "2025-11-22T10:15:00Z",
    updated_at: "2025-11-22T14:30:00Z",
    messages: [
      {
        id: 512,
        ticket: 142,
        sender: "محمد رضایی",
        message: "سلام، هنگام شارژ با PayPal خطای 402 می‌دهد و پول کتا می‌شود ولی کیف پول شارژ نمی‌شود.",
        is_staff: false,
        created_at: "2025-11-22T10:15:00Z",
        attachments: []
      },
      {
        id: 513,
        ticket: 142,
        sender: "علی حسینی (پشتیبانی)",
        message: "سلام آقای رضایی، در حال بررسی تراکنش هستیم. لطفاً شماره تراکنش PayPal را ارسال کنید.",
        is_staff: true,
        created_at: "2025-11-22T10:45:00Z",
        attachments: []
      }
    ]
  },
  {
    id: 141,
    subject: "درخواست پرداخت قبض آب",
    category: { id: 2, name: "سفارش خدمات" },
    status: "in_progress",
    priority: "medium",
    user: "زهرا احمدی",
    assigned_to: 7,
    created_at: "2025-11-21T18:20:00Z",
    updated_at: "2025-11-22T09:10:00Z",
    messages: [
      {
        id: 508,
        ticket: 141,
        sender: "زهرا احمدی",
        message: "قبض آب این ماه رو برام پرداخت کنید.\nشناسه قبض: 1234567890\nشناسه پرداخت: 9876543210",
        is_staff: false,
        created_at: "2025-11-21T18:20:00Z",
        attachments: [{ id: 201, file: "/media/tickets/attachments/water_bill_nov.pdf" }]
      }
    ]
  },
  {
    id: 140,
    subject: "تغییر اطلاعات حساب",
    category: { id: 3, name: "حساب کاربری" },
    status: "closed",
    priority: "low",
    user: "رضا کریمی",
    assigned_to: null,
    created_at: "2025-11-20T09:30:00Z",
    updated_at: "2025-11-21T11:00:00Z",
    messages: [
      {
        id: 505,
        ticket: 140,
        sender: "رضا کریمی",
        message: "می‌خواهم شماره تلفن حسابم را تغییر دهم.",
        is_staff: false,
        created_at: "2025-11-20T09:30:00Z",
        attachments: []
      },
      {
        id: 506,
        ticket: 140,
        sender: "سارا محمدی (پشتیبانی)",
        message: "تغییرات اعمال شد ✅ شماره جدید: 09123456789",
        is_staff: true,
        created_at: "2025-11-20T10:15:00Z",
        attachments: []
      }
    ]
  },
  {
    id: 139,
    subject: "خطا در تبدیل ارز USD به ریال",
    category: { id: 1, name: "مشکلات پرداخت" },
    status: "open",
    priority: "high",
    user: "امیرحسین نوری",
    assigned_to: 5,
    created_at: "2025-11-22T08:00:00Z",
    updated_at: "2025-11-22T08:30:00Z",
    messages: [
      {
        id: 501,
        ticket: 139,
        sender: "امیرحسین نوری",
        message: "نرخ تبدیل خیلی پایین‌تر از نرخ واقعی اعمال می‌شود!",
        is_staff: false,
        created_at: "2025-11-22T08:00:00Z",
        attachments: [{ id: 200, file: "/media/tickets/attachments/exchange_rate_screenshot.png" }]
      }
    ]
  },
  {
    id: 138,
    subject: "درخواست خرید گیفت کارت آمازون",
    category: { id: 4, name: "درخواست ویژه" },
    status: "in_progress",
    priority: "medium",
    user: "فاطمه حسینی",
    assigned_to: 8,
    created_at: "2025-11-21T14:22:00Z",
    updated_at: "2025-11-22T11:45:00Z",
    messages: [
      {
        id: 498,
        ticket: 138,
        sender: "فاطمه حسینی",
        message: "لطفاً یک گیفت کارت 100 دلاری آمازون تهیه کنید.",
        is_staff: false,
        created_at: "2025-11-21T14:22:00Z",
        attachments: []
      }
    ]
  },
  {
    id: 137,
    subject: "تیکت تست - نادیده بگیرید",
    category: null,
    status: "closed",
    priority: "low",
    user: "تست کاربر",
    assigned_to: null,
    created_at: "2025-11-20T12:00:00Z",
    updated_at: "2025-11-20T12:05:00Z",
    messages: [
      {
        id: 495,
        ticket: 137,
        sender: "تست کاربر",
        message: "این فقط یک تست است.",
        is_staff: false,
        created_at: "2025-11-20T12:00:00Z",
        attachments: []
      }
    ]
  },
  {
    id: 136,
    subject: "سفارش پرداخت اینترنت همراه اول",
    category: { id: 2, name: "سفارش خدمات" },
    status: "closed",
    priority: "medium",
    user: "علیرضا شریفی",
    assigned_to: 7,
    created_at: "2025-11-19T16:40:00Z",
    updated_at: "2025-11-20T09:20:00Z",
    messages: [
      {
        id: 492,
        ticket: 136,
        sender: "علیرضا شریفی",
        message: "پرداخت بسته اینترنت 10 گیگ MCI",
        is_staff: false,
        created_at: "2025-11-19T16:40:00Z",
        attachments: []
      },
      {
        id: 493,
        ticket: 136,
        sender: "نیما رضوی (پشتیبانی)",
        message: "پرداخت با موفقیت انجام شد ✅",
        is_staff: true,
        created_at: "2025-11-19T17:10:00Z",
        attachments: [{ id: 199, file: "/media/tickets/attachments/mci_receipt_nov.pdf" }]
      }
    ]
  },
  {
    id: 135,
    subject: "مشکل ورود به حساب",
    category: { id: 3, name: "حساب کاربری" },
    status: "open",
    priority: "high",
    user: "مینا کریمی",
    assigned_to: 5,
    created_at: "2025-11-22T06:30:00Z",
    updated_at: "2025-11-22T07:00:00Z",
    messages: [
      {
        id: 490,
        ticket: 135,
        sender: "مینا کریمی",
        message: "رمز عبور را فراموش کرده‌ام و ایمیل بازیابی نمی‌آید.",
        is_staff: false,
        created_at: "2025-11-22T06:30:00Z",
        attachments: []
      }
    ]
  },
  // ... 12 more realistic tickets (shortened for brevity)
  {
    id: 134,
    subject: "درخواست افزایش سقف شارژ روزانه",
    category: { id: 4, name: "درخواست ویژه" },
    status: "in_progress",
    priority: "medium",
    user: "حسین مرادی",
    assigned_to: null,
    created_at: "2025-11-21T11:11:00Z",
    updated_at: "2025-11-21T11:11:00Z",
    messages: [
      {
        id: 488,
        ticket: 134,
        sender: "حسین مرادی",
        message: "برای کسب‌وکارم نیاز به شارژ بالای 500 دلار در روز دارم.",
        is_staff: false,
        created_at: "2025-11-21T11:11:00Z",
        attachments: []
      }
    ]
  },
  {
    id: 133,
    subject: "سفارش پرداخت جریمه راهنمایی و رانندگی",
    category: { id: 2, name: "سفارش خدمات" },
    status: "closed",
    priority: "high",
    user: "سعید محمدی",
    assigned_to: 8,
    created_at: "2025-11-18T09:00:00Z",
    updated_at: "2025-11-18T14:30:00Z",
    messages: [
      {
        id: 485,
        ticket: 133,
        sender: "سعید محمدی",
        message: "جریمه دوربین - پلاک ۱۲ ایران ۳۴",
        is_staff: false,
        created_at: "2025-11-18T09:00:00Z",
        attachments: [{ id: 198, file: "/media/tickets/attachments/traffic_fine.jpg" }]
      }
    ]
  },
  // Continuing to 20...
  { id: 132, subject: "درخواست بستن حساب", category: { id: 3, name: "حساب کاربری" }, status: "open", priority: "medium", user: "نازنین عباسی", assigned_to: 5, created_at: "2025-11-22T13:00:00Z", updated_at: "2025-11-22T13:00:00Z", messages: [] },
  { id: 131, subject: "خطای 500 هنگام ساخت سفارش", category: { id: 5, name: "خطاهای فنی" }, status: "open", priority: "high", user: "پویا یوسفی", assigned_to: null, created_at: "2025-11-22T12:15:00Z", updated_at: "2025-11-22T12:15:00Z", messages: [] },
  { id: 130, subject: "پرداخت شارژ ساختمان", category: { id: 2, name: "سفارش خدمات" }, status: "in_progress", priority: "medium", user: "مهسا رحیمی", assigned_to: 7, created_at: "2025-11-21T10:30:00Z", updated_at: "2025-11-22T09:00:00Z", messages: [] },
  { id: 129, subject: "سؤال درباره کارمزد تراکنش‌ها", category: { id: 6, name: "سؤالات مالی" }, status: "closed", priority: "low", user: "کیانوش امیری", assigned_to: null, created_at: "2025-11-20T15:45:00Z", updated_at: "2025-11-21T08:20:00Z", messages: [] },
  { id: 128, subject: "درخواست خرید اشتراک اسپاتیفای", category: { id: 4, name: "درخواست ویژه" }, status: "in_progress", priority: "medium", user: "آرشام حسنی", assigned_to: 8, created_at: "2025-11-21T19:55:00Z", updated_at: "2025-11-22T10:10:00Z", messages: [] },
  { id: 127, subject: "مشکل نمایش مانده کیف پول", category: { id: 5, name: "خطاهای فنی" }, status: "open", priority: "medium", user: "شیدا قاسمی", assigned_to: null, created_at: "2025-11-22T11:20:00Z", updated_at: "2025-11-22T11:20:00Z", messages: [] },
  { id: 126, subject: "پرداخت قبض تلفن ثابت", category: { id: 2, name: "سفارش خدمات" }, status: "closed", priority: "low", user: "بهرام طالبی", assigned_to: 7, created_at: "2025-11-19T08:10:00Z", updated_at: "2025-11-19T11:40:00Z", messages: [] },
  { id: 125, subject: "درخواست فعال‌سازی احراز هویت دو مرحله‌ای", category: { id: 3, name: "حساب کاربری" }, status: "closed", priority: "medium", user: "نیما رضایی", assigned_to: null, created_at: "2025-11-20T14:20:00Z", updated_at: "2025-11-20T14:45:00Z", messages: [] },
  { id: 124, subject: "سفارش خرید شارژ ایرانسل", category: { id: 2, name: "سفارش خدمات" }, status: "in_progress", priority: "medium", user: "لیلا مرادی", assigned_to: 8, created_at: "2025-11-22T07:50:00Z", updated_at: "2025-11-22T08:30:00Z", messages: [] },
  { id: 123, subject: "انتقاد از سرعت پاسخگویی پشتیبانی", category: { id: 7, name: "انتقادات و پیشنهادات" }, status: "open", priority: "low", user: "کورش اسلامی", assigned_to: 5, created_at: "2025-11-21T22:10:00Z", updated_at: "2025-11-22T09:15:00Z", messages: [] }
];

  // simulate api fetch
  await new Promise(resolve => setTimeout(resolve, 1000));

  return tickets;
}