import type { DashboardStats as Stats } from "@/lib/dashboard-db";

interface DashboardStatsProps {
  stats: Stats;
}

export default function DashboardStats({
  stats,
}: DashboardStatsProps) {
  const cards = [
    {
      title: "Total Meetings",
      value: stats.total,
      description: "All meetings",
    },
    {
      title: "Upcoming",
      value: stats.upcoming,
      description: "Scheduled meetings",
    },
    {
      title: "Past Meetings",
      value: stats.past,
      description: "Completed meetings",
    },
    {
      title: "Average Attendance",
      value: stats.averageAttendance ?? "—",
      description: "Recorded attendance",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-sm font-medium text-gray-500">
            {card.title}
          </h2>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {card.value}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {card.description}
          </p>
        </article>
      ))}
    </section>
  );
}