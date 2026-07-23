import { Dumbbell, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="font-display font-bold text-2xl tracking-wider text-white">
                INFINITY <span className="text-primary">GYM</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              The undisputed powerhouse of Kaithal. Where serious athletes and dedicated beginners come to push their limits and break their boundaries.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-lg uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#programs" className="text-muted-foreground hover:text-primary transition-colors">Programs</a></li>
              <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Why Choose Us</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Membership Pricing</a></li>
              <li><a href="#trainers" className="text-muted-foreground hover:text-primary transition-colors">Our Trainers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-lg uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Gym Rules</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Infinity Gym Kaithal. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Forged in <Dumbbell className="w-3 h-3 text-primary mx-1" /> Haryana
          </p>
        </div>
      </div>
    </footer>
  );
}
