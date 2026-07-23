import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Info Side */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6"
            >
              Step Into The <span className="text-primary text-stroke-primary">Arena</span>
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

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-6 group"
              >
                <div className="w-14 h-14 bg-card border border-border flex items-center justify-center rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-white uppercase tracking-wide mb-1">Location</h4>
                  <p className="text-muted-foreground">
                    123 Power Avenue, Sector 5<br />
                    Kaithal, Haryana 136027
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-6 group"
              >
                <div className="w-14 h-14 bg-card border border-border flex items-center justify-center rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-white uppercase tracking-wide mb-1">Hours</h4>
                  <p className="text-muted-foreground">
                    Monday - Saturday: 5:00 AM - 10:00 PM<br />
                    Sunday: 6:00 AM - 12:00 PM
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-6 group"
              >
                <div className="w-14 h-14 bg-card border border-border flex items-center justify-center rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-white uppercase tracking-wide mb-1">Contact</h4>
                  <p className="text-muted-foreground">
                    +91 98765 43210<br />
                    join@infinitygym.in
                  </p>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <a
                href="tel:+919876543210"
                className="inline-block px-8 py-4 bg-primary text-white font-display font-bold text-lg uppercase tracking-wider skew-x-[-10deg] hover:bg-orange-600 transition-colors"
              >
                <div className="skew-x-[10deg]">Call Us Now</div>
              </a>
            </motion.div>
          </div>

          {/* Map Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[400px] lg:h-full min-h-[400px] bg-card border border-border rounded-lg overflow-hidden relative"
          >
            {/* Embedded Google Map - Styling using CSS filters to make it dark */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55403.49818814769!2d76.35338148384218!3d29.80053916772718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390df8003f0b2f15%3A0xcda6b08051a84f3!2sKaithal%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="w-full h-full border-0 grayscale invert contrast-80 opacity-80" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border border-border/50 mix-blend-overlay"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
