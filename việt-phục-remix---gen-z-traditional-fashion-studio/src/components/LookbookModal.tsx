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
import { MannequinViewer } from './MannequinViewer';
import { X, Download, Copy, BookmarkCheck, Check, AlertCircle } from 'lucide-react';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLook: OutfitLook;
  onSaveToLookbook: (title: string, notes: string) => boolean | void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  currentLook,
  onSaveToLookbook
}) => {
  const [title, setTitle] = useState(currentLook.title || 'Bộ phối Việt phục mới');
  const [notes, setNotes] = useState(
    currentLook.userNotes || 'Gợi ý kết hợp trang phục truyền thống với phụ kiện đương đại theo chuẩn văn hóa.'
  );
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Close on Escape key
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

  const garment = TRADITIONAL_GARMENTS.find(g => g.id === currentLook.garmentType) || TRADITIONAL_GARMENTS[0];
  const event = EVENTS.find(e => e.id === currentLook.event) || EVENTS[0];

  const getColorName = (hex: string) => {
    return COLOR_PALETTE.find(c => c.hex.toLowerCase() === hex.toLowerCase())?.name || hex;
  };

  const handleCopyRecipe = () => {
    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tên cho bộ phối trước khi sao chép.');
      return;
    }
    setErrorMessage(null);

    const tradNames = currentLook.traditionalAccessories
      .map(a => TRADITIONAL_ACCESSORY_NAMES[a] || a)
      .join(', ') || 'Không dùng';
    const modNames = currentLook.modernAccessories
      .map(a => MODERN_ACCESSORY_NAMES[a] || a)
      .join(', ') || 'Không dùng';

    const text = `🇻🇳 [VIỆT PHỤC REMIX - ${title.trim()}]
• Dáng áo: ${garment.name} (${garment.historicalPeriod.split('&')[0].trim()})
• Bối cảnh sự kiện: ${event.name}
• Thân áo chính: ${getColorName(currentLook.primaryColor)} (${currentLook.primaryColor})
• Màu điểm nhấn: ${getColorName(currentLook.secondaryColor)} (${currentLook.secondaryColor})
• Quần phối: ${PANTS_STYLE_NAMES[currentLook.pantsStyle] || currentLook.pantsStyle} - ${getColorName(currentLook.pantsColor)}
• Phụ kiện truyền thống: ${tradNames}
• Phụ kiện hiện đại: ${modNames}
• Ghi chú phối đồ: ${notes.trim()}
---
Phòng phối đồ Việt Phục Remix`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSave = () => {
    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tên cho bộ phối trước khi lưu.');
      return;
    }
    setErrorMessage(null);

    try {
      onSaveToLookbook(title.trim(), notes.trim());
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
      }, 2500);
    } catch (e: any) {
      console.error(e);
      setErrorMessage('Có lỗi xảy ra khi lưu vào Lookbook. Vui lòng thử lại.');
    }
  };

  // High-Resolution PNG Canvas Export
  const handleExportPNG = async () => {
    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tên cho bộ phối trước khi tải ảnh.');
      return;
    }
    setErrorMessage(null);
    setIsExporting(true);

    try {
      const svgElement = document.getElementById('lookbook-card-svg');
      if (!svgElement) {
        throw new Error('Không tìm thấy mô hình vector để xuất ảnh.');
      }

      // Serialize the SVG
      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svgElement);
      if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      if (!svgString.includes('width=')) {
        svgString = svgString.replace('<svg', '<svg width="400" height="700"');
      }

      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Quá thời gian tải vector SVG')), 5000);
        img.onload = () => {
          clearTimeout(timer);
          resolve(true);
        };
        img.onerror = () => {
          clearTimeout(timer);
          reject(new Error('Lỗi chuyển đổi vector SVG vào canvas'));
        };
        img.src = blobURL;
      });

      // Canvas dimensions for high-res editorial poster card
      const canvas = document.createElement('canvas');
      const width = 800;
      const height = 1120;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Không thể khởi tạo Canvas 2D context');

      // 1. Background fill
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#F7F3EB');
      bgGrad.addColorStop(1, '#EFE8DC');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Outer decorative border
      ctx.strokeStyle = '#D1C4B2';
      ctx.lineWidth = 2;
      ctx.strokeRect(24, 24, width - 48, height - 48);

      // 3. Header title & metadata
      ctx.fillStyle = '#244A3A';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('VIỆT PHỤC REMIX · PHÒNG PHỐI ĐỒ TRUYỀN THỐNG VIỆT NAM', 45, 62);

      ctx.fillStyle = '#252822';
      ctx.font = 'bold 28px serif';
      ctx.fillText(title.trim(), 45, 102);

      ctx.fillStyle = '#4A4E46';
      ctx.font = '14px sans-serif';
      ctx.fillText(`${garment.name} (${garment.historicalPeriod.split('&')[0].trim()}) · Bối cảnh: ${event.name}`, 45, 130);

      // 4. Draw Mannequin SVG in center
      const mannequinW = 420;
      const mannequinH = 630;
      const mannequinX = (width - mannequinW) / 2;
      const mannequinY = 150;
      ctx.drawImage(img, mannequinX, mannequinY, mannequinW, mannequinH);

      URL.revokeObjectURL(blobURL);

      // 5. Card information panel at the bottom
      const infoBoxY = 800;
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#E3DCCF';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(45, infoBoxY, width - 90, 240, 16);
      ctx.fill();
      ctx.stroke();

      // Color Swatches
      ctx.fillStyle = '#252822';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Bảng màu phối trang phục:', 65, infoBoxY + 32);

      const drawSwatch = (x: number, y: number, color: string, label: string) => {
        ctx.beginPath();
        ctx.arc(x + 10, y + 10, 10, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#D1C4B2';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#252822';
        ctx.font = '12px sans-serif';
        ctx.fillText(label, x + 28, y + 15);
      };

      drawSwatch(65, infoBoxY + 48, currentLook.primaryColor, `Áo: ${getColorName(currentLook.primaryColor)}`);
      drawSwatch(280, infoBoxY + 48, currentLook.secondaryColor, `Điểm nhấn: ${getColorName(currentLook.secondaryColor)}`);
      drawSwatch(520, infoBoxY + 48, currentLook.pantsColor, `Quần: ${getColorName(currentLook.pantsColor)}`);

      // Styling details
      ctx.fillStyle = '#4A4E46';
      ctx.font = '12px sans-serif';

      const tradNames = currentLook.traditionalAccessories
        .map(a => TRADITIONAL_ACCESSORY_NAMES[a] || a)
        .join(', ') || 'Tối giản';
      const modNames = currentLook.modernAccessories
        .map(a => MODERN_ACCESSORY_NAMES[a] || a)
        .join(', ') || 'Tối giản';
      const pantsName = PANTS_STYLE_NAMES[currentLook.pantsStyle] || currentLook.pantsStyle;

      ctx.fillText(`• Quần phối: ${pantsName}`, 65, infoBoxY + 105);
      ctx.fillText(`• Phụ kiện truyền thống: ${tradNames}`, 65, infoBoxY + 130);
      ctx.fillText(`• Phụ kiện hiện đại: ${modNames}`, 65, infoBoxY + 155);

      // Notes
      ctx.fillStyle = '#252822';
      ctx.font = 'italic 12px serif';
      const truncatedNotes = notes.length > 90 ? notes.slice(0, 90) + '...' : notes;
      ctx.fillText(`"${truncatedNotes}"`, 65, infoBoxY + 195);

      // Watermark
      ctx.fillStyle = '#555A50';
      ctx.font = '10px sans-serif';
      ctx.fillText('Việt Phục Remix · Khám phá & tôn vinh di sản', 65, infoBoxY + 222);

      // Convert to PNG and trigger download
      canvas.toBlob((blob) => {
        if (!blob) throw new Error('Không thể tạo file ảnh PNG');
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const filename = `vietphuc_${title.trim().toLowerCase().replace(/\s+/g, '_')}.png`;
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
        setIsExporting(false);
      }, 'image/png');

    } catch (exportErr: any) {
      console.error(exportErr);
      setErrorMessage(exportErr?.message || 'Có lỗi khi xuất ảnh PNG. Vui lòng thử lại.');
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-[#E3DCCF] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#E3DCCF] flex items-center justify-between bg-[#F7F3EB]">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-[#244A3A]" />
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#252822]">
              Lưu & tải thẻ Lookbook
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] rounded-xl text-[#555A50] hover:text-[#252822] hover:bg-stone-200/60 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
            aria-label="Đóng cửa sổ Lookbook"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Editorial Lookbook Card preview */}
          <div className="bg-[#F7F3EB] border border-[#E3DCCF] rounded-2xl p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#555A50] font-sans border-b border-[#E3DCCF] pb-2 mb-3">
                <span>Việt Phục Remix</span>
                <span>Thẻ phối đồ</span>
              </div>

              {/* Mannequin Preview Container with designated SVG id for export */}
              <div className="h-[320px] sm:h-[350px] w-full rounded-xl overflow-hidden mb-3 border border-[#E3DCCF]">
                <MannequinViewer
                  svgId="lookbook-card-svg"
                  gender={currentLook.gender}
                  garmentType={currentLook.garmentType}
                  primaryColor={currentLook.primaryColor}
                  secondaryColor={currentLook.secondaryColor}
                  pantsColor={currentLook.pantsColor}
                  pantsStyle={currentLook.pantsStyle}
                  traditionalAccessories={currentLook.traditionalAccessories}
                  modernAccessories={currentLook.modernAccessories}
                  backgroundScene={currentLook.backgroundScene || 'hanoi'}
                  showAnatomy={false}
                />
              </div>

              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#252822]">
                {title.trim() || 'Chưa đặt tên bộ phối'}
              </h3>
              <p className="text-xs text-[#555A50] mt-0.5">
                {garment.name} · {event.name}
              </p>
            </div>

            {/* Color Swatch Bar */}
            <div className="mt-4 pt-3 border-t border-[#E3DCCF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#555A50]">Bảng màu:</span>
                <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: currentLook.primaryColor }} title={`Áo: ${getColorName(currentLook.primaryColor)}`} />
                <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: currentLook.secondaryColor }} title={`Điểm nhấn: ${getColorName(currentLook.secondaryColor)}`} />
                <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: currentLook.pantsColor }} title={`Quần: ${getColorName(currentLook.pantsColor)}`} />
              </div>
              <span className="text-xs text-[#244A3A] font-semibold">Tự tin diện cổ phục</span>
            </div>
          </div>

          {/* Right: Metadata Inputs & Distinct Actions */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã lưu thành công vào Lookbook của bạn!</span>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-[#555A50] mb-1.5 block font-sans">
                  Tên bộ phối <span className="text-[#B6533C]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Ví dụ: Tốt nghiệp Đại học, Dạo phố Tràng An..."
                  className="w-full min-h-[44px] text-sm border border-[#E3DCCF] rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#244A3A] text-[#252822]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-[#555A50] mb-1.5 block font-sans">
                  Ghi chú phong cách & cảm hứng
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Cảm hứng phối đồ, câu chuyện muốn truyền tải..."
                  className="w-full text-xs sm:text-sm border border-[#E3DCCF] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#244A3A] leading-relaxed text-[#252822]"
                />
              </div>

              {/* Summary details */}
              <div className="bg-[#F7F3EB] p-3.5 rounded-xl border border-[#E3DCCF] text-xs space-y-1.5 text-[#4A4E46]">
                <div className="font-semibold text-[#252822] mb-1">Chi tiết cấu hình:</div>
                <div>• Áo: {garment.name}</div>
                <div>• Bối cảnh: {event.name}</div>
                <div>• Quần: {PANTS_STYLE_NAMES[currentLook.pantsStyle] || currentLook.pantsStyle}</div>
                <div>
                  • Phụ kiện truyền thống:{' '}
                  {currentLook.traditionalAccessories.map(a => TRADITIONAL_ACCESSORY_NAMES[a] || a).join(', ') || 'Không dùng'}
                </div>
                <div>
                  • Phụ kiện hiện đại:{' '}
                  {currentLook.modernAccessories.map(a => MODERN_ACCESSORY_NAMES[a] || a).join(', ') || 'Không dùng'}
                </div>
              </div>
            </div>

            {/* Action buttons (Clearly separated: Save Look vs Download Image) */}
            <div className="space-y-2.5 pt-4 border-t border-[#E3DCCF]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="min-h-[44px] py-2.5 px-3 rounded-xl bg-[#244A3A] hover:bg-[#1A372B] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Lưu bộ phối</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportPNG}
                  disabled={isExporting}
                  className="min-h-[44px] py-2.5 px-3 rounded-xl bg-[#B6533C] hover:bg-[#9B422E] disabled:opacity-50 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6533C]"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting ? 'Đang xuất ảnh...' : 'Tải ảnh thẻ (PNG)'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyRecipe}
                className="w-full min-h-[44px] py-2 px-3 rounded-xl border border-[#E3DCCF] hover:bg-[#F7F3EB] text-[#252822] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#244A3A]" />}
                <span>{copied ? 'Đã sao chép công thức phối!' : 'Sao chép công thức phối'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
