import { MessageCircle, Facebook, MapPin, Clock } from 'lucide-react';

export default function VisitUsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container-wim">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
            Get in touch
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Visit us or order online
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Based in Michigan &mdash; shipping nationwide across the U.S.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">

          {/* Embedded Google Map */}
          <div className="rounded-2xl overflow-hidden border border-border aspect-[4/3]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.711521957843!2d-83.09339298792929!3d42.49835017106019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824cff7ecab89f3%3A0x8b977f50f6518174!2s28130%20Park%20Ct%2C%20Madison%20Heights%2C%20MI%2048071!5e1!3m2!1sen!2sus!4v1781940774978!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Warung IndoMi location"
            />
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">Location</p>
                <p className="text-sm text-gray-500">28130 Park Ct, Madison Heights, MI 48071</p>
                <span className="inline-block mt-1.5 text-xs font-semibold text-wim-green bg-wim-green/10 px-2.5 py-1 rounded-full">
                  Shipping to all 50 states
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">Order Processing</p>
                <p className="text-sm text-gray-500">Monday – Friday: 8 AM – 5 PM EST</p>
                <span className="inline-block mt-1.5 text-xs font-semibold text-wim-yellow bg-wim-yellow/10 px-2.5 py-1 rounded-full">
                  Orders before 2 PM ship same day
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/16264614963?text=Hi%2C%20Warung%20IndoMi.%20Saya%20mau%20order%20dan%20bertanya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE59] text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm flex-1"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                Chat on WhatsApp
              </a>
              <a
                href="https://www.facebook.com/levi.chen.11503/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1464D0] text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm flex-1"
              >
                <Facebook className="h-4 w-4 shrink-0" />
                Follow on Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
