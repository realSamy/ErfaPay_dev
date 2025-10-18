import {FetchError} from "ofetch";

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