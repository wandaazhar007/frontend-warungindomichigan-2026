import type { Metadata } from 'next';
import LegalPageLayout, {
  ProseH2,
  ProseP,
  ProseUl,
  ProseDivider,
  ProseContactBox,
} from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and Conditions for shopping at Warung IndoMi — the rules governing orders, payments, shipping, and use of our website.',
  alternates: { canonical: 'https://warungindomi.com/terms' },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      label="Legal"
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before placing an order."
      lastUpdated="June 29, 2026"
    >
      <ProseP>
        These Terms and Conditions (&quot;Terms&quot;) govern your use of the Warung IndoMi website
        (warungindomi.com) and your purchase of products from us. By accessing our site or placing
        an order, you agree to be bound by these Terms. If you do not agree, please do not use our
        site.
      </ProseP>

      <ProseH2>1. Who We Are</ProseH2>
      <ProseP>
        Warung IndoMi is an Indonesian grocery store based in Madison Heights, Michigan,
        USA. We sell authentic Indonesian food products and ship nationwide across the United States.
      </ProseP>
      <ProseP>Contact: WhatsApp +1 (626) 461-4963</ProseP>

      <ProseDivider />

      <ProseH2>2. Acceptance of Terms</ProseH2>
      <ProseP>
        By browsing our website, creating an account, or placing an order, you confirm that you are
        at least 18 years of age (or have parental consent) and that you agree to these Terms and
        our Privacy Policy.
      </ProseP>

      <ProseDivider />

      <ProseH2>3. User Accounts</ProseH2>
      <ProseP>
        Creating an account is optional — you may check out as a guest. If you choose to create an
        account:
      </ProseP>
      <ProseUl>
        <li>You are responsible for maintaining the confidentiality of your password</li>
        <li>You agree to provide accurate and current information</li>
        <li>You must notify us immediately of any unauthorized use of your account</li>
        <li>
          We reserve the right to suspend or terminate accounts that violate these Terms or engage
          in fraudulent activity
        </li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>4. Products & Pricing</ProseH2>
      <ProseUl>
        <li>All prices are displayed in US Dollars (USD)</li>
        <li>Prices are subject to change without notice</li>
        <li>
          Product images are for illustrative purposes. Actual packaging may vary slightly due to
          manufacturer updates
        </li>
        <li>
          We strive to keep product availability accurate, but we reserve the right to cancel orders
          if a product becomes unavailable after your order is placed. In such cases, you will
          receive a full refund
        </li>
        <li>
          Products are imported Indonesian brands. We do not manufacture or alter any products
        </li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>5. Ordering Process</ProseH2>
      <ProseP>
        An order is confirmed only after successful payment processing. Here is how the process works:
      </ProseP>
      <ProseUl>
        <li>Add items to your cart and proceed to checkout</li>
        <li>Provide your contact information and shipping address</li>
        <li>Select a shipping method and rate</li>
        <li>Complete payment via Stripe</li>
        <li>
          You will receive an order confirmation email with your order number (format: WIM-YEAR-XXXX)
        </li>
        <li>
          We reserve the right to cancel or refuse any order at our discretion, with a full refund
          issued
        </li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>6. Payment</ProseH2>
      <ProseUl>
        <li>
          Payments are processed securely by Stripe. We accept Visa, Mastercard, American Express,
          and Discover
        </li>
        <li>We do not store your payment card information on our servers</li>
        <li>Your card is charged immediately upon order confirmation</li>
        <li>
          All transactions are in USD. If your card is issued in another currency, your bank will
          handle the currency conversion and may charge a foreign transaction fee
        </li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>7. Shipping</ProseH2>
      <ProseP>
        We ship via USPS and UPS to all 50 US states. Shipping costs and estimated delivery times
        are calculated at checkout based on your location and order weight. For full details, please
        see our{' '}
        <a href="/shipping-policy">Shipping Policy</a>.
      </ProseP>
      <ProseP>
        Delivery times are estimates and not guarantees. We are not liable for delays caused by
        carriers, weather events, natural disasters, or other factors outside our control.
      </ProseP>

      <ProseDivider />

      <ProseH2>8. Returns & Refunds</ProseH2>
      <ProseP>
        Due to the nature of food and grocery products, most items are non-returnable after
        delivery. We will issue refunds for damaged, defective, or incorrectly shipped items. For
        full details, please see our{' '}
        <a href="/return-policy">Return & Refund Policy</a>.
      </ProseP>

      <ProseDivider />

      <ProseH2>9. Food Product Disclaimer</ProseH2>
      <ProseP>
        Products sold on our website are imported Indonesian food and grocery items intended for
        human consumption. Please be aware of the following:
      </ProseP>
      <ProseUl>
        <li>
          Always check the ingredient list and allergen information on the product packaging before
          consuming
        </li>
        <li>
          We are not responsible for adverse reactions due to individual dietary restrictions or
          allergies
        </li>
        <li>
          Some products may contain ingredients not found in typical US grocery items. Please read
          labels carefully
        </li>
        <li>
          Products should be stored according to the storage instructions on the packaging
        </li>
        <li>
          We do not modify, repackage, or alter products from their original manufacturer&apos;s form
        </li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>10. Prohibited Uses</ProseH2>
      <ProseP>You agree not to use our site to:</ProseP>
      <ProseUl>
        <li>Place fraudulent orders or use stolen payment methods</li>
        <li>Harvest or scrape data from our website</li>
        <li>
          Attempt to interfere with or disrupt the website&apos;s operation or security
        </li>
        <li>Resell our products commercially without prior written consent</li>
        <li>
          Submit false or misleading information (e.g., fake shipping addresses)
        </li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>11. Intellectual Property</ProseH2>
      <ProseP>
        The content on this website — including text, images, logos, and design — is owned by or
        licensed to Warung IndoMi. You may not reproduce, distribute, or use our content
        without prior written permission, except for personal, non-commercial use.
      </ProseP>
      <ProseP>
        Product names and trademarks belong to their respective owners (e.g., Indomie®, ABC®,
        Kecap Bango®). We are an authorized retailer, not affiliated with or endorsed by these brands.
      </ProseP>

      <ProseDivider />

      <ProseH2>12. Limitation of Liability</ProseH2>
      <ProseP>
        To the fullest extent permitted by law, Warung IndoMi shall not be liable for any
        indirect, incidental, special, or consequential damages arising from your use of our site or
        products, including but not limited to loss of profits, data, or goodwill.
      </ProseP>
      <ProseP>
        Our total liability to you for any claim arising from your purchase shall not exceed the
        amount you paid for the specific order giving rise to the claim.
      </ProseP>

      <ProseDivider />

      <ProseH2>13. Dispute Resolution</ProseH2>
      <ProseP>
        We encourage you to contact us directly to resolve any dispute before pursuing formal legal
        action. You can reach us via WhatsApp at +1 (626) 461-4963. Claims must be raised within
        30 days of receiving your order.
      </ProseP>
      <ProseP>
        If a dispute cannot be resolved informally, both parties agree to attempt mediation before
        pursuing litigation. You agree to bring claims in your individual capacity only, not as a
        plaintiff in any class action.
      </ProseP>

      <ProseDivider />

      <ProseH2>14. Governing Law</ProseH2>
      <ProseP>
        These Terms are governed by and construed in accordance with the laws of the State of
        Michigan, United States, without regard to its conflict of law provisions. Any legal action
        must be brought in the courts located in Oakland County, Michigan.
      </ProseP>

      <ProseDivider />

      <ProseH2>15. Changes to These Terms</ProseH2>
      <ProseP>
        We reserve the right to update these Terms at any time. The &quot;Last updated&quot; date at the top
        of this page reflects the most recent revision. Continued use of our website after changes
        are posted constitutes your acceptance of the revised Terms. We recommend checking this page
        periodically.
      </ProseP>

      <ProseContactBox />
    </LegalPageLayout>
  );
}
