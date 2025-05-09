import React from "react";
import Background from "./Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white relative flex flex-col">
      <Background />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
