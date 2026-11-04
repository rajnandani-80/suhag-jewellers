import React, { useEffect, useState } from 'react';
import { MessageCircle, Minus, Plus, Trash2, X } from 'lucide-react';
import { BagItem } from '../types/jewellery';
import {
  SHOWROOM_PHONE_DISPLAY,
  buildOrderListWhatsAppUrl,
  formatINR,
} from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';

interface BagDrawerProps {
  isOpen: boolean;
  items: BagItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, selectedOption: string, delta: number) => void;
  onRemoveItem: (productId: string, selectedOption: string) => void;
  onClearList: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearList,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerNote, setCustomerNote] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const estimatedTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalNetGrams = items.reduce(
    (sum, item) => sum + item.product.netWeightGrams * item.quantity,
    0
  );

  const whatsappOrderUrl = buildOrderListWhatsAppUrl(
    items,
    customerName,
    customerNote
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="WhatsApp Jewellery Order List"
      className="fixed inset-0 z-50 flex justify-end bg-[#171310]/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full border-l border-[#DFD5C0] flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E6DEC8] bg-[#171310] text-[#F5EFE6] flex items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-medium">
              Your Order Shortlist
            </h2>
            <p className="text-xs text-[#C7B9A5]">
              No online payment required · Direct WhatsApp order
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shortlist drawer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#D6CBBF] hover:text-white hover:bg-[#2A221C] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <p className="font-serif text-2xl text-[#1E1915]">
                Your shortlist is empty
              </p>
              <p className="mt-2 text-sm text-[#6B5E50] max-w-xs leading-relaxed">
                Select pieces from the catalogue to send a combined order or live video viewing request directly on WhatsApp.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 min-h-[42px] px-5 py-2.5 rounded-md bg-[#171310] text-[#F5EFE6] text-xs font-medium hover:bg-[#2B241E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Explore Jewellery Catalogue
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Itemized Jewellery List */}
              <div className="flex items-center justify-between text-xs text-[#756553]">
                <span>{items.length} selected design(s)</span>
                <button
                  type="button"
                  onClick={onClearList}
                  className="underline underline-offset-4 hover:text-[#1E1915] cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              <ul className="divide-y divide-[#E6DEC8]">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.selectedOption}`}
                    className="py-4 first:pt-0 flex gap-4"
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-[#F2ECE1] border border-[#E6DEC8] shrink-0">
                      <ResilientImage
                        src={item.product.image}
                        alt={item.product.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-base font-semibold text-[#1E1915] leading-snug">
                            {item.product.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-[#756553] tabular-nums">
                            {item.product.metal} · {item.product.netWeightGrams.toFixed(1)} g ·{' '}
                            {item.selectedOption}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            onRemoveItem(item.product.id, item.selectedOption)
                          }
                          aria-label={`Remove ${item.product.name}`}
                          className="p-1 text-[#756553] hover:text-[#1E1915] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-[#D8CEB8] rounded-md bg-[#FFFDF9]">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.selectedOption,
                                -1
                              )
                            }
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#4A4036] hover:text-[#1E1915] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-[#1E1915] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.selectedOption,
                                1
                              )
                            }
                            aria-label="Increase quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#4A4036] hover:text-[#1E1915] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#1E1915] tabular-nums">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Optional Personalization Note for WhatsApp Message */}
              <div className="pt-4 border-t border-[#E6DEC8] space-y-3">
                <p className="text-xs font-semibold text-[#1E1915]">
                  Optional Details for Showroom Concierge
                </p>

                <div>
                  <label
                    htmlFor="wa-customer-name"
                    className="block text-xs text-[#6B5E50] mb-1"
                  >
                    Your Name (optional)
                  </label>
                  <input
                    id="wa-customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full min-h-[38px] px-3 py-1.5 rounded-md border border-[#D8CEB8] bg-[#FFFDF9] text-xs text-[#1E1915] placeholder:text-[#9C8F7E] focus:outline-none focus:border-[#9E7A32]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="wa-customer-note"
                    className="block text-xs text-[#6B5E50] mb-1"
                  >
                    City or Custom Size Request (optional)
                  </label>
                  <input
                    id="wa-customer-note"
                    type="text"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="e.g. Jaipur · Need video call before dispatch"
                    className="w-full min-h-[38px] px-3 py-1.5 rounded-md border border-[#D8CEB8] bg-[#FFFDF9] text-xs text-[#1E1915] placeholder:text-[#9C8F7E] focus:outline-none focus:border-[#9E7A32]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer: Direct WhatsApp Redirect */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E6DEC8] bg-[#F4EFE6] space-y-4">
            <div className="space-y-1.5 text-xs tabular-nums">
              <div className="flex justify-between text-[#5C5044]">
                <span>Approx. Net Metal Weight</span>
                <span className="font-medium text-[#1E1915]">
                  {totalNetGrams.toFixed(1)} g
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#1E1915] pt-2 border-t border-[#E2D9C5]">
                <span>Estimated Catalogue Value</span>
                <span>{formatINR(estimatedTotal)}</span>
              </div>
            </div>

            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[46px] px-5 py-3 rounded-md bg-[#1D4D38] hover:bg-[#163B2B] text-[#FAF7F2] text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Place Order on WhatsApp</span>
            </a>

            <p className="text-[11px] text-center text-[#6B5E50]">
              Redirects to Suhag Jewellers WhatsApp ({SHOWROOM_PHONE_DISPLAY}) with your itemized codes & weights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
