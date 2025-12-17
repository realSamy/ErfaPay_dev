export type UserRole = 'regular' | 'simple_support' | 'senior_support' | 'main_admin'

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  role: UserRole
  phone_prefix?: string
  country_code?: string
  is_verified: boolean
  is_blocked: boolean
  last_login?: string
  date_joined: string
}

export interface UserListFilters {
  q?: string  // search
  role?: UserRole
  blocked?: 'true' | 'false'
  page?: number
  page_size?: number
  active?: true
}

// ── Payloads ──

// Login Request
export interface LoginPayload {
  email: string
  password: string
}

// OTP Verify (for login/signup)
export interface OTPVerifyPayload {
  email: string
  otp: string
}

// Signup Email Request (request OTP)
export interface SignupEmailPayload {
  email: string
}

// Signup Complete (after OTP)
export interface SignupCompletePayload {
  email: string
  password: string
  confirm_password: string
  first_name: string
  last_name: string
  phone_prefix?: string
  country_code?: string
  tos_agreed: boolean
}

// Resend OTP
export interface ResendOTPPayload {
  email: string
}

// Own Profile Update (User)
export interface UserOwnUpdatePayload {
  first_name?: string
  last_name?: string
  phone_prefix?: string
  country_code?: string
}

// Admin User Create (Support User)
export interface AdminCreateUserPayload {
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
  confirm_password: string
  role: 'simple_support' | 'senior_support'
  phone_prefix?: string
  country_code?: string
}

// Admin User Update
export interface AdminUserUpdatePayload {
  first_name?: string
  last_name?: string
  role?: UserRole
  phone_prefix?: string
  country_code?: string
  is_verified?: boolean
  is_blocked?: boolean
}