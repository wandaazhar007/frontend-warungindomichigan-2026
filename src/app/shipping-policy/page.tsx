import type { Metadata } from 'next';
import LegalPageLayout, {
  ProseH2,
  ProseH3,
  ProseP,
  ProseUl,
  ProseDivider,
  ProseContactBox,
} from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description:
    'Warung IndoMi shipping policy — carriers, delivery times, shipping rates, coverage area, tracking, and how we handle lost or damaged packages.',
  alternates: { canonical: 'https://warungindomi.com/shipping-policy' },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPageLayout
      label="Shipping"
      title="Shipping Policy"
      subtitle="Everything you need to know about how we ship your order."
      lastUpdated="June 29, 2026"
    >
      <ProseP>
        We want your Indonesian grocery haul to arrive safely and on time. Below is everything you
        need to know about how we pack and ship orders, delivery timeframes, and what to do if
        something goes wrong.
      </ProseP>

      <ProseH2>Shipping Carriers</ProseH2>
      <ProseP>
        We ship via two major US carriers:
      </ProseP>
      <ProseUl>
        <li>
          <strong>USPS (United States Postal Service)</strong> — Priority Mail (1–3 days) and
          Ground Advantage (2–5 days)
        </li>
        <li>
          <strong>UPS (United Parcel Service)</strong> — UPS Ground (1–5 days depending on zone)
        </li>
      </ProseUl>
      <ProseP>
        The carrier and service level are selected automatically based on the weight and dimensions
        of your order and your delivery address. We use Shippo to generate shipping labels and
        calculate the best available rates.
      </ProseP>

      <ProseDivider />

      <ProseH2>Processing Time</ProseH2>
      <ProseP>
        Orders are processed on <strong>business days (Monday–Friday)</strong>, excluding federal
        holidays. After successful payment:
      </ProseP>
      <ProseUl>
        <li>Most orders are packed and shipped within <strong>1–2 business days</strong></li>
        <li>
          Orders placed before 2:00 PM Eastern Time (ET) on a business day are typically shipped
          the same day or next business day
        </li>
        <li>
          During peak seasons (e.g., holidays, Eid/Lebaran), processing may take an additional
          1–2 days
        </li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>Estimated Delivery Times</ProseH2>
      <ProseP>
        Delivery times below are estimates from the ship date (not the order date) and apply to
        orders shipped from Madison Heights, Michigan.
      </ProseP>
      <ProseUl>
        <li><strong>USPS Priority Mail:</strong> 1–3 business days</li>
        <li><strong>USPS Ground Advantage:</strong> 2–5 business days</li>
        <li><strong>UPS Ground:</strong> 1–5 business days (shorter for nearby states)</li>
      </ProseUl>
      <ProseP>
        Estimated delivery times are not guarantees. Carriers occasionally experience delays due to
        weather, volume surges, or other factors outside our control. We are not liable for delays
        caused by carrier issues once the package has been handed off.
      </ProseP>

      <ProseDivider />

      <ProseH2>Shipping Rates</ProseH2>
      <ProseP>
        Shipping costs are calculated in real time at checkout based on:
      </ProseP>
      <ProseUl>
        <li>Total weight of your order</li>
        <li>Package dimensions (we use standard box presets)</li>
        <li>Your delivery zip code</li>
      </ProseUl>
      <ProseP>
        You will see the exact shipping cost and can choose your preferred carrier and service
        level <strong>before you enter payment information</strong>. There are no hidden shipping
        fees.
      </ProseP>

      <ProseDivider />

      <ProseH2>Shipping Coverage</ProseH2>

      <ProseH3>US States</ProseH3>
      <ProseP>
        We ship to all 50 US states, including Hawaii and Alaska. Deliveries to Hawaii and Alaska
        may have higher shipping costs and longer estimated delivery times.
      </ProseP>

      <ProseH3>PO Boxes</ProseH3>
      <ProseP>
        USPS can deliver to PO Boxes. UPS cannot deliver to PO Boxes. If you provide a PO Box
        address, your order will automatically be shipped via USPS.
      </ProseP>

      <ProseH3>International Shipping</ProseH3>
      <ProseP>
        We currently <strong>do not ship internationally</strong>. We only ship within the United
        States. We also do not ship to US territories such as Puerto Rico, Guam, US Virgin Islands,
        or APO/FPO military addresses at this time.
      </ProseP>

      <ProseDivider />

      <ProseH2>Package Tracking</ProseH2>
      <ProseP>
        Once your order ships, you will receive a shipping confirmation email with:
      </ProseP>
      <ProseUl>
        <li>Your tracking number</li>
        <li>A link to track your package directly on USPS.com or UPS.com</li>
        <li>Estimated delivery date (if available from the carrier)</li>
      </ProseUl>
      <ProseP>
        If you have an account, you can also track your order status from your{' '}
        <a href="/orders">Order History</a> page.
      </ProseP>
      <ProseP>
        Please allow 24 hours after receiving your tracking email for the tracking information to
        be updated in the carrier&apos;s system.
      </ProseP>

      <ProseDivider />

      <ProseH2>Lost or Damaged Packages</ProseH2>

      <ProseH3>Package Not Delivered</ProseH3>
      <ProseP>
        If your tracking shows &quot;Delivered&quot; but you have not received your package:
      </ProseP>
      <ProseUl>
        <li>Check your mailbox, porch, garage, and around your property</li>
        <li>Ask neighbors if the package was left with them</li>
        <li>Check with your building manager if you live in an apartment</li>
        <li>
          Wait 1 additional business day — carriers sometimes mark packages as delivered a day
          early
        </li>
        <li>
          If still not found, contact us via WhatsApp within <strong>7 days</strong> of the
          reported delivery date. We will file a carrier claim on your behalf.
        </li>
      </ProseUl>

      <ProseH3>Package Damaged in Transit</ProseH3>
      <ProseP>
        If your package arrives visibly damaged:
      </ProseP>
      <ProseUl>
        <li>
          Take photos of the outer packaging (box/mailer) <strong>before opening</strong> if
          possible
        </li>
        <li>Take photos of the damaged items inside</li>
        <li>
          Contact us via WhatsApp within <strong>48 hours</strong> of delivery with your photos
          and order number
        </li>
        <li>Keep all packaging materials — carriers may need to inspect them for the claim</li>
      </ProseUl>
      <ProseP>
        We will work with the carrier to file a claim and will arrange a replacement or refund
        once the claim is reviewed.
      </ProseP>

      <ProseDivider />

      <ProseH2>Food Safety During Shipping</ProseH2>
      <ProseP>
        All products we sell are shelf-stable, non-perishable Indonesian pantry items (mie,
        bumbu, sambal, snack, kopi, etc.). They do not require refrigeration during transit.
      </ProseP>
      <ProseP>
        However, please be aware:
      </ProseP>
      <ProseUl>
        <li>
          Products containing chocolate (e.g., wafer bars, chocolate-coated snacks) may melt in
          extreme heat during summer months. We recommend selecting faster shipping options if
          ordering these items during hot weather. We are not responsible for heat-related melting
          during transit after the package is in the carrier&apos;s possession.
        </li>
        <li>
          Store all products according to the instructions on their packaging once you receive
          your order
        </li>
      </ProseUl>

      <ProseContactBox />
    </LegalPageLayout>
  );
}
