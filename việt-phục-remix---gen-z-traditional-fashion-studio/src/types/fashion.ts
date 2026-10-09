export type Gender = 'female' | 'male' | 'unisex';

export type GarmentCategory = 
  | 'ngu_than_tay_chen'
  | 'ngu_than_tay_thung'
  | 'tu_than'
  | 'nhat_binh'
  | 'giao_linh'
  | 'ao_dai_tan_thoi';

export interface HistoricalReference {
  documentTitle: string;
  authorOrOrg: string;
  yearOrPeriod?: string;
  description: string;
  link?: string;
  isVerifiedFact: boolean;
  type: 'historical_record' | 'museum_archive' | 'scholarly_work' | 'folk_tradition';
}

export interface GarmentDefinition {
  id: GarmentCategory;
  name: string;
  historicalPeriod: string;
  origin: string;
  silhouette: string;
  description: string;
  historicalFacts: string; // Dữ kiện lịch sử đã kiểm chứng
  culturalSymbolism: string; // Diễn giải biểu tượng văn hóa & dân gian
  modernRemixPotential: string; // Tiềm năng sáng tạo Gen Z
  references: HistoricalReference[]; // Nguồn tham khảo có thật
  anatomy: {
    part: string;
    description: string;
    significance: string;
  }[];
  defaultColor: string;
  defaultPantsColor: string;
  genderRecommendation: Gender[];
  safeguardRules: {
    rule: string;
    reason: string;
    suggestion: string;
  }[];
}

export type EventOccasion = 
  | 'graduation'
  | 'street_coffee'
  | 'wedding_guest'
  | 'temple_festival'
  | 'fashion_week'
  | 'cultural_exchange';

export interface EventDefinition {
  id: EventOccasion;
  name: string;
  vibe: string;
  formalityLevel: 'formal' | 'semi-formal' | 'casual' | 'avant-garde';
  recommendedGarments: GarmentCategory[];
  recommendedColors: { primary: string; secondary: string; pants: string };
  recommendedTraditional: TraditionalAccessory[];
  recommendedModern: ModernAccessory[];
  recommendationNote: string;
}

export type WeatherConditionType = 'hot' | 'mild' | 'cold' | 'rainy';

export interface RegionWeather {
  city: 'hanoi' | 'hue' | 'saigon' | 'sapa';
  name: string;
  season: string;
  temp: number;
  condition: string;
  fabricAdvice: string;
  conditionOptions: Record<WeatherConditionType, { temp: number; desc: string; advice: string }>;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  meaning: string;
}

export type TraditionalAccessory = 
  | 'khan_xep'
  | 'khan_mo_qua'
  | 'kieng_bac'
  | 'non_quai_thao'
  | 'guoc_moc'
  | 'quat_giay'
  | 'ngoc_boi'
  | 'none';

export type ModernAccessory = 
  | 'chunky_sneaker'
  | 'matrix_sunglasses'
  | 'canvas_tote'
  | 'overear_headphones'
  | 'corset_belt'
  | 'doc_martens'
  | 'pearl_choker'
  | 'none';

export type PantsStyle = 
  | 'traditional_silk'
  | 'wide_leg_trousers'
  | 'denim_jeans'
  | 'pleated_skirt'
  | 'linen_culottes';

export type SceneBackground = 'studio' | 'hanoi' | 'hue' | 'cafe';

export interface OutfitLook {
  id: string;
  title: string;
  gender: Gender;
  garmentType: GarmentCategory;
  primaryColor: string;
  secondaryColor: string;
  pantsColor: string;
  pantsStyle: PantsStyle;
  traditionalAccessories: TraditionalAccessory[];
  modernAccessories: ModernAccessory[];
  event: EventOccasion;
  region: 'hanoi' | 'hue' | 'saigon' | 'sapa';
  backgroundScene: SceneBackground;
  vibeTag: string;
  createdAt: string;
  userNotes?: string;
}

export type CulturalCategory = 'phu_hop' | 'can_can_nhac' | 'can_kiem_chung';

export interface CulturalNote {
  category: CulturalCategory;
  title: string;
  reason: string;
  suggestion: string;
  historicalContext?: string;
}

export interface CulturalCheckResult {
  overallStatus: 'phu_hop' | 'can_can_nhac' | 'can_kiem_chung';
  statusLabel: string;
  summary: string;
  notes: CulturalNote[];
}

export type ColorRelationshipType = 'tuong_dong' | 'bo_tuc' | 'tuong_phan' | 'trung_tinh';

export interface ColorAnalysisResult {
  relationship: ColorRelationshipType;
  relationshipLabel: string;
  primaryHue: number;
  secondaryHue: number;
  deltaHue: number;
  aestheticReview: string;
  adjustmentSuggestion: string;
  folkElementNote: string;
  ratioNotice: string;
}
