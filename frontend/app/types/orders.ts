import type {RequiredField, Service} from "./services"
import type {User} from "~/types/users";

interface Attachment {
  filename: string;
  url: string;
}
export type OrderStatus = 'pending' | 'processing' | 'done' | 'rejected';

export interface CustomData extends RequiredField{
  value?: number | string
}
export interface Order {
  id: number;
  service: Service;
  user: User;
  processed_by?: User;
  user_amount_irt: string;
  commission_irt: string;
  admin_notes: string;
  tax_amount: string;
  total_irt: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  custom_data: CustomData[];
  attachments?: Attachment[];
}