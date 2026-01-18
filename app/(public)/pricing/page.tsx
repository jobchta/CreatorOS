import { PricingSection } from "@/components/marketing/PricingSection";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Pricing - LogicLoom",
  description: "Simple, transparent pricing for creators and agencies.",
};

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <PricingSection />
      </div>
    </main>
  );
}

