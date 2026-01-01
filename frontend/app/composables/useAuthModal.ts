type AuthModalType = 'signin' | 'signup' | '2fa' | 'profileSetup' | 'forgetPassword' | 'resetPassword' | null
type ModalProps = Record<string, any>

const currentModal = ref<AuthModalType>(null)

export default function () {
  const currentModalProps = useState<ModalProps>('auth-props')

  function open(modal: AuthModalType, props: ModalProps = {}) {
    currentModal.value = modal
    if (Object.keys(props).length) currentModalProps.value = props
  }

  function close() {
    currentModal.value = null
  }

  return {
    currentModal,
    currentModalProps,
    open,
    close
  }
}
