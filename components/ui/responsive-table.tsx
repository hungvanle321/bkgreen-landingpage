"use client"

import * as React from "react"
import { Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface ResponsiveTableProps {
  children: React.ReactNode
  className?: string
  enableSearch?: boolean
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  enablePagination?: boolean
  currentPage?: number
  totalPages?: number
  totalItems?: number
  onPageChange?: (page: number) => void
  pageSize?: number
}

export function ResponsiveTable({
  children,
  className = "",
  enableSearch = true,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  enablePagination = true,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  pageSize = 10,
}: ResponsiveTableProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {enableSearch && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {totalItems} items
          </div>
        </div>
      )}

      <div className="rounded-md border bg-card overflow-x-auto">
        <Table className="min-w-[600px]">
          {children}
        </Table>
      </div>

      {enablePagination && (
        <div className="flex items-center justify-end space-x-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Page {currentPage} of {totalPages}</span>
            <span>•</span>
            <span>{totalItems} items</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Mobile card view component for better responsive experience
export function ResponsiveTableCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  )
}

// Card item component for mobile view
export function CardItem({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </div>
  )
}