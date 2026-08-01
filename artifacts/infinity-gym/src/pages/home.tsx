import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Programs from "@/components/sections/Programs";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import Trainers from "@/components/sections/Trainers";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Programs />
        <Pricing />
        <Trainers />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
