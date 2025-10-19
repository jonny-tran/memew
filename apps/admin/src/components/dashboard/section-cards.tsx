import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCompactCurrency } from "@/lib/format-currency";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 dark:from-emerald-950 dark:to-emerald-900 dark:border-emerald-800">
        <CardHeader>
          <CardDescription className="text-emerald-700 dark:text-emerald-300">
            Tổng Doanh Thu
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-emerald-900 dark:text-emerald-100">
            {formatCompactCurrency(2450000000)}
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-emerald-300 text-emerald-700 bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:bg-emerald-900"
            >
              <IconTrendingUp className="text-emerald-600 dark:text-emerald-400" />
              +18.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-emerald-800 dark:text-emerald-200">
            Tăng trưởng mạnh tháng này{" "}
            <IconTrendingUp className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-emerald-600 dark:text-emerald-400">
            So với tháng trước
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950 dark:to-blue-900 dark:border-blue-800">
        <CardHeader>
          <CardDescription className="text-blue-700 dark:text-blue-300">
            Tổng Đơn Hàng
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-blue-900 dark:text-blue-100">
            1,847
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-blue-300 text-blue-700 bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:bg-blue-900"
            >
              <IconTrendingUp className="text-blue-600 dark:text-blue-400" />
              +15.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-blue-800 dark:text-blue-200">
            Tăng 15% so với tháng trước{" "}
            <IconTrendingUp className="size-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-blue-600 dark:text-blue-400">
            Đơn hàng thành công
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 dark:from-orange-950 dark:to-orange-900 dark:border-orange-800">
        <CardHeader>
          <CardDescription className="text-orange-700 dark:text-orange-300">
            Sản Phẩm Tồn Kho
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-orange-900 dark:text-orange-100">
            2,156
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-orange-300 text-orange-700 bg-orange-50 dark:border-orange-700 dark:text-orange-300 dark:bg-orange-900"
            >
              <IconTrendingDown className="text-orange-600 dark:text-orange-400" />
              -8.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-orange-800 dark:text-orange-200">
            Giảm do bán chạy{" "}
            <IconTrendingDown className="size-4 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="text-orange-600 dark:text-orange-400">
            Cần nhập thêm hàng
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950 dark:to-purple-900 dark:border-purple-800">
        <CardHeader>
          <CardDescription className="text-purple-700 dark:text-purple-300">
            Khách Hàng Mới
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-purple-900 dark:text-purple-100">
            324
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-purple-300 text-purple-700 bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:bg-purple-900"
            >
              <IconTrendingUp className="text-purple-600 dark:text-purple-400" />
              +22.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-purple-800 dark:text-purple-200">
            Tăng trưởng tốt{" "}
            <IconTrendingUp className="size-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-purple-600 dark:text-purple-400">Tháng này</div>
        </CardFooter>
      </Card>
    </div>
  );
}
