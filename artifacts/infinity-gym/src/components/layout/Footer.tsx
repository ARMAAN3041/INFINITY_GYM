import { Instagram, Facebook, Youtube } from "lucide-react";
import gymLogo from "@assets/kkkkk_1785218944846.jpeg";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 relative overflow-hidden">
      {/* Purple glow blob bottom-left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple/5 blur-[120px] rounded-full pointer-events-none" />
      {/* Gold glow blob bottom-right */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          <div className="sm:col-span-2">
            {/* Real gym logo */}
            <div className="mb-6">
              <img
                src={gymLogo}
                alt="Infinity Fitness Gym"
                className="h-14 w-auto object-contain rounded-full"
              />
            </div>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              The undisputed powerhouse of Kaithal. Where serious athletes and dedicated beginners come to push their limits and break their boundaries.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-purple hover:border-purple transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-lg uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-4 h-[2px] gradient-accent inline-block" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Programs", "Why Choose Us", "Membership Pricing", "Our Trainers", "Reviews"].map((item, i) => (
                <li key={i}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-").replace("why-choose-us", "features").replace("membership-pricing", "pricing").replace("our-trainers", "trainers")}`}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-lg uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-4 h-[2px] gradient-accent inline-block" />
              Contact
            </h4>
            <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <li>Kaithal, Haryana 136027</li>
              <li>+91 98765 43210</li>
              <li>join@infinitygym.in</li>
              <li className="text-primary font-semibold">Open 5 AM – 10 PM</li>
            </ul>
          </div>
        </div>

        {/* Gold-purple divider */}
        <div className="h-px gradient-accent mb-8 opacity-40" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Infinity Fitness Gym, Kaithal. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Forged in <span className="text-primary font-semibold">Gold</span> · Powered by <span className="text-purple font-semibold">Haryana</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
