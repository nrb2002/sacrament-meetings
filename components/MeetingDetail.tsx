// components/Header.tsx

import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  return (
    <article className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">

      <h1 className="mb-6 text-3xl font-bold">
        Sacrament Meeting
      </h1>

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
          <h2 className="mt-8 text-xl font-semibold">
            Announcements
          </h2>

          <ul className="list-disc pl-6">
            {meeting.announcements.map((announcement) => (
              <li key={announcement}>{announcement}</li>
            ))}
          </ul>
        </>
      ) : null}

      <h2 className="mt-8 text-xl font-semibold">
        Opening Hymn
      </h2>

      <p>
        #{meeting.openingHymn.number} — {meeting.openingHymn.title}
      </p>

      <p>
        <strong>Opening Prayer:</strong>{" "}
        {meeting.openingPrayer}
      </p>

      <h2 className="mt-8 text-xl font-semibold">
        Ward Business
      </h2>

      <ul className="list-disc pl-6">
        {meeting.wardBusiness.map((item) => (
          <li key={item.description}>
            {item.description}
          </li>
        ))}
      </ul>

      <p className="mt-4">
        <strong>Sacrament Hymn:</strong>{" "}
        #{meeting.sacramentHymn.number} —{" "}
        {meeting.sacramentHymn.title}
      </p>

      <h2 className="mt-8 text-xl font-semibold">
        Speakers
      </h2>

      <ul className="space-y-3">
        {meeting.speakers.map((speaker, index) => (
          <li
            key={`${speaker.name}-${index}`}
            className="rounded bg-gray-100 p-3"
          >
            <p className="font-semibold">
              {speaker.name}
            </p>

            <p>{speaker.topic}</p>

            <p className="text-sm text-gray-500">
              {speaker.type}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold">
        Closing Hymn
      </h2>

      <p>
        #{meeting.closingHymn.number} —{" "}
        {meeting.closingHymn.title}
      </p>

      <p className="mt-4">
        <strong>Closing Prayer:</strong>{" "}
        {meeting.closingPrayer}
      </p>
    </article>
  );
}