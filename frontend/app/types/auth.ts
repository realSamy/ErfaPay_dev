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

export interface AuthState {
  state: 'signin' | 'otp' | 'signup' | 'complete'
  loginInfo: Partial<LoginInfo>
}