import {
  GarmentDefinition,
  EventDefinition,
  RegionWeather,
  ColorSwatch,
  TraditionalAccessory,
  ModernAccessory,
  PantsStyle
} from '../types/fashion';

export const TRADITIONAL_ACCESSORY_NAMES: Record<TraditionalAccessory, string> = {
  khan_xep: 'Khăn Xếp 7 Nếp',
  khan_mo_qua: 'Khăn Mỏ Quạ Đen',
  kieng_bac: 'Kiềng Bạc Chạm Khắc',
  non_quai_thao: 'Nón Quai Thao (Nón Ba Tầm)',
  guoc_moc: 'Guốc Mộc Quai Nhung',
  quat_giay: 'Quạt Giấy Phù Lãng',
  ngoc_boi: 'Dải Khánh Ngọc Bội',
  none: 'Không dùng'
};

export const MODERN_ACCESSORY_NAMES: Record<ModernAccessory, string> = {
  chunky_sneaker: 'Chunky Sneaker Trắng',
  matrix_sunglasses: 'Kính Râm Matrix Retro',
  canvas_tote: 'Túi Tote Canvas Typo',
  overear_headphones: 'Tai Nghe Over-Ear Kim Loại',
  corset_belt: 'Thắt Lưng Corset Da / Thổ Cẩm',
  doc_martens: 'Boots Da Cổ Cao Platform',
  pearl_choker: 'Vòng Cổ Ngọc Trai Đương Đại',
  none: 'Không dùng'
};

export const PANTS_STYLE_NAMES: Record<PantsStyle, string> = {
  traditional_silk: 'Quần Lụa Truyền Thống (Ống Suông)',
  wide_leg_trousers: 'Quần Âu Suông Xếp Ly (Tailored)',
  denim_jeans: 'Quần Jeans Ống Đứng (Streetwear Y2K)',
  pleated_skirt: 'Váy Đũi / Đầm Lĩnh Xếp Ly',
  linen_culottes: 'Quần Lửng Culottes Đũi Nam Cao'
};

export const TRADITIONAL_GARMENTS: GarmentDefinition[] = [
  {
    id: 'ngu_than_tay_chen',
    name: 'Áo Ngũ Thân Tay Chẽn',
    historicalPeriod: 'Chúa Nguyễn Phúc Khoát (1744) & Vua Minh Mạng (1827 - 1837)',
    origin: 'Khởi nguồn Đàng Trong, sau trở thành quốc phục Đại Nam',
    silhouette: 'Cổ đứng lập lĩnh, thân áo dài qua gối, ống tay ôm khít cổ tay, cài khuy sang bên phải theo phía người mặc',
    description: 'Trang phục chuẩn mực của người Việt trong suốt hơn 200 năm lịch sử. Áo may ghép từ 5 thân vải: hai thân trước, hai thân sau và thân thứ năm (thân con) nằm kín đáo lót bên trong ngực áo.',
    historicalFacts: 'Năm Giáp Tý (1744), chúa Nguyễn Phúc Khoát ban hành cải cách trang phục tại Đàng Trong nhằm khẳng định bản sắc riêng. Đến các năm 1827 và 1837, vua Minh Mạng ban hành sắc dụ thống nhất y phục ngũ thân trên toàn lãnh thổ Đại Nam từ Bắc chí Nam. Áo có quy cách cài khuy bên phải theo phía người mặc (hữu nhậm), cổ đứng thẳng kín đáo.',
    culturalSymbolism: 'Theo truyền ngôn dân gian và các nghệ nhân may đo cổ truyền, 4 thân áo ngoài tượng trưng cho "Tứ thân phụ mẫu" (cha mẹ đẻ và cha mẹ chồng/vợ), thân con thứ 5 bên trong tượng trưng cho người mặc được chở che. 5 cúc khuy đại diện cho đạo Ngũ Thường của Nho học: Nhân, Nghĩa, Lễ, Trí, Tín.',
    modernRemixPotential: 'Dáng tay chẽn gọn gàng rất thuận lợi khi phối cùng quần âu suông cạp cao, giày sneaker trắng tối giản hoặc giày da loafer. Thích hợp cho học sinh sinh viên diện trong các dịp lễ tốt nghiệp, sự kiện học thuật, hay dạo phố thanh lịch.',
    references: [
      {
        documentTitle: 'Ngàn năm áo mũ (Lịch sử trang phục Việt Nam qua các thời kỳ)',
        authorOrOrg: 'Trần Quang Đức',
        yearOrPeriod: '2013',
        description: 'Khảo cứu công phu về cấu trúc y phục Đàng Trong, sắc lệnh Minh Mạng và cấu tạo áo ngũ thân.',
        link: 'https://baotanglichsu.vn/',
        isVerifiedFact: true,
        type: 'scholarly_work'
      },
      {
        documentTitle: 'Đại Nam thực lục (Chính biên)',
        authorOrOrg: 'Quốc sử quán triều Nguyễn',
        yearOrPeriod: 'Thế kỷ 19',
        description: 'Ghi chép các sắc chỉ về y chế năm Minh Mạng thứ 8 (1827) và thứ 18 (1837).',
        isVerifiedFact: true,
        type: 'historical_record'
      },
      {
        documentTitle: 'Đề án "Huế - Kinh đô Áo dài Việt Nam"',
        authorOrOrg: 'Sở Văn hóa và Thể thao Thừa Thiên Huế',
        yearOrPeriod: '2020 - nay',
        description: 'Tài liệu nghiên cứu phục dựng và chuẩn hóa áo ngũ thân truyền thống trong đời sống hiện đại.',
        isVerifiedFact: true,
        type: 'museum_archive'
      }
    ],
    anatomy: [
      {
        part: 'Cổ lập lĩnh (Cổ đứng)',
        description: 'Cổ áo cao 2-3cm dựng thẳng, ôm khít cổ người mặc',
        significance: 'Giữ cho tư thế đầu và cổ ngay ngắn, thể hiện phong thái đoan chính, lịch thiệp.'
      },
      {
        part: 'Năm cúc khuy cài nghiêng',
        description: 'Cài khuy từ cổ xuống nách rồi chéo sang sườn bên phải theo phía người mặc',
        significance: 'Diễn giải biểu tượng Ngũ Thường (Nhân, Nghĩa, Lễ, Trí, Tín) của người quân tử và thục nữ.'
      },
      {
        part: 'Tay chẽn gọn gàng',
        description: 'Ống tay thu nhỏ dần từ nách tới cổ tay',
        significance: 'Tạo sự năng động, linh hoạt trong sinh hoạt hàng ngày.'
      },
      {
        part: 'Thân con (Vạt trong)',
        description: 'Thân vải thứ năm nằm bên dưới vạt cả, ôm lấy phần ngực',
        significance: 'Bảo đảm sự kín đáo tuyệt đối, mang ý niệm gia đình luôn đùm bọc, chở che.'
      }
    ],
    defaultColor: '#1A365D',
    defaultPantsColor: '#FAF5EE',
    genderRecommendation: ['male', 'female', 'unisex'],
    safeguardRules: [
      {
        rule: 'Hướng cài khuy từ trái sang phải theo phía người mặc (hữu nhậm)',
        reason: 'Quy chuẩn hữu nhậm đã được khẳng định từ thời chúa Nguyễn và vua Minh Mạng, biểu thị sự tương sinh thuận chiều.',
        suggestion: 'Khi cắt may hoặc mặc, kiểm tra vạt cả luôn phủ sang sườn bên phải của cơ thể người mặc.'
      },
      {
        rule: 'Lựa chọn quần dài chạm mắt cá chân khi dự lễ',
        reason: 'Áo ngũ thân có độ dài qua gối; nếu mặc quần quá ngắn trên đầu gối sẽ làm mất phom dáng đoan trang.',
        suggestion: 'Phối cùng quần âu ống suông vải mềm hoặc quần lụa trắng/đen truyền thống.'
      }
    ]
  },
  {
    id: 'ngu_than_tay_thung',
    name: 'Áo Ngũ Thân Tay Thụng (Áo Tía / Áo Lễ)',
    historicalPeriod: 'Thời Nguyễn (Thế kỷ 19 - Đầu thế kỷ 20)',
    origin: 'Cung đình Huế, giới sĩ phu và sinh hoạt nghi lễ ba miền',
    silhouette: 'Ống tay áo buông rộng từ 40-60cm, tà áo thướt tha, phom dáng uy nghi trang trọng',
    description: 'Phẩm phục trang trọng dùng trong các dịp đại lễ, tế tự, khánh tiết và hôn lễ truyền thống. Khi buông tay, hai ống tay rủ xuống vuông vức, trang nhã.',
    historicalFacts: 'Áo tay thụng (còn gọi là áo tía, áo thụng hay áo tế) là biến thể tay rộng của áo ngũ thân triều Nguyễn. Quy định phẩm phục thời Nguyễn phân biệt rõ tay chẽn dùng cho thường phục và tay thụng dùng trong lễ nghi, bái yết.',
    culturalSymbolism: 'Ống tay áo rộng rãi buông thõng mang ý niệm dung nạp bao la, phong thái ung dung, cốt cách thanh tao và sự cung kính đối với trời đất, tổ tiên.',
    modernRemixPotential: 'Thích hợp cho các buổi biểu diễn sân khấu nghệ thuật, chụp ảnh kỷ yếu phong cách cổ phong hoặc các lễ cưới hỏi truyền thống trang nghiêm.',
    references: [
      {
        documentTitle: 'Khâm định Đại Nam hội điển sự lệ',
        authorOrOrg: 'Nội các triều Nguyễn',
        yearOrPeriod: 'Khắc in năm 1851',
        description: 'Văn bản quy định chặt chẽ về quy thức y phục của hoàng gia và quan lại triều đình.',
        isVerifiedFact: true,
        type: 'historical_record'
      },
      {
        documentTitle: 'Trang phục triều Nguyễn - Nghiên cứu và tư liệu',
        authorOrOrg: 'Trần Đình Sơn',
        yearOrPeriod: '2015',
        description: 'Tập hợp các hình ảnh, sắc chỉ và hiện vật áo lễ tay thụng cung đình Huế.',
        link: 'https://baotanglichsu.vn/',
        isVerifiedFact: true,
        type: 'scholarly_work'
      }
    ],
    anatomy: [
      {
        part: 'Cổ lập lĩnh dựng vuông',
        description: 'Dựng thẳng vuông vắn, lót vải giữ phom ngay ngắn',
        significance: 'Thể hiện phong thái trang nghiêm trong nghi thức tế lễ.'
      },
      {
        part: 'Ống tay đại tụ (Tay thụng buông rộng)',
        description: 'Ống tay buông rộng phẳng phiu, khi chắp tay tạo vòng tròn cung kính',
        significance: 'Đại diện cho cử chỉ cung kính, lễ nghi giao tiếp hòa nhã.'
      },
      {
        part: 'Gấu áo tà rộng',
        description: 'Tà áo dài qua gối, phủ kín khi ngồi tế lễ',
        significance: 'Giữ gìn tính trang trọng, đoan chính tối cao.'
      }
    ],
    defaultColor: '#742A2A',
    defaultPantsColor: '#FAF5EE',
    genderRecommendation: ['male', 'female', 'unisex'],
    safeguardRules: [
      {
        rule: 'Giữ ống tay phẳng phiu, tránh vặn xoắn',
        reason: 'Áo tay thụng có bề mặt ống tay rộng; nếu nhăn nhúm sẽ làm mất đi tính uy nghiêm của áo lễ.',
        suggestion: 'Là phẳng nếp vải trước khi mặc và ưu tiên di chuyển nhẹ nhàng.'
      },
      {
        rule: 'Phối phụ kiện trang nhã',
        reason: 'Là áo dành cho lễ nghi, việc phối cùng phụ kiện quá lòe loẹt có thể phá vỡ tính trang trọng.',
        suggestion: 'Dùng kèm quạt giấy Phù Lãng hoặc kiềng bạc mộc tinh tế.'
      }
    ]
  },
  {
    id: 'tu_than',
    name: 'Áo Tứ Thân Kinh Bắc',
    historicalPeriod: 'Phát triển từ thời Lý - Trần đến thế kỷ 19 - đầu thế kỷ 20',
    origin: 'Vùng đồng bằng Bắc Bộ (Kinh Bắc, Thăng Long, châu thổ sông Hồng)',
    silhouette: 'Áo ngoài xẻ 4 vạt, bên trong mặc yếm đào lụa, dải thắt lưng xanh buông lơi duyên dáng',
    description: 'Trang phục gắn liền với đời sống người phụ nữ Bắc Bộ và các liền chị Quan họ Kinh Bắc. Áo buông lơi hai vạt trước hoặc buộc chéo trước bụng, để lộ yếm thắm e ấp.',
    historicalFacts: 'Trước khi áo ngũ thân phổ biến toàn quốc, áo tứ thân là trang phục lao động và lễ hội chủ đạo của phụ nữ miền Bắc. Cấu trúc gồm 4 thân vải (2 thân sau may can sống lưng, 2 thân trước thả buông). Khi lao động, vạt trước được vén lên; khi đi hội, hai vạt trước được thắt nơ nhẹ.',
    culturalSymbolism: 'Bốn thân áo gợi nhớ đạo lý kính hiếu 4 vị thân phụ mẫu. Dải thắt lưng xanh (ruột tượng) và yếm đào tạo nên vũ khúc màu sắc dân dã, biểu trưng cho sự mềm mại, tảo tần và nét duyên quan họ.',
    modernRemixPotential: 'Rất ăn ý với xu hướng Neo-Folk và Cottagecore: phối áo tứ thân cùng quần denim suông, váy đũi tầng, tai nghe over-ear và nón quai thao cách điệu.',
    references: [
      {
        documentTitle: 'Văn hóa trang phục người Việt',
        authorOrOrg: 'GS.TS. Từ Chi & Viện Nghiên cứu Văn hóa Dân gian',
        yearOrPeriod: '1996',
        description: 'Khảo sát cấu trúc yếm đào, nón quai thao và áo tứ thân phụ nữ đồng bằng châu thổ sông Hồng.',
        link: 'https://baotangphunu.org.vn/',
        isVerifiedFact: true,
        type: 'scholarly_work'
      },
      {
        documentTitle: 'Không gian văn hóa Quan họ Bắc Ninh (UNESCO)',
        authorOrOrg: 'Cục Di sản Văn hóa - Bộ Văn hóa, Thể thao và Du lịch',
        yearOrPeriod: '2009',
        description: 'Tài liệu di sản về phục trang liền anh liền chị Kinh Bắc.',
        link: 'https://disanvanhoa.gov.vn/',
        isVerifiedFact: true,
        type: 'museum_archive'
      }
    ],
    anatomy: [
      {
        part: 'Yếm đào tơ tằm',
        description: 'Tấm vải lụa hình thoi che ngực, buộc dây qua cổ và lưng',
        significance: 'Tôn vinh vẻ đẹp kín đáo, e ấp của người phụ nữ nông nghiệp xưa.'
      },
      {
        part: 'Hai vạt trước buộc nơ',
        description: 'Thắt nhẹ trước bụng hoặc thả buông sóng sánh theo nhịp bước',
        significance: 'Thể hiện tính năng động, linh hoạt gắn liền với lao động và giao duyên.'
      },
      {
        part: 'Ruột tượng & Dải thắt lưng',
        description: 'Dải lụa xanh thiên thanh hoặc hồng ngọc thắt ngang eo',
        significance: 'Tạo điểm nhấn eo thon và nét tương phản hài hòa giữa các gam màu mộc.'
      }
    ],
    defaultColor: '#8C5E3C',
    defaultPantsColor: '#1A202C',
    genderRecommendation: ['female', 'unisex'],
    safeguardRules: [
      {
        rule: 'Giữ độ kín đáo phù hợp của yếm lót bên trong',
        reason: 'Yếm đào truyền thống có đường viền cổ thanh nhã; tránh cắt xẻ trễ nải làm sai lệch nét duyên e ấp.',
        suggestion: 'Chọn yếm có độ ôm vừa vặn, kết hợp đường may viền cổ chuẩn mực.'
      },
      {
        rule: 'Bảo quản nón quai thao đúng phom',
        reason: 'Quai thao dệt bằng tơ tằm dễ xoắn rối nếu không giữ thẳng khi sử dụng.',
        suggestion: 'Khi mang nón, buông quai thao thẳng tự nhiên dọc bờ vai.'
      }
    ]
  },
  {
    id: 'nhat_binh',
    name: 'Áo Nhật Bình Hoàng Triều',
    historicalPeriod: 'Triều Nguyễn (1802 - 1945)',
    origin: 'Cung đình Đại Nội Huế (Chốn Cấm Thành)',
    silhouette: 'Cổ áo hình chữ nhật vắt ngang ngực, hoa văn viền chỉ ngũ sắc, dải kết hoa ngũ sắc đối xứng',
    description: 'Y phục thường triều của bậc Hậu phi, Công chúa và mệnh phụ quý tộc triều Nguyễn. Điểm nhấn là bản cổ áo hình chữ nhật thêu hoa văn tinh xảo cùng dải phụng ngũ sắc rủ trước ngực.',
    historicalFacts: 'Được chế định trong "Khâm định Đại Nam hội điển sự lệ", áo Nhật Bình có nguyên tắc màu sắc rất nghiêm ngặt: Hoàng Thái Hậu và Hoàng Hậu dùng màu vàng chính hoàng, Công chúa dùng màu đỏ xích, Cung tần tam phẩm dùng màu tím hoặc xanh biếc. Tên gọi Nhật Bình bắt nguồn từ bản cổ hình chữ nhật ngay ngắn.',
    culturalSymbolism: 'Dải ngũ sắc viền cổ áo và tay áo thể hiện triết lý Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ) tương sinh, tượng trưng cho sự hài hòa của càn khôn và sự quý phái của bậc mẫu nghi thiên hạ.',
    modernRemixPotential: 'Thế mạnh lớn trong các bộ sưu tập Haute Couture và Avant-Garde: phối áo Nhật Bình với thắt lưng corset da, kính râm matrix retro và boots cao cổ để tạo diện mạo "Royal Runway".',
    references: [
      {
        documentTitle: 'Khâm định Đại Nam hội điển sự lệ (Quy chế Phẩm phục)',
        authorOrOrg: 'Nội các triều Nguyễn',
        yearOrPeriod: '1851',
        description: 'Quy định chính thức về hoa văn, màu sắc và cấp bậc sử dụng áo Nhật Bình.',
        isVerifiedFact: true,
        type: 'historical_record'
      },
      {
        documentTitle: 'Bộ sưu tập hiện vật Cung đình Huế',
        authorOrOrg: 'Bảo tàng Cổ vật Cung đình Huế',
        yearOrPeriod: 'Lưu giữ thường trực',
        description: 'Các hiện vật áo Nhật Bình thêu tay của Hậu phi, Công chúa thời Nguyễn.',
        link: 'https://hueworldheritage.org.vn/',
        isVerifiedFact: true,
        type: 'museum_archive'
      }
    ],
    anatomy: [
      {
        part: 'Bản cổ áo Nhật Bình',
        description: 'Bản nẹp hình chữ nhật vắt ngang trước ngực thêu loan phượng và hoa cúc',
        significance: 'Biểu trưng cho sự ngay ngắn, quang minh chính đại của bậc tôn thất.'
      },
      {
        part: 'Hai dải phụng ngũ sắc',
        description: 'Hai dải lụa rủ dài từ ngực xuống gấu áo',
        significance: 'Thể hiện triết lý ngũ hành tương sinh và uy quyền vương triều.'
      },
      {
        part: 'Ống tay viền ngũ sắc',
        description: 'Đầu ống tay áo nối 5 dải màu sặc sỡ',
        significance: 'Tạo hiệu ứng thị giác rực rỡ khi cử động tay chào đón hoặc tế tự.'
      }
    ],
    defaultColor: '#C53030',
    defaultPantsColor: '#FAF5EE',
    genderRecommendation: ['female', 'unisex'],
    safeguardRules: [
      {
        rule: 'Cài khuy ngực ngay ngắn, giữ trang nghiêm',
        reason: 'Áo Nhật Bình là phẩm phục cao quý; không nên để mở bung ngực gây lệch lạc hình ảnh hoàng gia.',
        suggestion: 'Cài khuy ngực đúng vị trí; nếu remix với corset, nên mặc corset gọn bên trong tà áo.'
      },
      {
        rule: 'Tránh hoa văn rồng 5 móng',
        reason: 'Thời phong kiến triều Nguyễn, hình tượng rồng 5 móng chỉ dành riêng cho Hoàng đế.',
        suggestion: 'Ưu tiên hoa văn hoa lá, thủy ba (sóng nước), mây triều đình hoặc chim phượng.'
      }
    ]
  },
  {
    id: 'giao_linh',
    name: 'Áo Giao Lĩnh (Trực Lĩnh)',
    historicalPeriod: 'Thời Lý - Trần - Hậu Lê (Thế kỷ 11 - 18)',
    origin: 'Đại Việt cổ truyền qua các triều đại tự chủ',
    silhouette: 'Cổ áo vắt chéo hình chữ Y, vạt phải đè lên vạt trái theo phía người mặc, thân áo suông rộng',
    description: 'Kiểu áo cổ xưa có lịch sử nghìn năm của dân tộc, xuất hiện trong nhiều thư tịch cổ và hiện vật khảo cổ học lăng mộ thời Lê.',
    historicalFacts: 'Áo Giao lĩnh (cổ giao nhau) là trang phục chính thức phổ biến ở Đại Việt trước khi áo ngũ thân thịnh hành. Hiện vật khai quật từ các lăng mộ thời Hậu Lê (như xác ướp Bảo Hưng, Vườn Đào) khẳng định cấu trúc vạt phải đè lên vạt trái theo phía người mặc (quy tắc hữu nhậm).',
    culturalSymbolism: 'Cổ áo giao nhau trước ngực gợi nhớ tinh thần hào khí Đông A (thời Trần) và sự tự chủ văn hóa thời Lê. Dáng áo phóng khoáng biểu trưng cho sự hòa hợp giữa con người và thiên nhiên.',
    modernRemixPotential: 'Rất hợp với phong cách Indie Urban: phối áo giao lĩnh màu xám than củi cùng quần denim jeans ống đứng, tai nghe over-ear kim loại và sandal da.',
    references: [
      {
        documentTitle: 'Ngàn năm áo mũ (Chương Y phục thời Lý - Trần - Lê)',
        authorOrOrg: 'Trần Quang Đức',
        yearOrPeriod: '2013',
        description: 'Tài liệu phân tích hiện vật khảo cổ và văn bản cổ về quy cách áo giao lĩnh Đại Việt.',
        link: 'https://baotanglichsu.vn/',
        isVerifiedFact: true,
        type: 'scholarly_work'
      },
      {
        documentTitle: 'Báo cáo khai quật mộ cổ thời Hậu Lê',
        authorOrOrg: 'Viện Khảo cổ học Việt Nam & Bảo tàng Lịch sử Quốc gia',
        yearOrPeriod: '1970 - 2005',
        description: 'Hiện vật phục trang bằng lụa dệt hoa văn thời Hậu Lê được lưu giữ tại Hà Nội.',
        link: 'https://baotanglichsu.vn/',
        isVerifiedFact: true,
        type: 'museum_archive'
      }
    ],
    anatomy: [
      {
        part: 'Cổ chéo giao lĩnh (Hữu nhậm)',
        description: 'Vạt bên phải đè lên vạt bên trái theo phía người mặc tạo hình chữ Y',
        significance: 'Quy tắc trang phục truyền thống của người sống trong văn hóa phương Đông cổ.'
      },
      {
        part: 'Đai thắt lưng lụa',
        description: 'Dải vải lụa buộc ngang eo giữ chặt phom áo',
        significance: 'Định hình sự đĩnh đạc, khỏe khoắn cho người mặc.'
      },
      {
        part: 'Thân áo suông dài',
        description: 'Dài quá gối, xẻ tà hai bên hông',
        significance: 'Phóng khoáng, tự do di chuyển.'
      }
    ],
    defaultColor: '#2C5282',
    defaultPantsColor: '#FAF5EE',
    genderRecommendation: ['male', 'female', 'unisex'],
    safeguardRules: [
      {
        rule: 'Luôn bảo đảm vạt phải đè vạt trái theo phía người mặc (Hữu nhậm)',
        reason: 'Vạt trái đè vạt phải (tả nhậm) trong phong tục cổ là quy cách dùng khi khâm liệm người đã khuất.',
        suggestion: 'Kiểm tra kỹ chiều vắt vạt áo trước ngực khi mặc hoặc tạo mẫu thời trang.'
      },
      {
        rule: 'Thắt nút đai lưng ngay ngắn',
        reason: 'Đai lưng giữ phom áo giao lĩnh; nếu thắt xộc xệch sẽ làm mất đi dáng vẻ thanh tao.',
        suggestion: 'Thắt nút nơ cân đối chính giữa hoặc lệch nhẹ bên hông.'
      }
    ]
  },
  {
    id: 'ao_dai_tan_thoi',
    name: 'Áo Dài Lemur & Tân Thời',
    historicalPeriod: 'Thập niên 1930s (Họa sĩ Cát Tường - Lemur) & 1950s',
    origin: 'Hà Nội & Sài Gòn (Phong trào đổi mới y phục thế kỷ 20)',
    silhouette: 'Thân áo ôm sát đường cong cơ thể, cổ sen cách điệu, hai tà áo lụa bay bổng thướt tha',
    description: 'Cuộc cách mạng thời trang đầu tiên của Việt Nam thế kỷ 20 do nhóm Tự Lực Văn Đoàn và họa sĩ Cát Tường khởi xướng, kết hợp giữa phom dáng áo ngũ thân và kỹ thuật tạo hình phương Tây.',
    historicalFacts: 'Năm 1934, họa sĩ Nguyễn Cát Tường (bút danh Lemur) giới thiệu các mẫu áo dài cách tân trên báo Phong Hóa. Tiếp nối sau đó là áo dài Lê Phổ (1935) lược bỏ những chi tiết quá Tây hóa để trở về vẻ đẹp kín đáo thanh lịch, đặt nền móng cho áo dài Việt Nam hiện đại.',
    culturalSymbolism: 'Cột mốc lịch sử đánh dấu sự giải phóng thẩm mỹ và tinh thần độc lập tự tin của người phụ nữ Việt Nam trong thời kỳ cận đại hóa.',
    modernRemixPotential: 'Rất linh hoạt khi phối cùng giày loafer hiện đại, túi tote canvas in họa tiết typo, vòng cổ ngọc trai bất đối xứng trong môi trường học đường hoặc công sở.',
    references: [
      {
        documentTitle: 'Chuyên đề "Cải cách y phục" trên Báo Phong Hóa',
        authorOrOrg: 'Họa sĩ Cát Tường (Lemur) - Tự Lực Văn Đoàn',
        yearOrPeriod: '1934 - 1935',
        description: 'Tư liệu báo chí gốc về sự ra đời của áo dài Lemur tại Hà Nội.',
        isVerifiedFact: true,
        type: 'historical_record'
      },
      {
        documentTitle: 'Lịch sử phát triển Áo Dài Việt Nam',
        authorOrOrg: 'Bảo tàng Áo Dài TP. Hồ Chí Minh',
        yearOrPeriod: 'Trưng bày chuyên đề',
        description: 'Bộ sưu tập áo dài từ thời Lemur, Lê Phổ, Raglan đến áo dài hiện đại.',
        link: 'https://baotangaodai.com.vn/',
        isVerifiedFact: true,
        type: 'museum_archive'
      }
    ],
    anatomy: [
      {
        part: 'Cổ sen / Cổ thuyền uốn lượn',
        description: 'Đường cắt lượn sóng mềm mại khoe nét thanh tân',
        significance: 'Đánh dấu bước ngoặt đổi mới thoát khỏi sự gò bó phong kiến.'
      },
      {
        part: 'Đường chiết eo tôn dáng',
        description: 'Đường chít eo khéo léo ôm theo đường cong cơ thể',
        significance: 'Tôn vinh vẻ đẹp tự hào của người phụ nữ tân thời.'
      },
      {
        part: 'Hai tà áo lụa bay',
        description: 'Tà trước và sau xẻ cao tới eo, phủ dài chạm mu bàn chân',
        significance: 'Tạo nhịp bước uyển chuyển theo làn gió.'
      }
    ],
    defaultColor: '#D53F8C',
    defaultPantsColor: '#FFFFFF',
    genderRecommendation: ['female', 'unisex'],
    safeguardRules: [
      {
        rule: 'Chọn độ mỏng và lớp lót vải tinh tế',
        reason: 'Chất liệu vải quá mỏng lộ nội y có thể gây phản cảm thị giác.',
        suggestion: 'Sử dụng lớp lót lụa mềm đồng màu hoặc đồ lót màu da tiệp màu cơ thể.'
      },
      {
        rule: 'Chiều dài quần phủ mắt cá',
        reason: 'Áo dài truyền thống đi liền với quần suông chấm gót tạo độ thướt tha.',
        suggestion: 'Mặc cùng quần ống rộng lụa hoặc quần âu suông dài phủ mắt cá chân.'
      }
    ]
  }
];

export const EVENTS: EventDefinition[] = [
  {
    id: 'graduation',
    name: 'Lễ Tốt Nghiệp / Khai Giảng',
    vibe: 'Trang nghiêm, tri thức, tự hào học đường',
    formalityLevel: 'formal',
    recommendedGarments: ['ngu_than_tay_chen', 'ao_dai_tan_thoi', 'giao_linh'],
    recommendedColors: { primary: '#0F766E', secondary: '#FAF5EE', pants: '#F8F9FA' },
    recommendedTraditional: ['khan_xep', 'kieng_bac'],
    recommendedModern: ['chunky_sneaker', 'canvas_tote'],
    recommendationNote: 'Ưu tiên áo Ngũ thân tay chẽn hoặc Áo dài tân thời với gam màu thanh nhã (Ngọc bích, Lam chàm). Phối cùng quần âu suông trắng ngà, khăn xếp 7 nếp và giày sneaker trắng tối giản để thoải mái di chuyển nhận bằng tốt nghiệp.'
  },
  {
    id: 'street_coffee',
    name: 'Dạo Phố & Cà Phê Check-in',
    vibe: 'Phóng khoáng, Y2K năng động, Streetwear',
    formalityLevel: 'casual',
    recommendedGarments: ['tu_than', 'ngu_than_tay_chen', 'giao_linh'],
    recommendedColors: { primary: '#78350F', secondary: '#DB2777', pants: '#111827' },
    recommendedTraditional: ['quat_giay'],
    recommendedModern: ['overear_headphones', 'matrix_sunglasses', 'chunky_sneaker'],
    recommendationNote: 'Thoải mái thử nghiệm cùng quần jeans ống đứng hoặc váy đũi xếp ly, kết hợp tai nghe over-ear kim loại và kính râm retro thập niên 90. Bạn có thể khoác hờ tà áo khi sải bước qua phố cổ.'
  },
  {
    id: 'wedding_guest',
    name: 'Dự Đám Cưới & Ăn Hỏi',
    vibe: 'Tươi vui, lịch sự, tôn vinh hạnh phúc',
    formalityLevel: 'semi-formal',
    recommendedGarments: ['ngu_than_tay_chen', 'ngu_than_tay_thung', 'ao_dai_tan_thoi'],
    recommendedColors: { primary: '#D97706', secondary: '#FAF5EE', pants: '#F8F9FA' },
    recommendedTraditional: ['kieng_bac'],
    recommendedModern: ['pearl_choker', 'chunky_sneaker'],
    recommendationNote: 'Chọn tông màu ấm áp, tươi tắn như Vàng hoàng yến, Hồng ngọc hoặc Xanh rêu cổ mộc. Lưu ý tránh diện nguyên cây đỏ tươi lộng lẫy để nhường spotlight cho cô dâu chú rể.'
  },
  {
    id: 'temple_festival',
    name: 'Đi Chùa & Lễ Hội Dân Gian',
    vibe: 'Tôn nghiêm, thanh tịnh, hướng cội nguồn',
    formalityLevel: 'formal',
    recommendedGarments: ['ngu_than_tay_chen', 'ngu_than_tay_thung', 'tu_than'],
    recommendedColors: { primary: '#1E3A8A', secondary: '#FAF5EE', pants: '#F8F9FA' },
    recommendedTraditional: ['khan_xep', 'kieng_bac'],
    recommendedModern: [],
    recommendationNote: 'Bắt buộc chọn trang phục kín đáo, tà áo dài qua gối, quần suông kín chân. Ưu tiên tông màu trầm nhã như Lam chàm, Xanh rêu hoặc Nâu củ nâu. Tháo kính râm khi bước vào chính điện.'
  },
  {
    id: 'fashion_week',
    name: 'Fashion Week & Biểu Diễn Sân Khấu',
    vibe: 'Avant-garde, đột phá, nghệ thuật đương đại',
    formalityLevel: 'avant-garde',
    recommendedGarments: ['nhat_binh', 'ngu_than_tay_thung', 'giao_linh'],
    recommendedColors: { primary: '#B91C1C', secondary: '#D97706', pants: '#F8F9FA' },
    recommendedTraditional: ['kieng_bac', 'ngoc_boi'],
    recommendedModern: ['matrix_sunglasses', 'corset_belt', 'doc_martens'],
    recommendationNote: 'Bứt phá mọi giới hạn thị giác! Kết hợp áo Nhật Bình hoặc Tay thụng cùng corset thắt eo, kính râm matrix sắc lẹm và boots da cổ cao platform.'
  },
  {
    id: 'cultural_exchange',
    name: 'Giao Lưu Quốc Tế & Du Lịch',
    vibe: 'Bản sắc dân tộc, tự tin lan tỏa văn hóa',
    formalityLevel: 'semi-formal',
    recommendedGarments: ['ngu_than_tay_chen', 'tu_than', 'ao_dai_tan_thoi'],
    recommendedColors: { primary: '#1A365D', secondary: '#D97706', pants: '#F8F9FA' },
    recommendedTraditional: ['khan_xep', 'non_quai_thao'],
    recommendedModern: ['canvas_tote', 'chunky_sneaker'],
    recommendationNote: 'Set đồ hoàn hảo để kể câu chuyện Tứ thân phụ mẫu và đạo Ngũ thường với bạn bè quốc tế. Đính kèm túi tote canvas tiện lợi mang theo quà lưu niệm.'
  }
];

export const REGIONS_WEATHER: RegionWeather[] = [
  {
    city: 'hanoi',
    name: 'Hà Nội',
    season: 'Thu - Đông (Heo may se lạnh)',
    temp: 21,
    condition: 'Trời hanh vàng, gió heo may se lạnh',
    fabricAdvice: 'Lụa tơ tằm dệt dày, gấm vân mây hoặc đũi Nam Cao có độ giữ ấm vừa phải. Rất hợp phối thêm khăn lụa hoặc áo khoác mỏng.',
    conditionOptions: {
      hot: { temp: 34, desc: 'Nắng gắt mùa hè', advice: 'Ưu tiên lụa tơ tằm dệt thưa, đũi tự nhiên hoặc tơ sen thoáng khí thấm mồ hôi.' },
      mild: { temp: 24, desc: 'Tiết thu trong lành', advice: 'Lụa satin nhẹ hoặc gấm mỏng, rất lý tưởng để dạo phố và chụp ảnh ngoài trời.' },
      cold: { temp: 15, desc: 'Gió mùa đông bắc rét ngọt', advice: 'Nên chọn áo ngũ thân may hai lớp lót ấm, phối khăn choàng lụa bản to hoặc áo khoác dạ dáng dài.' },
      rainy: { temp: 20, desc: 'Mưa phùn xuân rả rích', advice: 'Ưu tiên vải gấm kháng ẩm nhẹ, đi kèm guốc mộc truyền thống hoặc giày da chống nước.' }
    }
  },
  {
    city: 'hue',
    name: 'Cố Đô Huế',
    season: 'Mùa mưa trầm mặc',
    temp: 24,
    condition: 'Mưa rả rích, không khí dịu mát',
    fabricAdvice: 'Chất liệu lụa bóng nhẹ, dạ mỏng hoặc lụa satin. Phối cùng ô che mưa trong suốt, quạt giấy hoặc guốc mộc.',
    conditionOptions: {
      hot: { temp: 35, desc: 'Nắng rực rỡ Cố Đô', advice: 'Vải đũi tơ nhẹ, màu sắc tươi sáng như ngọc bích, vàng hoàng yến tránh hấp thụ nhiệt.' },
      mild: { temp: 26, desc: 'Trời dịu mát sông Hương', advice: 'Lụa tơ tằm mềm mại thướt tha, phối kiềng bạc nguyên khối thanh nhã.' },
      cold: { temp: 18, desc: 'Se lạnh mùa đông', advice: 'Áo tay thụng hoặc ngũ thân chẽn may chất liệu nhung the hoặc gấm dày dặn.' },
      rainy: { temp: 22, desc: 'Mưa Cố Đô đặc trưng', advice: 'Dùng vải lụa pha sợi kháng nước, kết hợp guốc mộc để giữ tà áo luôn khô ráo.' }
    }
  },
  {
    city: 'saigon',
    name: 'TP. Hồ Chí Minh',
    season: 'Nắng ấm phương Nam',
    temp: 32,
    condition: 'Nắng rạng rỡ quanh năm, nhộn nhịp phố thị',
    fabricAdvice: 'Đũi tơ tự nhiên, tơ sen thoáng khí hoặc lụa tơ sống mỏng nhẹ thấm hút mồ hôi. Phối kính râm chống UV và sneaker êm ái.',
    conditionOptions: {
      hot: { temp: 34, desc: 'Nắng chói chang nhiệt đới', advice: 'Chọn vải dệt từ sợi tự nhiên mỏng nhẹ, màu sắc mát mắt như xanh ngọc, trắng ngà.' },
      mild: { temp: 28, desc: 'Gió chiều phương Nam lộng gió', advice: 'Rất thích hợp cho áo dài Lemur hoặc giao lĩnh suông bay bổng trong gió.' },
      cold: { temp: 24, desc: 'Sáng sớm se lạnh cuối năm', advice: 'Thêm một lớp áo khoác kimono lụa hoặc dải khăn lụa mỏng quàng cổ.' },
      rainy: { temp: 27, desc: 'Mưa rào bất chợt', advice: 'Quần âu ống đứng hoặc culottes lửng tránh bắn nước, sneaker đế cao hack dáng.' }
    }
  },
  {
    city: 'sapa',
    name: 'Sa Pa - Tây Bắc',
    season: 'Sương mù vùng cao',
    temp: 14,
    condition: 'Sương mù phủ trắng đỉnh đèo, rét buốt',
    fabricAdvice: 'Chất liệu dạ len, thổ cẩm dệt tay lót nhung ấm. Phối kèm khăn len bản to và boots da cao cổ giữ nhiệt tối đa.',
    conditionOptions: {
      hot: { temp: 26, desc: 'Nắng trưa vùng cao dịu nhẹ', advice: 'Chất liệu lanh thổ cẩm dệt tay thoáng mát tự nhiên, hút ẩm tốt.' },
      mild: { temp: 19, desc: 'Mát mẻ trong lành', advice: 'Áo ngũ thân chẽn tay phối cùng áo khoác gấm lửng bên ngoài.' },
      cold: { temp: 10, desc: 'Rét buốt sương tuyết', advice: 'Bắt buộc dùng áo lót nhiệt bên trong, áo ngũ thân chần bông hoặc dạ dày dặn, boots da cao cổ.' },
      rainy: { temp: 13, desc: 'Mưa phùn sương giá', advice: 'Trang bị áo khoác cản gió chống nước bên ngoài cổ phục, giày chống trượt.' }
    }
  }
];

export const COLOR_PALETTE: ColorSwatch[] = [
  { name: 'Đỏ Điều Son', hex: '#B91C1C', element: 'Hỏa', meaning: 'Hỷ khí, may mắn, nhiệt huyết và hưng thịnh' },
  { name: 'Huyết Dụ Hoàng Cung', hex: '#6B1D2F', element: 'Hỏa', meaning: 'Sự quyền quý, trầm ổn và sâu lắng triều đình' },
  { name: 'Xanh Lam Chàm', hex: '#1E3A8A', element: 'Thủy', meaning: 'Sự thông tuệ, trung thực, tĩnh lặng và vững chãi' },
  { name: 'Xanh Ngọc Bích', hex: '#0F766E', element: 'Mộc', meaning: 'Sinh sôi nảy nở, hy vọng tươi mới, thanh cao' },
  { name: 'Xanh Rêu Cổ Mộc', hex: '#3F6212', element: 'Mộc', meaning: 'Gắn kết nguồn cội tự nhiên, mộc mạc và bền bỉ' },
  { name: 'Vàng Hoàng Yến', hex: '#D97706', element: 'Thổ', meaning: 'Sự ấm áp, trí tuệ soi sáng và rực rỡ' },
  { name: 'Vàng Cát Hoàng Thổ', hex: '#B45309', element: 'Thổ', meaning: 'Bao dung, đất mẹ chở che, nền tảng nhân ái' },
  { name: 'Trắng Ngà Tơ Tằm', hex: '#FDFBF7', element: 'Kim', meaning: 'Thuần khiết, thanh bạch, nguyên sơ và tinh tế' },
  { name: 'Đen Tuyền Dạ Hội', hex: '#18181B', element: 'Thủy', meaning: 'Huyền bí, chiều sâu trang trọng tối đa' },
  { name: 'Hồng Phấn Ngọc', hex: '#DB2777', element: 'Hỏa', meaning: 'Duyên dáng, tươi trẻ và lãng mạn' },
  { name: 'Tím Hoa Cà Xứ Huế', hex: '#6D28D9', element: 'Hỏa', meaning: 'Mộng mơ, kín đáo và quý phái Cố Đô' },
  { name: 'Nâu Củ Nâu Kinh Bắc', hex: '#78350F', element: 'Thổ', meaning: 'Chất phác, hồn quê đất mẹ, bền bỉ mộc mạc' }
];

export const PANTS_COLORS: ColorSwatch[] = [
  { name: 'Trắng Ngà Tinh Khôi', hex: '#F8F9FA', element: 'Kim', meaning: 'Truyền thống chuẩn mực' },
  { name: 'Đen Lĩnh Tuyền', hex: '#111827', element: 'Thủy', meaning: 'Tương phản lịch lãm cổ điển' },
  { name: 'Xanh Rêu Trầm', hex: '#27272A', element: 'Mộc', meaning: 'Hiện đại và thời thượng' },
  { name: 'Xanh Denim Jeans', hex: '#3B82F6', element: 'Thủy', meaning: 'Gen Z streetwear phá cách' },
  { name: 'Nâu Be Linen', hex: '#D6C7B2', element: 'Thổ', meaning: 'Tự nhiên phong cách rustic' }
];

export const TRADITIONAL_ACCESSORY_DATA = [
  { id: 'khan_xep', name: 'Khăn Xếp 7 Nếp', icon: '👑', desc: 'Đội ngay ngắn, nếp gấp chỉn chu trang nhã' },
  { id: 'khan_mo_qua', name: 'Khăn Mỏ Quạ Đen', icon: '🦅', desc: 'Gấp hình búp sen tôn vinh khuôn mặt trái xoan' },
  { id: 'kieng_bac', name: 'Kiềng Bạc Chạm Khắc', icon: '✨', desc: 'Trang sức cổ truyền chạm khắc hoa sen hoặc mây sóng' },
  { id: 'non_quai_thao', name: 'Nón Quai Thao (Nón Ba Tầm)', icon: '👒', desc: 'Nón tròn rộng vành duyên dáng liền chị Kinh Bắc' },
  { id: 'guoc_moc', name: 'Guốc Mộc Quai Nhung', icon: '👡', desc: 'Guốc gỗ truyền thống mộc mạc gõ nhịp ngõ gạch xưa' },
  { id: 'quat_giay', name: 'Quạt Giấy Phù Lãng', icon: '🪭', desc: 'Vật bất ly thân thanh tao của tao nhân mặc khách' },
  { id: 'ngoc_boi', name: 'Dải Khánh Ngọc Bội', icon: '📿', desc: 'Treo sườn áo, điểm xuyết mỹ thuật cung đình' },
  { id: 'none', name: 'Không dùng', icon: '🚫', desc: 'Tối giản không phụ kiện truyền thống' }
];

export const MODERN_ACCESSORY_DATA = [
  { id: 'chunky_sneaker', name: 'Chunky Sneaker Trắng', icon: '👟', desc: 'Đế cao bánh mì hack dáng, tạo tương phản năng động' },
  { id: 'matrix_sunglasses', name: 'Kính Râm Matrix Retro', icon: '🕶️', desc: 'Mắt kính hẹp oval thập niên 90s cá tính' },
  { id: 'canvas_tote', name: 'Túi Tote Canvas Typo', icon: '👜', desc: 'Túi vải tiện dụng in chữ Hán-Nôm hoặc logo Việt Phục' },
  { id: 'overear_headphones', name: 'Tai Nghe Over-Ear Kim Loại', icon: '🎧', desc: 'Phong cách Indie & Lo-Fi đương đại khi nghe nhạc hoặc dạo phố' },
  { id: 'corset_belt', name: 'Thắt Lưng Corset Da / Thổ Cẩm', icon: '🎗️', desc: 'Chiết eo định hình phom áo phá cách sắc sảo' },
  { id: 'doc_martens', name: 'Boots Da Cổ Cao Platform', icon: '🥾', desc: 'Bụi bặm, mạnh mẽ chuẩn phong cách thời trang đường phố' },
  { id: 'pearl_choker', name: 'Vòng Cổ Ngọc Trai Đương Đại', icon: '📿', desc: 'Giao thoa giữa cổ điển quý phái và unisex hiện đại' },
  { id: 'none', name: 'Không dùng', icon: '🚫', desc: 'Tối giản không phụ kiện hiện đại' }
];
