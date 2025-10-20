"use client";

import { Card, CardContent } from "@/components/ui/card";

interface SizeData {
  length: number;
  width: number;
  weight: string;
}

interface SizeChartProps {
  sizeChart: Record<string, SizeData>;
}

export default function SizeChart({ sizeChart }: SizeChartProps) {
  const sizes = Object.keys(sizeChart);

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">BẢNG SIZE</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 font-medium">SIZE</th>
                {sizes.map((size) => (
                  <th key={size} className="text-center py-2 px-4 font-medium">
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium">Dài áo</td>
                {sizes.map((size) => (
                  <td key={size} className="text-center py-2 px-4">
                    {sizeChart[size].length}cm
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium">Rộng</td>
                {sizes.map((size) => (
                  <td key={size} className="text-center py-2 px-4">
                    {sizeChart[size].width}cm
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 px-4 font-medium">Cân nặng</td>
                {sizes.map((size) => (
                  <td key={size} className="text-center py-2 px-4">
                    {sizeChart[size].weight}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
