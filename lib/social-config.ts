/**
 * Rang Riwaaz Mehandi - Social & Contact Configuration
 * Update your official Instagram URL and WhatsApp contact details here.
 */

export const SOCIAL_CONFIG = {
  // Official Instagram Profile Link (Configurable - replace with your exact handle)
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    'https://www.instagram.com/rangriwaazmehandi',

  // Official WhatsApp Contact Number (India country code +91)
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '91875654982',

  // Pre-filled WhatsApp Inquiry Message
  whatsappDefaultMessage:
    'Hello Rang Riwaaz Mehndi! I visited your website and would like to know more about your mehndi designs, bridal packages, and artist availability.',
};

/**
 * Returns WhatsApp click-to-chat URL with properly encoded message
 */
export function getWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message || SOCIAL_CONFIG.whatsappDefaultMessage);
  return `https://wa.me/${SOCIAL_CONFIG.whatsappNumber}?text=${text}`;
}
