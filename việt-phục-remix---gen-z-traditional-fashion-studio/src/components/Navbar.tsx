import React, { useState, useEffect } from 'react';
import { BookmarkCheck, ArrowRightLeft, Sparkles, ShieldCheck, Menu, X } from 'lucide-react';
import { CulturalCheckResult } from '../types/fashion';

interface NavbarProps {
  onOpenLookbook: () => void;
  onOpenCompare: () => void;
  onOpenSafeguards: () => void;
  onOpenAIStylist: () => void;
  savedLooksCount: number;
  safeguardResult: CulturalCheckResult;
  hasPinnedOptionA: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLookbook,
  onOpenCompare,
  onOpenSafeguards,
  onOpenAIStylist,
  savedLooksCount,
  safeguardResult,
  hasPinnedOptionA
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const getBadgeStyle = () => {
    switch (safeguardResult.overallStatus) {
      case 'phu_hop':
        return 'border-[#244A3A]/30 bg-[#244A3A]/10 text-[#244A3A]';
      case 'can_can_nhac':
        return 'border-[#B6533C]/30 bg-[#B6533C]/10 text-[#B6533C]';
      case 'can_kiem_chung':
      default:
        return 'border-amber-600/30 bg-amber-50 text-amber-900';
    }
  };

  const getBadgeLabel = () => {
    switch (safeguardResult.overallStatus) {
      case 'phu_hop':
        return 'Phù hợp';
      case 'can_can_nhac':
        return 'Cần cân nhắc';
      case 'can_kiem_chung':
      default:
        return 'Cần kiểm chứng';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3EB]/95 backdrop-blur-md border-b border-[#E3DCCF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo Wordmark */}
        <a
          href="/"
          className="text-xl md:text-2xl font-serif font-bold tracking-tight text-[#244A3A] hover:text-[#183327] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] rounded-lg px-1 py-0.5"
        >
          Việt Phục Remix
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#4A4E46]">
          <a
            href="#studio"
            className="hover:text-[#244A3A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] rounded-md px-1 py-0.5"
          >
            Phòng phối đồ
          </a>
          <a
            href="#heritage"
            className="hover:text-[#244A3A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] rounded-md px-1 py-0.5"
          >
            Thông tin trang phục
          </a>
          <a
            href="#harmony"
            className="hover:text-[#244A3A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] rounded-md px-1 py-0.5"
          >
            Màu sắc & thời tiết
          </a>
          <a
            href="#presets"
            className="hover:text-[#244A3A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] rounded-md px-1 py-0.5"
          >
            Bộ sưu tập mẫu
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Safeguard status button */}
          <button
            type="button"
            onClick={onOpenSafeguards}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 shadow-2xs hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${getBadgeStyle()}`}
            title="Xem lưu ý văn hóa"
            aria-label="Xem lưu ý chuẩn mực văn hóa"
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Lưu ý văn hóa: {getBadgeLabel()}</span>
          </button>

          {/* AI Stylist */}
          <button
            type="button"
            onClick={onOpenAIStylist}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-white hover:bg-stone-50 text-[#252822] border border-[#E3DCCF] transition-colors flex items-center gap-1.5 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
            aria-label="Mở gợi ý AI Stylist"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B6533C]" />
            <span>Trợ lý phối đồ</span>
          </button>

          {/* Compare */}
          <button
            type="button"
            onClick={onOpenCompare}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
              hasPinnedOptionA
                ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                : 'bg-white border-[#E3DCCF] hover:bg-stone-50 text-[#252822]'
            }`}
            title="So sánh phương án phối"
            aria-label="Mở bảng so sánh phương án"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#244A3A]" />
            <span>So sánh</span>
            {hasPinnedOptionA && <span className="w-1.5 h-1.5 rounded-full bg-[#B6533C]" />}
          </button>

          {/* Lookbook */}
          <button
            type="button"
            onClick={onOpenLookbook}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#244A3A] hover:bg-[#1A372B] text-white transition-colors flex items-center gap-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
            aria-label="Mở lookbook đã lưu"
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Lưu bộ phối</span>
            {savedLooksCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-[#B6533C] text-white text-[10px] font-bold rounded-full">
                {savedLooksCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Header: Hamburger Button Only (Min 44x44px tap target) */}
        <div className="lg:hidden flex items-center gap-2">
          {savedLooksCount > 0 && (
            <button
              type="button"
              onClick={onOpenLookbook}
              className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl text-[#244A3A] hover:bg-stone-100 flex items-center justify-center relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
              aria-label={`Xem Lookbook (${savedLooksCount} bộ phối)`}
            >
              <BookmarkCheck className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#B6533C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {savedLooksCount}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl text-[#252822] hover:bg-stone-100 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
            aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (No Horizontal Overflow) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E3DCCF] bg-[#F7F3EB] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fadeIn">
          {/* Navigation Links */}
          <div className="space-y-1">
            <a
              href="#studio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-[#252822] hover:bg-[#EFE8DC] transition-colors"
            >
              Phòng phối đồ
            </a>
            <a
              href="#heritage"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-[#252822] hover:bg-[#EFE8DC] transition-colors"
            >
              Thông tin trang phục
            </a>
            <a
              href="#harmony"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-[#252822] hover:bg-[#EFE8DC] transition-colors"
            >
              Màu sắc & thời tiết
            </a>
            <a
              href="#presets"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-[#252822] hover:bg-[#EFE8DC] transition-colors"
            >
              Bộ sưu tập mẫu
            </a>
          </div>

          {/* Action buttons inside drawer with >=44px tap targets */}
          <div className="pt-3 border-t border-[#E3DCCF] grid grid-cols-1 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAIStylist();
              }}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white border border-[#E3DCCF] text-[#252822] text-sm font-semibold flex items-center justify-center gap-2 shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-[#B6533C]" />
              <span>Trợ lý phối đồ</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCompare();
              }}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white border border-[#E3DCCF] text-[#252822] text-sm font-semibold flex items-center justify-center gap-2 shadow-2xs"
            >
              <ArrowRightLeft className="w-4 h-4 text-[#244A3A]" />
              <span>So sánh phương án</span>
              {hasPinnedOptionA && <span className="text-xs text-[#B6533C]">(Đã ghim A)</span>}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLookbook();
              }}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#244A3A] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Lưu & xem Lookbook</span>
              {savedLooksCount > 0 && (
                <span className="px-1.5 py-0.5 bg-[#B6533C] text-white text-xs rounded-full">
                  {savedLooksCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSafeguards();
              }}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${getBadgeStyle()}`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Lưu ý văn hóa: {getBadgeLabel()}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
