import React, { useState } from 'react';
import { GarmentCategory } from '../types/fashion';
import { TRADITIONAL_GARMENTS } from '../data/garments';
import { BookOpen, Sparkles, ChevronDown, ChevronUp, History, Landmark, ExternalLink, BookmarkCheck } from 'lucide-react';

interface CulturalCardProps {
  garmentType: GarmentCategory;
  showAnatomy: boolean;
  onToggleAnatomy: () => void;
}

export const CulturalCard: React.FC<CulturalCardProps> = ({
  garmentType,
  showAnatomy,
  onToggleAnatomy
}) => {
  const [expandedSection, setExpandedSection] = useState<'facts' | 'symbolism' | 'anatomy' | 'references'>('facts');
  const [isDescExpanded, setIsDescExpanded] = useState<boolean>(false);
  const garment = TRADITIONAL_GARMENTS.find(g => g.id === garmentType) || TRADITIONAL_GARMENTS[0];

  return (
    <div id="heritage" className="scroll-mt-20 bg-white rounded-2xl border border-[#E3DCCF] shadow-sm p-4 sm:p-6 space-y-4">
      {/* Title & Archival Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E3DCCF] pb-3 gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#555A50] uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5 text-[#244A3A]" />
            <span>Thông tin trang phục</span>
            <span aria-hidden="true">·</span>
            <span>{garment.historicalPeriod.split('&')[0].trim()}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#252822] mt-1">
            {garment.name}
          </h2>
        </div>

        {/* Anatomy Toggle button (Min 44px tap target) */}
        <button
          type="button"
          onClick={onToggleAnatomy}
          className={`min-h-[44px] px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
            showAnatomy
              ? 'bg-[#244A3A] text-white border-[#244A3A] shadow-xs'
              : 'bg-[#F7F3EB] text-[#252822] border-[#E3DCCF] hover:bg-[#EFE8DC]'
          }`}
          aria-expanded={showAnatomy}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B6533C]" />
          <span>{showAnatomy ? 'Ẩn cấu tạo' : 'Cấu tạo trang phục'}</span>
        </button>
      </div>

      {/* Description: 2-3 lines initially, expandable */}
      <div className="text-base text-[#252822] leading-relaxed font-sans">
        <p className={isDescExpanded ? '' : 'line-clamp-3'}>
          {garment.description}
        </p>
        <button
          type="button"
          onClick={() => setIsDescExpanded(!isDescExpanded)}
          className="text-xs font-semibold text-[#244A3A] hover:underline mt-1.5 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#244A3A]"
        >
          <span>{isDescExpanded ? 'Thu gọn' : 'Đọc thêm mô tả'}</span>
          {isDescExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        <div className="text-xs text-[#555A50] flex items-center gap-1.5 mt-2 pt-2 border-t border-[#E3DCCF]/60">
          <History className="w-3.5 h-3.5 text-[#244A3A]" />
          <span>Không gian văn hóa: <strong className="text-[#252822] font-medium">{garment.origin}</strong></span>
        </div>
      </div>

      {/* Accordion Panels for Authenticity & Cultural Rigor */}
      <div className="space-y-2.5 pt-2 border-t border-[#E3DCCF]">
        {/* Panel 1: Dữ kiện lịch sử đã kiểm chứng */}
        <div className="border border-[#E3DCCF] rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedSection(expandedSection === 'facts' ? ('' as any) : 'facts')}
            className="w-full min-h-[48px] p-3.5 bg-[#F7F3EB] hover:bg-[#EFE8DC] flex items-center justify-between text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
            aria-expanded={expandedSection === 'facts'}
          >
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#244A3A]" />
              <span className="text-sm font-semibold text-[#252822]">
                1. Dữ kiện lịch sử
              </span>
            </div>
            {expandedSection === 'facts' ? (
              <ChevronUp className="w-4 h-4 text-[#555A50]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#555A50]" />
            )}
          </button>

          {expandedSection === 'facts' && (
            <div className="p-4 bg-white text-sm text-[#252822] leading-relaxed space-y-2.5 border-t border-[#E3DCCF]">
              <p className="p-3 bg-[#F7F3EB] rounded-xl border border-[#E3DCCF] text-[#252822]">
                {garment.historicalFacts}
              </p>
              <div className="text-xs text-[#555A50]">
                Quy cách cài vạt: Áo truyền thống luôn cài khuy hoặc vắt sang <strong>bên phải theo phía người mặc</strong> (quy tắc hữu nhậm thuận chiều).
              </div>
            </div>
          )}
        </div>

        {/* Panel 2: Ý nghĩa văn hóa & biểu tượng */}
        <div className="border border-[#E3DCCF] rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedSection(expandedSection === 'symbolism' ? ('' as any) : 'symbolism')}
            className="w-full min-h-[48px] p-3.5 bg-[#F7F3EB] hover:bg-[#EFE8DC] flex items-center justify-between text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
            aria-expanded={expandedSection === 'symbolism'}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#B6533C]" />
              <span className="text-sm font-semibold text-[#252822]">
                2. Ý nghĩa văn hóa & biểu tượng
              </span>
            </div>
            {expandedSection === 'symbolism' ? (
              <ChevronUp className="w-4 h-4 text-[#555A50]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#555A50]" />
            )}
          </button>

          {expandedSection === 'symbolism' && (
            <div className="p-4 bg-white text-sm text-[#252822] leading-relaxed space-y-2 border-t border-[#E3DCCF]">
              <p className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 text-[#252822] italic">
                "{garment.culturalSymbolism}"
              </p>
              <div className="text-xs text-[#555A50] pt-1">
                Lưu ý: Các diễn giải về tứ thân phụ mẫu và ngũ thường là quan niệm dân gian và Nho học được lưu truyền qua nhiều thế hệ thợ may, thể hiện lòng hiếu thảo và rèn giũa phẩm cách.
              </div>
            </div>
          )}
        </div>

        {/* Panel 3: Cấu tạo trang phục (Renamed as requested) */}
        <div className="border border-[#E3DCCF] rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedSection(expandedSection === 'anatomy' ? ('' as any) : 'anatomy')}
            className="w-full min-h-[48px] p-3.5 bg-[#F7F3EB] hover:bg-[#EFE8DC] flex items-center justify-between text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
            aria-expanded={expandedSection === 'anatomy'}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#244A3A]" />
              <span className="text-sm font-semibold text-[#252822]">
                3. Cấu tạo trang phục ({garment.anatomy.length} bộ phận)
              </span>
            </div>
            {expandedSection === 'anatomy' ? (
              <ChevronUp className="w-4 h-4 text-[#555A50]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#555A50]" />
            )}
          </button>

          {expandedSection === 'anatomy' && (
            <div className="p-4 bg-white space-y-3 border-t border-[#E3DCCF]">
              {garment.anatomy.map((part, index) => (
                <div key={index} className="text-xs sm:text-sm border-b border-[#E3DCCF]/60 pb-2.5 last:border-0 last:pb-0">
                  <div className="font-semibold text-[#252822] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#244A3A]/10 text-[#244A3A] flex items-center justify-center text-xs font-mono font-bold">
                      {index + 1}
                    </span>
                    <span>{part.part}</span>
                  </div>
                  <p className="text-[#4A4E46] mt-1 pl-6 leading-relaxed">{part.description}</p>
                  <p className="text-[#555A50] italic mt-0.5 pl-6 text-xs">Ý nghĩa: {part.significance}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panel 4: Nguồn tham khảo có thật */}
        <div className="border border-[#E3DCCF] rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedSection(expandedSection === 'references' ? ('' as any) : 'references')}
            className="w-full min-h-[48px] p-3.5 bg-[#F7F3EB] hover:bg-[#EFE8DC] flex items-center justify-between text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
            aria-expanded={expandedSection === 'references'}
          >
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-[#244A3A]" />
              <span className="text-sm font-semibold text-[#252822]">
                4. Nguồn tham khảo học thuật ({garment.references.length} tài liệu)
              </span>
            </div>
            {expandedSection === 'references' ? (
              <ChevronUp className="w-4 h-4 text-[#555A50]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#555A50]" />
            )}
          </button>

          {expandedSection === 'references' && (
            <div className="p-4 bg-white space-y-3 border-t border-[#E3DCCF] text-xs">
              {garment.references.map((ref, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F7F3EB] border border-[#E3DCCF] space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-[#252822]">{ref.documentTitle}</span>
                    {ref.link && (
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#244A3A] hover:underline flex items-center gap-0.5 shrink-0"
                      >
                        <span>Tra cứu</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="text-[#4A4E46]">
                    Tác giả / Tổ chức: <strong>{ref.authorOrOrg}</strong> {ref.yearOrPeriod ? `(${ref.yearOrPeriod})` : ''}
                  </div>
                  <p className="text-[#555A50] text-xs leading-relaxed">{ref.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
