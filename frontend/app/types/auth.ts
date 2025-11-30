export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

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
  tos: boolean
}

export interface AuthState {
  state: 'signin' | 'otp' | 'signup' | 'complete'
  loginInfo: Partial<LoginInfo>
}