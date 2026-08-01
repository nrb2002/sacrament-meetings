// app/(admin)/admin/meetings/[id]/edit/page.tsx

import { notFound } from "next/navigation";

import MeetingForm from "@/components/meeting/MeetingForm";
import { getMeetingById } from "@/lib/meetings-db";

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

  const meeting =
    await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit Meeting
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Update the details for the{" "}
          {meeting.date} sacrament meeting.
        </p>
      </div>

      <MeetingForm meeting={meeting} />
    </div>
  );
}