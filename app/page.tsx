import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-8">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold">
            Your Sacrament Meetings App
          </h1>

          <p className="mt-4 text-gray-600">
            View past, current, and future sacrament meeting programs, speakers, hymns, announcements, and ward business.
          </p>

          <Link
            href="/meetings"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-red-700"
          >
            View all meetings

          </Link>
        </div>

        <Image
          src="/images/sacrament-meeting.jpg"
          alt="Members gathered for a sacrament meeting"
          width={800}
          height={600}
          priority
          className="rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}