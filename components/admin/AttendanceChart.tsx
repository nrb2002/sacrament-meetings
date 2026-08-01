import type { AttendanceTrend } from "@/lib/dashboard-db";

interface AttendanceChartProps {
  data: AttendanceTrend[];
}

export default function AttendanceChart({
  data,
}: AttendanceChartProps) {
  const maxAttendance = Math.max(
    ...data.map((item) => item.attendance),
    1,
  );

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Attendance Trend
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Attendance recorded for recent meetings.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex min-h-48 items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-500">
          No attendance data available yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex min-w-[500px] items-end gap-4 border-b border-gray-200 px-4 pb-4">
            {data.map((item) => {
              const height = Math.max(
                (item.attendance /
                  maxAttendance) *
                  100,
                5,
              );

              return (
                <div
                  key={item.date}
                  className="flex min-w-12 flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-xs font-medium text-gray-600">
                    {item.attendance}
                  </span>

                  <div className="flex h-48 w-full items-end">
                    <div
                      className="w-full rounded-t-md bg-sky-600 transition-all hover:bg-sky-700"
                      style={{
                        height: `${height}%`,
                      }}
                      title={`${item.attendance} attendees on ${item.date}`}
                    />
                  </div>

                  <span className="text-xs text-gray-500">
                    {new Date(
                      `${item.date}T00:00:00`,
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}