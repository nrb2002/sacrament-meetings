// components/MeetingDetail.

import Link from "next/link";

import type { SacramentMeeting } from "@/lib/types";
import MeetingHeader from "./MeetingHeader";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  // Compare dates without time-zone issues.
  const today = new Date().toISOString().split("T")[0];

  const isPastMeeting = meeting.date < today;

  return (
    <article className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow">
      <MeetingHeader stake="Kinshasa Stake" ward="Kasa-Vubu Ward" />

      {/* Page Actions */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Sacrament Meeting Plan</h1>
      </div>

      <p>
        <strong>Date:</strong> {meeting.date}
      </p>

      <p>
        <strong>Meeting Type:</strong> {meeting.meetingType}
      </p>

      <p>
        <strong>Presiding:</strong> {meeting.presiding}
      </p>

      <p>
        <strong>Conducting:</strong> {meeting.conducting}
      </p>

      {meeting.announcements?.length ? (
        <>
          <h2 className="mt-8 text-xl font-semibold">Announcements</h2>

          <ul className="list-disc pl-6">
            {meeting.announcements.map((announcement) => (
              <li key={announcement}>{announcement}</li>
            ))}
          </ul>
        </>
      ) : null}

      <h2 className="mt-8 text-xl font-semibold">Opening Hymn</h2>

      <p>
        #{meeting.openingHymn.number} — {meeting.openingHymn.title}
      </p>

      <p>
        <strong>Opening Prayer:</strong> {meeting.openingPrayer}
      </p>

      <h2 className="mt-8 text-xl font-semibold">Ward Business</h2>

      <ul className="list-disc pl-6">
        {meeting.wardBusiness.map((item) => (
          <li key={item.description}>{item.description}</li>
        ))}
      </ul>

      <p className="mt-4">
        <strong>Sacrament Hymn:</strong> #{meeting.sacramentHymn.number} —{" "}
        {meeting.sacramentHymn.title}
      </p>

      <h2 className="mt-8 text-xl font-semibold">Speakers</h2>

      <ul className="space-y-3">
        {meeting.speakers.map((speaker, index) => (
          <li
            key={`${speaker.name}-${index}`}
            className="rounded bg-gray-100 p-3"
          >
            <p className="font-semibold">{speaker.name}</p>

            <p>{speaker.topic}</p>

            <p className="text-sm text-gray-500">{speaker.type}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold">Closing Hymn</h2>

      <p>
        #{meeting.closingHymn.number} — {meeting.closingHymn.title}
      </p>

      <p className="mt-4">
        <strong>Closing Prayer:</strong> {meeting.closingPrayer}
      </p>
    </article>
  );
}
