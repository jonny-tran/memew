import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import type { Product } from "@packages/types";
import { ProductType, ProductStatus } from "@packages/types";
import {
  productFormSchema,
  type ProductFormValues,
} from "@/components/products/form-dialog/product-form.schema";

// Validation schema & types moved to form-dialog module

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormValues) => void;
  initialValue?: Product;
}

export function ProductFormDialog({
  isOpen,
  onClose,
  onSubmit,
  initialValue,
}: ProductFormDialogProps) {
  const isEditMode = !!initialValue;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      Name: "",
      Description: "",
      Type: ProductType.Shirt,
      Status: ProductStatus.Active,
      Images: [{ value: "" }],
      ProductSizes: [
        {
          ProductSizeName: "",
          Colors: "",
          UnitPrice: 0,
          Quantity: 0,
        },
      ],
    },
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "Images",
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control: form.control,
    name: "ProductSizes",
  });

  // Load initial values khi edit
  useEffect(() => {
    if (isEditMode && initialValue) {
      // Mock product sizes cho edit mode
      const mockSizes = [
        {
          ProductSizeName: "S",
          Colors: "Trắng",
          UnitPrice: 150000,
          Quantity: 50,
        },
        {
          ProductSizeName: "M",
          Colors: "Đen",
          UnitPrice: 150000,
          Quantity: 30,
        },
      ];

      form.reset({
        Name: initialValue.Name,
        Description: initialValue.Description,
        Type: initialValue.Type,
        Status: initialValue.Status,
        Images: initialValue.Images.map((img) => ({ value: img })),
        ProductSizes: mockSizes,
      });
    } else {
      form.reset({
        Name: "",
        Description: "",
        Type: ProductType.Shirt,
        Status: ProductStatus.Active,
        Images: [{ value: "" }],
        ProductSizes: [
          {
            ProductSizeName: "",
            Colors: "",
            UnitPrice: 0,
            Quantity: 0,
          },
        ],
      });
    }
  }, [isEditMode, initialValue, form]);

  const handleSubmit = (data: ProductFormValues) => {
    onSubmit(data);
    console.log("🚀 ~ handleSubmit ~ data:", data);
    form.reset();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Chỉnh sửa thông tin sản phẩm"
              : "Thêm sản phẩm mới vào danh sách"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin cơ bản</h3>

              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tên sản phẩm <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên sản phẩm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Mô tả <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập mô tả sản phẩm"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Loại sản phẩm <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại sản phẩm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ProductType.Shirt}>Áo</SelectItem>
                        <SelectItem value={ProductType.Sticker}>
                          Sticker
                        </SelectItem>
                        <SelectItem value={ProductType.Keyring}>
                          Móc khóa
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Hình ảnh</h3>
              {imageFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`Images.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Hình ảnh {index + 1}{" "}
                        {index === 0 && <span className="text-red-500">*</span>}
                      </FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // Tạo URL tạm thời cho file
                                const url = URL.createObjectURL(file);
                                field.onChange(url);
                              }
                            }}
                          />
                        </FormControl>
                        {imageFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {field.value && (
                        <div className="mt-2">
                          <img
                            src={field.value}
                            alt={`Xem trước hình ảnh ${index + 1}`}
                            className="w-20 h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendImage({ value: "" })}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Thêm hình ảnh
              </Button>
            </div>

            {/* Product Sizes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Kích thước & Giá</h3>
              {sizeFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Size {index + 1}</h4>
                    {sizeFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeSize(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`ProductSizes.${index}.ProductSizeName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Tên size <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="VD: S, M, L, Free Size"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`ProductSizes.${index}.Colors`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Màu sắc <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="VD: Trắng, Đen, Xanh"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`ProductSizes.${index}.UnitPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Giá (VNĐ) <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`ProductSizes.${index}.Quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Số lượng <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendSize({
                    ProductSizeName: "",
                    Colors: "",
                    UnitPrice: 0,
                    Quantity: 0,
                  })
                }
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Thêm size
              </Button>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Hủy
              </Button>
              <Button type="submit">
                {isEditMode ? "Cập nhật" : "Thêm mới"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
