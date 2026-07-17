import Link from "next/link";

interface EmptyStateProps {
  title: string;
  message: string;
}

export default function EmptyState({
  title,
  message,
}: EmptyStateProps) {
  return (
    <section className="mx-auto max-w-xl rounded-xl border bg-white p-10 text-center shadow">
      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="mt-4 text-gray-600">
        {message}
      </p>
{/* 
      <Link
        href="/meetings"
        className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-red-700" 
      >
        View All Meetings
      </Link> */}
    </section>
  );
}