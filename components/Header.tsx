// components/Header.tsx

import Link from "next/link";

export default function Header() {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="site-header border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-blue-700"
          >
            Sacrament Meeting Planner
          </Link>

          <p className="text-sm text-gray-600">
            Kasa-Vubu Ward / Kinshasa Stake / Democratic Republic of Congo
          </p>
        </div>

        <p className="text-sm text-gray-500">
          {today}
        </p>
      </div>
    </header>
  );
}