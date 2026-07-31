// components/Pagination.tsx

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      {/* Previous button: hidden on first page */}
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
        >
          Previous
        </Link>
      )}

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next button: hidden on last page */}
      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </div>
  );
}
