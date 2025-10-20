import { OrderStatus, PaymentMethod } from "../enums";

export interface Order {
  OrderID: string;
  CustomerID: string;
  Status: OrderStatus;
  OrderDate: string;
  PaymentMethod: PaymentMethod;
  Note: string | null;
  ShippedDate: string | null;
}
