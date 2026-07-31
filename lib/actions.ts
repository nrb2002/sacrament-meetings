"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingFromDb,
} from "@/lib/meetings-db";

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
  description: z.string().min(3, "If there is no business, type N/A"),
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
});

/* --------------------------------
Server Action State
-------------------------------- */

export type State = {
  message?: string;

  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymn?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymn?: string[];
    speakers?: string[];
    closingHymn?: string[];
    closingPrayer?: string[];
  };
};

export const initialState: State = {
  message: "",
  errors: {},
};

/* --------------------------------
Get Form Data
-------------------------------- */

function getMeetingFormData(formData: FormData) {
  return {
    date: String(formData.get("date") ?? ""),

    meetingType: String(
      formData.get("meetingType") ?? ""
    ),

    presiding: String(
      formData.get("presiding") ?? ""
    ),

    conducting: String(
      formData.get("conducting") ?? ""
    ),

    announcements: formData
      .getAll("announcements")
      .map(String)
      .filter(Boolean),

    openingHymn: {
      number: Number(
        formData.get("openingHymnNumber")
      ),
      title: String(
        formData.get("openingHymnTitle") ?? ""
      ),
    },

    openingPrayer: String(
      formData.get("openingPrayer") ?? ""
    ),

    wardBusiness: formData
      .getAll("wardBusiness")
      .map((description) => ({
        description: String(description),
      })),

    stakeBusiness:
      formData.get("stakeBusiness") === "true",

    sacramentHymn: {
      number: Number(
        formData.get("sacramentHymnNumber")
      ),
      title: String(
        formData.get("sacramentHymnTitle") ?? ""
      ),
    },

    speakers: [],

    closingHymn: {
      number: Number(
        formData.get("closingHymnNumber")
      ),
      title: String(
        formData.get("closingHymnTitle") ?? ""
      ),
    },

    closingPrayer: String(
      formData.get("closingPrayer") ?? ""
    ),
  };
}


/* --------------------------------
CREATE MEETING
-------------------------------- */

export async function createMeeting(
  prevState: State,
  formData: FormData,
): Promise<State> {
  let rawData;

  try {
    rawData = getMeetingFormData(formData);
  } catch (error) {
    console.error("Failed to parse meeting form data:", error);

    return {
      message: "Some of the submitted meeting data is invalid.",
    };
  }

  const result = MeetingFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      message: "Please correct the errors below.",

      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await addMeeting(result.data);
  } catch (error) {
    console.error("Failed to create meeting:", error);

    throw new Error("Unable to create the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  revalidatePath("/admin/meetings");

  redirect("/admin/meetings");
}

/* --------------------------------
UPDATE MEETING
-------------------------------- */

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData,
): Promise<State> {
  let rawData;

  try {
    rawData = getMeetingFormData(formData);
  } catch (error) {
    console.error("Failed to parse meeting form data:", error);

    return {
      message: "Some of the submitted meeting data is invalid.",
    };
  }

  const result = MeetingFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      message: "Please correct the errors below.",

      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const meeting = await updateMeetingInDb(id, result.data);

    if (!meeting) {
      return {
        message: "Meeting not found.",
      };
    }
  } catch (error) {
    console.error("Failed to update meeting:", error);

    throw new Error("Unable to update the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  revalidatePath("/admin/meetings");
  revalidatePath(`/admin/meetings/${id}`);

  redirect("/admin/meetings");
}

/* --------------------------------
DELETE MEETING
-------------------------------- */

export async function deleteMeeting(id: number) {
  let deleted: boolean;

  try {
    deleted = await deleteMeetingFromDb(id);
  } catch (error) {
    console.error("Failed to delete meeting:", error);

    throw new Error("Unable to delete the meeting. Please try again.");
  }

  if (!deleted) {
    return {
      success: false,
      message: "Meeting not found.",
    };
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  revalidatePath("/admin/meetings");

  redirect("/admin/meetings");
}
