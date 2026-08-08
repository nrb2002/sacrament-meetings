"use client";

import { useActionState } from "react";

import { authenticate } from "@/lib/actions";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-describedby="email-description"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
        />

        <p id="email-description" className="mt-1 text-xs text-gray-500">
          Enter your administrator email address.
        </p>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          minLength={6}
          autoComplete="current-password"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
        />
      </div>

      {errorMessage && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-sky-700 px-4 py-3 font-medium text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
