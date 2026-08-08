import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Sign In
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage sacrament meetings.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}