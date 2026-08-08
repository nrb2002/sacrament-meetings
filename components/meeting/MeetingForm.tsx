// components/meeting/MeetingForm.tsx

"use client";

import { useActionState } from "react";

import { createMeeting, updateMeeting } from "@/lib/actions";

import { initialState } from "@/lib/action-types";

import type { SacramentMeeting } from "@/lib/types";

interface MeetingFormProps {
  meeting?: SacramentMeeting;
}

export default function MeetingForm({ meeting }: MeetingFormProps) {
  const isEditMode = Boolean(meeting);

  const action = meeting ? updateMeeting.bind(null, meeting.id) : createMeeting;

  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-10">
      {/* General Form Error */}
      {state.message && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      {/* =========================================
          MEETING INFORMATION
      ========================================= */}

      <section className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Meeting Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the basic information for this sacrament meeting.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Date
            </label>

            <input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={meeting?.date ?? ""}
              aria-describedby="date-error"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
            />

            <p
              id="date-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.date?.join(", ")}
            </p>
          </div>

          {/* Meeting Type */}
          <div>
            <label
              htmlFor="meetingType"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Meeting Type
            </label>

            <select
              id="meetingType"
              name="meetingType"
              required
              defaultValue={meeting?.meetingType ?? ""}
              aria-describedby="meetingType-error"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
            >
              <option value="" disabled>
                Select meeting type
              </option>

              <option value="regular">Regular</option>

              <option value="testimony">Testimony</option>

              <option value="stake">Stake</option>

              <option value="general">General</option>

              <option value="special">Special</option>
            </select>

            <p
              id="meetingType-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.meetingType?.join(", ")}
            </p>
          </div>

          {/* Presiding */}
          <div>
            <label
              htmlFor="presiding"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Presiding
            </label>

            <input
              id="presiding"
              name="presiding"
              type="text"
              required
              defaultValue={meeting?.presiding ?? ""}
              aria-describedby="presiding-error"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
            />

            <p
              id="presiding-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.presiding?.join(", ")}
            </p>
          </div>

          {/* Conducting */}
          <div>
            <label
              htmlFor="conducting"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Conducting
            </label>

            <input
              id="conducting"
              name="conducting"
              type="text"
              required
              defaultValue={meeting?.conducting ?? ""}
              aria-describedby="conducting-error"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
            />

            <p
              id="conducting-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.conducting?.join(", ")}
            </p>
          </div>

          {/* Attendance */}
          <div>
            <label
              htmlFor="attendance"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Attendance
            </label>

            <input
              id="attendance"
              name="attendance"
              type="number"
              min="0"
              step="1"
              defaultValue={meeting?.attendance ?? ""}
              aria-describedby="attendance-error"
              placeholder="e.g. 250"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
            />

            <p
              id="attendance-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.attendance?.join(", ")}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          OPENING
      ========================================= */}

      <section className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Opening</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Opening Hymn Number */}
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Opening Hymn Number
            </label>

            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={meeting?.openingHymn.number ?? ""}
              aria-describedby="openingHymnNumber-error"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />

            <p
              id="openingHymnNumber-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.openingHymn?.join(", ")}
            </p>
          </div>

          {/* Opening Hymn Title */}
          <div>
            <label
              htmlFor="openingHymnTitle"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Opening Hymn Title
            </label>

            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              required
              defaultValue={meeting?.openingHymn.title ?? ""}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />
          </div>

          {/* Opening Prayer */}
          <div className="md:col-span-2">
            <label
              htmlFor="openingPrayer"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Opening Prayer
            </label>

            <input
              id="openingPrayer"
              name="openingPrayer"
              type="text"
              required
              defaultValue={meeting?.openingPrayer ?? ""}
              aria-describedby="openingPrayer-error"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />

            <p
              id="openingPrayer-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.openingPrayer?.join(", ")}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          WARD BUSINESS
      ========================================= */}

      <section className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Ward Business</h2>

        <div>
          <label
            htmlFor="wardBusiness"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Business or Announcements
          </label>

          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={4}
            defaultValue={
              meeting?.wardBusiness
                ?.map((item) => item.description)
                .join("\n") ?? ""
            }
            aria-describedby="wardBusiness-error"
            placeholder="Enter one item per line. If there is no business, type N/A."
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
          />

          <p
            id="wardBusiness-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.wardBusiness?.join(", ")}
          </p>
        </div>

        <input
          type="hidden"
          name="stakeBusiness"
          value={meeting?.stakeBusiness ? "true" : "false"}
        />
      </section>

      {/* =========================================
          SACRAMENT
      ========================================= */}

      <section className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Sacrament</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Sacrament Hymn Number
            </label>

            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={meeting?.sacramentHymn.number ?? ""}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Sacrament Hymn Title
            </label>

            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              required
              defaultValue={meeting?.sacramentHymn.title ?? ""}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />
          </div>
        </div>
      </section>

      {/* =========================================
          SPEAKERS
      ========================================= */}

      <section className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Speakers</h2>

        <p className="text-sm text-gray-500">
          Speaker management can be expanded here as a dynamic field collection.
        </p>

        <input
          type="hidden"
          name="speakers"
          value={JSON.stringify(meeting?.speakers ?? [])}
        />
      </section>

      {/* =========================================
          CLOSING
      ========================================= */}

      <section className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Closing</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Closing Hymn Number
            </label>

            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              required
              defaultValue={meeting?.closingHymn.number ?? ""}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />
          </div>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Closing Hymn Title
            </label>

            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              required
              defaultValue={meeting?.closingHymn.title ?? ""}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="closingPrayer"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Closing Prayer
            </label>

            <input
              id="closingPrayer"
              name="closingPrayer"
              type="text"
              required
              defaultValue={meeting?.closingPrayer ?? ""}
              aria-describedby="closingPrayer-error"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5"
            />

            <p
              id="closingPrayer-error"
              aria-live="polite"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors?.closingPrayer?.join(", ")}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          FORM ACTIONS
      ========================================= */}

      <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-sky-700 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? isEditMode
              ? "Saving Changes..."
              : "Creating Meeting..."
            : isEditMode
              ? "Save Changes"
              : "Save"}
        </button>
      </div>
    </form>
  );
}
