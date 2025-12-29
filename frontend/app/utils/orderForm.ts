import type {CreateOrderPayload} from "~/types/payload";

export const buildOrderFormData = (form: CreateOrderPayload) => {
  const fd = new FormData()

  const textFields: (keyof CreateOrderPayload)[] = [
    'service_id',
    'user_amount_irt',
  ]

  textFields.forEach(key => {
    const value = form[key]
    if (value !== undefined && value !== null && value !== '') {
      fd.append(key, String(value))
    }
  })

  if (form.custom_data?.length) {
    fd.append('custom_data', JSON.stringify(form.custom_data))
  }

  if (form.attachments?.length) {
    form.attachments.forEach(attachment => fd.append('attachments', attachment))
  }

  return fd
}