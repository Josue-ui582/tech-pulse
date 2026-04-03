"use client";

import AboutHeader from "@/features/about/components/aboutHeader";
import { AboutMissions } from "@/features/about/components/aboutMissions";
import AboutStatistic from "@/features/about/components/aboutStatistic";
import AboutCta from "@/features/about/components/aboutCta";

export default function AboutPage() {

  return (
    <>
      <div className="bg-white min-h-screen">
        <AboutHeader />

      <AboutMissions />

      <AboutStatistic />

      <AboutCta />
    </div>
    </>
  );
}