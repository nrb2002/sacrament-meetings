// meetings/page.tsx


import MeetingCard from "@/components/MeetingCard";
// import { getMeetings } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

async function fetchMeetings() {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Unable to load meetings: ${response.status}`
    );
  }
  return response.json() as Promise<SacramentMeeting[]>;
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();  

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        All Meetings
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>
    </>
  );
}