import React, { useEffect } from 'react';
import { CulturalCheckResult } from '../types/fashion';
import { ShieldCheck, AlertCircle, HelpCircle, X } from 'lucide-react';

interface CulturalSafeguardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CulturalCheckResult;
}

export const CulturalSafeguardModal: React.FC<CulturalSafeguardModalProps> = ({
  isOpen,
  onClose,
  result
}) => {
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

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'phu_hop':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#244A3A]/10 text-[#244A3A] border border-[#244A3A]/20">
            Phù hợp bối cảnh
          </span>
        );
      case 'can_can_nhac':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B6533C]/10 text-[#B6533C] border border-[#B6533C]/20">
            Cần cân nhắc
          </span>
        );
      case 'can_kiem_chung':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300">
            Cần kiểm chứng
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-[#E3DCCF] overflow-hidden relative max-h-[90vh] flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] rounded-xl text-[#555A50] hover:text-[#252822] hover:bg-stone-100 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
          aria-label="Đóng cửa sổ lưu ý văn hóa"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 pr-10">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            result.overallStatus === 'phu_hop'
              ? 'bg-[#244A3A]/10 text-[#244A3A]'
              : result.overallStatus === 'can_can_nhac'
              ? 'bg-[#B6533C]/10 text-[#B6533C]'
              : 'bg-amber-100 text-amber-800'
          }`}>
            {result.overallStatus === 'phu_hop' ? (
              <ShieldCheck className="w-6 h-6" />
            ) : result.overallStatus === 'can_can_nhac' ? (
              <AlertCircle className="w-6 h-6" />
            ) : (
              <HelpCircle className="w-6 h-6" />
            )}
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#252822]">
              Lưu ý văn hóa & bối cảnh
            </h3>
            <p className="text-xs text-[#555A50] font-sans mt-0.5">
              Đánh giá: <strong className="text-[#252822] font-semibold">{result.statusLabel}</strong>
            </p>
          </div>
        </div>

        {/* Summary note */}
        <div className="p-3 rounded-xl bg-[#F7F3EB] border border-[#E3DCCF] text-xs sm:text-sm text-[#252822] mb-4 leading-relaxed shrink-0">
          {result.summary}
        </div>

        {/* Scrollable list */}
        <div className="space-y-3 overflow-y-auto pr-1 flex-1">
          {result.notes.map((note, index) => (
            <div
              key={index}
              className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                note.category === 'phu_hop'
                  ? 'bg-[#244A3A]/5 border-[#244A3A]/20'
                  : note.category === 'can_can_nhac'
                  ? 'bg-[#B6533C]/5 border-[#B6533C]/20'
                  : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-[#252822]">{note.title}</span>
                {getCategoryBadge(note.category)}
              </div>

              <div className="text-[#4A4E46]">
                <strong className="text-[#252822]">Lý do: </strong>
                {note.reason}
              </div>

              <div className="p-2.5 rounded-lg bg-white/90 border border-black/5 text-[#252822]">
                <strong className="text-[#244A3A] font-semibold">Gợi ý điều chỉnh: </strong>
                <span>{note.suggestion}</span>
              </div>

              {note.historicalContext && (
                <div className="text-[11px] text-[#555A50] italic pt-0.5">
                  Bối cảnh: {note.historicalContext}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-[#E3DCCF] flex items-center justify-between shrink-0">
          <span className="text-[11px] text-[#555A50] italic">
            Tôn trọng di sản, tự tin phối đồ
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 bg-[#244A3A] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#1A372B] transition-colors shadow-xs"
          >
            Đã hiểu & đóng
          </button>
        </div>
      </div>
    </div>
  );
};
