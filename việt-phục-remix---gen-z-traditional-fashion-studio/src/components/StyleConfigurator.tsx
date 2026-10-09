import React, { useState } from 'react';
import {
  GarmentCategory,
  Gender,
  TraditionalAccessory,
  ModernAccessory,
  PantsStyle,
  EventOccasion
} from '../types/fashion';
import {
  TRADITIONAL_GARMENTS,
  COLOR_PALETTE,
  PANTS_COLORS,
  PANTS_STYLE_NAMES,
  TRADITIONAL_ACCESSORY_DATA,
  MODERN_ACCESSORY_DATA,
  EVENTS
} from '../data/garments';
import {
  Sparkles,
  Palette,
  Layers,
  Shirt,
  Calendar,
  Check,
  Wand2,
  BookOpen,
  Headphones,
  Glasses,
  ShoppingBag,
  CircleDot,
  Disc,
  Wind,
  Gem,
  Footprints,
  Crown,
  Feather,
  Sliders,
  Shield,
  User,
  Info
} from 'lucide-react';

interface StyleConfiguratorProps {
  gender: Gender;
  onGenderChange: (g: Gender) => void;
  garmentType: GarmentCategory;
  onGarmentTypeChange: (g: GarmentCategory) => void;
  primaryColor: string;
  onPrimaryColorChange: (c: string) => void;
  secondaryColor: string;
  onSecondaryColorChange: (c: string) => void;
  pantsColor: string;
  onPantsColorChange: (c: string) => void;
  pantsStyle: PantsStyle;
  onPantsStyleChange: (s: PantsStyle) => void;
  traditionalAccessories: TraditionalAccessory[];
  onToggleTraditionalAccessory: (a: TraditionalAccessory) => void;
  modernAccessories: ModernAccessory[];
  onToggleModernAccessory: (a: ModernAccessory) => void;
  event: EventOccasion;
  onEventChange: (e: EventOccasion) => void;
  onApplyEventRecommendation: (ev: typeof EVENTS[0]) => void;
  onLearnMore?: (garmentId: GarmentCategory) => void;
}

// Consistent Lucide icons for traditional accessories (replacing emojis)
const TRADITIONAL_ICONS: Record<string, React.ReactNode> = {
  khan_xep: <Crown className="w-4 h-4 text-[#244A3A]" />,
  khan_mo_qua: <Feather className="w-4 h-4 text-[#244A3A]" />,
  kieng_bac: <CircleDot className="w-4 h-4 text-[#244A3A]" />,
  non_quai_thao: <Disc className="w-4 h-4 text-[#244A3A]" />,
  guoc_moc: <Footprints className="w-4 h-4 text-[#244A3A]" />,
  quat_giay: <Wind className="w-4 h-4 text-[#244A3A]" />,
  ngoc_boi: <Gem className="w-4 h-4 text-[#244A3A]" />
};

// Consistent Lucide icons for modern accessories (replacing emojis)
const MODERN_ICONS: Record<string, React.ReactNode> = {
  chunky_sneaker: <Footprints className="w-4 h-4 text-[#B6533C]" />,
  matrix_sunglasses: <Glasses className="w-4 h-4 text-[#B6533C]" />,
  canvas_tote: <ShoppingBag className="w-4 h-4 text-[#B6533C]" />,
  overear_headphones: <Headphones className="w-4 h-4 text-[#B6533C]" />,
  corset_belt: <Sliders className="w-4 h-4 text-[#B6533C]" />,
  doc_martens: <Shield className="w-4 h-4 text-[#B6533C]" />,
  pearl_choker: <CircleDot className="w-4 h-4 text-[#B6533C]" />
};

// Key identifying silhouette highlight for each garment
const GARMENT_KEY_FEATURE: Record<GarmentCategory, string> = {
  ngu_than_tay_chen: 'Cổ đứng lập lĩnh, tay chẽn ôm khít, 5 cúc khuy cài sang nách phải',
  ngu_than_tay_thung: 'Ống tay thụng buông rộng 40–60cm, dáng áo đại lễ trang nghiêm',
  tu_than: 'Bốn thân áo buông lơi, yếm đào tơ tằm e ấp cùng dải thắt lưng xanh',
  nhat_binh: 'Bản nẹp cổ hình chữ nhật vắt ngang ngực, viền dải chỉ phụng ngũ sắc',
  giao_linh: 'Cổ áo vắt chéo hình chữ Y, vạt phải đè vạt trái (hữu nhậm chuẩn mực)',
  ao_dai_tan_thoi: 'Đường chiết eo tôn dáng, cổ sen thanh tân, hai tà lụa bay thướt tha'
};

export const StyleConfigurator: React.FC<StyleConfiguratorProps> = ({
  gender,
  onGenderChange,
  garmentType,
  onGarmentTypeChange,
  primaryColor,
  onPrimaryColorChange,
  secondaryColor,
  onSecondaryColorChange,
  pantsColor,
  onPantsColorChange,
  pantsStyle,
  onPantsStyleChange,
  traditionalAccessories,
  onToggleTraditionalAccessory,
  modernAccessories,
  onToggleModernAccessory,
  event,
  onEventChange,
  onApplyEventRecommendation,
  onLearnMore
}) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  const selectedGarment = TRADITIONAL_GARMENTS.find(g => g.id === garmentType) || TRADITIONAL_GARMENTS[0];
  const selectedEvent = EVENTS.find(e => e.id === event) || EVENTS[0];

  const steps = [
    { num: 1, label: 'Trang phục', icon: <Shirt className="w-4 h-4" /> },
    { num: 2, label: 'Màu sắc & quần', icon: <Palette className="w-4 h-4" /> },
    { num: 3, label: 'Phụ kiện', icon: <Layers className="w-4 h-4" /> },
    { num: 4, label: 'Sự kiện', icon: <Calendar className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E3DCCF] shadow-sm p-4 sm:p-6 flex flex-col h-full">
      {/* 4 Concise Steps Navigation Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-[#F7F3EB] rounded-xl mb-6">
        {steps.map(step => {
          const isActive = activeStep === step.num;
          return (
            <button
              key={step.num}
              type="button"
              onClick={() => setActiveStep(step.num as any)}
              className={`min-h-[44px] py-2 px-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
                isActive
                  ? 'bg-white text-[#244A3A] shadow-xs font-semibold ring-1 ring-[#E3DCCF]'
                  : 'text-[#555A50] hover:text-[#252822]'
              }`}
              aria-selected={isActive}
            >
              {step.icon}
              <span className="truncate">
                {step.num}. {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* STEP 1: TRANG PHỤC & NHÂN VẬT */}
      {activeStep === 1 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Avatar gender selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#555A50] font-sans">
                Nhân vật đại diện
              </label>
              <span className="text-xs text-[#555A50]">3 kiểu phom dáng</span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { id: 'female', label: 'Nữ', desc: 'Búi tóc trâm cài' },
                { id: 'male', label: 'Nam', desc: 'Tóc ngắn lịch lãm' },
                { id: 'unisex', label: 'Unisex', desc: 'Phóng khoáng tự do' }
              ].map(item => {
                const isSelected = gender === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onGenderChange(item.id as Gender)}
                    className={`min-h-[48px] p-3 rounded-xl border text-left transition-all flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
                      isSelected
                        ? 'border-[#244A3A] bg-[#244A3A]/5 ring-2 ring-[#244A3A]/20 text-[#252822]'
                        : 'border-[#E3DCCF] hover:border-[#244A3A]/40 bg-white text-[#4A4E46]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#252822]">{item.label}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[#244A3A] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#555A50] mt-0.5">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Garments cards with thumbnail, key feature, and 'Tìm hiểu thêm' */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#555A50] font-sans">
                Dáng áo truyền thống
              </label>
              <span className="text-xs text-[#555A50]">6 kiểu áo di sản</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
              {TRADITIONAL_GARMENTS.map(item => {
                const isSelected = garmentType === item.id;
                const keyFeature = GARMENT_KEY_FEATURE[item.id] || item.silhouette;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#244A3A] bg-[#244A3A]/5 ring-2 ring-[#244A3A]/25 shadow-xs'
                        : 'border-[#E3DCCF] hover:border-[#244A3A]/30 bg-white'
                    }`}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        onGarmentTypeChange(item.id);
                        onPrimaryColorChange(item.defaultColor);
                        onPantsColorChange(item.defaultPantsColor);
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          onGarmentTypeChange(item.id);
                          onPrimaryColorChange(item.defaultColor);
                          onPantsColorChange(item.defaultPantsColor);
                        }
                      }}
                      className="cursor-pointer focus-visible:outline-none"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.defaultColor }} />
                          <span className="font-serif font-bold text-sm sm:text-base text-[#252822]">
                            {item.name}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#244A3A] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[#B6533C] font-medium mb-1.5">
                        {item.historicalPeriod.split('&')[0].trim()}
                      </div>

                      <p className="text-xs text-[#4A4E46] leading-relaxed line-clamp-2">
                        {keyFeature}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#E3DCCF]/60 flex items-center justify-between text-xs">
                      <span className="text-[#555A50] text-[11px] truncate max-w-[130px]">
                        Nguồn: {item.origin.split(',')[0]}
                      </span>

                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          if (onLearnMore) {
                            onLearnMore(item.id);
                          } else {
                            const el = document.getElementById('heritage');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="text-[12px] font-medium text-[#244A3A] hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#244A3A] rounded px-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Tìm hiểu thêm</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: MÀU SẮC & QUẦN */}
      {activeStep === 2 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Primary color with FULL Vietnamese names */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#555A50] font-sans">
                Màu thân áo chính (Gấm / Tơ tằm)
              </label>
              <span className="text-xs font-semibold text-[#244A3A]">
                {COLOR_PALETTE.find(c => c.hex.toLowerCase() === primaryColor.toLowerCase())?.name || 'Tùy chọn'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {COLOR_PALETTE.map(c => {
                const isSelected = primaryColor.toLowerCase() === c.hex.toLowerCase();
                const isLight = ['#FDFBF7', '#FAF5EE', '#F8F9FA'].includes(c.hex);
                return (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => onPrimaryColorChange(c.hex)}
                    className={`min-h-[46px] p-2 rounded-xl border flex items-center gap-2.5 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
                      isSelected
                        ? 'border-[#244A3A] ring-2 ring-[#244A3A]/25 bg-[#244A3A]/5 font-semibold text-[#252822]'
                        : 'border-[#E3DCCF] hover:border-[#244A3A]/30 bg-white text-[#4A4E46]'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full shrink-0 border border-black/10 flex items-center justify-center shadow-2xs"
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && (
                        <Check className={`w-3 h-3 ${isLight ? 'text-[#252822]' : 'text-white'}`} />
                      )}
                    </div>
                    <div className="truncate">
                      <div className="text-xs truncate">{c.name}</div>
                      <div className="text-[10px] text-[#555A50] font-normal">{c.element}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary color with full Vietnamese names */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#555A50] font-sans">
                Màu điểm nhấn (Yếm đào / Viền cổ)
              </label>
              <span className="text-xs font-semibold text-[#244A3A]">
                {COLOR_PALETTE.find(c => c.hex.toLowerCase() === secondaryColor.toLowerCase())?.name || 'Tùy chọn'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {COLOR_PALETTE.slice(0, 8).map(c => {
                const isSelected = secondaryColor.toLowerCase() === c.hex.toLowerCase();
                const isLight = ['#FDFBF7', '#FAF5EE', '#F8F9FA'].includes(c.hex);
                return (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => onSecondaryColorChange(c.hex)}
                    className={`min-h-[44px] p-2 rounded-xl border flex items-center gap-2 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
                      isSelected
                        ? 'border-[#244A3A] ring-2 ring-[#244A3A]/25 bg-[#244A3A]/5 font-semibold text-[#252822]'
                        : 'border-[#E3DCCF] hover:border-[#244A3A]/30 bg-white text-[#4A4E46]'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full shrink-0 border border-black/10 flex items-center justify-center shadow-2xs"
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && (
                        <Check className={`w-2.5 h-2.5 ${isLight ? 'text-[#252822]' : 'text-white'}`} />
                      )}
                    </div>
                    <span className="text-xs truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5 Pants Styles clearly distinguished */}
          <div className="pt-3 border-t border-[#E3DCCF]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#555A50] font-sans">
                Kiểu dáng quần phối
              </label>
              <span className="text-xs text-[#555A50]">5 kiểu dáng</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {[
                { id: 'traditional_silk', label: 'Quần lụa truyền thống', desc: 'Ống suông rủ mềm, tơ tằm thướt tha' },
                { id: 'wide_leg_trousers', label: 'Quần âu suông xếp ly', desc: 'Phom đứng may ly thẳng thớm' },
                { id: 'denim_jeans', label: 'Quần jeans ống đứng', desc: 'Hai đường chỉ vàng may nổi cá tính' },
                { id: 'linen_culottes', label: 'Quần lửng culottes đũi', desc: 'Lửng ngang bắp chân thoáng mát' },
                { id: 'pleated_skirt', label: 'Váy đũi / Đầm lĩnh xếp ly', desc: 'Dáng xòe chữ A xếp nếp nan quạt' }
              ].map(p => {
                const isSelected = pantsStyle === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onPantsStyleChange(p.id as PantsStyle)}
                    className={`min-h-[48px] p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
                      isSelected
                        ? 'border-[#244A3A] bg-[#244A3A]/5 ring-2 ring-[#244A3A]/25 text-[#252822] font-semibold'
                        : 'border-[#E3DCCF] hover:border-[#244A3A]/30 bg-white text-[#4A4E46]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{p.label}</div>
                      <div className="text-[11px] text-[#555A50] font-normal">{p.desc}</div>
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#244A3A] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Pants Color */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-medium text-[#4A4E46]">Màu quần:</span>
              <div className="flex items-center gap-2">
                {PANTS_COLORS.map(pc => {
                  const isSelected = pantsColor.toLowerCase() === pc.hex.toLowerCase();
                  const isLight = pc.hex === '#F8F9FA';
                  return (
                    <button
                      key={pc.hex}
                      type="button"
                      onClick={() => onPantsColorChange(pc.hex)}
                      title={pc.name}
                      aria-label={`Chọn màu quần ${pc.name}`}
                      className={`min-w-[36px] min-h-[36px] rounded-full border shadow-2xs flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
                        isSelected
                          ? 'ring-2 ring-[#244A3A] scale-110'
                          : 'border-[#D1C4B2] hover:scale-105'
                      }`}
                      style={{ backgroundColor: pc.hex }}
                    >
                      {isSelected && (
                        <Check className={`w-3.5 h-3.5 ${isLight ? 'text-[#252822]' : 'text-white'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: PHỤ KIỆN (CONSISTENT ICONS, NO LOOSE EMOJIS) */}
      {activeStep === 3 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Traditional Accessories */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#555A50] font-sans">
                Phụ kiện truyền thống
              </label>
              <span className="text-xs text-[#555A50]">Nét duyên di sản</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TRADITIONAL_ACCESSORY_DATA.filter(a => a.id !== 'none').map(item => {
                const isActive = traditionalAccessories.includes(item.id as TraditionalAccessory);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onToggleTraditionalAccessory(item.id as TraditionalAccessory)}
                    className={`min-h-[48px] p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
                      isActive
                        ? 'border-[#244A3A] bg-[#244A3A]/5 ring-2 ring-[#244A3A]/25 text-[#252822]'
                        : 'border-[#E3DCCF] hover:border-[#244A3A]/30 bg-white text-[#4A4E46]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-8 h-8 rounded-lg bg-[#F7F3EB] flex items-center justify-center shrink-0 border border-[#E3DCCF]">
                        {TRADITIONAL_ICONS[item.id] || <Shirt className="w-4 h-4 text-[#244A3A]" />}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold truncate">{item.name}</div>
                        <div className="text-[11px] text-[#555A50] truncate">{item.desc}</div>
                      </div>
                    </div>
                    {isActive && (
                      <span className="w-4 h-4 rounded-full bg-[#244A3A] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modern Gen Z Accessories */}
          <div className="pt-3 border-t border-[#E3DCCF]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#555A50] font-sans">
                Phụ kiện hiện đại
              </label>
              <span className="text-xs text-[#555A50]">Phong cách đường phố</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MODERN_ACCESSORY_DATA.filter(a => a.id !== 'none').map(item => {
                const isActive = modernAccessories.includes(item.id as ModernAccessory);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onToggleModernAccessory(item.id as ModernAccessory)}
                    className={`min-h-[48px] p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
                      isActive
                        ? 'border-[#B6533C] bg-[#B6533C]/5 ring-2 ring-[#B6533C]/25 text-[#252822]'
                        : 'border-[#E3DCCF] hover:border-[#B6533C]/30 bg-white text-[#4A4E46]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-8 h-8 rounded-lg bg-[#F7F3EB] flex items-center justify-center shrink-0 border border-[#E3DCCF]">
                        {MODERN_ICONS[item.id] || <Sparkles className="w-4 h-4 text-[#B6533C]" />}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold truncate">{item.name}</div>
                        <div className="text-[11px] text-[#555A50] truncate">{item.desc}</div>
                      </div>
                    </div>
                    {isActive && (
                      <span className="w-4 h-4 rounded-full bg-[#B6533C] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: SỰ KIỆN */}
      {activeStep === 4 && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#555A50] mb-2 block font-sans">
              Chọn bối cảnh sự kiện
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EVENTS.map(ev => {
                const isSelected = event === ev.id;
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => onEventChange(ev.id)}
                    className={`min-h-[52px] p-3 rounded-xl border text-left transition-all flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
                      isSelected
                        ? 'border-[#244A3A] bg-[#244A3A]/5 ring-2 ring-[#244A3A]/25 shadow-xs'
                        : 'border-[#E3DCCF] hover:border-[#244A3A]/30 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-[#252822]">{ev.name}</span>
                      {isSelected ? (
                        <span className="w-4 h-4 rounded-full bg-[#244A3A] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#555A50] bg-[#F7F3EB] px-2 py-0.5 rounded">
                          {ev.formalityLevel === 'formal' ? 'Trang trọng' : ev.formalityLevel === 'avant-garde' ? 'Sân khấu' : 'Đời thường'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#555A50] line-clamp-1">{ev.vibe}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Recommendation with explicit Apply button */}
          <div className="p-4 rounded-xl bg-[#F7F3EB] border border-[#E3DCCF] text-xs text-[#252822] leading-relaxed space-y-3">
            <div>
              <div className="font-semibold text-sm mb-1 flex items-center gap-1.5 text-[#244A3A]">
                <Wand2 className="w-4 h-4 text-[#B6533C]" />
                <span>Gợi ý phối đồ cho {selectedEvent.name}</span>
              </div>
              <p className="text-[#4A4E46] text-xs leading-relaxed">{selectedEvent.recommendationNote}</p>
            </div>

            <div className="pt-2 border-t border-[#E3DCCF] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11px] text-[#555A50]">
                Bộ phối tự chỉnh của bạn sẽ được giữ nguyên trừ khi bạn bấm áp dụng.
              </span>
              <button
                type="button"
                onClick={() => onApplyEventRecommendation(selectedEvent)}
                className="min-h-[44px] px-3.5 py-2 bg-[#244A3A] hover:bg-[#1A372B] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Áp dụng gợi ý cho sự kiện này</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
