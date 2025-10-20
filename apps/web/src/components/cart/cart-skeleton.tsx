"use client";

import { Card, CardContent } from "@/components/ui/card";

export function CartSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-[200px] pb-16">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-secondary rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-secondary rounded w-1/2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Skeleton */}
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image Skeleton */}
                      <div className="w-24 h-24 bg-secondary rounded-lg flex-shrink-0"></div>

                      {/* Product Info Skeleton */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="h-5 bg-secondary rounded w-3/4 mb-2"></div>
                            <div className="flex gap-2">
                              <div className="h-4 bg-secondary rounded w-12"></div>
                              <div className="h-4 bg-secondary rounded w-16"></div>
                            </div>
                          </div>
                          <div className="h-8 w-8 bg-secondary rounded"></div>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls Skeleton */}
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-secondary rounded"></div>
                            <div className="h-6 w-12 bg-secondary rounded"></div>
                            <div className="h-8 w-8 bg-secondary rounded"></div>
                          </div>

                          {/* Price Skeleton */}
                          <div className="text-right">
                            <div className="h-5 bg-secondary rounded w-24 mb-1"></div>
                            <div className="h-4 bg-secondary rounded w-20"></div>
                          </div>
                        </div>

                        {/* Actions Skeleton */}
                        <div className="flex gap-2 mt-3">
                          <div className="h-6 bg-secondary rounded w-32"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary Skeleton */}
            <div className="lg:col-span-1">
              <Card className="sticky top-[220px]">
                <div className="p-6">
                  <div className="h-6 bg-secondary rounded w-1/2 mb-4"></div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="h-4 bg-secondary rounded w-20"></div>
                      <div className="h-4 bg-secondary rounded w-16"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-secondary rounded w-24"></div>
                      <div className="h-4 bg-secondary rounded w-16"></div>
                    </div>
                    <div className="h-px bg-secondary"></div>
                    <div className="flex justify-between">
                      <div className="h-5 bg-secondary rounded w-20"></div>
                      <div className="h-5 bg-secondary rounded w-20"></div>
                    </div>
                  </div>
                  <div className="space-y-3 mt-6">
                    <div className="h-10 bg-secondary rounded"></div>
                    <div className="h-10 bg-secondary rounded"></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
