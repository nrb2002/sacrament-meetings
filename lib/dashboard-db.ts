// lib/dashboard-db.ts

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface DashboardStats {
  total: number;
  upcoming: number;
  past: number;
  averageAttendance: number;
}

/* --------------------------------
   Dashboard Statistics
-------------------------------- */

export async function getMeetingStats() {
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

export async function getRecentMeetings(limit = 5) {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding AS "presiding",
      conducting AS "conducting"
    FROM meetings
    WHERE date < CURRENT_DATE
    ORDER BY date DESC
    LIMIT ${limit}
  `;

  return rows;
}

/* --------------------------------
   Upcoming Meetings
-------------------------------- */

export async function getUpcomingMeetings(limit = 5) {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding AS "presiding",
      conducting AS "conducting"
    FROM meetings
    WHERE date >= CURRENT_DATE
    ORDER BY date ASC
    LIMIT ${limit}
  `;

  return rows;
}

/* --------------------------------
   Attendance Trend
-------------------------------- */

export async function getAttendanceTrend(limit = 12) {
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

  return rows.reverse();
}
