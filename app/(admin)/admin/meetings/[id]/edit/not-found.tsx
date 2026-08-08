import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        Meeting Not Found
      </h1>

      <p className="mb-8 text-gray-600">
        The meeting you are trying to edit does not exist or may have been
        removed.
      </p>

      <Link
        href="/admin/meetings"
        className="rounded-md bg-blue-700 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Back to Meetings
      </Link>
    </div>
  );
}
