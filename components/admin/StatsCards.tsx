// components/admin/StatsCards.tsx

interface StatsCardsProps {
  totalMeetings: number;
  upcomingMeetings: number;
  pastMeetings: number;
  thisMonthMeetings: number;
}

export default function StatsCards({
  totalMeetings,
  upcomingMeetings,
  pastMeetings,
  thisMonthMeetings,
}: StatsCardsProps) {
  const stats = [
    {
      label: "Total Meetings",
      value: totalMeetings,
      description: "All recorded meetings",
      icon: "▤",
    },
    {
      label: "Upcoming",
      value: upcomingMeetings,
      description: "Meetings scheduled",
      icon: "→",
    },
    {
      label: "Past Meetings",
      value: pastMeetings,
      description: "Meetings completed",
      icon: "◷",
    },
    {
      label: "This Month",
      value: thisMonthMeetings,
      description: "Meetings this month",
      icon: "●",
    },
  ];

  return (
    <section
      aria-label="Meeting statistics"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-gray-500">{stat.description}</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-lg font-semibold text-sky-700">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
