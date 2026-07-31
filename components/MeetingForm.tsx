// components/MeetingForm.

"use client";

import { useActionState } from "react";
import {
  createMeeting,
  initialState,
} from "@/lib/actions";

export default function MeetingForm() {
  const [state, formAction, isPending] =
    useActionState(
      createMeeting,
      initialState
    );

  return (
    <form
      action={formAction}
      className="space-y-8"
    >
      {/* General form error */}
      {state.message && (
        <div
          className="rounded-md bg-red-50 p-4 text-red-700"
          role="alert"
        >
          {state.message}
        </div>
      )}

      {/* =========================
          MEETING INFORMATION
      ========================== */}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Meeting Information
        </h2>

        {/* Date */}
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

        {/* Meeting Type */}
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
            defaultValue=""
            aria-describedby="meetingType-error"
            className="w-full rounded border p-2"
          >
            <option value="" disabled>
              Select meeting type
            </option>

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

        {/* Presiding */}
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
            placeholder="Enter presiding officer"
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

        {/* Conducting */}
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
            placeholder="Enter conducting officer"
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

      {/* =========================
          OPENING
      ========================== */}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Opening
        </h2>

        {/* Opening Hymn Number */}
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
            aria-describedby="openingHymn-error"
            className="w-full rounded border p-2"
          />
        </div>

        {/* Opening Hymn Title */}
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
            aria-describedby="openingHymn-error"
            className="w-full rounded border p-2"
          />

          <p
            id="openingHymn-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.openingHymn?.join(", ")}
          </p>
        </div>

        {/* Opening Prayer */}
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

      {/* =========================
          SACRAMENT
      ========================== */}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Sacrament
        </h2>

        {/* Sacrament Hymn Number */}
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
            aria-describedby="sacramentHymn-error"
            className="w-full rounded border p-2"
          />
        </div>

        {/* Sacrament Hymn Title */}
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
            aria-describedby="sacramentHymn-error"
            className="w-full rounded border p-2"
          />

          <p
            id="sacramentHymn-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.sacramentHymn?.join(", ")}
          </p>
        </div>
      </section>

      {/* =========================
          CLOSING
      ========================== */}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Closing
        </h2>

        {/* Closing Hymn Number */}
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
            aria-describedby="closingHymn-error"
            className="w-full rounded border p-2"
          />
        </div>

        {/* Closing Hymn Title */}
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
            aria-describedby="closingHymn-error"
            className="w-full rounded border p-2"
          />

          <p
            id="closingHymn-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors?.closingHymn?.join(", ")}
          </p>
        </div>

        {/* Closing Prayer */}
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

      {/* =========================
          HIDDEN DATA
      ========================== */}

      <input
        type="hidden"
        name="announcements"
        value="[]"
      />

      <input
        type="hidden"
        name="wardBusiness"
        value="[]"
      />

      <input
        type="hidden"
        name="stakeBusiness"
        value="false"
      />

      <input
        type="hidden"
        name="speakers"
        value="[]"
      />

      {/* Hidden JSON objects for hymns */}
      <input
        type="hidden"
        name="openingHymn"
        value="{}"
      />

      <input
        type="hidden"
        name="sacramentHymn"
        value="{}"
      />

      <input
        type="hidden"
        name="closingHymn"
        value="{}"
      />

      {/* =========================
          SUBMIT
      ========================== */}

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-sky-700 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? "Creating Meeting..."
          : "Create Meeting"}
      </button>
    </form>
  );
}

