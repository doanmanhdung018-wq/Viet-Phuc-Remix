import React, { useState, useEffect } from 'react';
import {
  GarmentCategory,
  Gender,
  TraditionalAccessory,
  ModernAccessory,
  PantsStyle,
  EventOccasion,
  SceneBackground,
  OutfitLook
} from './types/fashion';
import {
  TRADITIONAL_GARMENTS,
  EVENTS,
  COLOR_PALETTE,
  PANTS_STYLE_NAMES,
  TRADITIONAL_ACCESSORY_NAMES,
  MODERN_ACCESSORY_NAMES
} from './data/garments';
import { CURATED_PRESETS } from './data/presets';
import { evaluateCulturalSafeguard } from './utils/fashionRules';
import { Navbar } from './components/Navbar';
import { MannequinViewer } from './components/MannequinViewer';
import { StyleConfigurator } from './components/StyleConfigurator';
import { CulturalCard } from './components/CulturalCard';
import { ColorHarmonyWidget } from './components/ColorHarmonyWidget';
import { WeatherEventSelector } from './components/WeatherEventSelector';
import { CompareModal } from './components/CompareModal';
import { LookbookModal } from './components/LookbookModal';
import { CulturalSafeguardModal } from './components/CulturalSafeguardModal';
import { AIStylistModal } from './components/AIStylistModal';
import { PresetsShowcase } from './components/PresetsShowcase';
import {
  Sparkles,
  ShieldCheck,
  BookmarkCheck,
  RotateCcw,
  Pin,
  ArrowRightLeft,
  Download,
  Eye,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function App() {
  // Current Outfit State (Unified Configuration)
  const [gender, setGender] = useState<Gender>('female');
  const [garmentType, setGarmentType] = useState<GarmentCategory>('ngu_than_tay_chen');
  const [primaryColor, setPrimaryColor] = useState<string>('#1A365D');
  const [secondaryColor, setSecondaryColor] = useState<string>('#D97706');
  const [pantsColor, setPantsColor] = useState<string>('#FAF5EE');
  const [pantsStyle, setPantsStyle] = useState<PantsStyle>('wide_leg_trousers');
  const [traditionalAccessories, setTraditionalAccessories] = useState<TraditionalAccessory[]>([
    'khan_xep',
    'kieng_bac'
  ]);
  const [modernAccessories, setModernAccessories] = useState<ModernAccessory[]>([
    'chunky_sneaker',
    'canvas_tote'
  ]);
  const [event, setEvent] = useState<EventOccasion>('graduation');
  const [selectedCity, setSelectedCity] = useState<'hanoi' | 'hue' | 'saigon' | 'sapa'>('hanoi');
  const [backgroundScene, setBackgroundScene] = useState<SceneBackground>('hanoi');

  // Interactive View Settings
  const [showAnatomy, setShowAnatomy] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // A/B Comparison Pinned Option A
  const [pinnedOptionA, setPinnedOptionA] = useState<OutfitLook | null>(null);

  // Modals
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSafeguardsOpen, setIsSafeguardsOpen] = useState(false);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);

  // Mobile mini preview toggle
  const [isMobilePreviewExpanded, setIsMobilePreviewExpanded] = useState(false);

  // User Saved Looks with backwards-compatibility sanitization
  const [savedLooks, setSavedLooks] = useState<OutfitLook[]>(() => {
    try {
      const stored = localStorage.getItem('vietphuc_saved_looks');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any, idx: number) => ({
            id: item.id || `look_${idx}`,
            title: item.title || `Bộ phối #${idx + 1}`,
            gender: item.gender || 'female',
            garmentType: item.garmentType || 'ngu_than_tay_chen',
            primaryColor: item.primaryColor || '#1A365D',
            secondaryColor: item.secondaryColor || '#D97706',
            pantsColor: item.pantsColor || '#FAF5EE',
            pantsStyle: item.pantsStyle || 'wide_leg_trousers',
            traditionalAccessories: Array.isArray(item.traditionalAccessories) ? item.traditionalAccessories : ['khan_xep'],
            modernAccessories: Array.isArray(item.modernAccessories) ? item.modernAccessories : ['chunky_sneaker'],
            event: item.event || 'graduation',
            region: item.region || 'hanoi',
            backgroundScene: item.backgroundScene || 'hanoi',
            vibeTag: item.vibeTag || 'Việt phục đương đại',
            createdAt: item.createdAt || '2026-10-04',
            userNotes: item.userNotes || ''
          }));
        }
      }
      return [CURATED_PRESETS[0], CURATED_PRESETS[1]];
    } catch {
      return [CURATED_PRESETS[0], CURATED_PRESETS[1]];
    }
  });

  // Save looks to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('vietphuc_saved_looks', JSON.stringify(savedLooks));
    } catch (e) {
      console.error(e);
    }
  }, [savedLooks]);

  // Current Outfit Object Representation
  const currentOutfit: OutfitLook = {
    id: `look_${Date.now()}`,
    title: 'Bộ phối tự do',
    gender,
    garmentType,
    primaryColor,
    secondaryColor,
    pantsColor,
    pantsStyle,
    traditionalAccessories,
    modernAccessories,
    event,
    region: selectedCity,
    backgroundScene,
    vibeTag: 'Việt phục đương đại',
    createdAt: new Date().toLocaleDateString('vi-VN')
  };

  // Cultural Safeguard Evaluation
  const safeguardResult = evaluateCulturalSafeguard({
    garmentType,
    event,
    pantsStyle,
    traditionalAccessories,
    modernAccessories,
    primaryColor
  });

  // Helper toast notification
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  // Handlers for Toggling Accessories
  const handleToggleTraditionalAccessory = (acc: TraditionalAccessory) => {
    setTraditionalAccessories(prev =>
      prev.includes(acc) ? prev.filter(a => a !== acc) : [...prev, acc]
    );
  };

  const handleToggleModernAccessory = (acc: ModernAccessory) => {
    setModernAccessories(prev =>
      prev.includes(acc) ? prev.filter(a => a !== acc) : [...prev, acc]
    );
  };

  // Pin current look as Option A for A/B Comparison
  const handlePinAsLookA = (lookToPin?: OutfitLook) => {
    const target = lookToPin || currentOutfit;
    setPinnedOptionA({ ...target, id: `pinned_${Date.now()}` });
    showToast('Đã ghim bộ phối làm phương án A.');
  };

  // Apply Event Recommendation (only when user clicks)
  const handleApplyEventRecommendation = (ev: typeof EVENTS[0]) => {
    setGarmentType(ev.recommendedGarments[0]);
    setPrimaryColor(ev.recommendedColors.primary);
    setSecondaryColor(ev.recommendedColors.secondary);
    setPantsColor(ev.recommendedColors.pants);
    setTraditionalAccessories(ev.recommendedTraditional);
    setModernAccessories(ev.recommendedModern);
    showToast(`Đã áp dụng gợi ý cho "${ev.name}".`);
  };

  // Save into personal lookbook
  const handleSaveToLookbook = (title: string, userNotes: string) => {
    const newLook: OutfitLook = {
      ...currentOutfit,
      id: `look_${Date.now()}`,
      title,
      userNotes,
      createdAt: new Date().toLocaleDateString('vi-VN')
    };
    setSavedLooks(prev => [newLook, ...prev]);
    showToast(`Đã lưu "${title}" vào Lookbook.`);
  };

  const handleDeleteSavedLook = (id: string) => {
    setSavedLooks(prev => prev.filter(l => l.id !== id));
    showToast('Đã xóa bộ phối khỏi Lookbook.');
  };

  // Apply a preset or saved look into studio workspace
  const handleApplyLook = (look: Partial<OutfitLook>) => {
    if (look.gender) setGender(look.gender);
    if (look.garmentType) setGarmentType(look.garmentType);
    if (look.primaryColor) setPrimaryColor(look.primaryColor);
    if (look.secondaryColor) setSecondaryColor(look.secondaryColor);
    if (look.pantsColor) setPantsColor(look.pantsColor);
    if (look.pantsStyle) setPantsStyle(look.pantsStyle);
    if (look.traditionalAccessories) setTraditionalAccessories(look.traditionalAccessories);
    if (look.modernAccessories) setModernAccessories(look.modernAccessories);
    if (look.event) setEvent(look.event);
    if (look.region) setSelectedCity(look.region);
    if (look.backgroundScene) setBackgroundScene(look.backgroundScene);

    showToast(`Đã tải bộ phối "${look.title || 'được chọn'}" vào phòng phối.`);

    const studioEl = document.getElementById('studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reset to default
  const handleResetOutfit = () => {
    setGender('female');
    setGarmentType('ngu_than_tay_chen');
    setPrimaryColor('#1A365D');
    setSecondaryColor('#D97706');
    setPantsColor('#FAF5EE');
    setPantsStyle('wide_leg_trousers');
    setTraditionalAccessories(['khan_xep', 'kieng_bac']);
    setModernAccessories(['chunky_sneaker', 'canvas_tote']);
    setEvent('graduation');
    setBackgroundScene('hanoi');
    showToast('Đã khôi phục bộ phối về mặc định.');
  };

  const activeGarment = TRADITIONAL_GARMENTS.find(g => g.id === garmentType) || TRADITIONAL_GARMENTS[0];
  const activeEvent = EVENTS.find(e => e.id === event) || EVENTS[0];
  const getColorName = (hex: string) => {
    return COLOR_PALETTE.find(c => c.hex.toLowerCase() === hex.toLowerCase())?.name || hex;
  };

  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[#252822] flex flex-col font-sans selection:bg-[#B6533C] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenSafeguards={() => setIsSafeguardsOpen(true)}
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
        savedLooksCount={savedLooks.length}
        safeguardResult={safeguardResult}
        hasPinnedOptionA={Boolean(pinnedOptionA)}
      />

      {/* Floating Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-[#252822] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#E3DCCF]/20 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10 sm:space-y-12">
        {/* Hero Section (Phần mở đầu theo định hướng người dùng) */}
        <section className="border-b border-[#E3DCCF] pb-6 sm:pb-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#252822] tracking-tight leading-[1.2]">
              Việt phục, chất riêng bạn.
            </h1>
            <p className="text-base sm:text-lg text-[#4A4E46] leading-relaxed font-sans max-w-2xl">
              Khám phá trang phục Việt, phối theo dịp và thể hiện cá tính với những gợi ý tôn trọng văn hóa.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#studio"
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#244A3A] hover:bg-[#1A372B] text-white text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
              >
                <span>Bắt đầu phối đồ</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#heritage"
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-[#252822] border border-[#E3DCCF] text-sm font-medium transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
              >
                <BookOpen className="w-4 h-4 text-[#244A3A]" />
                <span>Khám phá trang phục</span>
              </a>
            </div>
          </div>
        </section>

        {/* Studio Workspace Section (Desktop 2-column: Preview 45%, Configurator 55%) */}
        <section id="studio" className="scroll-mt-20 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3DCCF]/60 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#252822]">
                Phòng phối đồ
              </h2>
              <p className="text-xs sm:text-sm text-[#555A50]">
                Chọn dáng áo, chỉnh màu sắc và phụ kiện theo phong cách riêng
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePinAsLookA()}
                className="min-h-[40px] px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
                title="Ghim làm phương án A"
              >
                <Pin className="w-3.5 h-3.5 text-amber-700" />
                <span>Ghim làm phương án A</span>
              </button>

              <button
                type="button"
                onClick={handleResetOutfit}
                className="min-h-[40px] p-2 rounded-xl text-[#555A50] hover:text-[#252822] hover:bg-stone-100 transition-colors text-xs flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
                title="Khôi phục mặc định"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Làm mới</span>
              </button>
            </div>
          </div>

          {/* Studio Two-Column Grid (Preview ~45% / Configurator ~55%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Desktop 45% = 5.5 cols out of 12 / sticky while scrolling in studio) */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
              {/* Mannequin Viewer */}
              <div className="rounded-2xl overflow-hidden shadow-xs border border-[#E3DCCF]">
                <MannequinViewer
                  gender={gender}
                  garmentType={garmentType}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  pantsColor={pantsColor}
                  pantsStyle={pantsStyle}
                  traditionalAccessories={traditionalAccessories}
                  modernAccessories={modernAccessories}
                  backgroundScene={backgroundScene}
                  showAnatomy={showAnatomy}
                  onSelectAnatomyPart={() => setShowAnatomy(true)}
                />
              </div>

              {/* Background Scene Switcher */}
              <div className="bg-white p-2.5 rounded-xl border border-[#E3DCCF] flex items-center justify-between gap-1 shadow-2xs">
                <span className="text-xs font-semibold text-[#555A50] pl-1 font-sans">
                  Phối cảnh:
                </span>
                <div className="flex items-center gap-1">
                  {[
                    { id: 'hanoi', label: 'Hà Nội' },
                    { id: 'hue', label: 'Cung đình' },
                    { id: 'cafe', label: 'Cà phê' },
                    { id: 'studio', label: 'Studio' }
                  ].map(sc => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => setBackgroundScene(sc.id as any)}
                      className={`min-h-[36px] px-2.5 py-1 text-xs font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#244A3A] ${
                        backgroundScene === sc.id
                          ? 'bg-[#244A3A] text-white shadow-2xs font-semibold'
                          : 'text-[#4A4E46] hover:bg-[#F7F3EB]'
                      }`}
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outfit Summary Card Under Preview with 3 Action Buttons */}
              <div className="bg-white rounded-2xl border border-[#E3DCCF] p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#E3DCCF]/60 pb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#555A50] font-sans">
                    Tóm tắt bộ phối
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSafeguardsOpen(true)}
                    className="text-xs text-[#244A3A] hover:underline flex items-center gap-1 font-medium"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#244A3A]" />
                    <span>Lưu ý văn hóa</span>
                  </button>
                </div>

                <div className="text-xs text-[#4A4E46] space-y-1.5 leading-relaxed">
                  <div className="flex items-center justify-between">
                    <span>Áo: <strong className="text-[#252822]">{activeGarment.name}</strong></span>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: primaryColor }} title={getColorName(primaryColor)} />
                      <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: secondaryColor }} title={getColorName(secondaryColor)} />
                    </div>
                  </div>
                  <div>Quần: <strong className="text-[#252822]">{PANTS_STYLE_NAMES[pantsStyle] || pantsStyle}</strong> ({getColorName(pantsColor)})</div>
                  <div>Sự kiện: <strong className="text-[#252822]">{activeEvent.name}</strong></div>
                  <div className="text-[11px] text-[#555A50] truncate">
                    Phụ kiện: {[...traditionalAccessories, ...modernAccessories].map(a => (TRADITIONAL_ACCESSORY_NAMES as any)[a] || (MODERN_ACCESSORY_NAMES as any)[a] || a).filter(x => x !== 'none' && x !== 'Không dùng').join(', ') || 'Tối giản'}
                  </div>
                </div>

                {/* 3 Main Action Buttons Under Preview */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E3DCCF]/60">
                  <button
                    type="button"
                    onClick={() => setIsLookbookOpen(true)}
                    className="min-h-[44px] px-2 py-2 bg-[#244A3A] hover:bg-[#1A372B] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
                    title="Lưu bộ phối vào Lookbook"
                  >
                    <BookmarkCheck className="w-3.5 h-3.5" />
                    <span>Lưu</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCompareOpen(true)}
                    className="min-h-[44px] px-2 py-2 bg-white hover:bg-stone-50 border border-[#E3DCCF] text-[#252822] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
                    title="So sánh phương án A/B"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 text-[#244A3A]" />
                    <span>So sánh</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsLookbookOpen(true)}
                    className="min-h-[44px] px-2 py-2 bg-[#B6533C] hover:bg-[#9B422E] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6533C]"
                    title="Tải ảnh thẻ Lookbook dạng PNG"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải ảnh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column (Desktop 55% = 7 cols out of 12) */}
            <div className="lg:col-span-7">
              <StyleConfigurator
                gender={gender}
                onGenderChange={setGender}
                garmentType={garmentType}
                onGarmentTypeChange={setGarmentType}
                primaryColor={primaryColor}
                onPrimaryColorChange={setPrimaryColor}
                secondaryColor={secondaryColor}
                onSecondaryColorChange={setSecondaryColor}
                pantsColor={pantsColor}
                onPantsColorChange={setPantsColor}
                pantsStyle={pantsStyle}
                onPantsStyleChange={setPantsStyle}
                traditionalAccessories={traditionalAccessories}
                onToggleTraditionalAccessory={handleToggleTraditionalAccessory}
                modernAccessories={modernAccessories}
                onToggleModernAccessory={handleToggleModernAccessory}
                event={event}
                onEventChange={setEvent}
                onApplyEventRecommendation={handleApplyEventRecommendation}
                onLearnMore={() => {
                  const el = document.getElementById('heritage');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        </section>

        {/* Cultural Heritage & Color Harmony Section */}
        <section className="space-y-6 pt-4 border-t border-[#E3DCCF]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Cultural Card (7 cols) */}
            <div className="lg:col-span-7">
              <CulturalCard
                garmentType={garmentType}
                showAnatomy={showAnatomy}
                onToggleAnatomy={() => setShowAnatomy(!showAnatomy)}
              />
            </div>

            {/* Color Harmony & Weather (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <ColorHarmonyWidget
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                pantsColor={pantsColor}
              />

              <WeatherEventSelector
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
              />
            </div>
          </div>
        </section>

        {/* Curated Presets & User Lookbook Section */}
        <PresetsShowcase
          onSelectPreset={handleApplyLook}
          savedLooks={savedLooks}
          onDeleteSavedLook={handleDeleteSavedLook}
        />
      </main>

      {/* Institutional Footer */}
      <footer className="mt-16 border-t border-[#E3DCCF] bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-base font-serif font-bold text-[#244A3A]">
              Việt Phục Remix
            </div>
            <p className="text-xs text-[#555A50] font-sans">
              Khám phá và phối trang phục truyền thống Việt Nam theo bối cảnh văn hóa và phong cách Gen Z.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#4A4E46] font-medium">
            <a href="#studio" className="hover:text-[#244A3A] transition-colors">
              Phòng phối đồ
            </a>
            <a href="#heritage" className="hover:text-[#244A3A] transition-colors">
              Thông tin trang phục
            </a>
            <a href="#harmony" className="hover:text-[#244A3A] transition-colors">
              Màu sắc & thời tiết
            </a>
            <a href="#presets" className="hover:text-[#244A3A] transition-colors">
              Bộ sưu tập mẫu
            </a>
            <button
              type="button"
              onClick={() => setIsSafeguardsOpen(true)}
              className="hover:text-[#244A3A] transition-colors"
            >
              Lưu ý văn hóa
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        currentLook={currentOutfit}
        onSaveToLookbook={handleSaveToLookbook}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        currentLook={currentOutfit}
        pinnedLookA={pinnedOptionA}
        onPinAsLookA={handlePinAsLookA}
        savedLooks={savedLooks.length > 0 ? savedLooks : CURATED_PRESETS}
        onApplyLook={handleApplyLook}
      />

      <CulturalSafeguardModal
        isOpen={isSafeguardsOpen}
        onClose={() => setIsSafeguardsOpen(false)}
        result={safeguardResult}
      />

      <AIStylistModal
        isOpen={isAIStylistOpen}
        onClose={() => setIsAIStylistOpen(false)}
        currentLook={currentOutfit}
        onApplySuggestedLook={handleApplyLook}
      />
    </div>
  );
}
