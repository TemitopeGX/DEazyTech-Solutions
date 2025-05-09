import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceCards } from "@/components/services/ServiceCards";
import { OurProcess } from "@/components/services/OurProcess";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <ServicesHero />
      <ServiceCards />
      <OurProcess />
    </main>
  );
}
