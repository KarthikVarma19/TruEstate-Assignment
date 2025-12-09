import React from "react";
import { useSales } from "../../context/salesContext.tsx";

type PaginationProps = {
  disabled?: boolean;
};

type PageItem = number | "ellipsis";

const createPageItems = (page: number, totalPages: number, siblingCount = 1, boundaryCount = 1): PageItem[] => {
  const items: PageItem[] = [];

  if (totalPages <= 1) return [1];

  const startPages = Array.from({ length: Math.min(boundaryCount, totalPages) }, (_, i) => i + 1);
  const endPages = Array.from({ length: Math.min(boundaryCount, totalPages) }, (_, i) => totalPages - i).reverse();
  const start = Math.max(Math.min(page - siblingCount, totalPages - boundaryCount - siblingCount * 2), boundaryCount + 1);
  const end = Math.min(Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 1), totalPages - boundaryCount);
  items.push(...startPages);

  if (start > boundaryCount + 1) {
    items.push("ellipsis");
  }

  for (let p = start; p <= end; p++) {
    if (!items.includes(p)) items.push(p);
  }

  if (end < totalPages - boundaryCount) {
    items.push("ellipsis");
  }

  endPages.forEach((p) => {
    if (!items.includes(p)) items.push(p);
  });

  return items;
};

const Pagination: React.FC<PaginationProps> = ({ disabled = false }) => {
  const { pagination, setPage } = useSales();
  const { page, totalPages } = pagination;

  const items = createPageItems(page, totalPages);

  const handleClick = (newPage: number) => {
    if (disabled) return;
    if (newPage < 1 || newPage > totalPages) return;
    if (newPage === page) return;
    setPage(newPage);
  };

  const baseBtn = "min-w-8 h-8 px-2 text-sm flex items-center justify-center rounded-md border transition-colors cursor-pointer border-0";
  const activeStyles = "bg-[#24252E] text-white";
  const inactiveStyles = "bg-[#F0F0F5] text-[#444557] border-[#D0D2E2] hover:bg-[#F4F4FB]";
  const disabledStyles = "bg-[#F0F0F5] text-[#B3B4C5] cursor-default hover:bg-[#F4F4FB]";

  return (
    <div className="flex items-center gap-2">
      {/* Prev */}
      <button type="button" onClick={() => handleClick(page - 1)} disabled={page <= 1 || disabled} className={`${baseBtn} ${page <= 1 || disabled ? disabledStyles : inactiveStyles}`}>
        ‹
      </button>

      {/* Page numbers */}
      {items.map((item, idx) => {
        if (item === "ellipsis") {
          return (
            <span key={`e-${idx}`} className="px-1 text-xs text-[#8889A0]">
              …
            </span>
          );
        }
        const isActive = item === page;
        return (
          <button key={item} type="button" onClick={() => handleClick(item)} className={`${baseBtn} ${isActive ? activeStyles : inactiveStyles}`}>
            {item}
          </button>
        );
      })}

      {/* Next */}
      <button type="button" onClick={() => handleClick(page + 1)} disabled={page >= totalPages || disabled} className={`${baseBtn} ${page >= totalPages || disabled ? disabledStyles : inactiveStyles}`}>
        ›
      </button>
    </div>
  );
};

export default Pagination;
