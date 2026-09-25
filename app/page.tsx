import { CallToAction } from "@/components/marketing/CallToAction";
import { Faq } from "@/components/marketing/Faq";
import { Features } from "@/components/marketing/Features";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { ResultsWall } from "@/components/marketing/ResultsWall";
import { RoleExplorer } from "@/components/marketing/RoleExplorer";
import { SubjectStrip } from "@/components/marketing/SubjectStrip";
import { TrustStrip } from "@/components/marketing/TrustStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SubjectStrip />
      <TrustStrip />
      <RoleExplorer />
      <Features />
      <ResultsWall />
      <HowItWorks />
      <Faq />
      <CallToAction />
    </>
  );
}
