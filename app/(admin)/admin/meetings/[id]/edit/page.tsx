import { notFound } from "next/navigation";

import { getMeetingById } from "@/lib/meetings-db";
import EditMeetingForm from "@/components/meeting/EditMeetingForm";

interface EditMeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
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
    <main className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Meeting
      </h1>

      <EditMeetingForm meeting={meeting} />
    </main>
  );
}