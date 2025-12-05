import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { WhyFilmLot } from "../components/WhyFilmLot";
import { UseCases } from "../components/UseCases";
import { Stats } from "../components/Stats";
import { Testimonials } from "../components/Testimonials";
import { CRMAccess } from "../components/CRMAccess";
import { Pricing } from "../components/Pricing";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";

export function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Hero />
      <Features />
      <WhyFilmLot />
      <UseCases />
      <Stats />
      <Testimonials />
      <CTA />
      <CRMAccess />
      <Pricing />
      <Footer />
      <ScrollToTop />
    </div>
  );
}