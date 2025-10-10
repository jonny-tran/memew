import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, Edit, Trash2, Search, Loader2, AlertCircle } from "lucide-react";
import {
  useProductTypeStore,
  type ProductType,
} from "@/store/productTypeStore";
import { DashboardLayout } from "@/layouts/dashboard-layout";

const ITEMS_PER_PAGE = 5;

export default function ProductTypePage() {
  const {
    productTypes,
    isLoading,
    error,
    fetchProductTypes,
    addProductType,
    updateProductType,
    deleteProductType,
  } = useProductTypeStore();

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProductType, setEditingProductType] =
    useState<ProductType | null>(null);
  const [formData, setFormData] = useState({ name: "" });

  // Load data on component mount
  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  // Filter product types based on search query
  const filteredProductTypes = productTypes.filter((type: ProductType) =>
    type.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProductTypes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProductTypes = filteredProductTypes.slice(
    startIndex,
    endIndex
  );

  // Event handlers
  const handleAddProductType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      await addProductType(formData.name);
      setFormData({ name: "" });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding product type:", error);
    }
  };

  const handleEditProductType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !editingProductType) return;

    try {
      await updateProductType(editingProductType.id, formData.name);
      setFormData({ name: "" });
      setEditingProductType(null);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating product type:", error);
    }
  };

  const handleDeleteProductType = async (id: string) => {
    try {
      await deleteProductType(id);
    } catch (error) {
      console.error("Error deleting product type:", error);
    }
  };

  const openEditDialog = (productType: ProductType) => {
    setEditingProductType(productType);
    setFormData({ name: productType.name });
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditingProductType(null);
    setFormData({ name: "" });
    setIsEditDialogOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value.trim());
    setCurrentPage(1); // Reset to first page when searching
  };

  const getStatusBadge = (status: "active" | "inactive") => {
    return status === "active" ? (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 hover:bg-green-100"
      >
        Hoạt động
      </Badge>
    ) : (
      <Badge
        variant="secondary"
        className="bg-gray-100 text-gray-600 hover:bg-gray-100"
      >
        Không hoạt động
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Quản lý loại sản phẩm
            </h1>
            <p className="text-muted-foreground">
              Quản lý danh sách loại sản phẩm và thông tin chi tiết
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Thêm loại sản phẩm mới
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm loại sản phẩm mới</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddProductType} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên loại sản phẩm</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nhập tên loại sản phẩm..."
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    required
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Thêm mới
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm loại sản phẩm..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Main Content Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Danh sách loại sản phẩm
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Đang tải...</span>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên loại sản phẩm</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Tùy chọn</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedProductTypes.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-center py-8 text-muted-foreground"
                        >
                          {searchQuery.trim()
                            ? "Không tìm thấy loại sản phẩm nào"
                            : "Chưa có loại sản phẩm nào"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedProductTypes.map((productType: ProductType) => (
                        <TableRow key={productType.id}>
                          <TableCell className="font-medium">
                            {productType.name}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(productType.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(productType)}
                                className="text-orange-600 border-orange-200 hover:bg-orange-50"
                              >
                                <Edit className="h-4 w-4" />
                                Sửa
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    Xóa
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Xác nhận xóa
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Bạn có chắc chắn muốn xóa loại sản phẩm "
                                      {productType.name}"? Hành động này không
                                      thể hoàn tác.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteProductType(productType.id)
                                      }
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Xóa
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {/* Summary and Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Tổng loại sản phẩm: {filteredProductTypes.length}
                  </p>

                  {totalPages > 1 && (
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

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              handlePageChange(
                                Math.min(totalPages, currentPage + 1)
                              )
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
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sửa loại sản phẩm</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditProductType} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Tên loại sản phẩm</Label>
                <Input
                  id="edit-name"
                  name="name"
                  placeholder="Nhập tên loại sản phẩm..."
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeEditDialog}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Cập nhật
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
