import React from "react";
import Image from "next/image";

export function TrustedCompanies() {
  return (
    <section className="py-8 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">Trusted by leading companies</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <Image
            src="/logos/google.svg"
            alt="Google"
            width={100}
            height={40}
            className="opacity-60 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/logos/microsoft.svg"
            alt="Microsoft"
            width={100}
            height={40}
            className="opacity-60 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/logos/ibm.svg"
            alt="IBM"
            width={80}
            height={40}
            className="opacity-60 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </section>
  );
}
