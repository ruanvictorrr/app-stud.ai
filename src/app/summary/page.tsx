"use client";

import AppHeader from "@/app/components/AppHeader";

import SummarySection from "@/app/components/SummarySection";

export default function SummaryPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <AppHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <SummarySection data={null} />
      </main>
    </div>
  );
}
