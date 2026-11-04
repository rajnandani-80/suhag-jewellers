import React, { useMemo, useState } from 'react';
import { ArrowRight, MessageCircle, Search, Video } from 'lucide-react';
import {
  BRAND_ASSETS,
  CATALOG_PRODUCTS,
  CATEGORY_SHOWCASE,
} from './data/products';
import {
  BagItem,
  Category,
  JewelleryProduct,
  MetalPurity,
  SortOption,
} from './types/jewellery';
import {
  SHOWROOM_PHONE_DISPLAY,
  buildGeneralConciergeWhatsAppUrl,
} from './utils/whatsapp';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BagDrawer } from './components/BagDrawer';
import { GuideModal, GuideTopic } from './components/GuideModal';
import { ResilientImage } from './components/ResilientImage';

type PurityFilter = 'All Purities' | MetalPurity;

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.All);
  const [selectedPurity, setSelectedPurity] = useState<PurityFilter>('All Purities');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.Featured);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [activeProduct, setActiveProduct] = useState<JewelleryProduct | null>(null);
  const [shortlistItems, setShortlistItems] = useState<BagItem[]>([]);
  const [isShortlistOpen, setIsShortlistOpen] = useState(false);
  const [guideTopic, setGuideTopic] = useState<GuideTopic>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = CATALOG_PRODUCTS.filter((product) => {
      if (selectedCategory !== Category.All && product.category !== selectedCategory) {
        return false;
      }
      if (selectedPurity !== 'All Purities' && product.metal !== selectedPurity) {
        return false;
      }
      if (showSavedOnly && !savedIds.includes(product.id)) {
        return false;
      }
      if (q) {
        const searchable = [
          product.name,
          product.sku,
          product.category,
          product.metal,
          product.gemstone || '',
          product.craftNote,
          product.description,
        ]
          .join(' ')
          .toLowerCase();
        return searchable.includes(q);
      }
      return true;
    });

    if (sortBy === SortOption.PriceAsc) {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === SortOption.PriceDesc) {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    if (sortBy === SortOption.WeightDesc) {
      return [...filtered].sort((a, b) => b.netWeightGrams - a.netWeightGrams);
    }
    return filtered;
  }, [selectedCategory, selectedPurity, searchQuery, sortBy, showSavedOnly, savedIds]);

  const totalShortlistCount = useMemo(
    () => shortlistItems.reduce((sum, item) => sum + item.quantity, 0),
    [shortlistItems]
  );

  const handleAddToShortlist = (
    product: JewelleryProduct,
    selectedOption?: string
  ) => {
    const option = selectedOption || product.options[0] || 'Standard';
    setShortlistItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id && item.selectedOption === option
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, selectedOption: option, quantity: 1 }];
    });
  };

  const handleCardShortlist = (product: JewelleryProduct) => {
    handleAddToShortlist(product);
    setIsShortlistOpen(true);
  };

  const handleUpdateQuantity = (
    productId: string,
    selectedOption: string,
    delta: number
  ) => {
    setShortlistItems((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedOption === selectedOption
          ) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, selectedOption: string) => {
    setShortlistItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId && item.selectedOption === selectedOption
          )
      )
    );
  };

  const handleToggleSave = (productId: string) => {
    setSavedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory(Category.All);
    setSelectedPurity('All Purities');
    setSearchQuery('');
    setSortBy(SortOption.Featured);
    setShowSavedOnly(false);
  };

  const selectCategoryAndScroll = (category: Category) => {
    setSelectedCategory(category);
    setShowSavedOnly(false);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1915]">
      {/* Strict 3-Zone Luxury Top Bar */}
      <Header
        shortlistCount={totalShortlistCount}
        onOpenShortlist={() => setIsShortlistOpen(true)}
        onNavigateCategory={(category) => {
          setSelectedCategory(category);
          setShowSavedOnly(false);
        }}
      />

      <main className="flex-1">
        {/* Section 1: Royal Espresso-Velvet Split Hero + 4-Column Hallmark Strip */}
        <section className="bg-[#171310] text-[#F5EFE6] border-b border-[#332920]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: High-Jewellery Editorial Copy */}
              <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#D4AF6A]">
                  <span>Heritage & Fine Jewellery House</span>
                  <span aria-hidden="true">·</span>
                  <span>BIS 916 & 750 Hallmarked</span>
                </div>

                <h1 className="mt-4 font-serif text-[clamp(2.4rem,4.1vw,3.8rem)] font-medium leading-[1.08] tracking-tight text-[#FAF6EE] text-balance max-w-xl">
                  Heirloom artistry in 22K gold, polki, and certificated solitaires.
                </h1>

                <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-[#CFC3B4] max-w-lg">
                  Explore our hallmarked bridal chokers, temple jhumkas, carved kadas, and GIA diamond rings. Shortlist your favourites online and order directly with our showroom concierge on WhatsApp.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#catalog"
                    className="min-h-[46px] px-6 py-3 rounded-md bg-[#D4AF6A] hover:bg-[#E2C182] text-[#171310] text-sm font-semibold inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    <span>Explore Catalogue</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>

                  <a
                    href={buildGeneralConciergeWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[46px] px-5 py-3 rounded-md border border-[#4D3E2E] bg-[#221C17] hover:border-[#D4AF6A] text-[#F5EFE6] text-sm font-medium inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 text-[#63C393]" aria-hidden="true" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Opulent Velvet Bust Jewellery Photograph */}
              <div className="lg:col-span-6">
                <div className="h-full rounded-xl overflow-hidden border border-[#3B2F22] bg-[#221C17]">
                  <ResilientImage
                    src={BRAND_ASSETS.heroImage}
                    alt={BRAND_ASSETS.heroAlt}
                    fallbackTitle="22K Bridal Emerald & Polki Set"
                    className="w-full aspect-[4/3] lg:aspect-auto lg:h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Jewellery Trust & Purity Strip Below Hero Split */}
            <div className="mt-10 pt-8 border-t border-[#2E251D] grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              <div>
                <p className="font-serif text-lg font-medium text-[#E5C687] tabular-nums">
                  BIS 916 & 750 HUID
                </p>
                <p className="mt-1 text-[#BBAE9E]">
                  6-digit laser hallmark verified on every gold piece
                </p>
              </div>
              <div>
                <p className="font-serif text-lg font-medium text-[#E5C687]">
                  Net Gold Billing
                </p>
                <p className="mt-1 text-[#BBAE9E]">
                  Stone & pearl weight transparently deducted
                </p>
              </div>
              <div>
                <p className="font-serif text-lg font-medium text-[#E5C687]">
                  Direct WhatsApp Order
                </p>
                <p className="mt-1 text-[#BBAE9E]">
                  No complex checkout — instant concierge confirmation
                </p>
              </div>
              <div>
                <p className="font-serif text-lg font-medium text-[#E5C687] tabular-nums">
                  100% Lifetime Exchange
                </p>
                <p className="mt-1 text-[#BBAE9E]">
                  Full prevailing gold & GIA solitaire exchange value
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Curated Category Cards + Interactive Online Jewellery Catalogue */}
        <section
          id="catalog"
          aria-labelledby="catalog-heading"
          className="py-14 lg:py-20"
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            {/* Visual Shop-by-Category Showcase */}
            <div className="mb-14">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-medium text-[#8B6928]">
                    Curated Departments
                  </p>
                  <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#1E1915]">
                    Browse by Jewellery Category
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setGuideTopic('sizing')}
                  className="text-xs font-medium text-[#6B5E50] hover:text-[#8B6928] underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
                >
                  Bangle & Ring Size Chart
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {CATEGORY_SHOWCASE.map((tile) => {
                  const isSelected = selectedCategory === tile.category;
                  return (
                    <button
                      key={tile.category}
                      type="button"
                      onClick={() => selectCategoryAndScroll(tile.category)}
                      className={`group text-left rounded-xl overflow-hidden border transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'border-[#8B6928] bg-[#FFFDF9] shadow-md'
                          : 'border-[#E6DEC8] bg-[#FFFDF9] hover:border-[#C6A15B]'
                      }`}
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#F2ECE1]">
                        <ResilientImage
                          src={tile.image}
                          alt={tile.category}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3.5 sm:p-4">
                        <h3 className="font-serif text-lg font-semibold text-[#1E1915] group-hover:text-[#8B6928] transition-colors">
                          {tile.category}
                        </h3>
                        <p className="mt-0.5 text-xs text-[#756553] line-clamp-1">
                          {tile.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Catalogue Heading & Count */}
            <div className="pt-8 border-t border-[#E6DEC8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2
                  id="catalog-heading"
                  className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E1915] text-balance"
                >
                  Online Jewellery Catalogue
                </h2>
                <p className="mt-1.5 text-sm text-[#6B5E50]">
                  Click “Order on WhatsApp” on any piece for instant showroom booking, or shortlist multiple designs together.
                </p>
              </div>

              <p className="text-xs text-[#756553] tabular-nums">
                Showing {filteredProducts.length} of {CATALOG_PRODUCTS.length} hallmarked designs
              </p>
            </div>

            {/* Interactive Filter, Purity & Search Toolbar */}
            <div className="mt-7 pb-6 border-b border-[#E6DEC8] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Segmented Category Filter */}
              <div
                role="group"
                aria-label="Filter jewellery by category"
                className="flex items-center gap-1 p-1 bg-[#EFE8DA] rounded-lg overflow-x-auto"
              >
                {Object.values(Category).map((category) => {
                  const isActive = selectedCategory === category && !showSavedOnly;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowSavedOnly(false);
                      }}
                      className={`min-h-[36px] px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#171310] text-[#F5EFE6]'
                          : 'text-[#5C5044] hover:text-[#1E1915]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setShowSavedOnly((prev) => !prev)}
                  className={`min-h-[36px] px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 tabular-nums cursor-pointer ${
                    showSavedOnly
                      ? 'bg-[#171310] text-[#F5EFE6]'
                      : 'text-[#5C5044] hover:text-[#1E1915]'
                  }`}
                >
                  Wishlist ({savedIds.length})
                </button>
              </div>

              {/* Search, Purity Select & Sort */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                <div className="relative flex-1 sm:w-52">
                  <Search
                    className="w-4 h-4 text-[#8A7B69] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search choker, jhumka, kada..."
                    aria-label="Search jewellery designs"
                    className="w-full min-h-[38px] pl-9 pr-3 py-1.5 rounded-md border border-[#D8CEB8] bg-[#FFFDF9] text-xs text-[#1E1915] placeholder:text-[#9C8F7E] focus:outline-none focus:border-[#9E7A32]"
                  />
                </div>

                <select
                  value={selectedPurity}
                  onChange={(e) => setSelectedPurity(e.target.value as PurityFilter)}
                  aria-label="Filter by gold purity"
                  className="min-h-[38px] px-3 py-1.5 rounded-md border border-[#D8CEB8] bg-[#FFFDF9] text-xs font-medium text-[#1E1915] focus:outline-none focus:border-[#9E7A32] cursor-pointer"
                >
                  <option value="All Purities">All Purities</option>
                  <option value="22K (916) Gold">22K (916) Gold</option>
                  <option value="18K (750) Gold">18K (750) Gold</option>
                  <option value="18K Rose Gold">18K Rose Gold</option>
                  <option value="Platinum & Silver">Platinum & Silver</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  aria-label="Sort jewellery catalogue"
                  className="min-h-[38px] px-3 py-1.5 rounded-md border border-[#D8CEB8] bg-[#FFFDF9] text-xs font-medium text-[#1E1915] focus:outline-none focus:border-[#9E7A32] cursor-pointer"
                >
                  <option value={SortOption.Featured}>Sort: Showroom Featured</option>
                  <option value={SortOption.PriceAsc}>Price: Low to High</option>
                  <option value={SortOption.PriceDesc}>Price: High to Low</option>
                  <option value={SortOption.WeightDesc}>Gold Weight: High to Low</option>
                </select>
              </div>
            </div>

            {/* 3-Column Jewellery Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSaved={savedIds.includes(product.id)}
                    onSelectProduct={setActiveProduct}
                    onAddToShortlist={handleCardShortlist}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-12 py-16 px-6 rounded-xl bg-[#F2ECE1] border border-[#E6DEC8] text-center">
                <p className="font-serif text-2xl text-[#1E1915]">
                  No jewellery designs match your filter
                </p>
                <p className="mt-2 text-sm text-[#6B5E50] max-w-md mx-auto">
                  Reset filters to view all 22K gold bridal sets, jhumkas, kadas, and certified diamond solitaires.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-6 min-h-[40px] px-5 py-2 rounded-md bg-[#171310] text-[#F5EFE6] text-xs font-medium hover:bg-[#2B241E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Show All Jewellery
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Bespoke Bridal Orders & WhatsApp Video Showroom */}
        <section
          id="bespoke"
          aria-labelledby="bespoke-heading"
          className="border-t border-[#E6DEC8] bg-[#F2ECE1] py-16 lg:py-24"
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6">
                <div className="rounded-xl overflow-hidden border border-[#DFD5C0] bg-[#E8E0D0]">
                  <ResilientImage
                    src={BRAND_ASSETS.atelierImage}
                    alt={BRAND_ASSETS.atelierAlt}
                    fallbackTitle="Suhag Jewellers Karigari Bench"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 text-xs text-[#8B6928]">
                  <span>Personalised Jewellery Concierge</span>
                  <span aria-hidden="true">·</span>
                  <span>Zero Online Payment Hassle</span>
                </div>

                <h2
                  id="bespoke-heading"
                  className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-[#1E1915] leading-tight text-balance"
                >
                  Inspect live on video call & confirm your order on WhatsApp.
                </h2>

                <div className="mt-7 space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1E1915]">
                      01. Select Your Favourite Designs Online
                    </h3>
                    <p className="mt-1 text-sm text-[#52463A] leading-relaxed">
                      Click “Order on WhatsApp” on any single piece or add multiple designs to your Order List to send all SKU codes and sizes in one message.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2D9C5]">
                    <h3 className="text-sm font-semibold text-[#1E1915]">
                      02. Live Weighing & Hallmark Verification
                    </h3>
                    <p className="mt-1 text-sm text-[#52463A] leading-relaxed">
                      Our showroom gemologist shares live precision scale weight, BIS HUID stamp close-ups, and drape previews over WhatsApp video before finalizing.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2D9C5]">
                    <h3 className="text-sm font-semibold text-[#1E1915]">
                      03. Custom Bridal Sizing & Insured Doorstep Delivery
                    </h3>
                    <p className="mt-1 text-sm text-[#52463A] leading-relaxed">
                      Need custom bangle sizing, matching tikka-nath additions, or showroom pickup? Everything is arranged directly with your dedicated jeweller.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={buildGeneralConciergeWhatsAppUrl(
                      'booking a live WhatsApp video showcase or custom bridal order'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-5 py-2.5 rounded-md bg-[#1D4D38] hover:bg-[#163B2B] text-[#FAF7F2] text-xs font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Video className="w-4 h-4" aria-hidden="true" />
                    <span>Book WhatsApp Video Showcase</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setGuideTopic('assay')}
                    className="text-xs font-medium text-[#5C5044] hover:text-[#1E1915] underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0 py-2"
                  >
                    Read BIS Hallmark Guarantee
                  </button>
                </div>

                {/* Attributable Collector Testimonial Adjacent to Proof */}
                <figure className="mt-8 pt-6 border-t border-[#DCD1BA]">
                  <blockquote className="font-serif italic text-lg text-[#1E1915] leading-snug">
                    “Shortlisted the Rajwada Choker and Mayuri Jhumkas from the catalogue, saw the exact 70-gram scale reading and 916 HUID stamp live on WhatsApp video with my mother, and received insured delivery in Udaipur within three days.”
                  </blockquote>
                  <figcaption className="mt-2 text-xs text-[#6B5E50]">
                    Ananya Rathore · Bridal Collector, Udaipur · Verified Showroom Order
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Section 4: Rich Showroom Footer */}
      <footer className="bg-[#171310] text-[#D6CBBF] border-t border-[#332920] py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#2E251D]">
            <div className="md:col-span-2">
              <span className="font-serif text-2xl font-medium text-[#F5EFE6]">
                Suhag Jewellers
              </span>
              <p className="mt-2.5 text-xs text-[#BBAE9E] max-w-sm leading-relaxed">
                Fine 22K jadau-polki bridal sets, temple gold karigari, and GIA certified solitaire jewellery. Browse our live catalogue and place orders directly via WhatsApp concierge.
              </p>
              <p className="mt-3 text-xs text-[#E5C687] tabular-nums">
                Suhag Jewellers Showroom · Order & Inquiry on WhatsApp: {SHOWROOM_PHONE_DISPLAY}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-[#F5EFE6]">
                Jewellery Departments
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-[#BBAE9E]">
                {[
                  Category.Necklaces,
                  Category.Earrings,
                  Category.Bangles,
                  Category.Rings,
                ].map((cat) => (
                  <li key={cat}>
                    <a
                      href="#catalog"
                      onClick={(e) => {
                        e.preventDefault();
                        selectCategoryAndScroll(cat);
                      }}
                      className="hover:text-[#E5C687] transition-colors"
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-[#F5EFE6]">
                Buyer Assistance
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-[#BBAE9E]">
                <li>
                  <button
                    type="button"
                    onClick={() => setGuideTopic('sizing')}
                    className="hover:text-[#E5C687] transition-colors cursor-pointer"
                  >
                    Indian Bangle & Ring Size Chart
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setGuideTopic('assay')}
                    className="hover:text-[#E5C687] transition-colors cursor-pointer"
                  >
                    BIS 916 & HUID Purity Verification
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setGuideTopic('care')}
                    className="hover:text-[#E5C687] transition-colors cursor-pointer"
                  >
                    Polki, Gold & Pearl Care Guide
                  </button>
                </li>
                <li>
                  <a
                    href={buildGeneralConciergeWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E5C687] hover:underline"
                  >
                    Direct WhatsApp Showroom Desk
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E9182]">
            <p>© {new Date().getFullYear()} Suhag Jewellers. All rights reserved.</p>
            <p>BIS 916 & 750 Hallmarked Gold · Certified Natural Diamonds & Uncut Polki</p>
          </div>
        </div>
      </footer>

      {/* Jewellery Product Detail Modal */}
      <ProductDetailModal
        product={activeProduct}
        isSaved={activeProduct ? savedIds.includes(activeProduct.id) : false}
        onClose={() => setActiveProduct(null)}
        onAddToShortlist={handleAddToShortlist}
        onToggleSave={handleToggleSave}
        onOpenSizeGuide={() => setGuideTopic('sizing')}
      />

      {/* Multi-Piece WhatsApp Shortlist Drawer */}
      <BagDrawer
        isOpen={isShortlistOpen}
        items={shortlistItems}
        onClose={() => setIsShortlistOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearList={() => setShortlistItems([])}
      />

      {/* Bangle/Ring Sizing & Hallmark Modal */}
      <GuideModal
        topic={guideTopic}
        onClose={() => setGuideTopic(null)}
        onSwitchTopic={(topic) => setGuideTopic(topic)}
      />
    </div>
  );
}
