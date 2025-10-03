export interface CartItem {
  CartItemID: string;
  CartID: string;
  ProductID: string;
  Quantity: number;
  UnitPrice: number;
  UpdateDate: string;
  Notes: string | null;
}
