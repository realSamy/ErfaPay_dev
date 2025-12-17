import type {Service} from "~/types/services";
import type {ServiceFormPayload} from "~/types/payload";

export const buildServiceFormData = (form: ServiceFormPayload): FormData => {
  const fd = new FormData()

  const textFields: (keyof ServiceFormPayload)[] = [
    // 'category',
    'title_fa', 'title_en', 'description_fa', 'description_en',
    'commission_type', 'commission_percent', 'commission_fixed',
    'min_amount', 'max_amount', 'tax_rate', 'icon',
    'delivery_time_fa', 'delivery_time_en', 'order'
  ]

  textFields.forEach(key => {
    const value = form[key]
    if (value !== undefined && value !== null && value !== '') {
      fd.append(key, String(value))
    }
  })

  // Boolean fields
  if (form.requires_manual_review !== undefined) {
    fd.append('requires_manual_review', form.requires_manual_review ? 'true' : 'false')
  }
  if (form.is_active !== undefined) {
    fd.append('is_active', form.is_active ? 'true' : 'false')
  }

  // File fields
  if (form.banner instanceof File) fd.append('banner', form.banner)

  return fd
}