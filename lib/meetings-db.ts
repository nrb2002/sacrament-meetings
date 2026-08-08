// lib/meetings-db.ts

import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

// Database connection using Neon. The connection string is stored in the DATABASE_URL environment variable.

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 6;

/**
 * Returns a paginated list of meetings.
 *
 * Meetings can be filtered by:
 * - presiding
 * - conducting
 * - meeting type
 * - speaker name or speaker topic
 *
 * Results are ordered from newest to oldest.
 */

export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding AS "presiding",
      conducting AS "conducting",
      announcements AS "announcements",
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers AS "speakers",
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer",
      attendance AS "attendance"
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return rows as unknown as SacramentMeeting[];
}

/**
 * Returns the total number of pages for the current search query.
 *
 * Five meetings are displayed per page.
 */
export async function getMeetingsTotalPages(
  query: string = "",
): Promise<number> {
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*) AS count
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  const totalMeetings = Number(rows[0].count);

  return Math.ceil(totalMeetings / ITEMS_PER_PAGE);
}

/**
 * Returns a single meeting by ID.
 */
export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding AS "presiding",
      conducting AS "conducting",
      announcements AS "announcements",
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers AS "speakers",
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer",
      attendance AS "attendance"
    FROM meetings
    WHERE id = ${id}
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

/**
 * Returns today's meeting, if one exists.
 *
 * Returns null if there is no meeting scheduled for today.
 */
export async function getCurrentMeeting(): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding AS "presiding",
      conducting AS "conducting",
      announcements AS "announcements",
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers AS "speakers",
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer",
      attendance AS "attendance"
    FROM meetings
    WHERE date = CURRENT_DATE
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

/**
 * Returns all past meetings, ordered from newest to oldest.
 */
export async function getPastMeetings(): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding AS "presiding",
      conducting AS "conducting",
      announcements AS "announcements",
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers AS "speakers",
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer",
      attendance AS "attendance"
    FROM meetings
    WHERE date < CURRENT_DATE
    ORDER BY date DESC
  `;

  return rows as unknown as SacramentMeeting[];
}

/**
 * Returns all future meetings, ordered from soonest to latest.
 */
export async function getFutureMeetings(): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding AS "presiding",
      conducting AS "conducting",
      announcements AS "announcements",
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers AS "speakers",
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE date > CURRENT_DATE
    ORDER BY date ASC
  `;

  return rows as unknown as SacramentMeeting[];
}

/**************************************************************************
 * Mutation stubs.
 *
 * These are to be connected to the database when forms and administrative functionality are added.
 *
 **************************************************************************/

export async function addMeeting(
  data: Omit<SacramentMeeting, "id">,
): Promise<SacramentMeeting> {
  const rows = await sql`
  INSERT INTO meetings(
    date,
    meeting_type,
    presiding,
    conducting,
    announcements,
    opening_hymn,
    opening_prayer,
    ward_business,
    stake_business,
    sacrament_hymn,
    speakers,
    closing_hymn,
    closing_prayer
  )
  VALUES (
    ${data.date},
    ${data.meetingType},
    ${data.presiding},
    ${data.conducting},
    ${data.announcements},
    ${JSON.stringify(data.openingHymn)},
    ${data.openingPrayer},
    ${JSON.stringify(data.wardBusiness)},
    ${data.stakeBusiness},
    ${JSON.stringify(data.sacramentHymn)},
    ${JSON.stringify(data.speakers)},
    ${JSON.stringify(data.closingHymn)},
    ${data.closingPrayer}
  )
  RETURNING
    id,
    to_char(date, 'YYYY-MM-DD') AS "date",
    meeting_type AS "meetingType",
    presiding,
    conducting,
    announcements,
    opening_hymn AS "openingHymn",
    opening_prayer AS "openingPrayer",
    ward_business AS "wardBusiness",
    stake_business AS "stakeBusiness",
    sacrament_hymn AS "sacramentHymn",
    speakers,
    closing_hymn AS "closingHymn",
    closing_prayer AS "closingPrayer"
  `;

  return rows[0] as unknown as SacramentMeeting;
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  const existing = await getMeetingById(id);

  if (!existing) {
    return null;
  }

  const meeting = {
    ...existing,
    ...updates,
  };

  const rows = await sql`
    UPDATE meetings
    SET
      date = ${meeting.date},
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      announcements = ${meeting.announcements},
      opening_hymn = ${JSON.stringify(meeting.openingHymn)},
      opening_prayer = ${meeting.openingPrayer},
      ward_business = ${JSON.stringify(meeting.wardBusiness)},
      stake_business = ${meeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)},
      speakers = ${JSON.stringify(meeting.speakers)},
      closing_hymn = ${JSON.stringify(meeting.closingHymn)},
      closing_prayer = ${meeting.closingPrayer},
      attendance = ${meeting.attendance ?? null}
    WHERE id = ${id}
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer",
      attendance AS "attendance"
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const result = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return result.length > 0;
}
