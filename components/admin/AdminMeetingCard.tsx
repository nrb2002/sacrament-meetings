// components/MeetingCard.tsx

import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <Link
      href={`/admin/meetings/${meeting.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-900">Sacrament Meeting</h2>

      <p className="mt-3 text-gray-600">
        <strong>Date:</strong> {meeting.date}
      </p>

      <p className="mt-1 text-gray-600">
        <strong>Meeting Type:</strong> {meeting.meetingType}
      </p>

      <p className="mt-1 text-gray-600">
        <strong>Presiding:</strong> {meeting.presiding}
      </p>

      <p className="mt-1 text-gray-600">
        <strong>Conducting:</strong> {meeting.conducting}
      </p>

      <span className="mt-4 inline-block text-sm font-medium text-blue-700">
        View meeting details →
      </span>
    </Link>
  );
}
