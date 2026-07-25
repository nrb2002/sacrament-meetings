// components/MeetingSearch.tsx

"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (term: string) => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      // Always return to page 1 when a new search is made.
      params.set("page", "1");

      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <div className="mb-8">
      <label
        htmlFor="meeting-search"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Search Meetings
      </label>

      <input
        id="meeting-search"
        type="search"
        placeholder="Search by speaker, leader, or meeting type..."
        
        defaultValue={searchParams.get("query") ?? ""}
        
        onChange={(event) =>
          handleSearch(event.target.value)
        }
        aria-label="Search meetings"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}