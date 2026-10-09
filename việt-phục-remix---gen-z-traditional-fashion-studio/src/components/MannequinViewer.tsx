import React, { useState } from 'react';
import { GarmentCategory, Gender, TraditionalAccessory, ModernAccessory, PantsStyle, SceneBackground } from '../types/fashion';
import { TRADITIONAL_GARMENTS, PANTS_STYLE_NAMES } from '../data/garments';
import { Info, Sparkles, Eye, ShieldCheck, ZoomIn } from 'lucide-react';

interface MannequinViewerProps {
  gender: Gender;
  garmentType: GarmentCategory;
  primaryColor: string;
  secondaryColor: string;
  pantsColor: string;
  pantsStyle: PantsStyle;
  traditionalAccessories: TraditionalAccessory[];
  modernAccessories: ModernAccessory[];
  backgroundScene: SceneBackground;
  showAnatomy: boolean;
  onSelectAnatomyPart?: (partName: string) => void;
  svgId?: string;
}

export const MannequinViewer: React.FC<MannequinViewerProps> = ({
  gender,
  garmentType,
  primaryColor,
  secondaryColor,
  pantsColor,
  pantsStyle,
  traditionalAccessories,
  modernAccessories,
  backgroundScene,
  showAnatomy,
  onSelectAnatomyPart,
  svgId
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const garmentInfo = TRADITIONAL_GARMENTS.find(g => g.id === garmentType) || TRADITIONAL_GARMENTS[0];

  // Helper flags
  const hasKhanXep = traditionalAccessories.includes('khan_xep');
  const hasKhanMoQua = traditionalAccessories.includes('khan_mo_qua');
  const hasKiengBac = traditionalAccessories.includes('kieng_bac');
  const hasNonQuaiThao = traditionalAccessories.includes('non_quai_thao');
  const hasQuatGiay = traditionalAccessories.includes('quat_giay');
  const hasNgocBoi = traditionalAccessories.includes('ngoc_boi');

  const hasChunkySneaker = modernAccessories.includes('chunky_sneaker');
  const hasMatrixSunglasses = modernAccessories.includes('matrix_sunglasses');
  const hasCanvasTote = modernAccessories.includes('canvas_tote');
  const hasOverearHeadphones = modernAccessories.includes('overear_headphones');
  const hasCorsetBelt = modernAccessories.includes('corset_belt');
  const hasDocMartens = modernAccessories.includes('doc_martens');
  const hasPearlChoker = modernAccessories.includes('pearl_choker');

  // Background style
  const getSceneBackground = () => {
    switch (backgroundScene) {
      case 'hanoi':
        return 'from-[#F3ECE0] via-[#E8DFD0] to-[#DFD3C0]'; // Hà Nội phố cổ tường vàng rêu phong
      case 'hue':
        return 'from-[#2A2328] via-[#3C2E3B] to-[#1C161D]'; // Đại Nội Huế hoàng cung thâm trầm huyền bí
      case 'cafe':
        return 'from-[#ECE6DB] via-[#E2D8C7] to-[#D5C7B0]'; // Cà phê chill acoustic tone ấm
      case 'studio':
      default:
        return 'from-[#F7F4EE] via-[#EFEAE1] to-[#E5DDD0]'; // Studio tối giản nghệ thuật
    }
  };

  return (
    <div className={`relative w-full h-[620px] rounded-2xl overflow-hidden bg-gradient-to-b ${getSceneBackground()} border border-stone-200/80 shadow-sm flex items-center justify-center transition-colors duration-500`}>
      {/* Background Architectural Watermark Subtle Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 600 600" className="w-[120%] h-[120%] text-stone-900 fill-current">
          <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="220" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="300" r="160" fill="none" stroke="currentColor" strokeWidth="2" />
          {/* Drum of Dong Son motif star rays */}
          {[...Array(14)].map((_, i) => (
            <line
              key={i}
              x1="300"
              y1="300"
              x2={300 + 260 * Math.cos((i * 2 * Math.PI) / 14)}
              y2={300 + 260 * Math.sin((i * 2 * Math.PI) / 14)}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>

      {/* Simulation Notice & Garment Info Header */}
      <div className="absolute top-3.5 left-4 flex flex-col gap-1 z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[#244A3A] bg-[#F7F3EB]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#244A3A]/20 shadow-2xs">
            Minh họa phối đồ
          </span>
          <span className="text-xs font-semibold text-[#252822]">
            {garmentInfo.name}
          </span>
        </div>
        <span className="text-[11px] text-[#555A50] max-w-[220px] truncate hidden sm:block">
          {gender === 'female' ? 'Phom nữ' : gender === 'male' ? 'Phom nam' : 'Phom unisex'} · {garmentInfo.silhouette.split(',')[0]}
        </span>
      </div>

      {/* Current Pants Style Indicator Badge */}
      <div className="absolute top-3.5 right-4 z-10 pointer-events-none">
        <span className="text-[11px] font-medium text-[#4A4E46] bg-[#F7F3EB]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#E3DCCF] shadow-2xs">
          Quần: {PANTS_STYLE_NAMES[pantsStyle] || pantsStyle}
        </span>
      </div>

      {/* Main SVG Vector Layering */}
      <svg
        id={svgId || 'mannequin-viewer-svg'}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 700"
        width="400"
        height="700"
        className="w-full h-full max-h-[580px] drop-shadow-md select-none transition-all duration-300"
      >
        <defs>
          {/* Silk Gradient Filter */}
          <linearGradient id="silkSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
          </linearGradient>

          {/* Shadow filters */}
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* --- 1. SHADOW UNDER FEET --- */}
        <ellipse cx="200" cy="650" rx="90" ry="12" fill="#000000" opacity="0.14" />

        {/* --- 2. BODY BASE & SKIN (MANNEQUIN) --- */}
        {/* Legs / Skin underneath */}
        <path d="M175 480 L175 620 L190 620 L190 480 Z" fill="#E8D5C4" />
        <path d="M210 480 L210 620 L225 620 L225 480 Z" fill="#E8D5C4" />

        {/* --- 3. PANTS / SKIRT LAYER (Distinct Visuals for all 5 styles) --- */}
        {pantsStyle === 'traditional_silk' ? (
          // 1. Quần Lụa Truyền Thống: Ống suông rộng, rủ thướt tha, đường cong tơ lụa mềm
          <g filter="url(#softShadow)">
            <path
              d="M158 380 Q152 480 142 615 L192 615 Q195 480 196 400 Z"
              fill={pantsColor}
              stroke="#000000"
              strokeWidth="0.5"
              strokeOpacity="0.15"
            />
            <path
              d="M204 400 Q205 480 208 615 L258 615 Q248 480 242 380 Z"
              fill={pantsColor}
              stroke="#000000"
              strokeWidth="0.5"
              strokeOpacity="0.15"
            />
            {/* Silk sheen curve highlights */}
            <path d="M150 420 Q162 520 166 612" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" fill="none" />
            <path d="M250 420 Q238 520 234 612" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" fill="none" />
            <path d="M142 615 Q167 618 192 615" stroke="#000000" strokeWidth="1" strokeOpacity="0.1" fill="none" />
            <path d="M208 615 Q233 618 258 615" stroke="#000000" strokeWidth="1" strokeOpacity="0.1" fill="none" />
          </g>
        ) : pantsStyle === 'wide_leg_trousers' ? (
          // 2. Quần Âu Suông Xếp Ly: Phom đứng, đường ly âu sắc nét, gấu thẳng gập lai
          <g filter="url(#softShadow)">
            <path
              d="M160 380 L146 615 L192 615 L195 400 Z"
              fill={pantsColor}
              stroke="#000000"
              strokeWidth="0.6"
              strokeOpacity="0.2"
            />
            <path
              d="M205 400 L208 615 L254 615 L240 380 Z"
              fill={pantsColor}
              stroke="#000000"
              strokeWidth="0.6"
              strokeOpacity="0.2"
            />
            {/* Sharp tailored center creases (đường ly quần âu) */}
            <line x1="169" y1="390" x2="169" y2="610" stroke="#000000" strokeWidth="1.2" strokeOpacity="0.22" />
            <line x1="231" y1="390" x2="231" y2="610" stroke="#000000" strokeWidth="1.2" strokeOpacity="0.22" />
            {/* Tailored hem cuff lines */}
            <line x1="146" y1="608" x2="192" y2="608" stroke="#000000" strokeWidth="0.8" strokeOpacity="0.25" />
            <line x1="208" y1="608" x2="254" y2="608" stroke="#000000" strokeWidth="0.8" strokeOpacity="0.25" />
          </g>
        ) : pantsStyle === 'denim_jeans' ? (
          // 3. Quần Jeans Ống Đứng: Chỉ vàng may nổi hai đường, túi cong phía trước
          <g filter="url(#softShadow)">
            <path d="M164 380 L152 615 L193 615 L195 400 Z" fill={pantsColor} />
            <path d="M205 400 L207 615 L248 615 L236 380 Z" fill={pantsColor} />
            {/* Double golden-yellow denim stitching */}
            <line x1="154" y1="400" x2="154" y2="610" stroke="#FBBF24" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="157" y1="400" x2="157" y2="610" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="3 2" />
            <line x1="246" y1="400" x2="246" y2="610" stroke="#FBBF24" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="243" y1="400" x2="243" y2="610" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="3 2" />
            {/* Jeans hem rolled cuff */}
            <rect x="151" y="609" width="42" height="6" fill="#64748B" opacity="0.3" />
            <rect x="207" y="609" width="42" height="6" fill="#64748B" opacity="0.3" />
          </g>
        ) : pantsStyle === 'linen_culottes' ? (
          // 4. Quần Lửng Culottes Đũi Nam Cao: Dáng lửng trên mắt cá chân, ống xòe thoải mái, thớ vải đũi
          <g filter="url(#softShadow)">
            {/* Shorter legs ending at y = 565, revealing ankles */}
            <path
              d="M162 380 L140 565 L192 565 L196 400 Z"
              fill={pantsColor}
              stroke="#000000"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
            <path
              d="M204 400 L208 565 L260 565 L238 380 Z"
              fill={pantsColor}
              stroke="#000000"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
            {/* Relaxed hem folds & rustic linen dashes */}
            <line x1="140" y1="565" x2="192" y2="565" stroke="#78350F" strokeWidth="1.2" strokeOpacity="0.3" />
            <line x1="208" y1="565" x2="260" y2="565" stroke="#78350F" strokeWidth="1.2" strokeOpacity="0.3" />
            <line x1="155" y1="450" x2="160" y2="453" stroke="#000000" strokeWidth="1" strokeOpacity="0.12" />
            <line x1="245" y1="460" x2="240" y2="463" stroke="#000000" strokeWidth="1" strokeOpacity="0.12" />
            {/* Visible lower legs skin for cropped culottes */}
            <path d="M160 565 L160 615 L175 615 L175 565 Z" fill="#E8D5C4" />
            <path d="M225 565 L225 615 L240 615 L240 565 Z" fill="#E8D5C4" />
          </g>
        ) : (
          // 5. Váy Đũi / Đầm Lĩnh Xếp Ly: Dáng chữ A xòe rộng, xếp ly nan quạt
          <g filter="url(#softShadow)">
            <path
              d="M160 380 Q200 395 240 380 L264 595 Q200 612 136 595 Z"
              fill={pantsColor}
            />
            {/* Radial pleat lines */}
            {[150, 168, 184, 200, 216, 232, 250].map((x, i) => (
              <line key={i} x1={x} y1="390" x2={x + (x - 200) * 0.3} y2="598" stroke="#000000" strokeWidth="1.2" strokeOpacity="0.16" />
            ))}
            {/* Hem border */}
            <path d="M136 595 Q200 612 264 595" stroke="#000000" strokeWidth="1" strokeOpacity="0.2" fill="none" />
          </g>
        )}

        {/* --- 4. SHOES LAYER --- */}
        {hasChunkySneaker ? (
          // Gen Z Chunky Sneaker
          <g filter="url(#softShadow)">
            {/* Left Sneaker */}
            <path d="M142 615 L188 615 L192 638 L135 638 Q135 625 142 615 Z" fill="#FFFFFF" />
            <path d="M135 632 L194 632 L192 642 L135 642 Z" fill="#E2E8F0" />
            <rect x="145" y="620" width="30" height="5" rx="2" fill={secondaryColor} opacity="0.8" />
            <circle cx="150" cy="626" r="1.5" fill="#475569" />
            <circle cx="160" cy="626" r="1.5" fill="#475569" />
            <circle cx="170" cy="626" r="1.5" fill="#475569" />

            {/* Right Sneaker */}
            <path d="M212 615 L258 615 Q265 625 265 638 L208 638 L212 615 Z" fill="#FFFFFF" />
            <path d="M206 632 L265 632 L265 642 L208 642 Z" fill="#E2E8F0" />
            <rect x="225" y="620" width="30" height="5" rx="2" fill={secondaryColor} opacity="0.8" />
            <circle cx="230" cy="626" r="1.5" fill="#475569" />
            <circle cx="240" cy="626" r="1.5" fill="#475569" />
            <circle cx="250" cy="626" r="1.5" fill="#475569" />
          </g>
        ) : hasDocMartens ? (
          // Leather Platform Boots
          <g filter="url(#softShadow)">
            <path d="M144 595 L185 595 L190 640 L136 640 Z" fill="#18181B" />
            <path d="M215 595 L256 595 L264 640 L210 640 Z" fill="#18181B" />
            <line x1="135" y1="638" x2="190" y2="638" stroke="#F59E0B" strokeWidth="2" />
            <line x1="210" y1="638" x2="265" y2="638" stroke="#F59E0B" strokeWidth="2" />
          </g>
        ) : (
          // Traditional Guốc mộc quai nhung / Giày bệt lụa
          <g filter="url(#softShadow)">
            {/* Left traditional shoe */}
            <path d="M148 618 Q165 615 185 618 L188 632 L146 632 Z" fill="#78350F" />
            <path d="M152 618 Q166 612 180 618" stroke="#991B1B" strokeWidth="5" fill="none" />
            {/* Right traditional shoe */}
            <path d="M215 618 Q235 615 252 618 L254 632 L212 632 Z" fill="#78350F" />
            <path d="M220 618 Q234 612 248 618" stroke="#991B1B" strokeWidth="5" fill="none" />
          </g>
        )}

        {/* --- 5. UPPER BODY TORSO & MAIN GARMENT --- */}
        {/* Underlayer / Neck skin */}
        <path d="M185 140 L215 140 L218 190 L182 190 Z" fill="#E8D5C4" />

        {/* Garment Specific Vector Geometries */}
        {garmentType === 'tu_than' ? (
          // --- ÁO TỨ THÂN KINH BẮC ---
          <g filter="url(#softShadow)">
            {/* Yếm đào lụa bên trong */}
            <path d="M175 160 Q200 175 225 160 L232 290 Q200 310 168 290 Z" fill={secondaryColor} />
            <circle cx="200" cy="180" r="1.5" fill="#FFE4E6" />
            {/* Dải dây yếm qua cổ */}
            <path d="M180 160 Q200 148 220 160" stroke="#FDA4AF" strokeWidth="2" fill="none" />

            {/* Áo khoác ngoài tứ thân xẻ 4 vạt */}
            {/* Tà trái (theo góc nhìn người xem = bên phải người mặc) */}
            <path
              d="M155 180 L180 180 L185 360 L140 550 L115 540 L135 340 Z"
              fill={primaryColor}
            />
            {/* Tà phải (theo góc nhìn người xem = bên trái người mặc) */}
            <path
              d="M245 180 L220 180 L215 360 L260 550 L285 540 L265 340 Z"
              fill={primaryColor}
            />

            {/* Nút buộc thắt 2 vạt trước eo */}
            <circle cx="200" cy="330" r="9" fill={primaryColor} />
            {/* Hai dải buộc thắt rủ xuống */}
            <path d="M196 335 Q190 380 180 430" stroke={primaryColor} strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M204 335 Q212 390 220 445" stroke={primaryColor} strokeWidth="8" strokeLinecap="round" fill="none" />

            {/* Dải thắt lưng xanh (ruột tượng) */}
            <path d="M165 315 Q200 325 235 315 L235 330 Q200 340 165 330 Z" fill="#10B981" />

            {/* Tay áo lửng/dài mềm mại */}
            <path d="M155 180 L110 260 L125 275 L160 210 Z" fill={primaryColor} />
            <path d="M245 180 L290 260 L275 275 L240 210 Z" fill={primaryColor} />
          </g>
        ) : garmentType === 'nhat_binh' ? (
          // --- ÁO NHẬT BÌNH CUNG ĐÌNH ---
          <g filter="url(#softShadow)">
            {/* Thân áo chính xẻ ngực */}
            <path
              d="M145 180 L255 180 L270 520 L130 520 Z"
              fill={primaryColor}
            />
            <path d="M145 180 L255 180 L270 520 L130 520 Z" fill="url(#silkSheen)" />

            {/* Cổ áo hình chữ nhật đặc trưng (Bản cổ Nhật Bình) */}
            <path
              d="M172 170 L228 170 L228 290 L172 290 Z"
              fill="#D97706"
              stroke="#FDE68A"
              strokeWidth="2"
            />
            {/* Hoa văn dải chỉ ngũ sắc trên cổ */}
            <line x1="176" y1="175" x2="176" y2="285" stroke="#B91C1C" strokeWidth="2.5" />
            <line x1="180" y1="175" x2="180" y2="285" stroke="#3B82F6" strokeWidth="2.5" />
            <line x1="184" y1="175" x2="184" y2="285" stroke="#10B981" strokeWidth="2.5" />
            <line x1="224" y1="175" x2="224" y2="285" stroke="#B91C1C" strokeWidth="2.5" />
            <line x1="220" y1="175" x2="220" y2="285" stroke="#3B82F6" strokeWidth="2.5" />
            <line x1="216" y1="175" x2="216" y2="285" stroke="#10B981" strokeWidth="2.5" />

            {/* Khuy ngực cài tâm */}
            <circle cx="200" cy="275" r="4.5" fill="#FEF08A" stroke="#78350F" strokeWidth="1" />

            {/* Hai dải phụng lụa ngũ sắc rủ ngực áo */}
            <path d="M185 290 L185 460 L195 460 L195 290 Z" fill="#E11D48" />
            <path d="M205 290 L205 460 L215 460 L215 290 Z" fill="#E11D48" />

            {/* Họa tiết mây sóng cuối dải phụng */}
            <rect x="185" y="440" width="10" height="20" fill="#FBBF24" />
            <rect x="205" y="440" width="10" height="20" fill="#FBBF24" />

            {/* Tay áo thụng viền ngũ sắc triều đình */}
            <path d="M145 180 L80 300 L115 330 L160 250 Z" fill={primaryColor} />
            <path d="M255 180 L320 300 L285 330 L240 250 Z" fill={primaryColor} />

            {/* 5 dải màu sặc sỡ ở đầu ống tay áo */}
            <line x1="82" y1="298" x2="113" y2="328" stroke="#E11D48" strokeWidth="4" />
            <line x1="86" y1="294" x2="117" y2="324" stroke="#FBBF24" strokeWidth="4" />
            <line x1="90" y1="290" x2="121" y2="320" stroke="#3B82F6" strokeWidth="4" />
            <line x1="94" y1="286" x2="125" y2="316" stroke="#10B981" strokeWidth="4" />

            <line x1="318" y1="298" x2="287" y2="328" stroke="#E11D48" strokeWidth="4" />
            <line x1="314" y1="294" x2="283" y2="324" stroke="#FBBF24" strokeWidth="4" />
            <line x1="310" y1="290" x2="279" y2="320" stroke="#3B82F6" strokeWidth="4" />
            <line x1="306" y1="286" x2="275" y2="316" stroke="#10B981" strokeWidth="4" />
          </g>
        ) : garmentType === 'giao_linh' ? (
          // --- ÁO GIAO LĨNH (HỮU NHẬM: VẠT PHẢI ĐÈ VẠT TRÁI THEO PHÍA NGƯỜI MẶC) ---
          <g filter="url(#softShadow)">
            {/* Vạt trong (bên trái người mặc) */}
            <path d="M150 180 L200 170 L240 290 L250 510 L140 510 Z" fill={primaryColor} opacity="0.9" />

            {/* Vạt ngoài (bên phải người mặc) đè lên tạo cổ chữ Y xuôi */}
            <path
              d="M250 180 L200 170 L160 290 L140 520 L260 520 Z"
              fill={primaryColor}
            />
            <path d="M250 180 L200 170 L160 290 L140 520 L260 520 Z" fill="url(#silkSheen)" />

            {/* Viền cổ tương phản */}
            <path d="M185 168 L225 270" stroke={secondaryColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M215 168 L175 270" stroke={secondaryColor} strokeWidth="6" strokeLinecap="round" />

            {/* Thắt lưng dải lụa thắt nút ngang bụng */}
            <rect x="155" y="300" width="90" height="14" rx="2" fill={secondaryColor} />
            <path d="M200 314 L190 390 L202 390 L208 314 Z" fill={secondaryColor} />

            {/* Tay áo giao lĩnh suông */}
            <path d="M150 180 L95 280 L125 300 L160 230 Z" fill={primaryColor} />
            <path d="M250 180 L305 280 L275 300 L240 230 Z" fill={primaryColor} />
          </g>
        ) : garmentType === 'ngu_than_tay_thung' ? (
          // --- ÁO NGŨ THÂN TAY THỤNG (ÁO TÍA / ÁO LỄ) ---
          <g filter="url(#softShadow)">
            {/* Thân áo ngũ thân dài thụng */}
            <path
              d="M148 180 L252 180 L275 530 L125 530 Z"
              fill={primaryColor}
            />
            <path d="M148 180 L252 180 L275 530 L125 530 Z" fill="url(#silkSheen)" />

            {/* Cổ đứng lập lĩnh cao */}
            <path d="M182 155 Q200 162 218 155 L218 175 Q200 182 182 175 Z" fill={primaryColor} stroke="#E2E8F0" strokeWidth="1" />
            {/* Lớp viền cổ trong trắng ngà */}
            <path d="M185 153 Q200 159 215 153" stroke="#FAF5EE" strokeWidth="2.5" fill="none" />

            {/* Đường nẹp áo cài chéo sang sườn bên phải theo phía người mặc */}
            <path d="M200 175 Q212 200 226 230 L228 350" stroke="#000000" strokeWidth="1" strokeOpacity="0.25" fill="none" />

            {/* 5 Cúc Khuy Ngũ Thường (Đồng / Ngọc bọc) */}
            <circle cx="200" cy="177" r="3.5" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
            <circle cx="210" cy="195" r="3.5" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
            <circle cx="220" cy="216" r="3.5" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
            <circle cx="226" cy="245" r="3.5" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
            <circle cx="227" cy="280" r="3.5" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />

            {/* Ống tay đại tụ thụng buông lớn xòe rộng */}
            <path d="M148 180 L65 310 L105 380 L155 270 Z" fill={primaryColor} />
            <path d="M252 180 L335 310 L295 380 L245 270 Z" fill={primaryColor} />
            <line x1="72" y1="315" x2="100" y2="375" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" />
            <line x1="328" y1="315" x2="300" y2="375" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" />
          </g>
        ) : garmentType === 'ao_dai_tan_thoi' ? (
          // --- ÁO DÀI LEMUR / TÂN THỜI ---
          <g filter="url(#softShadow)">
            {/* Thân áo ôm chít eo tôn dáng và 2 tà bay dài */}
            <path
              d="M165 178 Q175 250 182 290 Q170 360 145 570 L200 570 L200 350 L200 570 L255 570 Q230 360 218 290 Q225 250 235 178 Z"
              fill={primaryColor}
            />
            <path
              d="M165 178 Q175 250 182 290 Q170 360 145 570 L200 570 L200 350 L200 570 L255 570 Q230 360 218 290 Q225 250 235 178 Z"
              fill="url(#silkSheen)"
            />

            {/* Cổ sen cách điệu mềm mại Lemur */}
            <path d="M182 165 C185 178 198 180 200 175 C202 180 215 178 218 165 Z" fill="#FFFFFF" stroke={secondaryColor} strokeWidth="1" />

            {/* Tay áo ôm sát cổ tay */}
            <path d="M165 178 L125 280 L138 288 L172 210 Z" fill={primaryColor} />
            <path d="M235 178 L275 280 L262 288 L228 210 Z" fill={primaryColor} />

            {/* Cúc bấm ngực chéo */}
            <circle cx="203" cy="188" r="2.5" fill="#FDE047" />
            <circle cx="212" cy="204" r="2.5" fill="#FDE047" />
            <circle cx="218" cy="222" r="2.5" fill="#FDE047" />
          </g>
        ) : (
          // --- ÁO NGŨ THÂN TAY CHẼN (CHUẨN MỰC BẢN SẮC) ---
          <g filter="url(#softShadow)">
            {/* Vạt Cả (Thân chính phủ ngoài) */}
            <path
              d="M152 180 L248 180 L265 520 L135 520 Z"
              fill={primaryColor}
            />
            <path d="M152 180 L248 180 L265 520 L135 520 Z" fill="url(#silkSheen)" />

            {/* Cổ Lập Lĩnh Đứng Thẳng */}
            <path d="M184 152 Q200 158 216 152 L216 174 Q200 180 184 174 Z" fill={primaryColor} />
            {/* Cổ lót trong màu trắng ngà thanh tao */}
            <path d="M186 150 Q200 156 214 150" stroke="#FAF5EE" strokeWidth="2.5" fill="none" />

            {/* Đường nẹp vạt cả cài sang sườn bên phải theo phía người mặc */}
            <path d="M200 174 Q210 195 224 220 L226 340" stroke="#000000" strokeWidth="1" strokeOpacity="0.3" fill="none" />

            {/* 5 Cúc Khuy Ngũ Thường (Nhân - Nghĩa - Lễ - Trí - Tín) */}
            <circle cx="200" cy="176" r="3.2" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
            <circle cx="209" cy="192" r="3.2" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
            <circle cx="218" cy="210" r="3.2" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
            <circle cx="224" cy="235" r="3.2" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
            <circle cx="225" cy="270" r="3.2" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />

            {/* Tay Chẽn Gọn Gàng */}
            <path d="M152 180 L115 285 L130 295 L164 215 Z" fill={primaryColor} />
            <path d="M248 180 L285 285 L270 295 L236 215 Z" fill={primaryColor} />

            {/* Xẻ tà hông lộ thân con và quần lụa */}
            <line x1="145" y1="360" x2="140" y2="520" stroke="#000000" strokeWidth="1" strokeOpacity="0.2" />
            <line x1="255" y1="360" x2="260" y2="520" stroke="#000000" strokeWidth="1" strokeOpacity="0.2" />
          </g>
        )}

        {/* --- 6. MODERN REMIX ACCENT: CORSET BELT --- */}
        {hasCorsetBelt && (
          <g filter="url(#softShadow)">
            <path d="M168 285 Q200 295 232 285 L235 335 Q200 345 165 335 Z" fill="#18181B" />
            {/* Lacing details */}
            <line x1="195" y1="292" x2="205" y2="300" stroke="#FBBF24" strokeWidth="1.5" />
            <line x1="205" y1="300" x2="195" y2="308" stroke="#FBBF24" strokeWidth="1.5" />
            <line x1="195" y1="308" x2="205" y2="316" stroke="#FBBF24" strokeWidth="1.5" />
            <line x1="205" y1="316" x2="195" y2="324" stroke="#FBBF24" strokeWidth="1.5" />
          </g>
        )}

        {/* --- 7. HANDS & ARMS --- */}
        <ellipse cx="120" cy="295" rx="8" ry="10" fill="#E8D5C4" />
        <ellipse cx="280" cy="295" rx="8" ry="10" fill="#E8D5C4" />

        {/* --- 8. NECKLACE LAYER (KIỀNG BẠC / PEARL CHOKER) --- */}
        {hasKiengBac && (
          <g filter="url(#softShadow)">
            <path
              d="M178 168 Q200 195 222 168"
              stroke="#E2E8F0"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Silver sheen highlights */}
            <path
              d="M185 174 Q200 192 215 174"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {hasPearlChoker && (
          <g>
            {[...Array(9)].map((_, i) => (
              <circle
                key={i}
                cx={182 + i * 4.5}
                cy={170 + Math.sin((i / 8) * Math.PI) * 10}
                r="2.5"
                fill="#F8FAFC"
                stroke="#CBD5E1"
                strokeWidth="0.5"
              />
            ))}
          </g>
        )}

        {/* --- 9. HEAD & FACIAL MANNEQUIN --- */}
        {/* Head */}
        <ellipse cx="200" cy="105" rx="26" ry="34" fill="#E8D5C4" filter="url(#softShadow)" />
        {/* Subtle minimalist features */}
        <path d="M198 108 L200 118 L204 118" stroke="#D4B9A4" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M194 126 Q200 129 206 126" stroke="#C58575" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Eyes */}
        <ellipse cx="190" cy="102" rx="2.5" ry="1.2" fill="#4B382A" />
        <ellipse cx="210" cy="102" rx="2.5" ry="1.2" fill="#4B382A" />

        {/* Hair Styles based on gender & accessories */}
        {gender === 'female' ? (
          <g>
            {/* Búi tóc trâm cài phụ nữ Việt */}
            <path d="M174 100 Q200 68 226 100 Q200 80 174 100 Z" fill="#262626" />
            <ellipse cx="200" cy="72" rx="14" ry="10" fill="#262626" />
            {/* Trâm cài ngọc */}
            <line x1="184" y1="68" x2="216" y2="76" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="216" cy="76" r="3" fill="#E11D48" />
          </g>
        ) : (
          <g>
            {/* Tóc ngắn gọn gàng nam giới */}
            <path d="M174 98 Q200 70 226 98 Q200 76 174 98 Z" fill="#262626" />
            <path d="M174 98 L176 112 Q174 105 174 98 Z" fill="#262626" />
            <path d="M226 98 L224 112 Q226 105 226 98 Z" fill="#262626" />
          </g>
        )}

        {/* --- 10. HEADWEAR ACCESSORIES --- */}
        {hasKhanXep && (
          // Khăn xếp 7 nếp truyền thống
          <g filter="url(#softShadow)">
            <path d="M170 94 Q200 72 230 94 L228 82 Q200 60 172 82 Z" fill="#18181B" />
            {/* 7 nếp gấp tinh xảo */}
            {[0, 1, 2, 3, 4, 5, 6].map(step => (
              <path
                key={step}
                d={`M${172 + step} ${88 - step * 1.5} Q200 ${66 - step * 1.5} ${228 - step} ${88 - step * 1.5}`}
                stroke="#3F3F46"
                strokeWidth="1"
                fill="none"
              />
            ))}
          </g>
        )}

        {hasKhanMoQua && (
          // Khăn mỏ quạ Kinh Bắc hình búp sen
          <g filter="url(#softShadow)">
            <path
              d="M170 92 Q200 62 230 92 L200 70 Z"
              fill="#111827"
            />
            {/* Nút thắt quai dưới cằm */}
            <path d="M172 94 Q186 138 200 138 Q214 138 228 94" stroke="#111827" strokeWidth="4" fill="none" />
          </g>
        )}

        {/* --- 11. EYEWEAR: MATRIX SUNGLASSES --- */}
        {hasMatrixSunglasses && (
          <g filter="url(#softShadow)">
            {/* Gọng kính hẹp retro */}
            <ellipse cx="190" cy="103" rx="7" ry="4" fill="#09090B" />
            <ellipse cx="210" cy="103" rx="7" ry="4" fill="#09090B" />
            <line x1="197" y1="103" x2="203" y2="103" stroke="#09090B" strokeWidth="1.5" />
            <line x1="183" y1="102" x2="175" y2="100" stroke="#09090B" strokeWidth="1.5" />
            <line x1="217" y1="102" x2="225" y2="100" stroke="#09090B" strokeWidth="1.5" />
            {/* Lens sheen */}
            <line x1="186" y1="101" x2="192" y2="105" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
            <line x1="206" y1="101" x2="212" y2="105" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
          </g>
        )}

        {/* --- 12. HEADPHONES OVER-EAR --- */}
        {hasOverearHeadphones && (
          <g filter="url(#softShadow)">
            {/* Headband metallic */}
            <path d="M170 95 Q200 48 230 95" stroke="#71717A" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Earcups */}
            <rect x="165" y="88" width="8" height="22" rx="4" fill="#27272A" />
            <rect x="227" y="88" width="8" height="22" rx="4" fill="#27272A" />
            <circle cx="169" cy="99" r="2" fill="#E4E4E7" />
            <circle cx="231" cy="99" r="2" fill="#E4E4E7" />
          </g>
        )}

        {/* --- 13. HANDHELD / SIDE ACCESSORIES --- */}
        {/* Nón quai thao (Nón ba tầm) */}
        {hasNonQuaiThao && (
          <g filter="url(#softShadow)">
            <ellipse cx="320" cy="260" rx="35" ry="35" fill="#D6C7B2" stroke="#8C5E3C" strokeWidth="2" />
            <ellipse cx="320" cy="260" rx="20" ry="20" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="3 2" />
            <ellipse cx="320" cy="260" rx="6" ry="6" fill="#78350F" />
            {/* Quai thao lụa tơ rủ xuống */}
            <path d="M310 290 Q290 350 280 430" stroke="#6D28D9" strokeWidth="3" fill="none" />
            <path d="M330 290 Q340 360 330 440" stroke="#6D28D9" strokeWidth="3" fill="none" />
          </g>
        )}

        {/* Quạt Giấy Phù Lãng */}
        {hasQuatGiay && (
          <g filter="url(#softShadow)">
            <path d="M110 300 L75 255 Q100 240 135 255 Z" fill="#FEF3C7" stroke="#92400E" strokeWidth="1" />
            {/* Nan quạt tre */}
            <line x1="110" y1="300" x2="82" y2="252" stroke="#92400E" strokeWidth="1" />
            <line x1="110" y1="300" x2="98" y2="246" stroke="#92400E" strokeWidth="1" />
            <line x1="110" y1="300" x2="114" y2="246" stroke="#92400E" strokeWidth="1" />
            <line x1="110" y1="300" x2="128" y2="252" stroke="#92400E" strokeWidth="1" />
            {/* Họa tiết hoa sen nhỏ */}
            <circle cx="106" cy="262" r="3" fill="#E11D48" />
          </g>
        )}

        {/* Dải Khánh Ngọc Bội treo sườn áo */}
        {hasNgocBoi && (
          <g filter="url(#softShadow)">
            <line x1="225" y1="330" x2="225" y2="350" stroke="#DC2626" strokeWidth="1.5" />
            {/* Miếng ngọc bội hình khánh */}
            <polygon points="218,350 232,350 230,364 220,364" fill="#6EE7B7" stroke="#047857" strokeWidth="1" />
            {/* Tua rua đỏ rủ */}
            <line x1="223" y1="365" x2="223" y2="395" stroke="#DC2626" strokeWidth="2" />
            <line x1="225" y1="365" x2="225" y2="400" stroke="#DC2626" strokeWidth="2" />
            <line x1="227" y1="365" x2="227" y2="395" stroke="#DC2626" strokeWidth="2" />
          </g>
        )}

        {/* Túi Tote Canvas Gen Z */}
        {hasCanvasTote && (
          <g filter="url(#softShadow)">
            {/* Quai túi khoác vai */}
            <path d="M125 210 Q95 240 100 290" stroke="#D1D5DB" strokeWidth="3" fill="none" />
            {/* Thân túi canvas hình chữ nhật */}
            <rect x="80" y="290" width="44" height="52" rx="3" fill="#FDFBF7" stroke="#E5E7EB" strokeWidth="1" />
            {/* Typo chữ trên túi */}
            <text x="102" y="312" fontSize="6" fontWeight="bold" fill="#B91C1C" textAnchor="middle" fontFamily="sans-serif">
              VIỆT PHỤC
            </text>
            <text x="102" y="322" fontSize="5" fontWeight="semibold" fill="#18181B" textAnchor="middle" fontFamily="sans-serif">
              REMIX 2026
            </text>
          </g>
        )}

        {/* --- 14. INTERACTIVE ANATOMY MARKERS (Khi bật chế độ Khám Phá) --- */}
        {showAnatomy && (
          <g className="cursor-pointer">
            {/* Marker 1: Cổ Lập Lĩnh / Bản Cổ */}
            <g
              transform="translate(200, 165)"
              onClick={() => onSelectAnatomyPart && onSelectAnatomyPart('Cổ áo')}
              onMouseEnter={() => setActiveTooltip('Cổ lập lĩnh (Cổ đứng) ôm khít cổ, thể hiện phong thái ngay ngắn, đoan trang.')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <circle cx="0" cy="0" r="10" fill="#B91C1C" fillOpacity="0.25" className="animate-ping" />
              <circle cx="0" cy="0" r="7" fill="#B91C1C" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="0" y="3" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">1</text>
            </g>

            {/* Marker 2: 5 Cúc Khuy Ngũ Thường */}
            <g
              transform="translate(225, 235)"
              onClick={() => onSelectAnatomyPart && onSelectAnatomyPart('Năm Cúc Khuy')}
              onMouseEnter={() => setActiveTooltip('5 cúc áo cài sang sườn bên phải theo phía người mặc (Nhân, Nghĩa, Lễ, Trí, Tín).')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <circle cx="0" cy="0" r="10" fill="#D97706" fillOpacity="0.25" className="animate-ping" />
              <circle cx="0" cy="0" r="7" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="0" y="3" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">2</text>
            </g>

            {/* Marker 3: Thân Con & Tứ Thân Phụ Mẫu */}
            <g
              transform="translate(170, 340)"
              onClick={() => onSelectAnatomyPart && onSelectAnatomyPart('Thân Áo')}
              onMouseEnter={() => setActiveTooltip('Cấu trúc 5 thân: 4 thân ngoài là Tứ thân phụ mẫu che chở cho thân con lót bên trong.')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <circle cx="0" cy="0" r="10" fill="#047857" fillOpacity="0.25" className="animate-ping" />
              <circle cx="0" cy="0" r="7" fill="#047857" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="0" y="3" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">3</text>
            </g>

            {/* Marker 4: Tay Áo */}
            <g
              transform="translate(285, 275)"
              onClick={() => onSelectAnatomyPart && onSelectAnatomyPart('Tay Áo')}
              onMouseEnter={() => setActiveTooltip('Tay chẽn gọn gàng sinh hoạt, hoặc tay thụng đại tụ buông thõng vuông vắn trang nghiêm.')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <circle cx="0" cy="0" r="10" fill="#2563EB" fillOpacity="0.25" className="animate-ping" />
              <circle cx="0" cy="0" r="7" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="0" y="3" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">4</text>
            </g>
          </g>
        )}
      </svg>

      {/* Floating Anatomy Tooltip Overlay */}
      {showAnatomy && activeTooltip && (
        <div className="absolute bottom-5 inset-x-6 bg-stone-900/95 text-stone-100 p-3 rounded-xl shadow-lg border border-stone-700 text-xs backdrop-blur-sm transition-all duration-200 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{activeTooltip}</p>
        </div>
      )}

      {/* Bottom Scene Indicator */}
      <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-[11px] text-stone-600 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-stone-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Phối cảnh: {backgroundScene === 'hanoi' ? 'Hà Nội Cổ Kính' : backgroundScene === 'hue' ? 'Cung Đình Huế' : backgroundScene === 'cafe' ? 'Phố Cà Phê' : 'Studio Nghệ Thuật'}</span>
      </div>
    </div>
  );
};
