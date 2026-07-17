// lib/meetings-db.ts

import type { SacramentMeeting } from "./types";

/**
 * Temporary in-memory data store.
 * This will be replaced with a database in a future assignment.
 */
const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Ward temple night: May 10"],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Williams",
    wardBusiness: [
      {
        description: "Sustaining of new Primary president",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },
    speakers: [
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Youth Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 31,
      title: "O God, Our Help in Ages Past",
    },
    closingPrayer: "Brother Davis",
  },

  {
    id: 2,
    date: "2026-06-07",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Fast offering donations after the meeting"],
    openingHymn: {
      number: 19,
      title: "We Thank Thee, O God, for a Prophet",
    },
    openingPrayer: "Brother Miller",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 173,
      title: "While of These Emblems We Partake",
    },
    speakers: [],
    closingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    closingPrayer: "Sister Clark",
  },

  {
    id: 3,
    date: "2026-07-05",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Adams",
    announcements: ["Youth conference registration is open"],
    openingHymn: {
      number: 98,
      title: "I Need Thee Every Hour",
    },
    openingPrayer: "Sister Hall",
    wardBusiness: [
      {
        description: "Release of Sunday School presidency",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 174,
      title: "While of These Emblems We Partake",
    },
    speakers: [
      {
        name: "Brother Taylor",
        topic: "Following the Savior",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "Be Still My Soul",
        type: "musical-number",
      },
      {
        name: "Sister White",
        topic: "Prayer",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 152,
      title: "God Be with You Till We Meet Again",
    },
    closingPrayer: "Brother Young",
  },

  {
    id: 4,
    date: "2026-08-02",
    meetingType: "stake",
    presiding: "President Johnson",
    conducting: "President Johnson",
    announcements: ["Stake conference begins at 10:00 AM"],
    openingHymn: {
      number: 3,
      title: "Now Let Us Rejoice",
    },
    openingPrayer: "Brother Carter",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 175,
      title: "O God, the Eternal Father",
    },
    speakers: [
      {
        name: "President Johnson",
        topic: "Building Zion",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 134,
      title: "I Believe in Christ",
    },
    closingPrayer: "Sister Green",
  },

  {
    id: 5,
    date: "2026-09-06",
    meetingType: "general",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["General Conference broadcast next month"],
    openingHymn: {
      number: 1,
      title: "The Morning Breaks",
    },
    openingPrayer: "Brother Lewis",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 170,
      title: "God, Our Father, Hear Us Pray",
    },
    speakers: [
      {
        name: "Video Message",
        topic: "General Authority Address",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 304,
      title: "Teach Me to Walk in the Light",
    },
    closingPrayer: "Sister Evans",
  },
];

/**
 * Returns all meetings or meetings for a specific date.
 */
export function getMeetings(date?: string): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

/**
 * Returns a meeting by its id.
 */
export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}

/**
 * Returns all meetings before today.
 * Sorted newest first.
 */
export function getPastMeetings(): SacramentMeeting[] {
  const today = new Date().toISOString().split("T")[0];

  return meetings
    .filter((meeting) => meeting.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Returns today's meeting.
 */
export function getCurrentMeeting(): SacramentMeeting | null {
  const today = new Date().toISOString().split("T")[0];

  return meetings.find((meeting) => meeting.date === today) ?? null;
}

/**
 * Returns all meetings after today.
 * Sorted nearest first.
 */
export function getFutureMeetings(): SacramentMeeting[] {
  const today = new Date().toISOString().split("T")[0];

  return meetings
    .filter((meeting) => meeting.date > today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Adds a new meeting.
 */
export function addMeeting(meeting: SacramentMeeting): SacramentMeeting {
  meetings.push(meeting);
  return meeting;
}

/**
 * Updates an existing meeting.
 */
export function updateMeeting(
  id: number,
  updatedMeeting: SacramentMeeting
): SacramentMeeting | null {
  const index = meetings.findIndex((meeting) => meeting.id === id);

  if (index === -1) {
    return null;
  }

  meetings[index] = updatedMeeting;

  return updatedMeeting;
}

/**
 * Deletes a meeting.
 */
export function deleteMeeting(id: number): boolean {
  const index = meetings.findIndex((meeting) => meeting.id === id);

  if (index === -1) {
    return false;
  }

  meetings.splice(index, 1);

  return true;
}