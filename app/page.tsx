import Hero from "@/components/home/hero";
import XbootSection from "@/components/home/xboot-section";
import BackSupportSection from "@/components/home/back-support-section";
import KneeBraceSection from "@/components/home/knee-brace-section";
import TrustSection from "@/components/home/trust-section";
import XOSection from "@/components/home/xo-section";
import CTASection from "@/components/home/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full bg-background">
        <Hero />
        <XbootSection />
        <BackSupportSection />
        <KneeBraceSection />
        <TrustSection />
        <XOSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}