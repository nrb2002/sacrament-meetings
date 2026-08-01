// components/EditMeetingForm.tsx

"use client";

import { useActionState } from "react";

import {
  initialState,
  updateMeeting,
} from "@/lib/actions";

import type { SacramentMeeting } from "@/lib/types";

interface EditMeetingFormProps {
  meeting: SacramentMeeting;
}

export default function EditMeetingForm({
  meeting,
}: EditMeetingFormProps) {
  const updateMeetingWithId =
    updateMeeting.bind(null, meeting.id);

  const [state, formAction, isPending] =
    useActionState(
      updateMeetingWithId,
      initialState
    );

  return (
    <form
      action={formAction}
      className="space-y-8"
    >
      {state.message && (
        <div
          role="alert"
          className="rounded-md bg-red-50 p-4 text-red-700"
        >
          {state.message}
        </div>
      )}

      {/* Meeting Information */}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Meeting Information
        </h2>

        <div>
          <label
            htmlFor="date"
            className="mb-1 block font-medium"
          >
            Date
          </label>

          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={meeting.date}
            aria-describedby="date-error"
            className="w-full rounded border p-2"
          />

          <p
            id="date-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.date?.join(", ")}
          </p>
        </div>

        <div>
          <label
            htmlFor="meetingType"
            className="mb-1 block font-medium"
          >
            Meeting Type
          </label>

          <select
            id="meetingType"
            name="meetingType"
            required
            defaultValue={meeting.meetingType}
            aria-describedby="meetingType-error"
            className="w-full rounded border p-2"
          >
            <option value="testimony">
              Testimony
            </option>

            <option value="regular">
              Regular
            </option>

            <option value="stake">
              Stake
            </option>

            <option value="general">
              General
            </option>

            <option value="special">
              Special
            </option>
          </select>

          <p
            id="meetingType-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.meetingType?.join(", ")}
          </p>
        </div>

        <div>
          <label
            htmlFor="presiding"
            className="mb-1 block font-medium"
          >
            Presiding
          </label>

          <input
            id="presiding"
            name="presiding"
            type="text"
            required
            defaultValue={meeting.presiding}
            aria-describedby="presiding-error"
            className="w-full rounded border p-2"
          />

          <p
            id="presiding-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.presiding?.join(", ")}
          </p>
        </div>

        <div>
          <label
            htmlFor="conducting"
            className="mb-1 block font-medium"
          >
            Conducting
          </label>

          <input
            id="conducting"
            name="conducting"
            type="text"
            required
            defaultValue={meeting.conducting}
            aria-describedby="conducting-error"
            className="w-full rounded border p-2"
          />

          <p
            id="conducting-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.conducting?.join(", ")}
          </p>
        </div>
      </section>

      {/* Opening */}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Opening
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="mb-1 block font-medium"
            >
              Opening Hymn Number
            </label>

            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={meeting.openingHymn.number}
              aria-describedby="openingHymnNumber-error"
              className="w-full rounded border p-2"
            />

            <p
              id="openingHymnNumber-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.openingHymn?.join(", ")}
            </p>
          </div>

          <div>
            <label
              htmlFor="openingHymnTitle"
              className="mb-1 block font-medium"
            >
              Opening Hymn Title
            </label>

            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              required
              defaultValue={meeting.openingHymn.title}
              aria-describedby="openingHymnTitle-error"
              className="w-full rounded border p-2"
            />

            <p
              id="openingHymnTitle-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.openingHymn?.join(", ")}
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="openingPrayer"
            className="mb-1 block font-medium"
          >
            Opening Prayer
          </label>

          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            required
            defaultValue={meeting.openingPrayer}
            aria-describedby="openingPrayer-error"
            className="w-full rounded border p-2"
          />

          <p
            id="openingPrayer-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.openingPrayer?.join(", ")}
          </p>
        </div>
      </section>

      {/* Sacrament */}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Sacrament
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="mb-1 block font-medium"
            >
              Sacrament Hymn Number
            </label>

            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={
                meeting.sacramentHymn.number
              }
              aria-describedby="sacramentHymnNumber-error"
              className="w-full rounded border p-2"
            />

            <p
              id="sacramentHymnNumber-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.sacramentHymn?.join(
                ", "
              )}
            </p>
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="mb-1 block font-medium"
            >
              Sacrament Hymn Title
            </label>

            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              required
              defaultValue={
                meeting.sacramentHymn.title
              }
              aria-describedby="sacramentHymnTitle-error"
              className="w-full rounded border p-2"
            />

            <p
              id="sacramentHymnTitle-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.sacramentHymn?.join(
                ", "
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Closing
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="mb-1 block font-medium"
            >
              Closing Hymn Number
            </label>

            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={meeting.closingHymn.number}
              aria-describedby="closingHymnNumber-error"
              className="w-full rounded border p-2"
            />

            <p
              id="closingHymnNumber-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.closingHymn?.join(", ")}
            </p>
          </div>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="mb-1 block font-medium"
            >
              Closing Hymn Title
            </label>

            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              required
              defaultValue={meeting.closingHymn.title}
              aria-describedby="closingHymnTitle-error"
              className="w-full rounded border p-2"
            />

            <p
              id="closingHymnTitle-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.closingHymn?.join(", ")}
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="closingPrayer"
            className="mb-1 block font-medium"
          >
            Closing Prayer
          </label>

          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            required
            defaultValue={meeting.closingPrayer}
            aria-describedby="closingPrayer-error"
            className="w-full rounded border p-2"
          />

          <p
            id="closingPrayer-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.closingPrayer?.join(", ")}
          </p>
        </div>
      </section>

      {/* Preserve existing JSON data */}

      <input
        type="hidden"
        name="announcements"
        value={JSON.stringify(
          meeting.announcements ?? []
        )}
      />

      <input
        type="hidden"
        name="wardBusiness"
        value={JSON.stringify(
          meeting.wardBusiness ?? []
        )}
      />

      <input
        type="hidden"
        name="stakeBusiness"
        value={String(
          meeting.stakeBusiness ?? false
        )}
      />

      <input
        type="hidden"
        name="speakers"
        value={JSON.stringify(
          meeting.speakers ?? []
        )}
      />

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-sky-700 px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {isPending
            ? "Saving Changes..."
            : "Save Changes"}
        </button>

        <a
          href={`/admin/meetings/${meeting.id}`}
          className="rounded border px-6 py-3 font-semibold"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

