// app/(admin)/admin/meetings/[id]/page.tsx

import { notFound } from "next/navigation";

import MeetingDetail from "@/components/meeting/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

interface AdminMeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminMeetingPage({
  params,
}: AdminMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (Number.isNaN(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Meeting</h1>

        <p className="mt-2 text-gray-600">
          View and manage this sacrament meeting.
        </p>
      </div>

      <MeetingDetail meeting={meeting} />
    </div>
  );
}
