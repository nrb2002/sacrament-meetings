// components/Header.tsx

import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  return (
    <Link href={`/meetings/${meeting.id}`}>
      <article className="rounded-xl border bg-white p-6 shadow transition hover:shadow-lg">
        <h2 className="text-xl font-semibold">
          {meeting.date}
        </h2>

        <p className="mt-2">
          <strong>Type:</strong> {meeting.meetingType}
        </p>

        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>

        <p className="mt-4 text-blue-700">
          View Meeting →
        </p>
      </article>
    </Link>
  );
}