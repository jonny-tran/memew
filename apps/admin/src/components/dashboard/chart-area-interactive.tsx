"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", revenue: 45000000, orders: 45 },
  { date: "2024-04-02", revenue: 32000000, orders: 32 },
  { date: "2024-04-03", revenue: 28000000, orders: 28 },
  { date: "2024-04-04", revenue: 52000000, orders: 52 },
  { date: "2024-04-05", revenue: 68000000, orders: 68 },
  { date: "2024-04-06", revenue: 75000000, orders: 75 },
  { date: "2024-04-07", revenue: 42000000, orders: 42 },
  { date: "2024-04-08", revenue: 89000000, orders: 89 },
  { date: "2024-04-09", revenue: 15000000, orders: 15 },
  { date: "2024-04-10", revenue: 38000000, orders: 38 },
  { date: "2024-04-11", revenue: 65000000, orders: 65 },
  { date: "2024-04-12", revenue: 48000000, orders: 48 },
  { date: "2024-04-13", revenue: 72000000, orders: 72 },
  { date: "2024-04-14", revenue: 25000000, orders: 25 },
  { date: "2024-04-15", revenue: 22000000, orders: 22 },
  { date: "2024-04-16", revenue: 31000000, orders: 31 },
  { date: "2024-04-17", revenue: 95000000, orders: 95 },
  { date: "2024-04-18", revenue: 78000000, orders: 78 },
  { date: "2024-04-19", revenue: 45000000, orders: 45 },
  { date: "2024-04-20", revenue: 18000000, orders: 18 },
  { date: "2024-04-21", revenue: 29000000, orders: 29 },
  { date: "2024-04-22", revenue: 41000000, orders: 41 },
  { date: "2024-04-23", revenue: 33000000, orders: 33 },
  { date: "2024-04-24", revenue: 82000000, orders: 82 },
  { date: "2024-04-25", revenue: 48000000, orders: 48 },
  { date: "2024-04-26", revenue: 12000000, orders: 12 },
  { date: "2024-04-27", revenue: 88000000, orders: 88 },
  { date: "2024-04-28", revenue: 25000000, orders: 25 },
  { date: "2024-04-29", revenue: 62000000, orders: 62 },
  { date: "2024-04-30", revenue: 105000000, orders: 105 },
  { date: "2024-05-01", revenue: 35000000, orders: 35 },
  { date: "2024-05-02", revenue: 58000000, orders: 58 },
  { date: "2024-05-03", revenue: 42000000, orders: 42 },
  { date: "2024-05-04", revenue: 85000000, orders: 85 },
  { date: "2024-05-05", revenue: 98000000, orders: 98 },
  { date: "2024-05-06", revenue: 112000000, orders: 112 },
  { date: "2024-05-07", revenue: 78000000, orders: 78 },
  { date: "2024-05-08", revenue: 28000000, orders: 28 },
  { date: "2024-05-09", revenue: 45000000, orders: 45 },
  { date: "2024-05-10", revenue: 68000000, orders: 68 },
  { date: "2024-05-11", revenue: 72000000, orders: 72 },
  { date: "2024-05-12", revenue: 38000000, orders: 38 },
  { date: "2024-05-13", revenue: 32000000, orders: 32 },
  { date: "2024-05-14", revenue: 95000000, orders: 95 },
  { date: "2024-05-15", revenue: 108000000, orders: 108 },
  { date: "2024-05-16", revenue: 82000000, orders: 82 },
  { date: "2024-05-17", revenue: 125000000, orders: 125 },
  { date: "2024-05-18", revenue: 68000000, orders: 68 },
  { date: "2024-05-19", revenue: 48000000, orders: 48 },
  { date: "2024-05-20", revenue: 35000000, orders: 35 },
  { date: "2024-05-21", revenue: 15000000, orders: 15 },
  { date: "2024-05-22", revenue: 12000000, orders: 12 },
  { date: "2024-05-23", revenue: 52000000, orders: 52 },
  { date: "2024-05-24", revenue: 58000000, orders: 58 },
  { date: "2024-05-25", revenue: 42000000, orders: 42 },
  { date: "2024-05-26", revenue: 38000000, orders: 38 },
  { date: "2024-05-27", revenue: 92000000, orders: 92 },
  { date: "2024-05-28", revenue: 48000000, orders: 48 },
  { date: "2024-05-29", revenue: 18000000, orders: 18 },
  { date: "2024-05-30", revenue: 72000000, orders: 72 },
  { date: "2024-05-31", revenue: 35000000, orders: 35 },
  { date: "2024-06-01", revenue: 38000000, orders: 38 },
  { date: "2024-06-02", revenue: 98000000, orders: 98 },
  { date: "2024-06-03", revenue: 22000000, orders: 22 },
  { date: "2024-06-04", revenue: 92000000, orders: 92 },
  { date: "2024-06-05", revenue: 18000000, orders: 18 },
  { date: "2024-06-06", revenue: 58000000, orders: 58 },
  { date: "2024-06-07", revenue: 72000000, orders: 72 },
  { date: "2024-06-08", revenue: 85000000, orders: 85 },
  { date: "2024-06-09", revenue: 108000000, orders: 108 },
  { date: "2024-06-10", revenue: 32000000, orders: 32 },
  { date: "2024-06-11", revenue: 18000000, orders: 18 },
  { date: "2024-06-12", revenue: 125000000, orders: 125 },
  { date: "2024-06-13", revenue: 15000000, orders: 15 },
  { date: "2024-06-14", revenue: 95000000, orders: 95 },
  { date: "2024-06-15", revenue: 68000000, orders: 68 },
  { date: "2024-06-16", revenue: 78000000, orders: 78 },
  { date: "2024-06-17", revenue: 118000000, orders: 118 },
  { date: "2024-06-18", revenue: 22000000, orders: 22 },
  { date: "2024-06-19", revenue: 72000000, orders: 72 },
  { date: "2024-06-20", revenue: 95000000, orders: 95 },
  { date: "2024-06-21", revenue: 35000000, orders: 35 },
  { date: "2024-06-22", revenue: 65000000, orders: 65 },
  { date: "2024-06-23", revenue: 128000000, orders: 128 },
  { date: "2024-06-24", revenue: 28000000, orders: 28 },
  { date: "2024-06-25", revenue: 32000000, orders: 32 },
  { date: "2024-06-26", revenue: 92000000, orders: 92 },
  { date: "2024-06-27", revenue: 108000000, orders: 108 },
  { date: "2024-06-28", revenue: 32000000, orders: 32 },
  { date: "2024-06-29", revenue: 22000000, orders: 22 },
  { date: "2024-06-30", revenue: 105000000, orders: 105 },
];

const chartConfig = {
  revenue: {
    label: "Doanh Thu",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Đơn Hàng",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Doanh Thu & Đơn Hàng</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Thống kê doanh thu và đơn hàng trong 3 tháng qua
          </span>
          <span className="@[540px]/card:hidden">3 tháng qua</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="orders"
              type="natural"
              fill="url(#fillOrders)"
              stroke="var(--color-orders)"
              stackId="a"
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
