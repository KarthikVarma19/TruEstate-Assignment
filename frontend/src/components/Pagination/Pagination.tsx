import React from "react";

type PaginationProps = {
  disabled?: boolean;
  page: number;
  pageSize?: number;
  totalPages: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
};

type PageItem = number | "ellipsis";

const createPageItems = (page: number, totalPages: number, siblingCount = 1, boundaryCount = 1): PageItem[] => {
  const items: PageItem[] = [];

  if (totalPages <= 0) return [];

  
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

const Pagination: React.FC<PaginationProps> = ({ disabled = false, page, pageSize = 10, totalPages, totalItems, onPageChange, onPageSizeChange, pageSizeOptions = [10, 25, 50, 100] }) => {
  const items = createPageItems(page, totalPages);

  const baseBtn = "min-w-8 h-8 px-2 text-sm flex items-center justify-center rounded-md border transition-colors cursor-pointer border-0";
  const activeStyles = "bg-[#24252E] text-white";
  const inactiveStyles = "bg-[#F0F0F5] text-[#444557] border-[#D0D2E2] hover:bg-[#F4F4FB]";
  const disabledStyles = "bg-[#F0F0F5] text-[#B3B4C5] cursor-default hover:bg-[#F4F4FB]";

  const goto = (p: number) => {
    if (disabled) return;
    const next = Math.max(1, Math.min(p, Math.max(1, totalPages)));
    if (next !== page) onPageChange(next);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Prev */}
      <button type="button" onClick={() => goto(page - 1)} disabled={page <= 1 || disabled} className={`${baseBtn} ${page <= 1 || disabled ? disabledStyles : inactiveStyles}`} aria-label="Previous page">
        ‹
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-2">
        {items.length === 0 && (
          <button type="button" className={`${baseBtn} ${inactiveStyles}`} disabled>
            1
          </button>
        )}

        {items.map((item, idx) => {
          if (item === "ellipsis") {
            return (
              <span key={`e-${idx}`} className="px-1 text-xs text-[#8889A0]" aria-hidden>
                …
              </span>
            );
          }
          const isActive = item === page;
          return (
            <button key={item} type="button" onClick={() => goto(item)} className={`${baseBtn} ${isActive ? activeStyles : inactiveStyles}`} aria-current={isActive ? "page" : undefined}>
              {item}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button type="button" onClick={() => goto(page + 1)} disabled={page >= totalPages || disabled} className={`${baseBtn} ${page >= totalPages || disabled ? disabledStyles : inactiveStyles}`} aria-label="Next page">
        ›
      </button>

      {/* Left: page size selector + total items */}
      <div className="flex items-center gap-2">
        {onPageSizeChange && (
          <select aria-label="Rows per page" value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))} disabled={disabled} className="h-8 px-2 text-sm rounded-md border border-[#D0D2E2] bg-white">
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} / page
              </option>
            ))}
          </select>
        )}

        {typeof totalItems === "number" && <div className="text-xs text-[#55566A]">{totalItems === 0 ? "0 items" : `${Math.min((page - 1) * pageSize + 1, totalItems)}–${Math.min(page * pageSize, totalItems)} of ${totalItems}`}</div>}
      </div>
    </div>
  );
};

export default Pagination;
