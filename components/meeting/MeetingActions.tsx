"use client";

import Link from "next/link";
import { Printer, Pencil, Trash2 } from "lucide-react";
import { deleteMeeting } from "@/lib/actions";

interface MeetingActionsProps {
  meetingId: number;
}

export default function MeetingActions({
  meetingId,
}: MeetingActionsProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mb-6 flex flex-wrap justify-end gap-3">
      {/* Print */}

      <button
        type="button"
        onClick={handlePrint}
        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-gray-100"
      >
        <Printer size={18} />
        Print
      </button>

      {/* Edit */}

      <Link
        href={`/admin/meetings/${meetingId}/edit`}
        className="flex items-center gap-2 rounded-md bg-sky-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800"
      >
        <Pencil size={18} />
        Edit Meeting
      </Link>

      {/* Delete */}

      <form action={deleteMeeting.bind(null, meetingId)}>
        <button
          type="submit"
          onClick={(e) => {
            if (
              !window.confirm(
                "Are you sure you want to permanently delete this meeting?"
              )
            ) {
              e.preventDefault();
            }
          }}
          className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </form>
    </div>
  );
}