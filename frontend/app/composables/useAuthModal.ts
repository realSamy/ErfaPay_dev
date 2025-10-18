type AuthModalType = 'signin' | 'signup' | '2fa' | 'profileSetup' | null

const currentModal = ref<AuthModalType>(null)

export default function() {
  function open(modal: AuthModalType) {
    console.log({modal})
    currentModal.value = modal
  }

  function close() {
    currentModal.value = null
  }

  return {
    currentModal,
    open,
    close
  }
}
