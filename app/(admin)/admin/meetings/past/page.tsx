// app/meetings/past/page.tsx

import EmptyState from "@/components/EmptyState";
import MeetingCard from "@/components/admin/AdminMeetingCard";
import { MeetingSearch } from "@/components/meeting/MeetingSearch";
import Pagination from "@/components/Pagination";

import { getPastMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export default async function PastMeetingsPage() {
  const meetings = await getPastMeetings();
  const totalPages = await getMeetingsTotalPages();

  if (meetings.length === 0) {
    return (
      <EmptyState
        title="No Past Meetings"
        message="There are no past sacrament meetings to display."
      />
    );
  }

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Past Meetings</h1>
      <MeetingSearch />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </>
  );
}
