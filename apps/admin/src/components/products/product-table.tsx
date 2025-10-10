import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";
import type { Product } from "@packages/types";
import { getProductSizesByProduct, getTotalQuantity } from "@mock/product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ảnh</TableHead>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Loại</TableHead>
            <TableHead>Kích thước và Màu sắc</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Không tìm thấy sản phẩm nào.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const productSizes = getProductSizesByProduct(product);
              const totalQuantity = getTotalQuantity(product);

              return (
                <TableRow key={product.ProductID}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <img
                        src={product.Images[0]}
                        alt={product.Name}
                        className="h-10 w-10 rounded object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.Name}</TableCell>
                  <TableCell>{totalQuantity}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.Type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {productSizes.map((size) => (
                        <Badge key={size.ProductSizeID} variant="outline">
                          {size.ProductSizeName} ({size.Colors})
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                      >
                        <Link
                          to={`/admin/products/${product.ProductID}`}
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => onEdit(product)}
                        title="Sửa sản phẩm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                        onClick={() => onDelete(product.ProductID)}
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
