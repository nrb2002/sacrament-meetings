"use client";

import { Download, Printer } from "lucide-react";

export default function MeetingActions() {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("PDF download will be implemented in a future version.");
  };

  return (
    <div className="mb-6 flex justify-end gap-3">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-gray-100"
      >
        <Printer size={18} />
        Print
      </button>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 rounded-md bg-sky-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-800"
      >
        <Download size={18} />
        Download
      </button>
    </div>
  );
}
