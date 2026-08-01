// lib/actions.ts

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingFromDb,
} from "@/lib/meetings-db";

import { MeetingFormSchema } from "./meetings-schema";
import { State } from "./action-types";


/* --------------------------------
Get Form Data
-------------------------------- */

function getMeetingFormData(formData: FormData) {
  // Convert each line of the Ward Business textarea
  // into a separate WardBusinessItem.
  const wardBusiness = String(
    formData.get("wardBusiness") ?? "",
  )
    .split("\n")
    .map((description) => description.trim())
    .filter(Boolean)
    .map((description) => ({
      description,
    }));

  return {
    date: String(
      formData.get("date") ?? "",
    ),

    meetingType: String(
      formData.get("meetingType") ?? "",
    ),

    presiding: String(
      formData.get("presiding") ?? "",
    ),

    conducting: String(
      formData.get("conducting") ?? "",
    ),

    announcements: formData
      .getAll("announcements")
      .map(String)
      .filter(Boolean),

    openingHymn: {
      number: Number(
        formData.get(
          "openingHymnNumber",
        ),
      ),

      title: String(
        formData.get(
          "openingHymnTitle",
        ) ?? "",
      ),
    },

    openingPrayer: String(
      formData.get(
        "openingPrayer",
      ) ?? "",
    ),

    wardBusiness,

    stakeBusiness:
      formData.get(
        "stakeBusiness",
      ) === "true",

    sacramentHymn: {
      number: Number(
        formData.get(
          "sacramentHymnNumber",
        ),
      ),

      title: String(
        formData.get(
          "sacramentHymnTitle",
        ) ?? "",
      ),
    },

    // Speakers are currently managed as a
    // hidden JSON field by the reusable form.
    speakers: (() => {
      try {
        return JSON.parse(
          String(
            formData.get(
              "speakers",
            ) ?? "[]",
          ),
        );
      } catch {
        return [];
      }
    })(),

    closingHymn: {
      number: Number(
        formData.get(
          "closingHymnNumber",
        ),
      ),

      title: String(
        formData.get(
          "closingHymnTitle",
        ) ?? "",
      ),
    },

    closingPrayer: String(
      formData.get(
        "closingPrayer",
      ) ?? "",
    ),

    attendance:
    formData.get("attendance") === ""
      ? undefined
      : Number(
          formData.get("attendance"),
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
