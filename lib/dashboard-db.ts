import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface DashboardStats {
  total: number;
  upcoming: number;
  past: number;
  averageAttendance: number;
}

export interface DashboardMeeting {
  id: number;
  date: string;
  meetingType: string;
  presiding: string;
  conducting: string;
  attendance?: number | null;
}

export interface AttendancePoint {
  id: number;
  date: string;
  attendance: number;
}

/* --------------------------------
   Dashboard Statistics
-------------------------------- */

export async function getMeetingStats(): Promise<DashboardStats> {
  const totalResult = await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
  `;

  const upcomingResult = await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE date >= CURRENT_DATE
  `;

  const pastResult = await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE date < CURRENT_DATE
  `;

  const attendanceResult = await sql`
    SELECT
      COALESCE(ROUND(AVG(attendance)), 0)::int AS average
    FROM meetings
    WHERE attendance IS NOT NULL
  `;

  return {
    total: totalResult[0]?.count ?? 0,
    upcoming: upcomingResult[0]?.count ?? 0,
    past: pastResult[0]?.count ?? 0,
    averageAttendance: attendanceResult[0]?.average ?? 0,
  };
}

/* --------------------------------
   Recent Meetings
-------------------------------- */

export async function getRecentMeetings(
  limit = 6,
): Promise<DashboardMeeting[]> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      attendance
    FROM meetings
    WHERE date < CURRENT_DATE
    ORDER BY date DESC
    LIMIT ${limit}
  `;

  return rows as DashboardMeeting[];
}

/* --------------------------------
   Upcoming Meetings
-------------------------------- */

export async function getUpcomingMeetings(
  limit = 6,
): Promise<DashboardMeeting[]> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      attendance
    FROM meetings
    WHERE date >= CURRENT_DATE
    ORDER BY date ASC
    LIMIT ${limit}
  `;

  return rows as DashboardMeeting[];
}

/* --------------------------------
   Attendance Trend
-------------------------------- */

export async function getAttendanceTrend(
  limit = 12,
): Promise<AttendancePoint[]> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      attendance
    FROM meetings
    WHERE attendance IS NOT NULL
    ORDER BY date DESC
    LIMIT ${limit}
  `;

  return rows.reverse() as AttendancePoint[];
}