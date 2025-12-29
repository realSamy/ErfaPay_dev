import {FetchError} from "ofetch";
import type {CurrencyItem} from "~/types/data";
import type {User} from "~/types/users";
import type {Ticket, TicketCategory, TicketMessage} from "~/types/tickets";
import type {Service} from "~/types/services";

export type UseFetchReturn<T> = {
  data: Ref<T | null>
  pending: Ref<boolean>
  error: Ref<FetchError<T> | null>
  statusCode: Ref<number | null>
  refresh: () => Promise<void>
  execute: () => Promise<void>
  // ... other internal fetch properties
}
type Merge<T> = { [K in keyof T]: T[K] };

type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends
  (x: infer I) => void ? I : never;


export interface Tokens {
  refresh: string;
  access: string;
}

export interface SimpleError {
  message: string;
  statusCode: number;
  stack: any;
}
export type FailureOnly<T> = T extends { ok: true } ? never : T

interface GenericSuccessResponse<T = undefined> {
  ok: true
  data: T
  message?: string
}

interface GenericFailureResponse {
  ok: false
  error: string
}
interface GenericMultiFailureResponse {
  ok: false
  errors: Record<string, string[]>
}


interface AuthResponse {
  access: string
  refresh: string
  user: User
}

interface GenericSuccessAuthResponse extends GenericSuccessResponse<AuthResponse> {
}

interface OTPLoginSuccessResponse extends GenericSuccessAuthResponse {
}


export interface HTTPCurrencyResponse extends GenericSuccessResponse<CurrencyItem[]> {
}

export interface HTTPUserResponse extends GenericSuccessResponse<User> {
}

export type GenericHTTPResponse<T = undefined> = GenericSuccessResponse<T> | GenericFailureResponse
export type GenericHTTPMultiResponse<T = undefined> = GenericSuccessResponse<T> | GenericMultiFailureResponse

export type GenericHTTPExtendedResponse<
  T = undefined,
  E extends object[] = []
> =
  Merge<
    GenericHTTPResponse<T> &
    UnionToIntersection<E[number]>
  >;
export type GenericHTTPExtendedMultiResponse<
  T = undefined,
  E extends object[] = []
> =
  Merge<
    GenericHTTPMultiResponse<T> &
    UnionToIntersection<E[number]>
  >;


export type HTTPLoginResponse = GenericHTTPResponse
export type HTTPOTPLoginResponse = GenericHTTPResponse<AuthResponse>
export type HTTPOTPSignupResponse = GenericHTTPResponse
export type HTTPSignupResponse = GenericHTTPResponse

export interface HTTPCompleteSignupResponse extends GenericSuccessAuthResponse {
}

export interface GenericHTTPPaginationResponse<T = undefined> {
  count: number
  next?: string | null
  previous?: string | null
  results: T
}
export type HTTPTicketResponse = GenericHTTPResponse<Ticket>
export type HTTPTicketsResponse = GenericHTTPResponse<Ticket[]>

export type HTTPServiceResponse = GenericHTTPResponse<Service>
export type HTTPServicesResponse = GenericHTTPResponse<Service[]>

export type HTTPTicketCategoryResponse = GenericHTTPMultiResponse<TicketCategory>
export type HTTPTicketCategoriesResponse = GenericHTTPMultiResponse<TicketCategory[]>

export type HTTPTicketCreateResponse = GenericHTTPExtendedMultiResponse<undefined, [{ticket_id: string}]>