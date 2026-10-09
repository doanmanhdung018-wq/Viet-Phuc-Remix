import { OutfitLook } from '../types/fashion';

export const CURATED_PRESETS: OutfitLook[] = [
  {
    id: 'preset_hanoi_y2k',
    title: 'Hà Nội Phố Cổ Y2K',
    gender: 'male',
    garmentType: 'ngu_than_tay_chen',
    primaryColor: '#1E3A8A', // Xanh lam chàm
    secondaryColor: '#D97706', // Vàng hoàng yến
    pantsColor: '#F8F9FA', // Trắng ngà
    pantsStyle: 'wide_leg_trousers',
    traditionalAccessories: ['khan_xep', 'kieng_bac'],
    modernAccessories: ['chunky_sneaker', 'matrix_sunglasses', 'canvas_tote'],
    event: 'street_coffee',
    region: 'hanoi',
    backgroundScene: 'hanoi',
    vibeTag: 'Streetwear x Heritage',
    createdAt: '2026-09-26',
    userNotes: 'Sự kết hợp tinh tế giữa áo ngũ thân tay chẽn xanh chàm và quần suông trắng, điểm xuyết sneaker chunky và kính râm retro thập niên 90.'
  },
  {
    id: 'preset_kinhbac_cyber',
    title: 'Kinh Bắc Neo-Folkloric',
    gender: 'female',
    garmentType: 'tu_than',
    primaryColor: '#78350F', // Nâu củ nâu
    secondaryColor: '#DB2777', // Hồng yếm đào
    pantsColor: '#111827', // Đen lĩnh
    pantsStyle: 'pleated_skirt',
    traditionalAccessories: ['non_quai_thao', 'quat_giay'],
    modernAccessories: ['overear_headphones', 'doc_martens'],
    event: 'street_coffee',
    region: 'hanoi',
    backgroundScene: 'hanoi',
    vibeTag: 'Indie Folk Remix',
    createdAt: '2026-09-26',
    userNotes: 'Nét duyên quan họ Kinh Bắc với yếm thắm, nón quai thao phối cùng tai nghe trùm đầu over-ear và boots cổ cao.'
  },
  {
    id: 'preset_nhatbinh_avantgarde',
    title: 'Hoàng Cung Avant-Garde',
    gender: 'female',
    garmentType: 'nhat_binh',
    primaryColor: '#B91C1C', // Đỏ son
    secondaryColor: '#D97706', // Chỉ vàng ngũ sắc
    pantsColor: '#F8F9FA',
    pantsStyle: 'wide_leg_trousers',
    traditionalAccessories: ['kieng_bac', 'ngoc_boi'],
    modernAccessories: ['matrix_sunglasses', 'pearl_choker', 'corset_belt'],
    event: 'fashion_week',
    region: 'hue',
    backgroundScene: 'hue',
    vibeTag: 'Royal Runway',
    createdAt: '2026-09-26',
    userNotes: 'Đỉnh cao vương triều Huế tái sinh trên sàn diễn thời trang đương đại. Viền cổ ngũ sắc tương phản với kính râm matrix sắc lẹm.'
  },
  {
    id: 'preset_totnghiep_trithuc',
    title: 'Tràng An Trí Thức Học Đường',
    gender: 'unisex',
    garmentType: 'ngu_than_tay_chen',
    primaryColor: '#0F766E', // Xanh ngọc bích
    secondaryColor: '#FAF5EE',
    pantsColor: '#F8F9FA',
    pantsStyle: 'wide_leg_trousers',
    traditionalAccessories: ['khan_xep', 'kieng_bac'],
    modernAccessories: ['canvas_tote', 'pearl_choker'],
    event: 'graduation',
    region: 'hanoi',
    backgroundScene: 'studio',
    vibeTag: 'Academic Heritage',
    createdAt: '2026-09-26',
    userNotes: 'Sự tự hào dân tộc ngày tốt nghiệp. Áo ngũ thân ngọc bích tượng trưng cho sự đỗ đạt, thanh cao và tri thức người trẻ.'
  },
  {
    id: 'preset_giaolinh_indie',
    title: 'Giao Lĩnh Sài Gòn Đương Đại',
    gender: 'male',
    garmentType: 'giao_linh',
    primaryColor: '#27272A', // Đen than củi
    secondaryColor: '#0F766E', // Xanh ngọc
    pantsColor: '#3B82F6', // Denim jeans
    pantsStyle: 'denim_jeans',
    traditionalAccessories: ['quat_giay'],
    modernAccessories: ['overear_headphones', 'chunky_sneaker'],
    event: 'street_coffee',
    region: 'saigon',
    backgroundScene: 'cafe',
    vibeTag: 'Heritage Remix',
    createdAt: '2026-09-26',
    userNotes: 'Cổ áo giao lĩnh vạt chéo kết hợp quần denim jeans ống rộng và headphone, tạo dáng vẻ phiêu lãng tự do giữa lòng TP. Hồ Chí Minh.'
  }
];
