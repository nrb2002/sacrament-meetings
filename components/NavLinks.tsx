"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  {
    href: "/meetings",
    label: "All Meetings",
  },
  {
    href: "/meetings/past",
    label: "Past Meetings",
  },
  {
    href: "/meetings/current",
    label: "Current Meeting",
  },
  {
    href: "/meetings/future",
    label: "Future Meetings",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                isActive
                  ? "font-semibold text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden"
        aria-label="Open navigation menu"
      >
        <Menu size={28} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-semibold">Menu</h2>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={26} />
          </button>
        </div>

        <nav className="flex flex-col p-4">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 transition-colors ${
                  isActive
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}