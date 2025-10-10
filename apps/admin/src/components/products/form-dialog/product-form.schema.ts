import { z } from "zod";
import { ProductType, ProductStatus } from "@packages/types";

// Zod schema cho form validation
export const productFormSchema = z.object({
  Name: z.string().min(1, "Tên sản phẩm không được để trống"),
  Description: z.string().min(1, "Mô tả không được để trống"),
  Type: z.nativeEnum(ProductType),
  Status: z.nativeEnum(ProductStatus),
  Images: z
    .array(z.object({ value: z.string().url("URL hình ảnh không hợp lệ") }))
    .min(1, "Cần ít nhất 1 hình ảnh"),
  ProductSizes: z
    .array(
      z.object({
        ProductSizeName: z.string().min(1, "Tên size không được để trống"),
        Colors: z.string().min(1, "Màu sắc không được để trống"),
        UnitPrice: z.number().min(0, "Giá không được âm"),
        Quantity: z.number().min(0, "Số lượng không được âm"),
      })
    )
    .min(1, "Cần ít nhất 1 size sản phẩm"),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
