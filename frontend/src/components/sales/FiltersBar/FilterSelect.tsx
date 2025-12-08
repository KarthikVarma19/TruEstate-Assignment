import React, { useState } from "react";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";

type Mode = "single" | "multi" | "range" | "dateRange";

interface Option {
  label: string;
  value: string;
}

interface FilterSelectProps {
  label: string;
  icon?: React.ReactNode;
  mode: Mode;
  options?: Option[]; // used for single & multi
  width?: string;
  onChange?: (
    value:
      | string // single
      | string[] // multi
      | { min: number | null; max: number | null } // range
      | { start: string | null; end: string | null } // dateRange
      | { direction: "asc" | "desc" } // sort
  ) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, icon, mode, options = [], onChange, width }: FilterSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // single select
  const [singleValue, setSingleValue] = useState<string | null>(null);

  // multi select
  const [multiValues, setMultiValues] = useState<string[]>([]);

  // range
  const [range, setRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });

  // date range
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });


  const toggleOpen = () => {
      setIsOpen((prev) => !prev);
  };

  const handleSingleSelect = (value: string) => {
    setSingleValue(value);
    onChange?.(value);
    setIsOpen(false);
  };

  const handleMultiToggle = (value: string) => {
    setMultiValues((prev) => {
      let next: string[];
      if (prev.includes(value)) {
        next = prev.filter((v) => v !== value);
      } else {
        next = [...prev, value];
      }
      onChange?.(next);
      return next;
    });
  };

  const handleRangeChange = (key: "min" | "max", val: string) => {
    setRange((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const applyRange = () => {
    let minNum = range.min ? Number(range.min) : null;
    let maxNum = range.max ? Number(range.max) : null;

    // normalize if min > max
    if (minNum !== null && maxNum !== null && minNum > maxNum) {
      const tmp = minNum;
      minNum = maxNum;
      maxNum = tmp;
    }

    onChange?.({ min: minNum, max: maxNum });
    setIsOpen(false);
  };

  const handleDateRangeChange = (key: "from" | "to", val: string) => {
    setDateRange((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const applyDateRange = () => {
    const from = dateRange.from || null;
    const to = dateRange.to || null;

    // optional: normalize if from > to
    if (from && to && from > to) {
      onChange?.({ start: to, end: from });
    } else {
      onChange?.({ start: from, end: to });
    }

    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left min-h-11 cursor-pointer w-fit">
      {/* Trigger */}
      <button type="button" onClick={toggleOpen} className={`flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-md bg-[#F3F3F3] hover:bg-gray-50 ${width}`}>
        {/* Logo / icon */}
        {icon && <span className="text-gray-600">{icon}</span>}

        {/* Label and value */}
        <div className="flex flex-col items-start min-w-0">
          <span className="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 block">{label}</span>
          {/* <span className="text-[10px] text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 block">{valueLabel || "Any"}</span> */}
        </div>

        {/* Arrow */}
        <span className="ml-auto text-gray-500">
          <span className={`inline-block transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
            {isOpen ? <ArrowUp2 size={16} color="#515162" variant="Linear" /> : <ArrowDown2 size={16} color="#515162" variant="Linear" />}
          </span>
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full rounded-md bg-white shadow-lg border border-gray-200 z-20 cursor-pointer">
          {mode === "single" && (
            <ul className="max-h-64 overflow-y-auto py-2">
              {options.map((opt) => (
                <li key={opt.value}>
                  <button type="button" onClick={() => handleSingleSelect(opt.value)} className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 ${singleValue === opt.value ? "bg-gray-100 font-medium" : ""}`}>
                    {opt.label}
                  </button>
                </li>
              ))}
              {options.length === 0 && <div className="px-3 py-2 text-xs text-gray-400">No options</div>}
            </ul>
          )}

          {mode === "multi" && (
            <div className="max-h-64 overflow-y-auto py-2">
              {options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4" checked={multiValues.includes(opt.value)} onChange={() => handleMultiToggle(opt.value)} />
                  <span>{opt.label}</span>
                </label>
              ))}
              {options.length === 0 && <div className="px-3 py-2 text-xs text-gray-400">No options</div>}
            </div>
          )}

          {mode === "range" && (
            <div className="px-3 py-3 flex flex-col gap-3 text-xs w-full">
              {/* From row */}
              <div className="flex items-center gap-1 w-full">
                <span className="w-7 shrink-0 text-gray-600 text-[10px] uppercase">From</span>
                <input type="number" className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-xs min-w-[40px]" value={range.min} onChange={(e) => handleRangeChange("min", e.target.value)} />
              </div>

              {/* To row */}
              <div className="flex items-center gap-1 w-full">
                <span className="w-7 shrink-0 text-gray-600 text-[10px] uppercase">To</span>
                <input type="number" className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-xs min-w-[40px]" value={range.max} onChange={(e) => handleRangeChange("max", e.target.value)} />
              </div>

              <button type="button" onClick={applyRange} className="self-end mt-1 px-3 py-1.5 text-xs rounded-md bg-gray-900 text-white hover:bg-gray-800">
                Apply
              </button>
            </div>
          )}

          {mode === "dateRange" && (
            <div className="px-3 py-3 flex flex-col gap-3 text-xs w-full">
              {/* From date */}
              <div className="flex items-center gap-1 w-full">
                <span className="w-7 shrink-0 text-gray-600 text-[10px] uppercase">From</span>
                <input type="date" className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-[8px] min-w-[100px]" value={dateRange.from} onChange={(e) => handleDateRangeChange("from", e.target.value)} />
              </div>

              {/* To date */}
              <div className="flex items-center gap-1 w-full">
                <span className="w-7 shrink-0 text-gray-600 text-[10px] uppercase">To</span>
                <input type="date" className="flex-1 border border-gray-300 rounded-md px-2 text-[8px] py-1 min-w-[100px]" value={dateRange.to} onChange={(e) => handleDateRangeChange("to", e.target.value)} />
              </div>

              <button type="button" onClick={applyDateRange} className="self-end mt-1 px-3 py-1.5 text-xs rounded-md bg-gray-900 text-white hover:bg-gray-800">
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;
