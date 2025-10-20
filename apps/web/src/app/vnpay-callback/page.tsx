import { Suspense } from "react";
import { VNPayCallbackContent } from "@/components/vnpay-callback/vnpay-callback-content";

function VNPayCallbackLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang xử lý kết quả thanh toán...</p>
      </div>
    </div>
  );
}

export default function VNPayCallbackPage() {
  return (
    <Suspense fallback={<VNPayCallbackLoading />}>
      <VNPayCallbackContent />
    </Suspense>
  );
}
