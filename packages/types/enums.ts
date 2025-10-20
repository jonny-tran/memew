export const UserRole = {
  Admin: "Admin",
  Customer: "Customer",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const Gender = {
  Male: "Male",
  Female: "Female",
  Other: "Other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const ProductType = {
  Sticker: "Sticker",
  Shirt: "Shirt",
  Keyring: "Keyring",
  New: "New",
  Cup: "Cup",
  PhoneCase: "PhoneCase",
} as const;

export type ProductType = (typeof ProductType)[keyof typeof ProductType];

export const ProductStatus = {
  Active: "Active",
  Inactive: "Inactive",
} as const;

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];

export const OrderStatus = {
  Pending: "Pending",
  Processing: "Processing",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
  Refunded: "Refunded",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentMethod = {
  Cash: "Cash",
  VNPay: "VNPay",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
