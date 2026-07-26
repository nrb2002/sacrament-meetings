// app/(admin)/admin/meetings/loading.tsx

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

        <h2 className="text-xl font-semibold">
          Loading meetings...
        </h2>

        <p className="text-sm text-gray-500">
          Please wait while we retrieve the meeting information.
        </p>
      </div>
    </div>
  );
}