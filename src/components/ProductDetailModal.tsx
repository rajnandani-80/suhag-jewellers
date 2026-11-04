import React, { useEffect, useState } from 'react';
import { Check, Heart, MessageCircle, Plus, Ruler, Video, X } from 'lucide-react';
import { JewelleryProduct } from '../types/jewellery';
import {
  buildSingleProductWhatsAppUrl,
  formatINR,
} from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: JewelleryProduct | null;
  isSaved: boolean;
  onClose: () => void;
  onAddToShortlist: (product: JewelleryProduct, selectedOption: string) => void;
  onToggleSave: (productId: string) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isSaved,
  onClose,
  onAddToShortlist,
  onToggleSave,
  onOpenSizeGuide,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedOption(product.options[0] || 'Standard');
      setAddedFeedback(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const whatsappOrderUrl = buildSingleProductWhatsAppUrl(
    product,
    selectedOption,
    false
  );
  const whatsappVideoUrl = buildSingleProductWhatsAppUrl(
    product,
    selectedOption,
    true
  );

  const handleShortlist = () => {
    onAddToShortlist(product, selectedOption);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#171310]/65 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-xl border border-[#DFD5C0] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close jewellery details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#FAF7F2]/90 flex items-center justify-center text-[#5C5044] hover:text-[#1E1915] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E7A32]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: High-Res Jewellery Photograph */}
          <div className="lg:col-span-6 bg-[#F2ECE1] flex items-center justify-center">
            <ResilientImage
              src={product.image}
              alt={product.imageAlt}
              fallbackTitle={product.name}
              className="w-full h-full aspect-[4/3] lg:aspect-auto object-cover"
            />
          </div>

          {/* Right Column: Contiguous WhatsApp Order & Purity Module */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Quiet Unboxed Jewellery Metadata */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#756553] pr-10">
                <span className="font-semibold text-[#8B6928]">{product.metal}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>Code {product.sku}</span>
              </div>

              <h2
                id="pdp-modal-title"
                className="mt-2 font-serif text-3xl font-semibold text-[#1E1915] leading-tight text-balance"
              >
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline justify-between gap-4 pb-4 border-b border-[#E6DEC8]">
                <div>
                  <span className="text-2xl font-semibold text-[#1E1915] tabular-nums">
                    {formatINR(product.price)}
                  </span>
                  <span className="ml-2 text-xs text-[#756553]">
                    (Incl. making · Excl. 3% GST)
                  </span>
                </div>
                <span className="text-xs font-medium text-[#5C5044]">
                  {product.availability}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#4A4036]">
                {product.description}
              </p>

              {/* Size / Fit Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#1E1915]">
                    {product.optionLabel}
                  </label>
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="inline-flex items-center gap-1 text-xs text-[#8B6928] hover:text-[#1E1915] underline underline-offset-4 transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Ruler className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Bangle & Ring Size Chart</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.options.map((option) => {
                    const isActive = selectedOption === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedOption(option)}
                        className={`min-h-[38px] px-3.5 py-1.5 rounded-md text-xs font-medium border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#171310] text-[#F5EFE6] border-[#171310]'
                            : 'bg-[#FFFDF9] text-[#4A4036] border-[#D8CEB8] hover:border-[#9E7A32]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct WhatsApp Ordering Actions (No Payment Gateway) */}
              <div className="mt-6 space-y-2.5">
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] px-5 py-3 rounded-md bg-[#1D4D38] hover:bg-[#163B2B] text-[#FAF7F2] text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4D38]"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Order Directly on WhatsApp</span>
                </a>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleShortlist}
                    className="flex-1 min-h-[42px] px-4 py-2 rounded-md border border-[#D4C7AD] bg-[#FFFDF9] hover:bg-[#F2ECE1] text-[#1E1915] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {addedFeedback ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1D4D38]" aria-hidden="true" />
                        <span>Added to Order List</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Add to Multi-Piece List</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[42px] px-3.5 py-2 rounded-md border border-[#D4C7AD] bg-[#FFFDF9] hover:bg-[#F2ECE1] text-[#4A4036] hover:text-[#1E1915] text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    <Video className="w-3.5 h-3.5 text-[#8B6928]" aria-hidden="true" />
                    <span>Live Video View</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onToggleSave(product.id)}
                    aria-label={isSaved ? 'Remove from saved' : 'Save piece'}
                    className="min-h-[42px] w-11 rounded-md border border-[#D4C7AD] bg-[#FFFDF9] hover:bg-[#F2ECE1] flex items-center justify-center transition-colors duration-150 shrink-0 cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved ? 'fill-[#9E7A32] text-[#9E7A32]' : 'text-[#5C5044]'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Hallmark & Weight Breakdown */}
            <dl className="mt-6 pt-5 border-t border-[#E6DEC8] grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
              <div>
                <dt className="text-[#756553]">Net Metal Weight</dt>
                <dd className="mt-0.5 font-semibold text-[#1E1915] tabular-nums">
                  {product.specifications.netWeight}
                </dd>
              </div>
              <div>
                <dt className="text-[#756553]">Purity & Certification</dt>
                <dd className="mt-0.5 font-semibold text-[#1E1915]">
                  {product.specifications.hallmark}
                </dd>
              </div>
              <div>
                <dt className="text-[#756553]">Gemstone / Detail</dt>
                <dd className="mt-0.5 font-medium text-[#1E1915] tabular-nums">
                  {product.specifications.stoneDetail}
                </dd>
              </div>
              <div>
                <dt className="text-[#756553]">Karigari Technique</dt>
                <dd className="mt-0.5 font-medium text-[#1E1915]">
                  {product.specifications.craftsmanship}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
