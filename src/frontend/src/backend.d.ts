import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface OrderItem {
  name: string;
  qty: bigint;
  price: bigint;
}

export interface Order {
  id: bigint;
  customerName: string;
  phone: string;
  items: OrderItem[];
  total: bigint;
  timestamp: bigint;
}

export interface Consultation {
  id: bigint;
  name: string;
  email: string;
  phone: string;
  goal: string;
  preferredTime: string;
  timestamp: bigint;
}

export interface backendInterface {
  _initializeAccessControlWithSecret(secret: string): Promise<void>;
  claimAdmin(): Promise<boolean>;
  checkAdmin(): Promise<boolean>;
  submitOrder(customerName: string, phone: string, items: OrderItem[], total: bigint): Promise<bigint>;
  getOrders(): Promise<Order[]>;
  submitConsultation(name: string, email: string, phone: string, goal: string, preferredTime: string): Promise<bigint>;
  getConsultations(): Promise<Consultation[]>;
}
