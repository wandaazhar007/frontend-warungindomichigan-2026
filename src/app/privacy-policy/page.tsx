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
  title: 'Privacy Policy',
  description:
    'Learn how Warung Indo Michigan collects, uses, and protects your personal information when you shop on our website.',
  alternates: { canonical: 'https://warungindomi.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      label="Legal"
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
      lastUpdated="June 29, 2026"
    >
      <ProseP>
        Warung Indo Michigan (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information
        when you visit our website and place an order. Please read this policy carefully. By using
        our site, you agree to the practices described here.
      </ProseP>

      <ProseH2>1. Information We Collect</ProseH2>

      <ProseH3>Information You Provide Directly</ProseH3>
      <ProseP>
        When you place an order or create an account, we collect:
      </ProseP>
      <ProseUl>
        <li>Full name (first and last)</li>
        <li>Email address</li>
        <li>Shipping address (street, city, state, ZIP code)</li>
        <li>Phone number</li>
        <li>Password (if you create an account — stored securely via Firebase Auth, never in plain text)</li>
        <li>Order notes or messages you send us</li>
      </ProseUl>

      <ProseH3>Payment Information</ProseH3>
      <ProseP>
        All payment processing is handled by <strong>Stripe</strong>, a PCI DSS Level 1 certified
        payment processor. We never see, receive, or store your full credit card number, CVV, or
        other sensitive payment data. Stripe may collect and store payment information in accordance
        with their own{' '}
        <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </ProseP>

      <ProseH3>Information Collected Automatically</ProseH3>
      <ProseP>When you visit our website, we may automatically collect:</ProseP>
      <ProseUl>
        <li>IP address and general location</li>
        <li>Browser type and version</li>
        <li>Pages viewed and time spent on the site</li>
        <li>Referring URL</li>
        <li>Device type (desktop, mobile, tablet)</li>
        <li>Session data stored in cookies (cart contents, login session)</li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>2. How We Use Your Information</ProseH2>
      <ProseP>We use the information we collect to:</ProseP>
      <ProseUl>
        <li>Process and fulfill your orders</li>
        <li>Send order confirmation and shipping notification emails</li>
        <li>Generate shipping labels and coordinate delivery via USPS and UPS</li>
        <li>Respond to your questions and provide customer support</li>
        <li>Maintain and improve our website and services</li>
        <li>Comply with legal obligations (tax records, fraud prevention)</li>
        <li>Send promotional emails if you opt in (you can unsubscribe at any time)</li>
      </ProseUl>
      <ProseP>
        We do not sell, rent, or trade your personal information to third parties for their own
        marketing purposes.
      </ProseP>

      <ProseDivider />

      <ProseH2>3. Third-Party Services</ProseH2>
      <ProseP>
        We use trusted third-party services to operate our business. Each has its own privacy
        policy:
      </ProseP>
      <ProseUl>
        <li>
          <strong>Firebase (Google)</strong> — user authentication and account management.{' '}
          <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">
            Firebase Privacy Policy
          </a>
        </li>
        <li>
          <strong>Stripe</strong> — secure payment processing.{' '}
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
            Stripe Privacy Policy
          </a>
        </li>
        <li>
          <strong>Shippo</strong> — shipping label generation and rate calculation via USPS and UPS.{' '}
          <a href="https://goshippo.com/privacy/" target="_blank" rel="noopener noreferrer">
            Shippo Privacy Policy
          </a>
        </li>
        <li>
          <strong>Resend</strong> — transactional email delivery (order confirmations, shipping notifications).{' '}
          <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Resend Privacy Policy
          </a>
        </li>
        <li>
          <strong>Cloudinary</strong> — product image hosting and delivery.{' '}
          <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer">
            Cloudinary Privacy Policy
          </a>
        </li>
        <li>
          <strong>Supabase (PostgreSQL)</strong> — secure cloud database where your order and
          account information is stored.{' '}
          <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
            Supabase Privacy Policy
          </a>
        </li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>4. Cookies</ProseH2>
      <ProseP>
        We use cookies to improve your experience on our site. We use only essential cookies:
      </ProseP>
      <ProseUl>
        <li>
          <strong>Authentication cookie</strong> — keeps you logged in during your session
          (via Firebase Auth)
        </li>
        <li>
          <strong>Cart cookie</strong> — saves your cart contents between page visits so items
          are not lost when you close the browser tab
        </li>
      </ProseUl>
      <ProseP>
        We do not use third-party advertising or tracking cookies. You can disable cookies in your
        browser settings, but this may affect certain features of the site (e.g., staying logged in
        or keeping items in your cart).
      </ProseP>

      <ProseDivider />

      <ProseH2>5. Data Retention</ProseH2>
      <ProseUl>
        <li>
          <strong>Order records</strong> — retained for 7 years to comply with US tax and
          accounting regulations
        </li>
        <li>
          <strong>Account data</strong> — retained until you request deletion of your account
        </li>
        <li>
          <strong>Guest checkout data</strong> — email and shipping address retained alongside the
          order record for the same 7-year period
        </li>
      </ProseUl>
      <ProseP>
        If you would like your personal data deleted, please contact us via WhatsApp or email. We
        will fulfill your request within 30 days, except for information we are legally required to
        retain.
      </ProseP>

      <ProseDivider />

      <ProseH2>6. Your Rights (CCPA — California Residents)</ProseH2>
      <ProseP>
        If you are a California resident, the California Consumer Privacy Act (CCPA) gives you
        specific rights regarding your personal information:
      </ProseP>
      <ProseUl>
        <li>
          <strong>Right to Know</strong> — you can request details about what personal data we have
          collected about you and how it is used
        </li>
        <li>
          <strong>Right to Delete</strong> — you can request that we delete your personal data,
          subject to certain exceptions
        </li>
        <li>
          <strong>Right to Opt Out of Sale</strong> — we do not sell your personal data, so this
          right is not applicable, but we honor this principle
        </li>
        <li>
          <strong>Right to Non-Discrimination</strong> — we will not discriminate against you for
          exercising any of your CCPA rights
        </li>
      </ProseUl>
      <ProseP>
        To exercise these rights, contact us via WhatsApp at +1 (626) 461-4963. We will respond
        within 45 days.
      </ProseP>

      <ProseDivider />

      <ProseH2>7. Children&apos;s Privacy (COPPA)</ProseH2>
      <ProseP>
        Our website is not directed to children under the age of 13. We do not knowingly collect
        personal information from children under 13. If you believe we have inadvertently collected
        such information, please contact us immediately and we will take steps to delete it.
      </ProseP>

      <ProseDivider />

      <ProseH2>8. Data Security</ProseH2>
      <ProseP>
        We take reasonable measures to protect your personal information, including:
      </ProseP>
      <ProseUl>
        <li>HTTPS encryption on all pages</li>
        <li>Payment processing via Stripe (PCI DSS compliant — we never store card data)</li>
        <li>Secure cloud database (Supabase) with access controls</li>
        <li>Firebase Auth for secure password management</li>
      </ProseUl>
      <ProseP>
        No method of transmission over the Internet is 100% secure. While we strive to protect
        your data, we cannot guarantee absolute security.
      </ProseP>

      <ProseDivider />

      <ProseH2>9. Changes to This Policy</ProseH2>
      <ProseP>
        We may update this Privacy Policy from time to time. Material changes will be communicated
        via email to registered users. The &quot;Last updated&quot; date at the top of this page indicates
        when the most recent changes were made. Continued use of our site after any changes
        constitutes your acceptance of the updated policy.
      </ProseP>

      <ProseContactBox />
    </LegalPageLayout>
  );
}
