import React, { useState, useEffect } from 'react';
import { OutfitLook } from '../types/fashion';
import {
  TRADITIONAL_GARMENTS,
  EVENTS,
  COLOR_PALETTE,
  TRADITIONAL_ACCESSORY_NAMES,
  MODERN_ACCESSORY_NAMES,
  PANTS_STYLE_NAMES
} from '../data/garments';
import { X, ArrowRightLeft, Check, Pin } from 'lucide-react';
import { MannequinViewer } from './MannequinViewer';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLook: OutfitLook;
  pinnedLookA: OutfitLook | null;
  onPinAsLookA: (look: OutfitLook) => void;
  savedLooks: OutfitLook[];
  onApplyLook: (look: OutfitLook) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  currentLook,
  pinnedLookA,
  onPinAsLookA,
  savedLooks,
  onApplyLook
}) => {
  const [selectedAId, setSelectedAId] = useState<string>(
    pinnedLookA ? 'pinned' : savedLooks[0]?.id || 'current'
  );
  const [selectedBId, setSelectedBId] = useState<string>('current');

  // Support closing modal with Escape key
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

  // Resolve look A
  let lookA: OutfitLook;
  if (selectedAId === 'pinned' && pinnedLookA) {
    lookA = pinnedLookA;
  } else if (selectedAId === 'current') {
    lookA = currentLook;
  } else {
    lookA = savedLooks.find(l => l.id === selectedAId) || pinnedLookA || currentLook;
  }

  // Resolve look B
  let lookB: OutfitLook;
  if (selectedBId === 'current') {
    lookB = currentLook;
  } else if (selectedBId === 'pinned' && pinnedLookA) {
    lookB = pinnedLookA;
  } else {
    lookB = savedLooks.find(l => l.id === selectedBId) || currentLook;
  }

  const garmentA = TRADITIONAL_GARMENTS.find(g => g.id === lookA.garmentType);
  const garmentB = TRADITIONAL_GARMENTS.find(g => g.id === lookB.garmentType);
  const eventA = EVENTS.find(e => e.id === lookA.event);
  const eventB = EVENTS.find(e => e.id === lookB.event);

  const formatTraditionalAccessories = (list: typeof lookA.traditionalAccessories) => {
    if (!list || list.length === 0) return 'Tối giản (không dùng)';
    return list.map(a => TRADITIONAL_ACCESSORY_NAMES[a] || a).join(', ');
  };

  const formatModernAccessories = (list: typeof lookA.modernAccessories) => {
    if (!list || list.length === 0) return 'Tối giản (không dùng)';
    return list.map(a => MODERN_ACCESSORY_NAMES[a] || a).join(', ');
  };

  const getColorName = (hex: string) => {
    return COLOR_PALETTE.find(c => c.hex.toLowerCase() === hex.toLowerCase())?.name || hex;
  };

  // Compare field differences
  const diffs = {
    garment: lookA.garmentType !== lookB.garmentType,
    primaryColor: lookA.primaryColor.toLowerCase() !== lookB.primaryColor.toLowerCase(),
    secondaryColor: lookA.secondaryColor.toLowerCase() !== lookB.secondaryColor.toLowerCase(),
    pantsStyle: lookA.pantsStyle !== lookB.pantsStyle,
    pantsColor: lookA.pantsColor.toLowerCase() !== lookB.pantsColor.toLowerCase(),
    traditional: JSON.stringify([...lookA.traditionalAccessories].sort()) !== JSON.stringify([...lookB.traditionalAccessories].sort()),
    modern: JSON.stringify([...lookA.modernAccessories].sort()) !== JSON.stringify([...lookB.modernAccessories].sort()),
    event: lookA.event !== lookB.event
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] shadow-2xl border border-[#E3DCCF] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E3DCCF] flex items-center justify-between bg-[#F7F3EB]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#244A3A] text-white flex items-center justify-center shadow-xs">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#252822]">
                So sánh phương án phối
              </h2>
              <p className="text-xs text-[#555A50] font-sans">
                Ghim một phương án làm mốc và tiếp tục thử nghiệm phương án thứ hai
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPinAsLookA(currentLook)}
              className="hidden sm:flex min-h-[40px] px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold items-center gap-1.5 transition-colors"
              title="Ghim cấu hình đang phối làm phương án A"
            >
              <Pin className="w-3.5 h-3.5 text-amber-700" />
              <span>Ghim bộ hiện tại làm phương án A</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] rounded-xl text-[#555A50] hover:text-[#252822] hover:bg-stone-200/60 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
              aria-label="Đóng bảng so sánh"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top: 2 Visual Mannequins Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Option A Box */}
            <div className="border border-[#E3DCCF] rounded-2xl p-4 bg-[#F7F3EB] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E3DCCF]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                      Phương án A
                    </span>
                    {pinnedLookA && selectedAId === 'pinned' && (
                      <span className="text-[11px] text-amber-800 font-medium flex items-center gap-1">
                        <Pin className="w-3 h-3" /> Đã ghim
                      </span>
                    )}
                  </div>

                  <select
                    value={selectedAId}
                    onChange={e => setSelectedAId(e.target.value)}
                    className="min-h-[40px] text-xs border border-[#E3DCCF] rounded-xl px-2.5 py-1.5 bg-white text-[#252822] focus:outline-none focus:ring-2 focus:ring-[#244A3A]"
                  >
                    {pinnedLookA && <option value="pinned">Bộ đã ghim: {pinnedLookA.title}</option>}
                    <option value="current">Bộ đang chỉnh</option>
                    {savedLooks.map(l => (
                      <option key={l.id} value={l.id}>
                        Lookbook: {l.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="h-[320px] sm:h-[350px] w-full mb-3 rounded-xl overflow-hidden border border-[#E3DCCF] shadow-2xs">
                  <MannequinViewer
                    gender={lookA.gender}
                    garmentType={lookA.garmentType}
                    primaryColor={lookA.primaryColor}
                    secondaryColor={lookA.secondaryColor}
                    pantsColor={lookA.pantsColor}
                    pantsStyle={lookA.pantsStyle}
                    traditionalAccessories={lookA.traditionalAccessories}
                    modernAccessories={lookA.modernAccessories}
                    backgroundScene={lookA.backgroundScene || 'studio'}
                    showAnatomy={false}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onApplyLook(lookA);
                  onClose();
                }}
                className="w-full min-h-[44px] py-2.5 bg-[#244A3A] hover:bg-[#1A372B] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5 text-amber-300" />
                <span>Sử dụng phương án A</span>
              </button>
            </div>

            {/* Option B Box */}
            <div className="border border-[#E3DCCF] rounded-2xl p-4 bg-[#F7F3EB] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E3DCCF]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#244A3A] bg-[#244A3A]/10 px-2.5 py-0.5 rounded-full border border-[#244A3A]/20">
                    Phương án B
                  </span>

                  <select
                    value={selectedBId}
                    onChange={e => setSelectedBId(e.target.value)}
                    className="min-h-[40px] text-xs border border-[#E3DCCF] rounded-xl px-2.5 py-1.5 bg-white text-[#252822] focus:outline-none focus:ring-2 focus:ring-[#244A3A]"
                  >
                    <option value="current">Bộ đang chỉnh</option>
                    {pinnedLookA && <option value="pinned">Bộ đã ghim: {pinnedLookA.title}</option>}
                    {savedLooks.map(l => (
                      <option key={l.id} value={l.id}>
                        Lookbook: {l.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="h-[320px] sm:h-[350px] w-full mb-3 rounded-xl overflow-hidden border border-[#E3DCCF] shadow-2xs">
                  <MannequinViewer
                    gender={lookB.gender}
                    garmentType={lookB.garmentType}
                    primaryColor={lookB.primaryColor}
                    secondaryColor={lookB.secondaryColor}
                    pantsColor={lookB.pantsColor}
                    pantsStyle={lookB.pantsStyle}
                    traditionalAccessories={lookB.traditionalAccessories}
                    modernAccessories={lookB.modernAccessories}
                    backgroundScene={lookB.backgroundScene || 'studio'}
                    showAnatomy={false}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onApplyLook(lookB);
                  onClose();
                }}
                className="w-full min-h-[44px] py-2.5 bg-[#244A3A] hover:bg-[#1A372B] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5 text-amber-300" />
                <span>Sử dụng phương án B</span>
              </button>
            </div>
          </div>

          {/* Detailed Differences Table with Vietnamese Names */}
          <div className="border border-[#E3DCCF] rounded-2xl overflow-hidden bg-white shadow-2xs">
            <div className="p-3.5 bg-[#F7F3EB] border-b border-[#E3DCCF] font-semibold text-xs sm:text-sm text-[#252822] flex items-center justify-between">
              <span>Bảng đối chiếu điểm khác biệt</span>
              <span className="text-xs text-[#555A50] font-normal">
                Dấu <span className="text-[#B6533C] font-bold">•</span> là mục có khác biệt
              </span>
            </div>

            <div className="divide-y divide-[#E3DCCF]/60 text-xs sm:text-sm text-[#4A4E46]">
              {/* Garment */}
              <div className={`grid grid-cols-12 p-3 ${diffs.garment ? 'bg-amber-50/50' : ''}`}>
                <div className="col-span-4 sm:col-span-3 font-semibold text-[#252822] flex items-center gap-1.5">
                  {diffs.garment && <span className="text-[#B6533C] font-bold text-base">•</span>}
                  <span>Dáng áo</span>
                </div>
                <div className="col-span-4 font-medium text-[#252822]">{garmentA?.name}</div>
                <div className="col-span-4 font-medium text-[#252822]">{garmentB?.name}</div>
              </div>

              {/* Primary Color */}
              <div className={`grid grid-cols-12 p-3 ${diffs.primaryColor ? 'bg-amber-50/50' : ''}`}>
                <div className="col-span-4 sm:col-span-3 font-semibold text-[#252822] flex items-center gap-1.5">
                  {diffs.primaryColor && <span className="text-[#B6533C] font-bold text-base">•</span>}
                  <span>Màu thân áo</span>
                </div>
                <div className="col-span-4 flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: lookA.primaryColor }} />
                  <span>{getColorName(lookA.primaryColor)}</span>
                </div>
                <div className="col-span-4 flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: lookB.primaryColor }} />
                  <span>{getColorName(lookB.primaryColor)}</span>
                </div>
              </div>

              {/* Secondary Color */}
              <div className={`grid grid-cols-12 p-3 ${diffs.secondaryColor ? 'bg-amber-50/50' : ''}`}>
                <div className="col-span-4 sm:col-span-3 font-semibold text-[#252822] flex items-center gap-1.5">
                  {diffs.secondaryColor && <span className="text-[#B6533C] font-bold text-base">•</span>}
                  <span>Màu điểm nhấn</span>
                </div>
                <div className="col-span-4 flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: lookA.secondaryColor }} />
                  <span>{getColorName(lookA.secondaryColor)}</span>
                </div>
                <div className="col-span-4 flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: lookB.secondaryColor }} />
                  <span>{getColorName(lookB.secondaryColor)}</span>
                </div>
              </div>

              {/* Pants */}
              <div className={`grid grid-cols-12 p-3 ${diffs.pantsStyle || diffs.pantsColor ? 'bg-amber-50/50' : ''}`}>
                <div className="col-span-4 sm:col-span-3 font-semibold text-[#252822] flex items-center gap-1.5">
                  {(diffs.pantsStyle || diffs.pantsColor) && <span className="text-[#B6533C] font-bold text-base">•</span>}
                  <span>Quần phối</span>
                </div>
                <div className="col-span-4">{PANTS_STYLE_NAMES[lookA.pantsStyle] || lookA.pantsStyle} ({getColorName(lookA.pantsColor)})</div>
                <div className="col-span-4">{PANTS_STYLE_NAMES[lookB.pantsStyle] || lookB.pantsStyle} ({getColorName(lookB.pantsColor)})</div>
              </div>

              {/* Traditional */}
              <div className={`grid grid-cols-12 p-3 ${diffs.traditional ? 'bg-amber-50/50' : ''}`}>
                <div className="col-span-4 sm:col-span-3 font-semibold text-[#252822] flex items-center gap-1.5">
                  {diffs.traditional && <span className="text-[#B6533C] font-bold text-base">•</span>}
                  <span>Phụ kiện truyền thống</span>
                </div>
                <div className="col-span-4">{formatTraditionalAccessories(lookA.traditionalAccessories)}</div>
                <div className="col-span-4">{formatTraditionalAccessories(lookB.traditionalAccessories)}</div>
              </div>

              {/* Modern */}
              <div className={`grid grid-cols-12 p-3 ${diffs.modern ? 'bg-amber-50/50' : ''}`}>
                <div className="col-span-4 sm:col-span-3 font-semibold text-[#252822] flex items-center gap-1.5">
                  {diffs.modern && <span className="text-[#B6533C] font-bold text-base">•</span>}
                  <span>Phụ kiện hiện đại</span>
                </div>
                <div className="col-span-4">{formatModernAccessories(lookA.modernAccessories)}</div>
                <div className="col-span-4">{formatModernAccessories(lookB.modernAccessories)}</div>
              </div>

              {/* Event */}
              <div className={`grid grid-cols-12 p-3 ${diffs.event ? 'bg-amber-50/50' : ''}`}>
                <div className="col-span-4 sm:col-span-3 font-semibold text-[#252822] flex items-center gap-1.5">
                  {diffs.event && <span className="text-[#B6533C] font-bold text-base">•</span>}
                  <span>Sự kiện</span>
                </div>
                <div className="col-span-4 font-medium text-[#252822]">{eventA?.name}</div>
                <div className="col-span-4 font-medium text-[#252822]">{eventB?.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
