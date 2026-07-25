import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    title: "Location",
    lines: ["123 Power Avenue, Sector 5", "Kaithal, Haryana 136027"],
    accent: "gold",
  },
  {
    icon: Clock,
    title: "Hours",
    lines: ["Mon – Sat: 5:00 AM – 10:00 PM", "Sunday: 6:00 AM – 12:00 PM"],
    accent: "purple",
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+91 98765 43210"],
    accent: "gold",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["join@infinitygym.in"],
    accent: "purple",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/6 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Info Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              className="w-16 h-1 gradient-accent mb-6"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6"
            >
              Step Into The <span className="text-gradient-gold">Arena</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg mb-12"
            >
              Ready to start? Drop by for a free tour. The hardest lift of all is lifting your ass off the couch.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i }}
                  className={`group flex items-start gap-4 p-5 bg-card border rounded-sm transition-all duration-300 relative overflow-hidden ${
                    item.accent === "gold"
                      ? "border-border hover:border-primary/50"
                      : "border-border hover:border-purple/50"
                  }`}
                >
                  {/* Top border accent on hover */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left ${
                    item.accent === "gold" ? "bg-primary" : "bg-purple"
                  }`} />
                  <div className={`shrink-0 w-12 h-12 border flex items-center justify-center rounded-sm transition-all duration-300 ${
                    item.accent === "gold"
                      ? "border-border group-hover:border-primary group-hover:bg-primary/10 text-primary"
                      : "border-border group-hover:border-purple group-hover:bg-purple/10 text-purple"
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-white uppercase tracking-wide mb-1">{item.title}</h4>
                    {item.lines.map((line, li) => (
                      <p key={li} className="text-muted-foreground text-sm">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 flex-wrap"
            >
              <a
                href="tel:+919876543210"
                className="inline-block px-8 py-4 bg-primary text-background font-display font-bold text-lg uppercase tracking-wider skew-x-[-10deg] hover:bg-primary-dark transition-colors glow-gold"
              >
                <div className="skew-x-[10deg]">Call Us Now</div>
              </a>
              <a
                href="#pricing"
                className="inline-block px-8 py-4 bg-transparent border-2 border-purple text-purple font-display font-bold text-lg uppercase tracking-wider skew-x-[-10deg] hover:bg-purple hover:text-white transition-all"
              >
                <div className="skew-x-[10deg]">View Plans</div>
              </a>
            </motion.div>
          </div>

          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[450px] lg:h-full min-h-[450px] bg-card border border-border rounded-sm overflow-hidden relative glow-dual"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55403.49818814769!2d76.35338148384218!3d29.80053916772718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390df8003f0b2f15%3A0xcda6b08051a84f3!2sKaithal%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-0 grayscale invert contrast-[0.8] opacity-75"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Gold + purple corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
