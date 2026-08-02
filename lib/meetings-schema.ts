// lib/meetings-schema.ts

import { z } from "zod";

/* --------------------------------
Schemas
-------------------------------- */

const HymnSchema = z.object({
  number: z.coerce
    .number()
    .int()
    .positive("Hymn number must be greater than 0"),

  title: z.string().min(1, "Hymn title is required"),
});

const SpeakerSchema = z.object({
  name: z.string().min(1, "Speaker name is required"),

  topic: z.string(),

  type: z.enum(["speaker", "musical-number"]),
});

const WardBusinessSchema = z.object({
  description: z.string().min(1, "If there is no business, type N/A"),
});

export const MeetingFormSchema = z.object({
  date: z.string().min(1, "Date is required"),

  meetingType: z.enum(["testimony", "regular", "stake", "general", "special"]),

  presiding: z.string().min(1, "Presiding is required"),

  conducting: z.string().min(1, "Conducting is required"),

  announcements: z.array(z.string()).default([]),

  openingHymn: HymnSchema,

  openingPrayer: z.string().min(1, "Opening prayer is required"),

  wardBusiness: z.array(WardBusinessSchema).default([]),

  stakeBusiness: z.boolean().default(false),

  sacramentHymn: HymnSchema,

  speakers: z.array(SpeakerSchema).default([]),

  closingHymn: HymnSchema,

  closingPrayer: z.string().min(1, "Closing prayer is required"),

  attendance: z.coerce
    .number()
    .int()
    .min(0, "Attendance must be 0 or greater")
    .optional(),
});
