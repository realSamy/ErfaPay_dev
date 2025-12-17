import type {CategoryFormPayload} from "~/types/payload";

export const buildCategoryFormData = (form: CategoryFormPayload): FormData => {
  const fd = new FormData()

  fd.append('name_fa', form.name_fa)
  fd.append('name_en', form.name_en || '')
  fd.append('slug', form.slug)

  if (form.order !== undefined) fd.append('order', String(form.order))
  if (form.is_active !== undefined) fd.append('is_active', form.is_active ? 'true' : 'false')
  if (form.icon instanceof File) fd.append('icon', form.icon)

  return fd
}