export interface SignupInfo {
  email: string;
}

export interface LoginInfo {
  email: string
  password: string
}

export interface OTPInfo extends Partial<LoginInfo> {
  otp: number
}

export interface CompleteSignupInfo {
  first_name: string
  last_name: string
  email: string
  password: string
  confirm_password: string
  tos_agreed: boolean
}

export interface AuthState {
  state: 'signin' | 'otp' | 'signup' | 'complete'
  loginInfo: Partial<LoginInfo>
}