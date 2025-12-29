import type {NuxtError} from '#app'


export interface GenericError extends NuxtError {
  data?: {
    returnRoute: string
  }
}