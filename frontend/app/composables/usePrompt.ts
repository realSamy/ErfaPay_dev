import {LazyModalPrompt} from '#components'
import type {ModalPromptProps} from "~/types/props";

export const usePrompt = <T extends object>() => {
  const overlay = useOverlay()

  return (
      modelValue: T,
      fields: Record<keyof T, any> = {} as T,
      extra_props: Partial<ModalPromptProps<T>> = {} as any
  ): Promise<T | null> => {
    return new Promise((resolve) => {
      const modal = overlay.create(LazyModalPrompt, {
        props: {
          ...extra_props,
          modelValue,
          fields,
          onConfirm: (val: T) => {
            modal.close()
            resolve(val)
          },
          onCancel: () => {
            modal.close()
            resolve(null)
          },
        },
      })

      modal.open()
    })
  }
}
