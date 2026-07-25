// app/(public)/loading.tsx

export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-8">
      <div className="animate-pulse space-y-8">
        <div className="h-10 w-64 rounded bg-gray-200" />

        <div className="space-y-4">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
        </div>
      </div>
    </main>
  );
}