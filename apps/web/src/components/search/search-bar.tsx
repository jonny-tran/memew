"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showButton?: boolean;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Tìm kiếm sản phẩm...",
  className = "",
  size = "md",
  showButton = false,
  onSearch,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (query) {
      if (onSearch) {
        onSearch(query);
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          input: "pl-8 pr-4 py-2 text-sm",
          icon: "h-3 w-3 left-3",
          button: "px-3 py-2 text-sm",
        };
      case "lg":
        return {
          input: "pl-12 pr-4 py-3 text-lg",
          icon: "h-5 w-5 left-4",
          button: "px-6 py-3 text-base",
        };
      default: // md
        return {
          input: "pl-10 pr-4 py-2 text-base",
          icon: "h-4 w-4 left-3",
          button: "px-4 py-2 text-sm",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <Search
        className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground ${sizeClasses.icon}`}
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`${sizeClasses.input} bg-secondary border-border text-foreground placeholder-muted-foreground rounded-xl focus:ring-2 focus:ring-accent`}
      />
      {showButton && (
        <Button
          type="submit"
          className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${sizeClasses.button}`}
        >
          Tìm kiếm
        </Button>
      )}
    </form>
  );
}
