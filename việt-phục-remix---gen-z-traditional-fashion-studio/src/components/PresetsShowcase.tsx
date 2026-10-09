import React from 'react';
import { OutfitLook } from '../types/fashion';
import { CURATED_PRESETS } from '../data/presets';
import { TRADITIONAL_GARMENTS, EVENTS, COLOR_PALETTE } from '../data/garments';
import { ArrowRight, Bookmark, Trash2 } from 'lucide-react';

interface PresetsShowcaseProps {
  onSelectPreset: (preset: OutfitLook) => void;
  savedLooks: OutfitLook[];
  onDeleteSavedLook: (id: string) => void;
}

export const PresetsShowcase: React.FC<PresetsShowcaseProps> = ({
  onSelectPreset,
  savedLooks,
  onDeleteSavedLook
}) => {
  const getColorName = (hex: string) => {
    return COLOR_PALETTE.find(c => c.hex.toLowerCase() === hex.toLowerCase())?.name || hex;
  };

  return (
    <section id="presets" className="scroll-mt-20 space-y-8 pt-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E3DCCF] pb-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-[#555A50] mb-1">
            Bộ sưu tập cảm hứng
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#252822]">
            Các phương án phối tiêu biểu
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#4A4E46] max-w-md font-sans">
          Gợi ý phối đồ kết hợp hài hòa giữa cấu trúc di sản cổ truyền và phong cách thời trang đương đại.
        </p>
      </div>

      {/* Curated Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {CURATED_PRESETS.map(preset => {
          const garment = TRADITIONAL_GARMENTS.find(g => g.id === preset.garmentType);
          const ev = EVENTS.find(e => e.id === preset.event);

          return (
            <div
              key={preset.id}
              className="bg-white border border-[#E3DCCF] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#555A50] mb-2">
                  <span className="font-semibold text-[#244A3A] bg-[#244A3A]/10 px-2 py-0.5 rounded-full">
                    {preset.vibeTag}
                  </span>
                  <span className="text-[11px]">{garment?.origin.split(',')[0]}</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#252822] group-hover:text-[#244A3A] transition-colors">
                  {preset.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4A4E46] mt-2 line-clamp-2 leading-relaxed">
                  {preset.userNotes}
                </p>

                {/* Color Swatch Preview */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#E3DCCF]/60">
                  <span className="text-xs text-[#555A50]">Màu sắc:</span>
                  <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: preset.primaryColor }} title={getColorName(preset.primaryColor)} />
                  <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: preset.secondaryColor }} title={getColorName(preset.secondaryColor)} />
                  <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: preset.pantsColor }} title={getColorName(preset.pantsColor)} />
                </div>
              </div>

              {/* Apply CTA (Min 44px) */}
              <button
                type="button"
                onClick={() => onSelectPreset(preset)}
                className="mt-5 w-full min-h-[44px] py-2.5 px-4 bg-[#F7F3EB] hover:bg-[#244A3A] hover:text-white text-[#252822] border border-[#E3DCCF] rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
              >
                <span>Thử phối phong cách này</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* User Saved Lookbook Section (if any saved) */}
      {savedLooks.length > 0 && (
        <div className="mt-10 pt-8 border-t border-[#E3DCCF]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#244A3A]" />
              <h3 className="text-xl font-serif font-bold text-[#252822]">
                Lookbook cá nhân của bạn ({savedLooks.length})
              </h3>
            </div>
            <span className="text-xs text-[#555A50]">Đã lưu trong trình duyệt</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedLooks.map(look => (
              <div
                key={look.id}
                className="p-4 rounded-xl border border-[#E3DCCF] bg-white shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#555A50] mb-1">
                    <span>{look.createdAt}</span>
                    <button
                      type="button"
                      onClick={() => onDeleteSavedLook(look.id)}
                      className="min-w-[36px] min-h-[36px] text-stone-400 hover:text-rose-600 transition-colors p-1.5 flex items-center justify-center rounded-lg"
                      title="Xóa khỏi Lookbook"
                      aria-label="Xóa bộ phối"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="font-serif font-bold text-base text-[#252822]">{look.title}</h4>
                  <p className="text-xs text-[#4A4E46] mt-1 line-clamp-2">
                    {look.userNotes || 'Không có ghi chú.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E3DCCF]/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: look.primaryColor }} />
                    <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: look.pantsColor }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectPreset(look)}
                    className="min-h-[40px] px-2 text-xs font-semibold text-[#244A3A] hover:underline flex items-center gap-1"
                  >
                    <span>Xem lại</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
