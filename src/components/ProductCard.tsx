import React from 'react';
import { Heart, MessageCircle, Plus } from 'lucide-react';
import { JewelleryProduct } from '../types/jewellery';
import {
  buildSingleProductWhatsAppUrl,
  formatINR,
} from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: JewelleryProduct;
  isSaved: boolean;
  onSelectProduct: (product: JewelleryProduct) => void;
  onAddToShortlist: (product: JewelleryProduct) => void;
  onToggleSave: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSaved,
  onSelectProduct,
  onAddToShortlist,
  onToggleSave,
}) => {
  const directWhatsAppUrl = buildSingleProductWhatsAppUrl(product);

  return (
    <article className="group flex flex-col bg-[#FFFDF9] rounded-xl border border-[#E6DEC8] overflow-hidden transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-[#C6A15B] hover:shadow-[0_14px_34px_-14px_rgba(38,28,16,0.18)]">
      {/* Studio Jewellery Photograph (~68-72% card visual weight) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6]">
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          aria-label={`Inspect ${product.name}`}
          className="block w-full h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#9E7A32]"
        >
          <ResilientImage
            src={product.image}
            alt={product.imageAlt}
            fallbackTitle={product.name}
            className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
          />
        </button>

        {/* Wishlist Heart */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(product.id);
          }}
          aria-label={
            isSaved
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#FFFDF9]/90 backdrop-blur-xs flex items-center justify-center text-[#2B231C] hover:bg-[#FFFDF9] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E7A32]"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-150 ${
              isSaved ? 'fill-[#9E7A32] text-[#9E7A32]' : 'text-[#5C5044]'
            }`}
          />
        </button>
      </div>

      {/* Jewellery Details & Direct WhatsApp Order Controls */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Clean Unboxed Metadata: Purity · Net Gold Weight · Category */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#756553] tabular-nums">
            <span className="font-medium text-[#8B6928]">{product.metal}</span>
            <span aria-hidden="true">·</span>
            <span>{product.netWeightGrams.toFixed(1)} g</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          <h3 className="mt-1.5 font-serif text-[21px] font-semibold text-[#1E1915] leading-snug">
            <button
              type="button"
              onClick={() => onSelectProduct(product)}
              className="text-left hover:text-[#8B6928] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6928]"
            >
              {product.name}
            </button>
          </h3>

          <p className="mt-1 text-xs text-[#6B5E50] truncate">
            {product.gemstone ? product.gemstone : product.craftNote}
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-[#EDE6D6]">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-base font-semibold text-[#1E1915] tabular-nums">
              {formatINR(product.price)}
            </span>
            <span className="text-xs text-[#756553]">
              {product.specifications.hallmark.split('+')[0].trim()}
            </span>
          </div>

          {/* Direct WhatsApp Order + Add to Multi-Piece List */}
          <div className="mt-3.5 flex items-center gap-2">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[40px] px-3.5 py-2 rounded-md bg-[#1D4D38] hover:bg-[#163B2B] text-[#FAF7F2] text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4D38]"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Order on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => onAddToShortlist(product)}
              title="Add to multi-piece WhatsApp order list"
              className="min-h-[40px] px-3 py-2 rounded-md border border-[#D8CEB8] bg-[#FAF6EE] hover:bg-[#EFE7D6] text-[#2B231C] text-xs font-medium inline-flex items-center justify-center gap-1 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6928]"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Shortlist</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
