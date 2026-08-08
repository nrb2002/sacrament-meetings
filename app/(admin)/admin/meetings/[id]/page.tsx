// meetings/[id]/page.tsx

import { notFound } from "next/navigation";

import MeetingDetail from "@/components/meeting/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

import MeetingActions from "@/components/meeting/MeetingActions";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingPage({ params }: PageProps) {
  const { id } = await params;

  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return (
    <>
      <MeetingActions meetingId={meeting.id} />
      <MeetingDetail meeting={meeting} />
    </>
  );
}
