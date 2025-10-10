import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import type { Product } from "@packages/types";
import { ProductType, ProductStatus } from "@packages/types";
import { mockProducts } from "@mock/product";
import { ProductTable } from "@/components/products/product-table";
import { ProductFormDialog } from "@/components/products/product-form-dialog";
import { DeleteConfirmationDialog } from "@/components/products/delete-confirmation-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { useProductModal } from "@/contexts/product-modal-context";

const ITEMS_PER_PAGE = 5;

export default function ProductsPage() {
  // State management
  const [products] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ProductType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ProductStatus | "all">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<string>("");

  // Product modal context
  const {
    isFormDialogOpen,
    editingProduct,
    openAddProductModal,
    openEditProductModal,
    closeModal,
  } = useProductModal();

  // Filter và search logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.Name.toLowerCase().includes(
        searchQuery.trim().toLowerCase()
      );

      const matchesType = typeFilter === "all" || product.Type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || product.Status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [products, searchQuery, typeFilter, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Event handlers
  const handleAddProduct = () => {
    openAddProductModal();
  };

  const handleEditProduct = (product: Product) => {
    openEditProductModal(product);
  };

  const handleDeleteProduct = (productId: string) => {
    setDeletingProductId(productId);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: unknown) => {
    if (editingProduct) {
      // Edit mode - update existing product
      console.log("Updating product:", editingProduct.ProductID, data);
      // TODO: Implement update logic
    } else {
      // Add mode - create new product
      console.log("Creating new product:", data);
      // TODO: Implement create logic
    }
    closeModal();
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting product:", deletingProductId);
    // TODO: Implement delete logic
    setIsDeleteDialogOpen(false);
    setDeletingProductId("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1); // Reset to first page when filters change
  };

  const getProductNameById = (productId: string) => {
    const product = products.find((p) => p.ProductID === productId);
    return product?.Name || "";
  };

  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Quản lý sản phẩm
            </h1>
            <p className="text-muted-foreground">
              Quản lý danh sách sản phẩm và thông tin chi tiết
            </p>
          </div>
          <Button
            onClick={handleAddProduct}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Thêm sản phẩm mới
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên sản phẩm..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleFilterChange();
              }}
              className="pl-10"
            />
          </div>

          <Select
            value={typeFilter}
            onValueChange={(value: ProductType | "all") => {
              setTypeFilter(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Loại sản phẩm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value={ProductType.Shirt}>Áo</SelectItem>
              <SelectItem value={ProductType.Sticker}>Sticker</SelectItem>
              <SelectItem value={ProductType.Keyring}>Móc khóa</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(value: ProductStatus | "all") => {
              setStatusFilter(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value={ProductStatus.Active}>Hoạt động</SelectItem>
              <SelectItem value={ProductStatus.Inactive}>
                Không hoạt động
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="text-sm text-muted-foreground">
          Hiển thị {paginatedProducts.length} trong tổng số{" "}
          {filteredProducts.length} sản phẩm
          {filteredProducts.length !== products.length && " (đã lọc)"}
        </div>

        {/* Product Table */}
        <ProductTable
          products={paginatedProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Modals */}
        <ProductFormDialog
          isOpen={isFormDialogOpen}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          initialValue={editingProduct}
        />

        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDeletingProductId("");
          }}
          onConfirm={handleDeleteConfirm}
          productName={getProductNameById(deletingProductId)}
        />
      </div>
    </DashboardLayout>
  );
}
