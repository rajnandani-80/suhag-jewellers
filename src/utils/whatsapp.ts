import { BagItem, JewelleryProduct } from '../types/jewellery';

// Suhag Jewellers WhatsApp number (India +91 8295889297)
export const SHOWROOM_WHATSAPP_NUMBER = '918295889297';
export const SHOWROOM_PHONE_DISPLAY = '+91 82958 89297';

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function buildSingleProductWhatsAppUrl(
  product: JewelleryProduct,
  selectedOption?: string,
  videoCallInquiry = false
): string {
  const chosenOption = selectedOption || product.options[0] || 'Standard Fit';
  const intentLine = videoCallInquiry
    ? 'I would like to schedule a quick WhatsApp video view for this piece:'
    : 'I would like to place an order for this jewellery piece:';

  const lines = [
    'Hello Suhag Jewellers,',
    intentLine,
    '',
    `• Piece: ${product.name}`,
    `• Design Code: ${product.sku}`,
    `• Purity: ${product.metal} (${product.specifications.hallmark})`,
    `• Net Weight: ${product.specifications.netWeight}`,
    `• Selected Size / Fit: ${chosenOption}`,
    `• Catalogue Price: ${formatINR(product.price)}`,
    '',
    'Please share availability and ordering confirmation details.',
  ];

  return `https://wa.me/${SHOWROOM_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join('\n')
  )}`;
}

export function buildOrderListWhatsAppUrl(
  items: BagItem[],
  customerName?: string,
  customerNote?: string
): string {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalGrams = items.reduce(
    (sum, item) => sum + item.product.netWeightGrams * item.quantity,
    0
  );

  const itemLines = items.map(
    (item, idx) =>
      `${idx + 1}. ${item.product.name} (${item.product.sku})\n   Purity: ${
        item.product.metal
      } · Wt: ${item.product.specifications.netWeight} · Fit: ${
        item.selectedOption
      } · Qty: ${item.quantity} — ${formatINR(
        item.product.price * item.quantity
      )}`
  );

  const lines = [
    'Hello Suhag Jewellers,',
    'I would like to place an order for the following selected jewellery pieces:',
    '',
    ...itemLines,
    '',
    `• Total Approx. Metal Weight: ${totalGrams.toFixed(1)} g`,
    `• Estimated Order Value: ${formatINR(totalAmount)}`,
  ];

  if (customerName?.trim()) {
    lines.push(`• Name: ${customerName.trim()}`);
  }
  if (customerNote?.trim()) {
    lines.push(`• Delivery City / Note: ${customerNote.trim()}`);
  }

  lines.push('', 'Please confirm current availability and dispatch details.');

  return `https://wa.me/${SHOWROOM_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join('\n')
  )}`;
}

export function buildGeneralConciergeWhatsAppUrl(topic?: string): string {
  const message = topic
    ? `Hello Suhag Jewellers, I would like to inquire about ${topic}.`
    : 'Hello Suhag Jewellers, I was browsing your online jewellery catalogue and would like assistance selecting a piece.';
  return `https://wa.me/${SHOWROOM_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}
