// components/Header.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/meetings",
    label: "Meetings",
  },
  {
    href: "/meetings/current",
    label: "Current",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-gray-50">
      <div className="mx-auto flex max-w-6xl gap-6 px-6 py-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              pathname === link.href
                ? "font-semibold text-blue-700"
                : "text-gray-600 hover:text-blue-700"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}