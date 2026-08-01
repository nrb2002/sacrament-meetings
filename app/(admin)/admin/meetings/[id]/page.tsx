import { notFound } from "next/navigation";

import { getMeetingById } from "@/lib/meetings-db";
import MeetingDetail from "@/components/meeting/MeetingDetail";
import MeetingDetailActions from "@/components/admin/MeetingDetailActions";

interface AdminMeetingDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminMeetingDetailPage({
  params,
}: AdminMeetingDetailPageProps) {
  const { id } = await params;

  const meetingId = Number(id);

  if (Number.isNaN(meetingId)) {
    notFound();
  }

  const meeting =
    await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const isPastMeeting =
    meeting.date < today;

  return (
    <div className="mx-auto max-w-5xl">
      <MeetingDetailActions
        meetingId={meeting.id}
        isPastMeeting={isPastMeeting}
      />

      <MeetingDetail meeting={meeting} />
    </div>
  );
}