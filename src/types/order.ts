export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus =
  | 'UNPAID'
  | 'PAID'
  | 'PARTIALLY_REFUNDED'
  | 'REFUNDED'
  | 'FAILED';

export type FulfillStatus =
  | 'UNFULFILLED'
  | 'PARTIALLY_FULFILLED'
  | 'FULFILLED';

export interface OrderItemDetail {
  id:          string;
  productId:   string | null;
  productName: string;
  productSku:  string | null;
  unitPrice:   string;
  quantity:    number;
  subtotal:    string;
  product: {
    slug:   string;
    images: { url: string }[];
  } | null;
}

export interface OrderStatusHistoryEntry {
  id:        string;
  status:    OrderStatus;
  note:      string | null;
  createdBy: string | null;
  createdAt: string;
}

export interface OrderDetail {
  id:                   string;
  orderNumber:          string;
  email:                string;
  phone:                string;
  status:               OrderStatus;
  paymentStatus:        PaymentStatus;
  fulfillmentStatus:    FulfillStatus;
  subtotal:             string;
  shippingCost:         string;
  tax:                  string;
  discount:             string;
  total:                string;
  shipFirstName:        string;
  shipLastName:         string;
  shipStreet1:          string;
  shipStreet2:          string | null;
  shipCity:             string;
  shipState:            string;
  shipZip:              string;
  shipCountry:          string;
  shippingCarrier:      string | null;
  shippingService:      string | null;
  trackingNumber:       string | null;
  trackingUrl:          string | null;
  paidAt:               string | null;
  shippedAt:            string | null;
  estimatedDelivery:    string | null;
  customerNote:         string | null;
  createdAt:            string;
  items:                OrderItemDetail[];
  statusHistory:        OrderStatusHistoryEntry[];
}

// Lighter shape returned by GET /api/orders/my
export interface OrderSummary {
  id:                string;
  orderNumber:       string;
  status:            OrderStatus;
  paymentStatus:     PaymentStatus;
  fulfillmentStatus: FulfillStatus;
  total:             string;
  createdAt:         string;
  shippingCarrier:   string | null;
  shippingService:   string | null;
  trackingNumber:    string | null;
  _count:            { items: number };
}
