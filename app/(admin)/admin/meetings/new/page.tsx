// app/(admin)/admin/meetings/new/page.tsx

import MeetingForm from "@/components/meeting/MeetingForm";

export default function NewMeetingPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-8 text-3xl font-bold">
        Create Meeting
      </h1>

      <MeetingForm />
    </div>
  );
}