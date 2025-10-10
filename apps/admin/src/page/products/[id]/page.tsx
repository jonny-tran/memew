import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { ProductStatus } from "@packages/types";
import { mockProducts, getProductSizesByProduct } from "@mock/product";
import { ProductFormDialog } from "@/components/products/product-form-dialog";
import { DeleteConfirmationDialog } from "@/components/products/delete-confirmation-dialog";
import { DashboardLayout } from "@/layouts/dashboard-layout";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Find product by ID
  const product = mockProducts.find((p) => p.ProductID === id);
  const productSizes = product ? getProductSizesByProduct(product) : [];

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h2 className="text-2xl font-bold">Không tìm thấy sản phẩm</h2>
        <p className="text-muted-foreground">
          Sản phẩm với ID "{id}" không tồn tại.
        </p>
        <Button asChild>
          <Link to="/admin/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </Link>
        </Button>
      </div>
    );
  }

  const totalQuantity = productSizes.reduce(
    (total, size) => total + size.Quantity,
    0
  );
  const minPrice = Math.min(...productSizes.map((size) => size.UnitPrice));
  const maxPrice = Math.max(...productSizes.map((size) => size.UnitPrice));

  const handleEdit = () => {
    setIsFormDialogOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: unknown) => {
    console.log("Updating product:", product.ProductID, data);
    // TODO: Implement update logic
    setIsFormDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting product:", product.ProductID);
    // TODO: Implement delete logic
    setIsDeleteDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/admin/products">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {product.Name}
              </h1>
              <p className="text-muted-foreground">Chi tiết sản phẩm</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Sửa
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.Images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${product.Name} - Hình ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">
                    Tên sản phẩm
                  </h4>
                  <p className="text-lg font-semibold">{product.Name}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">
                    Loại sản phẩm
                  </h4>
                  <Badge variant="secondary" className="mt-1">
                    {product.Type}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">
                    Trạng thái
                  </h4>
                  <Badge
                    variant={
                      product.Status === ProductStatus.Active
                        ? "default"
                        : "secondary"
                    }
                    className="mt-1"
                  >
                    {product.Status === ProductStatus.Active
                      ? "Hoạt động"
                      : "Không hoạt động"}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">
                    Tổng số lượng
                  </h4>
                  <p className="text-lg font-semibold">{totalQuantity}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">
                    Giá
                  </h4>
                  <p className="text-lg font-semibold">
                    {minPrice === maxPrice
                      ? `${minPrice.toLocaleString("vi-VN")} VNĐ`
                      : `${minPrice.toLocaleString("vi-VN")} - ${maxPrice.toLocaleString("vi-VN")} VNĐ`}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Mô tả</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.Description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Sizes */}
        <Card>
          <CardHeader>
            <CardTitle>Kích thước & Giá</CardTitle>
            <CardDescription>
              Danh sách các kích thước có sẵn và thông tin chi tiết
            </CardDescription>
          </CardHeader>
          <CardContent>
            {productSizes.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Chưa có thông tin kích thước
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productSizes.map((size) => (
                  <div
                    key={size.ProductSizeID}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{size.ProductSizeName}</h4>
                      <Badge variant="outline">{size.Colors}</Badge>
                    </div>
                    <Separator />
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Giá:</span>
                        <span className="font-semibold">
                          {size.UnitPrice.toLocaleString("vi-VN")} VNĐ
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Số lượng:</span>
                        <span className="font-semibold">{size.Quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modals */}
        <ProductFormDialog
          isOpen={isFormDialogOpen}
          onClose={() => setIsFormDialogOpen(false)}
          onSubmit={handleFormSubmit}
          initialValue={product}
        />

        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          productName={product.Name}
        />
      </div>
    </DashboardLayout>
  );
}
