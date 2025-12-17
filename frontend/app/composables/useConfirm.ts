import {LazyModalConfirm} from '#components'
import type {ModalConfirmProps} from "~/types/props";

export const useConfirm = (options: ModalConfirmProps | string = {}) => {
  if (typeof options === "string") {
    options = {
      message: options
    }
  }
  return new Promise((resolve) => {
    const overlay = useOverlay()
    const modal = overlay.create(LazyModalConfirm, {
      props: {
        ...options,
        onConfirm: () => {
          modal.close()
          resolve(true)
        },
        onCancel: () => {
          modal.close()
          resolve(false)
        },
      },
    })

    modal.open()
  })
}
