// app/meetings/current/page.tsx

import { redirect } from "next/navigation";

import EmptyState from "@/components/EmptyState";
import { getCurrentMeeting } from "@/lib/meetings-db";

export default function CurrentMeetingPage() {
  const meeting = getCurrentMeeting();

  if (!meeting) {
    return (
      <EmptyState
        title="No Meeting Today"
        message="There is no sacrament meeting scheduled for today."
      />
    );
  }

  redirect(`/meetings/${meeting.id}`);
}