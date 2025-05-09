import { useState, useEffect } from "react";
import Image from "next/image";
import { getAllClients } from "@/lib/services/clientService";
import type { Client } from "@/lib/services/clientService";

export function TrustedCompanies() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const allClients = await getAllClients();
        setClients(allClients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return null;
  }

  if (clients.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#ff096c]/10 to-[#8a0faf]/10 rounded-full mb-2 sm:mb-3 text-[#8a0faf] text-sm sm:text-base font-medium">
            Trusted by leading companies
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Our Clients & Partners
          </h3>
        </div>

        {/* Logo Marquee Container */}
        <div className="relative w-full overflow-hidden bg-white py-4">
          {/* Add fade effects */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Marquee wrapper */}
          <div className="flex animate-marquee">
            {/* First set of logos */}
            <div className="flex items-center gap-12 min-w-full">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex-shrink-0 w-32 h-16 relative group"
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity duration-300">
                    {client.name}
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center gap-12 min-w-full">
              {clients.map((client) => (
                <div
                  key={`${client.id}-duplicate`}
                  className="flex-shrink-0 w-32 h-16 relative group"
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity duration-300">
                    {client.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
