import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Features } from "@/components/Features";
import { FlowDemo } from "@/components/FlowDemo";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { AIActionDemo } from "@/components/AIActionDemo";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";

export default function Page() {
  return (
    <div className="space-y-6">
      <Hero />
      <SocialProof />
      <Features />
      <FlowDemo />
      <Testimonials />
      <HowItWorks />
      <AIActionDemo />
      <Pricing />
      <CTA />
      <FAQ />
    </div>
  );
}
