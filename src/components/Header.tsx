import React from 'react';
import { Category } from '../types/jewellery';

interface HeaderProps {
  shortlistCount: number;
  onOpenShortlist: () => void;
  onNavigateCategory: (category: Category) => void;
}

export const Header: React.FC<HeaderProps> = ({
  shortlistCount,
  onOpenShortlist,
  onNavigateCategory,
}) => {
  const handleCategoryNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    category: Category
  ) => {
    e.preventDefault();
    onNavigateCategory(category);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#171310]/95 backdrop-blur-md border-b border-[#332920]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-serif text-2xl font-medium tracking-wide text-[#F5EFE6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B]"
        >
          Suhag Jewellers
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#D6CBBF]"
        >
          <a
            href="#catalog"
            onClick={(e) => handleCategoryNav(e, Category.All)}
            className="hover:text-[#E5C687] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
          >
            Catalogue
          </a>
          <a
            href="#catalog"
            onClick={(e) => handleCategoryNav(e, Category.Necklaces)}
            className="hover:text-[#E5C687] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
          >
            Necklaces
          </a>
          <a
            href="#catalog"
            onClick={(e) => handleCategoryNav(e, Category.Earrings)}
            className="hover:text-[#E5C687] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
          >
            Jhumkas
          </a>
          <a
            href="#catalog"
            onClick={(e) => handleCategoryNav(e, Category.Bangles)}
            className="hover:text-[#E5C687] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
          >
            Bangles
          </a>
          <a
            href="#bespoke"
            className="hover:text-[#E5C687] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
          >
            Bespoke
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenShortlist}
            className="min-h-[40px] px-4 py-2 text-xs font-semibold text-[#171310] bg-[#D4AF6A] hover:bg-[#E2C182] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 tabular-nums cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2C182]"
          >
            Order List ({shortlistCount})
          </button>
        </div>
      </div>
    </header>
  );
};
