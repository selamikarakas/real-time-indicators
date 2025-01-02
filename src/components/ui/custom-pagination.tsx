import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CustomPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function CustomPagination({ currentPage, totalPages, onPageChange }: CustomPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index + 1}>
            <Button
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => onPageChange(index + 1)}
              aria-label={`Go to page ${index + 1}`}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
} 