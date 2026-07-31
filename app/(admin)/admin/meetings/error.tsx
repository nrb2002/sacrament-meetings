"use client";

import Link from "next/link";

interface AdminMeetingsErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function AdminMeetingsError({
  error,
  reset,
}: AdminMeetingsErrorProps) {
  console.error("Admin meetings error:", error);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        Unable to Load Meeting Management
      </h1>

      <p className="mb-8 text-gray-600">
        Something went wrong while processing the meeting information. Please
        try again. If the problem continues, return to the meeting management
        page.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-blue-700 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>

        <Link
          href="/admin/meetings"
          className="rounded-md border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back to Meeting Management
        </Link>
      </div>
    </div>
  );
}
