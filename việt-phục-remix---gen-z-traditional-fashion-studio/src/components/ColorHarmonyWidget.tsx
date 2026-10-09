import React, { useState } from 'react';
import { analyzeColorHarmony } from '../utils/fashionRules';
import { Compass, BookOpen, Sliders, Info } from 'lucide-react';

interface ColorHarmonyWidgetProps {
  primaryColor: string;
  secondaryColor: string;
  pantsColor: string;
}

export const ColorHarmonyWidget: React.FC<ColorHarmonyWidgetProps> = ({
  primaryColor,
  secondaryColor,
  pantsColor
}) => {
  const [showFolkDetails, setShowFolkDetails] = useState(false);
  const analysis = analyzeColorHarmony(primaryColor, secondaryColor, pantsColor);

  return (
    <div id="harmony" className="scroll-mt-20 bg-white rounded-2xl border border-[#E3DCCF] shadow-sm p-4 sm:p-5 space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E3DCCF]">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#244A3A]" />
          <h3 className="text-sm font-semibold text-[#252822] font-sans">
            Đánh giá quan hệ màu sắc
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#244A3A] bg-[#244A3A]/10 px-2.5 py-0.5 rounded-full border border-[#244A3A]/20">
          {analysis.relationshipLabel.split('(')[0].trim()}
        </span>
      </div>

      {/* Primary Color Relationship Breakdown */}
      <div className="p-3.5 rounded-xl bg-[#F7F3EB] border border-[#E3DCCF] text-xs sm:text-sm leading-relaxed space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#252822]">Phân tích bánh xe màu:</span>
          <span className="text-xs font-mono text-[#555A50]">Độ lệch góc: {analysis.deltaHue}°</span>
        </div>
        <p className="text-[#4A4E46]">{analysis.aestheticReview}</p>

        {/* Concrete Adjustment Suggestion */}
        <div className="pt-2 border-t border-[#E3DCCF]/60 text-[#252822]">
          <strong className="text-[#244A3A] font-semibold flex items-center gap-1 mb-0.5">
            <Sliders className="w-3.5 h-3.5 text-[#B6533C]" />
            Gợi ý điều chỉnh:
          </strong>
          <p className="text-[#4A4E46]">{analysis.adjustmentSuggestion}</p>
        </div>
      </div>

      {/* 60-30-10 Rule of Thumb Notice */}
      <div className="p-2.5 rounded-xl bg-[#F7F3EB]/60 border border-[#E3DCCF]/60 text-xs text-[#555A50] flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-[#244A3A] shrink-0 mt-0.5" />
        <p className="leading-relaxed">{analysis.ratioNotice}</p>
      </div>

      {/* Separated Folk Cultural (Ngũ Hành) Section */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowFolkDetails(!showFolkDetails)}
          className="text-xs font-semibold text-[#244A3A] hover:underline flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#244A3A] rounded px-1 py-0.5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{showFolkDetails ? 'Ẩn quan niệm ngũ hành cổ truyền' : 'Tham khảo quan niệm văn hóa dân gian (Ngũ hành)'}</span>
        </button>

        {showFolkDetails && (
          <div className="mt-2 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-[#252822] leading-relaxed space-y-1 animate-fadeIn">
            <p className="font-semibold text-[#B6533C]">Hệ quy chiếu ngũ hành biểu trưng:</p>
            <p className="text-[#4A4E46]">{analysis.folkElementNote}</p>
            <p className="text-[11px] text-[#555A50] italic pt-1">
              (Lưu ý: Thông tin mang tính tìm hiểu lịch sử quan niệm thẩm mỹ của tiền nhân, không khẳng định vận mệnh hay may rủi cá nhân).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
