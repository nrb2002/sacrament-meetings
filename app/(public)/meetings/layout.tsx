import type { ReactNode } from "react";

//import NavLinks from "@/components/NavLinks";

interface MeetingsLayoutProps {
  children: ReactNode;
}

export default function MeetingsLayout({
  children,
}: MeetingsLayoutProps) {
  return (
    <>
      {/* <NavLinks /> */}

      <section className="mt-2">
        {children}
      </section>
    </>
  );
}