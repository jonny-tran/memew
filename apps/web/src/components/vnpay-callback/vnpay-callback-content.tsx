"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

export function VNPayCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<
    "loading" | "success" | "failed" | "pending"
  >("loading");
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    // Lấy các tham số từ URL callback của VNPay
    const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
    const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
    const vnp_TxnRef = searchParams.get("vnp_TxnRef");
    const vnp_Amount = searchParams.get("vnp_Amount");
    const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
    const vnp_PayDate = searchParams.get("vnp_PayDate");

    // Xử lý kết quả thanh toán
    if (vnp_ResponseCode === "00" && vnp_TransactionStatus === "00") {
      // Thanh toán thành công
      setPaymentStatus("success");
      setPaymentData({
        orderId: vnp_TxnRef,
        amount: vnp_Amount ? parseInt(vnp_Amount) / 100 : 0, // VNPay trả về số tiền nhân 100
        orderInfo: vnp_OrderInfo,
        payDate: vnp_PayDate,
      });
    } else if (vnp_ResponseCode === "24") {
      // Giao dịch đang chờ xử lý
      setPaymentStatus("pending");
      setPaymentData({
        orderId: vnp_TxnRef,
        amount: vnp_Amount ? parseInt(vnp_Amount) / 100 : 0,
        orderInfo: vnp_OrderInfo,
        payDate: vnp_PayDate,
      });
    } else {
      // Thanh toán thất bại
      setPaymentStatus("failed");
      setPaymentData({
        orderId: vnp_TxnRef,
        amount: vnp_Amount ? parseInt(vnp_Amount) / 100 : 0,
        orderInfo: vnp_OrderInfo,
        errorCode: vnp_ResponseCode,
      });
    }
  }, [searchParams]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    // VNPay trả về format: yyyyMMddHHmmss
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10);
    const minute = dateString.substring(10, 12);
    const second = dateString.substring(12, 14);

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleViewOrder = () => {
    if (paymentStatus === "success") {
      router.push("/order-success");
    } else {
      router.push("/checkout");
    }
  };

  const handleRetryPayment = () => {
    router.push("/checkout");
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "success":
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case "failed":
        return <XCircle className="h-16 w-16 text-red-500" />;
      case "pending":
        return <Clock className="h-16 w-16 text-orange-500" />;
      default:
        return <AlertCircle className="h-16 w-16 text-gray-500" />;
    }
  };

  const getStatusTitle = () => {
    switch (paymentStatus) {
      case "success":
        return "Thanh toán thành công!";
      case "failed":
        return "Thanh toán thất bại";
      case "pending":
        return "Đang xử lý thanh toán";
      default:
        return "Đang xử lý...";
    }
  };

  const getStatusDescription = () => {
    switch (paymentStatus) {
      case "success":
        return "Giao dịch của bạn đã được xử lý thành công. Đơn hàng sẽ được chuẩn bị và giao đến bạn sớm nhất.";
      case "failed":
        return "Giao dịch không thành công. Vui lòng kiểm tra lại thông tin thanh toán hoặc thử lại.";
      case "pending":
        return "Giao dịch đang được xử lý. Vui lòng chờ trong giây lát hoặc kiểm tra lại sau.";
      default:
        return "Đang xử lý kết quả thanh toán...";
    }
  };

  if (paymentStatus === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Status Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">{getStatusIcon()}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getStatusTitle()}
            </h1>
            <p className="text-gray-600">{getStatusDescription()}</p>
          </div>

          {/* Payment Information */}
          {paymentData && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Thông tin giao dịch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Mã đơn hàng
                    </p>
                    <p className="text-gray-900">
                      {paymentData.orderId || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Số tiền</p>
                    <p className="text-gray-900 font-semibold">
                      {formatCurrency(paymentData.amount)}
                    </p>
                  </div>
                </div>

                {paymentData.orderInfo && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Thông tin đơn hàng
                    </p>
                    <p className="text-gray-900">{paymentData.orderInfo}</p>
                  </div>
                )}

                {paymentData.payDate && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Thời gian thanh toán
                    </p>
                    <p className="text-gray-900">
                      {formatDate(paymentData.payDate)}
                    </p>
                  </div>
                )}

                {paymentData.errorCode && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Mã lỗi</p>
                    <p className="text-red-600">{paymentData.errorCode}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          {paymentStatus === "success" && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Bước tiếp theo</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 font-bold text-xs">
                        ✓
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">Thanh toán hoàn tất</p>
                      <p>Giao dịch đã được xử lý thành công</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-bold text-xs">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Chuẩn bị hàng</p>
                      <p>Đơn hàng sẽ được chuẩn bị và đóng gói</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-600 font-bold text-xs">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">Giao hàng</p>
                      <p>Đơn hàng sẽ được giao đến địa chỉ của bạn</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {paymentStatus === "success" ? (
              <>
                <Button
                  onClick={handleViewOrder}
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                >
                  Xem chi tiết đơn hàng
                </Button>
                <Button
                  onClick={handleContinueShopping}
                  variant="outline"
                  className="flex-1"
                >
                  Tiếp tục mua sắm
                </Button>
              </>
            ) : paymentStatus === "failed" ? (
              <>
                <Button
                  onClick={handleRetryPayment}
                  className="flex-1 bg-red-600 text-white hover:bg-red-700"
                >
                  Thử lại thanh toán
                </Button>
                <Button
                  onClick={handleContinueShopping}
                  variant="outline"
                  className="flex-1"
                >
                  Tiếp tục mua sắm
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleViewOrder}
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                >
                  Kiểm tra đơn hàng
                </Button>
                <Button
                  onClick={handleContinueShopping}
                  variant="outline"
                  className="flex-1"
                >
                  Tiếp tục mua sắm
                </Button>
              </>
            )}
          </div>

          {/* Contact Info */}
          <div className="text-center mt-8 text-sm text-gray-600">
            <p>
              Cần hỗ trợ? Liên hệ với chúng tôi tại{" "}
              <a
                href="mailto:support@memew.com"
                className="text-blue-600 hover:underline"
              >
                support@memew.com
              </a>{" "}
              hoặc{" "}
              <a
                href="tel:0123456789"
                className="text-blue-600 hover:underline"
              >
                0123 456 789
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
