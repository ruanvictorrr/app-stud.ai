"use client";

import AppHeader from "@/app/components/AppHeader";
import FlashcardsSection from "@/app/components/FlashcardsSection";

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <AppHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <FlashcardsSection data={null} />
      </main>
    </div>
  );
}
