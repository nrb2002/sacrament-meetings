// lib/meetings-db.ts

import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

/**
 * Temporary in-memory data store.
 * This will be replaced with a database in a future assignment.
 */
// const meetings: SacramentMeeting[] = [
//   {
//     id: 1,
//     date: "2026-05-03",
//     meetingType: "regular",
//     presiding: "Bishop Ntumba",
//     conducting: "Brother Matubu",
//     announcements: ["Ward temple night: May 10"],
//     openingHymn: {
//       number: 2,
//       title: "The Spirit of God",
//     },
//     openingPrayer: "Sister Williams",
//     wardBusiness: [
//       {
//         description: "Sustaining of new Primary president",
//       },
//     ],
//     stakeBusiness: false,
//     sacramentHymn: {
//       number: 169,
//       title: "In Remembrance of Thy Suffering",
//     },
//     speakers: [
//       {
//         name: "Sister Brown",
//         topic: "Faith in Jesus Christ",
//         type: "speaker",
//       },
//       {
//         name: "Youth Choir",
//         topic: "",
//         type: "musical-number",
//       },
//     ],
//     closingHymn: {
//       number: 31,
//       title: "O God, Our Help in Ages Past",
//     },
//     closingPrayer: "Brother Davis",
//   },

//   {
//     id: 2,
//     date: "2026-06-07",
//     meetingType: "testimony",
//     presiding: "Bishop Ntumba",
//     conducting: "Brother Matubu",
//     announcements: ["Fast offering donations after the meeting"],
//     openingHymn: {
//       number: 19,
//       title: "We Thank Thee, O God, for a Prophet",
//     },
//     openingPrayer: "Brother Miller",
//     wardBusiness: [],
//     stakeBusiness: false,
//     sacramentHymn: {
//       number: 173,
//       title: "While of These Emblems We Partake",
//     },
//     speakers: [],
//     closingHymn: {
//       number: 85,
//       title: "How Firm a Foundation",
//     },
//     closingPrayer: "Sister Lengelo",
//   },

//   {
//     id: 3,
//     date: "2026-07-05",
//     meetingType: "regular",
//     presiding: "Bishop Ntumba",
//     conducting: "Brother Matubu",
//     announcements: ["Youth conference registration is open"],
//     openingHymn: {
//       number: 98,
//       title: "I Need Thee Every Hour",
//     },
//     openingPrayer: "Sister Konga",
//     wardBusiness: [
//       {
//         description: "Release of Sunday School presidency",
//       },
//     ],
//     stakeBusiness: false,
//     sacramentHymn: {
//       number: 174,
//       title: "While of These Emblems We Partake",
//     },
//     speakers: [
//       {
//         name: "Brother Taylor",
//         topic: "Following the Savior",
//         type: "speaker",
//       },
//       {
//         name: "Ward Choir",
//         topic: "Be Still My Soul",
//         type: "musical-number",
//       },
//       {
//         name: "Sister White",
//         topic: "Prayer",
//         type: "speaker",
//       },
//     ],
//     closingHymn: {
//       number: 152,
//       title: "God Be with You Till We Meet Again",
//     },
//     closingPrayer: "Brother Young",
//   },

//   {
//     id: 4,
//     date: "2026-08-02",
//     meetingType: "stake",
//     presiding: "President Nday",
//     conducting: "President Mutala",
//     announcements: ["Stake conference begins at 10:00 AM"],
//     openingHymn: {
//       number: 3,
//       title: "Now Let Us Rejoice",
//     },
//     openingPrayer: "Brother Mubenga",
//     wardBusiness: [],
//     stakeBusiness: true,
//     sacramentHymn: {
//       number: 175,
//       title: "O God, the Eternal Father",
//     },
//     speakers: [
//       {
//         name: "President Nday",
//         topic: "Strengthening Our Families",
//         type: "speaker",
//       },
//     ],
//     closingHymn: {
//       number: 134,
//       title: "I Believe in Christ",
//     },
//     closingPrayer: "Sister Green",
//   },

//   {
//     id: 5,
//     date: "2026-07-19",
//     meetingType: "general",
//     presiding: "Bishop Ntumba",
//     conducting: "Brother Tshimungu",
//     announcements: ["General Conference broadcast next month"],
//     openingHymn: {
//       number: 1,
//       title: "The Morning Breaks",
//     },
//     openingPrayer: "Brother Kalala",
//     wardBusiness: [],
//     stakeBusiness: false,
//     sacramentHymn: {
//       number: 170,
//       title: "God, Our Father, Hear Us Pray",
//     },
//     speakers: [
//       {
//         name: "Video Message",
//         topic: "General Authority Address",
//         type: "speaker",
//       },
//     ],
//     closingHymn: {
//       number: 304,
//       title: "Teach Me to Walk in the Light",
//     },
//     closingPrayer: "Sister Evans",
//   },
// ];

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
  currentPage: number = 1
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
      closing_prayer AS "closingPrayer"
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
  query: string = ""
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
  id: number
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
      closing_prayer AS "closingPrayer"
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
      closing_prayer AS "closingPrayer"
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
      closing_prayer AS "closingPrayer"
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
  data: Omit<SacramentMeeting, "id">
): Promise<SacramentMeeting> {
  throw new Error(
    "addMeeting: database implementation coming up soon!"
  );
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  throw new Error(
    "updateMeeting: database implementation coming up soon!"
  );
}

export async function deleteMeeting(
  id: number
): Promise<boolean> {
  throw new Error(
    "deleteMeeting: database implementation coming up soon!"
  );
}