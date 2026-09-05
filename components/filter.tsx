"use client";

import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Check, RotateCcw } from "lucide-react";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query: Record<string, any> = {
      ...current,
      [valueKey]: id
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl({
      url: window.location.pathname,
      query
    }, { skipNull: true });

    router.push(url);
  };

  if (!data || data.length === 0) {
    return null;
  }

  const isColorFilter = valueKey === "colorId";

  return (
    <div className="mb-8">
      {/* Header Filter & Tombol Reset */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
          {name}
        </h3>

        {selectedValue && (
          <button
            onClick={() => onClick(selectedValue)}
            className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      <hr className="my-3 border-gray-200 dark:border-neutral-800" />
      
      {/* TAMPILAN WARNA (Color Swatches) */}
      {isColorFilter ? (
        <div className="flex flex-wrap gap-3">
          {data.map((filter) => {
            const isSelected = selectedValue === filter.id;
            const colorValue = (filter as Color).value; // Mengambil kode hex (misal #000000)

            return (
              <button
                key={filter.id}
                onClick={() => onClick(filter.id)}
                title={filter.name}
                className={cn(
                  "relative w-7 h-7 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer hover:scale-110 shadow-xs",
                  isSelected
                    ? "ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-neutral-900 border-transparent scale-105"
                    : "border-gray-300 dark:border-neutral-700 hover:border-gray-400"
                )}
                style={{ backgroundColor: colorValue }}
              >
                {isSelected && (
                  <Check
                    className={cn(
                      "w-3.5 h-3.5",
                      colorValue.toLowerCase() === "#ffffff" || colorValue.toLowerCase() === "white"
                        ? "text-black"
                        : "text-white"
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* TAMPILAN UKURAN (Size Chips) */
        <div className="flex flex-wrap gap-2">
          {data.map((filter) => {
            const isSelected = selectedValue === filter.id;

            return (
              <Button
                key={filter.id}
                type="button"
                className={cn(
                  "rounded-lg text-xs font-medium px-3.5 py-1.5 h-auto bg-white dark:bg-neutral-900 text-gray-700 dark:text-neutral-300 border border-gray-200 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-800 transition cursor-pointer shadow-2xs",
                  isSelected && "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white hover:bg-black/90 dark:hover:bg-white/90"
                )}
                onClick={() => onClick(filter.id)}
              >
                {filter.name || (filter as Size).value}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Filter;