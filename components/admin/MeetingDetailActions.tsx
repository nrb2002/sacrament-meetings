// components/admin/MeetingDetailActions.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

import { deleteMeeting } from "@/lib/actions";

interface MeetingDetailActionsProps {
  meetingId: number;
  isPastMeeting: boolean;
}

export default function MeetingDetailActions({
  meetingId,
  isPastMeeting,
}: MeetingDetailActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this meeting? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteMeeting(meetingId);
    } catch (error) {
      console.error("Failed to delete meeting:", error);

      setIsDeleting(false);
    }
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      {/* Back */}
      <Link
        href="/admin/meetings"
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        ← Back to Meetings
      </Link>

      {/* Edit */}
      {!isPastMeeting && (
        <Link
          href={`/admin/meetings/${meetingId}/edit`}
          className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          Edit Meeting
        </Link>
      )}

      {/* Delete */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "Delete Meeting"}
      </button>
    </div>
  );
}
