interface ModalProps <T = undefined> {
  title?: string
  message?: string
  cancelLabel?: string
  cancelIcon?: string
  cancelColor?: "error" | "neutral" | "primary" | "success" | "secondary" | "info" | "warning"
  confirmLabel?: string
  confirmIcon?: string
  confirmColor?: "error" | "neutral" | "primary" | "success" | "secondary" | "info" | "warning"
  onConfirm?: (value?: T) => void
  onCancel?: () => void
}

export interface PromptField {
  label?: string
  type?: 'text' | 'number' | 'boolean' | 'select'
  options?: Array<{ label: string; value: any }>
}

export interface ModalPromptProps<T extends object> extends ModalProps <T>{
  modelValue: T
  fields?: Record<keyof T, PromptField>
}

export interface ModalConfirmProps extends ModalProps{
}