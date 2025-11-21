import type {Order} from "~/types/admin/data";

interface FilterOptions extends Partial<Order> {
}

export default async function (filter?: FilterOptions) {
  // demo records (truncate for clarity)
  const orders: Order[] = [
    {
      id: 1,
      user: 7,
      orderNumber: 10001,
      amount_irr: 5000000,
      status: 'pending',
      type: {
        title: {
          en: 'Pay rent',
          fa: 'پرداخت اجاره',
        },
        description: {
          en: 'Rent payment',
          fa: 'پرداخت هزینه اجاره',
        }
      },
      created_at: '2025-01-01T10:00:00Z',
      processed_by: 1
    },
    {
      id: 2,
      user: 5,
      orderNumber: 10002,
      amount_irr: 2000000,
      status: 'processing',
      type: {
        title: {
          en: 'Charge account',
          fa: 'شارژ حساب',
        },
        description: {
          en: 'Increase account balance',
          fa: 'افزایش موجودی حساب',
        }
      },
      created_at: '2025-01-01T11:00:00Z'
    },
    {
      id: 3,
      user: 10,
      orderNumber: 10003,
      amount_irr: 3000000,
      status: 'done',
      type: {
        title: {
          en: 'Money transfer',
          fa: 'انتقال پول',
        },
        description: {
          en: 'Transfer money',
          fa: 'انتقال وجه به حساب دیگر',
        }
      },
      created_at: '2025-01-01T12:00:00Z',
      processed_by: 3
    },
    {
      id: 4,
      user: 12,
      orderNumber: 10004,
      amount_irr: 1500000,
      status: 'rejected',
      type: {
        title: {
          en: 'Pay rent',
          fa: 'پرداخت اجاره',
        },
        description: {
          en: 'Rent payment',
          fa: 'پرداخت هزینه اجاره',
        }
      },
      created_at: '2025-01-02T09:10:00Z'
    },
    {
      id: 5,
      user: 8,
      orderNumber: 10005,
      amount_irr: 2500000,
      status: 'done',
      type: {
        title: {
          en: 'Charge account',
          fa: 'شارژ حساب',
        },
        description: {
          en: 'Increase account balance',
          fa: 'افزایش موجودی حساب',
        }
      },
      created_at: '2025-01-02T10:30:00Z',
      processed_by: 2
    },
    {
      id: 6,
      user: 14,
      orderNumber: 10006,
      amount_irr: 4800000,
      status: 'pending',
      type: {
        title: {
          en: 'Money transfer',
          fa: 'انتقال پول',
        },
        description: {
          en: 'Transfer money',
          fa: 'انتقال وجه به حساب دیگر',
        }
      },
      created_at: '2025-01-02T11:20:00Z'
    },
    {
      id: 7,
      user: 9,
      orderNumber: 10007,
      amount_irr: 3500000,
      status: 'processing',
      type: {
        title: {
          en: 'Pay rent',
          fa: 'پرداخت اجاره',
        },
        description: {
          en: 'Rent payment',
          fa: 'پرداخت هزینه اجاره',
        }
      },
      created_at: '2025-01-03T08:00:00Z',
      processed_by: 4
    },
    {
      id: 8,
      user: 11,
      orderNumber: 10008,
      amount_irr: 900000,
      status: 'done',
      type: {
        title: {
          en: 'Charge account',
          fa: 'شارژ حساب',
        },
        description: {
          en: 'Increase account balance',
          fa: 'افزایش موجودی حساب',
        }
      },
      created_at: '2025-01-03T08:45:00Z'
    },
    {
      id: 9,
      user: 6,
      orderNumber: 10009,
      amount_irr: 3100000,
      status: 'rejected',
      type: {
        title: {
          en: 'Money transfer',
          fa: 'انتقال پول',
        },
        description: {
          en: 'Transfer money',
          fa: 'انتقال وجه به حساب دیگر',
        }
      },
      created_at: '2025-01-03T09:00:00Z'
    },
    {
      id: 10,
      user: 15,
      orderNumber: 10010,
      amount_irr: 2200000,
      status: 'pending',
      type: {
        title: {
          en: 'Pay rent',
          fa: 'پرداخت اجاره',
        },
        description: {
          en: 'Rent payment',
          fa: 'پرداخت هزینه اجاره',
        }
      },
      created_at: '2025-01-04T07:10:00Z',
      processed_by: 1
    },
    {
      id: 11,
      user: 13,
      orderNumber: 10011,
      amount_irr: 1900000,
      status: 'done',
      type: {
        title: {
          en: 'Charge account',
          fa: 'شارژ حساب',
        },
        description: {
          en: 'Increase account balance',
          fa: 'افزایش موجودی حساب',
        }
      },
      created_at: '2025-01-04T07:20:00Z'
    },
    {
      id: 12,
      user: 5,
      orderNumber: 10012,
      amount_irr: 4600000,
      status: 'processing',
      type: {
        title: {
          en: 'Money transfer',
          fa: 'انتقال پول',
        },
        description: {
          en: 'Transfer money',
          fa: 'انتقال وجه به حساب دیگر',
        }
      },
      created_at: '2025-01-04T08:30:00Z'
    },
    {
      id: 13,
      user: 7,
      orderNumber: 10013,
      amount_irr: 500000,
      status: 'rejected',
      type: {
        title: {
          en: 'Pay rent',
          fa: 'پرداخت اجاره',
        },
        description: {
          en: 'Rent payment',
          fa: 'پرداخت هزینه اجاره',
        }
      },
      created_at: '2025-01-04T09:00:00Z'
    },
    {
      id: 14,
      user: 10,
      orderNumber: 10014,
      amount_irr: 8000000,
      status: 'done',
      type: {
        title: {
          en: 'Charge account',
          fa: 'شارژ حساب',
        },
        description: {
          en: 'Increase account balance',
          fa: 'افزایش موجودی حساب',
        }
      },
      created_at: '2025-01-05T10:00:00Z',
      processed_by: 3
    },
    {
      id: 15,
      user: 12,
      orderNumber: 10015,
      amount_irr: 2700000,
      status: 'pending',
      type: {
        title: {
          en: 'Money transfer',
          fa: 'انتقال پول',
        },
        description: {
          en: 'Transfer money',
          fa: 'انتقال وجه به حساب دیگر',
        }
      },
      created_at: '2025-01-05T11:00:00Z'
    },
    {
      id: 16,
      user: 11,
      orderNumber: 10016,
      amount_irr: 1200000,
      status: 'processing',
      type: {
        title: {
          en: 'Pay rent',
          fa: 'پرداخت اجاره',
        },
        description: {
          en: 'Rent payment',
          fa: 'پرداخت هزینه اجاره',
        }
      },
      created_at: '2025-01-05T12:00:00Z'
    },
    {
      id: 17,
      user: 6,
      orderNumber: 10017,
      amount_irr: 1400000,
      status: 'done',
      type: {
        title: {
          en: 'Charge account',
          fa: 'شارژ حساب',
        },
        description: {
          en: 'Increase account balance',
          fa: 'افزایش موجودی حساب',
        }
      },
      created_at: '2025-01-06T09:10:00Z',
      processed_by: 2
    },
    {
      id: 18,
      user: 15,
      orderNumber: 10018,
      amount_irr: 3300000,
      status: 'rejected',
      type: {
        title: {
          en: 'Money transfer',
          fa: 'انتقال پول',
        },
        description: {
          en: 'Transfer money',
          fa: 'انتقال وجه به حساب دیگر',
        }
      },
      created_at: '2025-01-06T10:15:00Z'
    },
    {
      id: 19,
      user: 5,
      orderNumber: 10019,
      amount_irr: 6000000,
      status: 'done',
      type: {
        title: {
          en: 'Pay rent',
          fa: 'پرداخت اجاره',
        },
        description: {
          en: 'Rent payment',
          fa: 'پرداخت هزینه اجاره',
        }
      },
      created_at: '2025-01-06T11:30:00Z'
    },
    {
      id: 20,
      user: 8,
      orderNumber: 10020,
      amount_irr: 2100000,
      status: 'pending',
      type: {
        title: {
          en: 'Charge account',
          fa: 'شارژ حساب',
        },
        description: {
          en: 'Increase account balance',
          fa: 'افزایش موجودی حساب',
        }
      },
      created_at: '2025-01-07T08:00:00Z',
      processed_by: 4
    },
    {
      id: 21,
      user: 9,
      orderNumber: 10021,
      amount_irr: 700000,
      status: 'processing',
      type: {
        title: {
          en: 'Money transfer',
          fa: 'انتقال پول',
        },
        description: {
          en: 'Transfer money',
          fa: 'انتقال وجه به حساب دیگر',
        }
      },
      created_at: '2025-01-07T09:00:00Z'
    },
    {
      id: 22,
      user: 14,
      orderNumber: 10022,
      amount_irr: 9000000,
      status: 'done',
      type: {
        title: {
          en: 'Pay rent',
          fa: 'پرداخت اجاره',
        },
        description: {
          en: 'Rent payment',
          fa: 'پرداخت هزینه اجاره',
        }
      },
      created_at: '2025-01-07T10:00:00Z'
    },
    {
      id: 23,
      user: 7,
      orderNumber: 10023,
      amount_irr: 1800000,
      status: 'rejected',
      type: {
        title: {
          en: 'Charge account',
          fa: 'شارژ حساب',
        },
        description: {
          en: 'Increase account balance',
          fa: 'افزایش موجودی حساب',
        }
      },
      created_at: '2025-01-08T07:30:00Z',
      processed_by: 1
    },
    {
      id: 24,
      user: 13,
      orderNumber: 10024,
      amount_irr: 2600000,
      status: 'done',
      type: {
        title: {
          en: 'Money transfer',
          fa: 'انتقال پول',
        },
        description: {
          en: 'Transfer money',
          fa: 'انتقال وجه به حساب دیگر',
        }
      },
      created_at: '2025-01-08T08:40:00Z'
    },
    {
      id: 25,
      user: 10,
      orderNumber: 10025,
      amount_irr: 1950000,
      status: 'processing',
      type: {
        title: {
          en: 'Pay rent',
          fa: 'پرداخت اجاره',
        },
        description: {
          en: 'Rent payment',
          fa: 'پرداخت هزینه اجاره',
        }
      },
      created_at: '2025-01-08T09:50:00Z'
    },
    {
      id: 26,
      user: 6,
      orderNumber: 10026,
      amount_irr: 310000,
      status: 'pending',
      type: {
        title: {
          en: 'Charge account',
          fa: 'شارژ حساب',
        },
        description: {
          en: 'Increase account balance',
          fa: 'افزایش موجودی حساب',
        }
      },
      created_at: '2025-01-09T06:20:00Z'
    },
    {
      id: 27,
      user: 11,
      orderNumber: 10027,
      amount_irr: 4500000,
      status: 'done',
      type: {
        title: {
          en: 'Money transfer',
          fa: 'انتقال پول',
        },
        description: {
          en: 'Transfer money',
          fa: 'انتقال وجه به حساب دیگر',
        }
      },
      created_at: '2025-01-09T06:45:00Z',
      processed_by: 2
    },
    {
      id: 28,
      user: 12,
      orderNumber: 10028,
      amount_irr: 1500000,
      status: 'rejected',
      type: {
        title: {
          en: 'Pay rent',
          fa: 'پرداخت اجاره',
        },
        description: {
          en: 'Rent payment',
          fa: 'پرداخت هزینه اجاره',
        }
      },
      created_at: '2025-01-09T07:00:00Z'
    },
    {
      id: 29,
      user: 8,
      orderNumber: 10029,
      amount_irr: 7000000,
      status: 'processing',
      type: {
        title: {
          en: 'Charge account',
          fa: 'شارژ حساب',
        },
        description: {
          en: 'Increase account balance',
          fa: 'افزایش موجودی حساب',
        }
      },
      created_at: '2025-01-09T08:00:00Z'
    },
    {
      id: 30,
      user: 9,
      orderNumber: 10030,
      amount_irr: 500000,
      status: 'done',
      type: {
        title: {
          en: 'Money transfer',
          fa: 'انتقال پول',
        },
        description: {
          en: 'Transfer money',
          fa: 'انتقال وجه به حساب دیگر',
        }
      },
      created_at: '2025-01-09T09:00:00Z',
      processed_by: 3
    }
  ]

  // simulate api fetch
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!filter || Object.keys(filter).length === 0) {
    return orders
  }

  return orders.filter(order => {
    return Object.entries(filter).every(([key, value]) => {
      if (value === undefined || value === null) return true

      // handle nested type fields
      if (key === "type") {
        const typeFilter = value as Order["type"]
        return Object.entries(typeFilter).every(([tKey, tValue]) => {
          return order.type?.[tKey as keyof Order["type"]] === tValue
        })
      }

      return (order as any)[key] === value
    })
  })
}