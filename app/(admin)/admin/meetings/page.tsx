// app/(public)/meetings/page.tsx

import MeetingCard from "@/components/admin/AdminMeetingCard";
import { MeetingSearch } from "@/components/meeting/MeetingSearch";
import Pagination from "@/components/Pagination";

import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

interface MeetingsPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params?.query ?? "";
  const currentPage = Number(params?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">All Meetings</h1>

      <MeetingSearch />

      {meetings.length === 0 ? (
        <p className="py-12 text-center text-gray-600">No meetings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </>
  );
}
