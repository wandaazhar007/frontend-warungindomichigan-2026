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
  title: 'Return & Refund Policy',
  description:
    'Warung IndoMi return and refund policy — learn when refunds are issued, how to request one, and our policy on food and grocery items.',
  alternates: { canonical: 'https://warungindomi.com/return-policy' },
};

export default function ReturnPolicyPage() {
  return (
    <LegalPageLayout
      label="Legal"
      title="Return & Refund Policy"
      subtitle="Your satisfaction matters to us. Here's everything you need to know."
      lastUpdated="June 29, 2026"
    >
      <ProseH2>Our Commitment</ProseH2>
      <ProseP>
        At Warung IndoMi, we take great care in packing and shipping every order. If
        something goes wrong, we want to make it right. Please read this policy carefully so you
        know what to expect and how to reach us if you have a problem.
      </ProseP>
      <ProseP>
        All return and refund requests must be submitted <strong>within 7 calendar days</strong> of
        the delivery date shown in your tracking information.
      </ProseP>

      <ProseDivider />

      <ProseH2>Food & Grocery Items Are Non-Returnable</ProseH2>
      <ProseP>
        Due to food safety regulations and FDA guidelines, <strong>most food and grocery products
        cannot be returned</strong> once they have been delivered. This applies to:
      </ProseP>
      <ProseUl>
        <li>Instant noodles (mie instan), rice, and other dry goods</li>
        <li>Seasonings, spices, and cooking sauces (bumbu, sambal, kecap, saus)</li>
        <li>Beverages and coffee</li>
        <li>Snacks and crackers (kerupuk, snack kemasan)</li>
        <li>Baking ingredients and dairy products</li>
        <li>Health products, vitamins, and personal care items</li>
        <li>Any product where the packaging seal has been broken or opened</li>
      </ProseUl>
      <ProseP>
        This is standard practice for food retailers in the United States and is required for
        consumer safety. We appreciate your understanding.
      </ProseP>

      <ProseDivider />

      <ProseH2>When We Will Issue a Refund</ProseH2>
      <ProseP>
        We will issue a <strong>full refund or replacement</strong> in the following situations:
      </ProseP>

      <ProseH3>1. Item Damaged During Shipping</ProseH3>
      <ProseP>
        If your product arrived damaged (e.g., broken packaging, crushed boxes, leaking contents),
        please contact us with:
      </ProseP>
      <ProseUl>
        <li>Your order number</li>
        <li>Clear photos of the damaged item(s)</li>
        <li>Photos of the outer packaging (box or mailer)</li>
      </ProseUl>

      <ProseH3>2. Wrong Item Shipped</ProseH3>
      <ProseP>
        If you received a product that is different from what you ordered, we will arrange a
        replacement or full refund. Please send us your order number and a photo of the item you
        received.
      </ProseP>

      <ProseH3>3. Missing Items</ProseH3>
      <ProseP>
        If your order arrived but one or more items were missing, contact us with your order number
        and a photo of the items you did receive. We will verify against our packing records and
        resolve the issue.
      </ProseP>

      <ProseH3>4. Order Not Delivered</ProseH3>
      <ProseP>
        If your tracking shows &quot;delivered&quot; but you did not receive the package, please first check
        with neighbors and around your property. Then contact us and we will file a missing package
        claim with the carrier on your behalf.
      </ProseP>

      <ProseDivider />

      <ProseH2>How to Request a Refund</ProseH2>
      <ProseP>To submit a refund request, follow these steps:</ProseP>
      <ProseUl>
        <li>
          <strong>Step 1:</strong> Take clear photos of the issue (damaged product, wrong item,
          or the outer packaging)
        </li>
        <li>
          <strong>Step 2:</strong> Contact us via WhatsApp at{' '}
          <a href="https://wa.me/16264614963" target="_blank" rel="noopener noreferrer">
            +1 (626) 461-4963
          </a>{' '}
          within 7 days of receiving your order
        </li>
        <li>
          <strong>Step 3:</strong> Include your order number (format: WIM-YEAR-XXXX) and photos
        </li>
        <li>
          <strong>Step 4:</strong> Our team will review your request and respond within 1–2
          business days
        </li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>Refund Processing Time</ProseH2>
      <ProseP>
        Once your refund is approved, it will be processed through <strong>Stripe</strong> back to
        your original payment method. Please allow:
      </ProseP>
      <ProseUl>
        <li>1–3 business days for us to process and submit the refund through Stripe</li>
        <li>
          5–10 additional business days for the refund to appear on your bank or credit card
          statement (this timeline is set by your bank, not us)
        </li>
      </ProseUl>
      <ProseP>
        You will receive an email confirmation when the refund is processed. We are unable to
        accelerate the timeline on your bank&apos;s end.
      </ProseP>

      <ProseDivider />

      <ProseH2>Order Cancellations</ProseH2>
      <ProseP>
        You may request a cancellation <strong>before your order is shipped</strong>. Since we
        process orders quickly (typically within 1–2 business days), please contact us as soon as
        possible if you need to cancel.
      </ProseP>
      <ProseUl>
        <li>Orders with status <strong>Pending</strong> or <strong>Processing</strong> — can be cancelled for a full refund</li>
        <li>
          Orders with status <strong>Shipped</strong> — cannot be cancelled. If you still want a
          refund, the item must qualify under the conditions above
        </li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>Exceptions & Non-Refundable Situations</ProseH2>
      <ProseP>Refunds will not be issued for:</ProseP>
      <ProseUl>
        <li>
          Products returned without prior authorization — please always contact us first before
          sending anything back
        </li>
        <li>
          Damage caused by improper storage after delivery (e.g., heat exposure, moisture)
        </li>
        <li>
          Products opened or partially consumed, unless defective upon opening
        </li>
        <li>
          Incorrect shipping address provided by the customer resulting in a failed delivery
        </li>
        <li>
          Carrier delays outside our control (weather events, holidays, USPS/UPS service
          disruptions)
        </li>
        <li>Requests submitted more than 7 days after delivery</li>
        <li>Change of mind after the order has been shipped</li>
      </ProseUl>

      <ProseContactBox />
    </LegalPageLayout>
  );
}
