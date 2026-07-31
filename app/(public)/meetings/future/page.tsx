// app/(public)/meetings/future/page.tsx

import EmptyState from "@/components/EmptyState";
import MeetingCard from "@/components/MeetingCard";

import { getFutureMeetings } from "@/lib/meetings-db";

export default async function FutureMeetingsPage() {
  const meetings = await getFutureMeetings();

  if (meetings.length === 0) {
    return (
      <EmptyState
        title="No Future Meetings"
        message="There are no future sacrament meetings scheduled yet. Please check again later."
      />
    );
  }

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Future Meetings</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </>
  );
}
