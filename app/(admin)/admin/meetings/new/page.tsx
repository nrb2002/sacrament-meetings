import MeetingForm from "@/components/meeting/MeetingForm";

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        Create a Meeting
      </h1>

      <MeetingForm />
    </main>
  );
}