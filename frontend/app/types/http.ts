import {FetchError} from "ofetch";
import type {CurrencyItem} from "~/types/data";
import type {User} from "~/types/auth";
import type {Ticket} from "~/types/index";

export type UseFetchReturn<T> = {
  data: Ref<T | null>
  pending: Ref<boolean>
  error: Ref<FetchError<T> | null>
  statusCode: Ref<number | null>
  refresh: () => Promise<void>
  execute: () => Promise<void>
  // ... other internal fetch properties
}

export interface Tokens {
  refresh: string;
  access: string;
}

export interface SimpleError {
  message: string;
  statusCode: number;
  stack: any;
}

interface GeneralSuccessResponse<T=null> {
  ok: true
  data: T
}

interface GeneralFailureResponse {
  ok: false
  errors: Record<string, any>
}

interface AuthResponse {
  access: string
  refresh: string
  user: User
}
interface OTPLoginSuccessResponse extends GeneralSuccessAuthResponse {}
interface GeneralSuccessAuthResponse extends GeneralSuccessResponse<AuthResponse> {}


export interface HTTPCurrencyResponse extends GeneralSuccessResponse<CurrencyItem[]> {}

export interface HTTPUserResponse extends GeneralSuccessResponse<User>{}

export type HTTPLoginResponse = GeneralSuccessResponse | GeneralFailureResponse
export type HTTPOTPLoginResponse = OTPLoginSuccessResponse | GeneralFailureResponse
export type HTTPOTPSignupResponse = GeneralSuccessResponse | GeneralFailureResponse
export type HTTPSignupResponse = GeneralSuccessResponse | GeneralFailureResponse

export interface HTTPCompleteSignupResponse extends GeneralSuccessAuthResponse {}

export type HTTPTicketResponse = GeneralSuccessResponse<Ticket> | GeneralFailureResponse
export type HTTPTicketsResponse = GeneralSuccessResponse<Ticket[]> | GeneralFailureResponse

