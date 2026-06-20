import { Truck, Shield, Star, Lock } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Shipping',
    desc: 'Ships in 1–3 business days to all 50 states across the U.S.',
  },
  {
    icon: Shield,
    title: '100% Halal',
    desc: 'All our products are certified halal — safe for the whole family.',
  },
  {
    icon: Star,
    title: 'Authentic Products',
    desc: 'Imported directly from Indonesia. The real taste you grew up with.',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    desc: 'Checkout protected by Stripe — your information is always safe.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-wim">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-foreground">
            Why shop with Warung Indo?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            We make it easy to enjoy Indonesian flavors at home.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-5 sm:p-6 border border-border bg-background hover:border-primary/40 transition-colors"
            >
              <div className="h-11 w-11 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-sm sm:text-base mb-1.5 text-foreground">
                {title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
