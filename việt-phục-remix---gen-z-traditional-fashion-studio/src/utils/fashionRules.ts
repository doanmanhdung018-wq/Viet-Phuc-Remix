import {
  GarmentCategory,
  EventOccasion,
  TraditionalAccessory,
  ModernAccessory,
  CulturalCheckResult,
  CulturalNote,
  PantsStyle,
  ColorAnalysisResult
} from '../types/fashion';
import { TRADITIONAL_GARMENTS, COLOR_PALETTE, PANTS_STYLE_NAMES, TRADITIONAL_ACCESSORY_NAMES, MODERN_ACCESSORY_NAMES } from '../data/garments';

// Helper: Convert HEX color to HSL
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }

  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function evaluateCulturalSafeguard(params: {
  garmentType: GarmentCategory;
  event: EventOccasion;
  pantsStyle: PantsStyle;
  traditionalAccessories: TraditionalAccessory[];
  modernAccessories: ModernAccessory[];
  primaryColor: string;
}): CulturalCheckResult {
  const { garmentType, event, pantsStyle, traditionalAccessories, modernAccessories } = params;
  const notes: CulturalNote[] = [];

  // Check 1: Temple and spiritual events
  if (event === 'temple_festival') {
    if (pantsStyle === 'denim_jeans') {
      notes.push({
        category: 'can_can_nhac',
        title: 'Chất liệu quần khi đến chốn tôn nghiêm',
        reason: 'Không gian tâm linh, thờ tự ưu tiên nét trang nhã, mềm mại. Quần jeans ống đứng denim mang tính đường phố bụi bặm có thể tạo cảm giác thiếu tương thích với bối cảnh lễ bái.',
        suggestion: 'Bạn có thể chuyển sang quần âu suông xếp ly (vải mềm) hoặc quần lụa trắng/đen truyền thống để đảm bảo sự đoan chính, thanh tịnh.',
        historicalContext: 'Tập quán viếng cảnh chùa và lễ hội làng xã của người Việt đề cao sự thanh bạch, tôn kính tiền nhân.'
      });
    }

    if (modernAccessories.includes('matrix_sunglasses')) {
      notes.push({
        category: 'can_can_nhac',
        title: 'Sử dụng kính râm trong không gian điện thờ',
        reason: 'Kính râm retro rất hợp để chụp ảnh check-in ngoại cảnh, nhưng việc đeo kính râm khi bước vào bái yết trong nội điện là điều nên hạn chế.',
        suggestion: 'Hãy tháo kính hoặc cài nhẹ trên cổ áo/túi tote khi bước qua cửa Tam Quan vào chính điện.',
        historicalContext: 'Lễ nghi truyền thống chú trọng giao tiếp ánh mắt thành tâm và nét mặt cung kính.'
      });
    }
  }

  // Check 2: Áo Nhật Bình cung đình
  if (garmentType === 'nhat_binh') {
    if (pantsStyle === 'denim_jeans') {
      notes.push({
        category: 'can_can_nhac',
        title: 'Độ tương thích giữa Nhật Bình và vải Denim thô',
        reason: 'Áo Nhật Bình có dải nẹp thêu chỉ kim tuyến ngũ sắc dày dặn và tà lụa mềm. Chất liệu denim thô cứng có thể cọ xát gây xước tơ lụa và làm giảm độ rủ quý phái.',
        suggestion: 'Nên ưu tiên quần âu suông lụa, quần ống rộng crepe hoặc chân váy đũi mềm để bảo vệ thớ vải và tôn phom dáng cung đình.',
        historicalContext: 'Khâm định Đại Nam hội điển sự lệ quy định phẩm phục Nhật Bình luôn đi cùng quần lụa bạch (trắng) hoặc màu sắc trang nhã.'
      });
    } else {
      notes.push({
        category: 'phu_hop',
        title: 'Bảo toàn phom dáng chuẩn mực của Áo Nhật Bình',
        reason: 'Sự kết hợp bảo đảm bản cổ chữ nhật ngay ngắn và dải phụng ngũ sắc đối xứng buông rủ thanh lịch.',
        suggestion: 'Hãy luôn nhớ cài khuy ngực ngay ngắn theo phía người mặc để tôn vinh sự tôn nghiêm hoàng triều.'
      });
    }
  }

  // Check 3: Áo Tứ Thân & Khăn Xếp
  if (garmentType === 'tu_than' && traditionalAccessories.includes('khan_xep')) {
    notes.push({
      category: 'can_kiem_chung',
      title: 'Khăn xếp kết hợp cùng Áo Tứ Thân Bắc Bộ',
      reason: 'Trong lịch sử, áo tứ thân Kinh Bắc gắn liền với Khăn Mỏ Quạ hoặc Nón Quai Thao (Nón ba tầm). Khăn xếp 7 nếp chủ yếu dùng cho áo ngũ thân.',
      suggestion: 'Nếu mục đích là trang phục đời thường hoặc tái hiện di sản dân gian, bạn nên đổi sang Khăn Mỏ Quạ. Nếu đang biểu diễn thời trang thử nghiệm (Avant-garde), bạn có thể giữ nguyên như một thể nghiệm cá nhân.',
      historicalContext: 'Khăn mỏ quạ gấp hình búp sen là đặc trưng thẩm mỹ độc đáo của phụ nữ vùng đồng bằng sông Hồng.'
    });
  }

  // Check 4: Hướng vạt áo Giao Lĩnh (Hữu nhậm)
  if (garmentType === 'giao_linh') {
    notes.push({
      category: 'phu_hop',
      title: 'Quy cách Hữu Nhậm: Vạt phải đè vạt trái theo phía người mặc',
      reason: 'Thiết kế trên mô hình và cắt may tuân thủ chặt chẽ quy tắc cổ truyền của Đại Việt thời Lý - Trần - Lê, biểu thị sự hài hòa âm dương của người sống.',
      suggestion: 'Khi người mặc tự cài áo, luôn ghi nhớ đưa vạt bên tay phải đè lên vạt bên tay trái của chính mình.',
      historicalContext: 'Khảo cứu trong "Ngàn năm áo mũ" và hiện vật mộ cổ thời Hậu Lê (Bảo Hưng, Vườn Đào) đều ghi nhận chuẩn mực hữu nhậm.'
    });
  }

  // Check 5: Cấu trúc ngũ thân và đạo đức truyền thống
  if (garmentType === 'ngu_than_tay_chen' || garmentType === 'ngu_than_tay_thung') {
    notes.push({
      category: 'phu_hop',
      title: 'Bảo đảm 5 cúc khuy và vạt con che chắn',
      reason: 'Áo giữ trọn vẹn kết cấu ngũ thân: cúc áo cài chéo sang sườn bên phải theo phía người mặc, cổ lập lĩnh đứng thẳng.',
      suggestion: 'Tiếp tục phát huy việc diện áo ngũ thân trong các dịp lễ tốt nghiệp, sự kiện học thuật để lan tỏa bản sắc quốc phục.',
      historicalContext: 'Ý niệm Tứ thân phụ mẫu và ngũ thường là triết lý giáo dục nhân cách sâu sắc được truyền thừa qua các thế hệ nghệ nhân may đo.'
    });
  }

  // Check 6: Phong cách Sneakerheads Remix
  if (modernAccessories.includes('chunky_sneaker')) {
    notes.push({
      category: 'phu_hop',
      title: 'Chunky Sneaker: Điểm chạm giao thoa thế hệ',
      reason: 'Đôi sneaker trắng đế bánh mì giúp việc di chuyển thoải mái, tạo nét tương phản hiện đại năng động mà không xâm phạm vào cấu trúc linh hồn của tà áo cổ phục.',
      suggestion: 'Nên chọn sneaker có tông màu trắng tinh khôi, be hoặc tối giản để tránh gây phân tán sự chú ý khỏi hoa văn tà áo.'
    });
  }

  // Determine overall status
  let overallStatus: CulturalCheckResult['overallStatus'] = 'phu_hop';
  let statusLabel = 'Hài hòa di sản & bối cảnh';
  let summary = 'Bộ phối kết hợp tinh tế giữa quy chuẩn cổ phục và tư duy thời trang trẻ trung, phù hợp không gian lựa chọn.';

  const hasCaution = notes.some(n => n.category === 'can_can_nhac');
  const hasVerification = notes.some(n => n.category === 'can_kiem_chung');

  if (hasCaution) {
    overallStatus = 'can_can_nhac';
    statusLabel = 'Có điểm cần cân nhắc điều chỉnh';
    summary = 'Một số phụ kiện hoặc chất liệu có thể chưa hoàn toàn tương thích với bối cảnh trang nghiêm. Hãy xem gợi ý thay thế bên dưới.';
  } else if (hasVerification) {
    overallStatus = 'can_kiem_chung';
    statusLabel = 'Lưu ý kiểm chứng lịch sử';
    summary = 'Bộ phối có yếu tố thể nghiệm thời trang giao thoa giữa các thời kỳ khác nhau. Phù hợp cho biểu diễn hoặc sáng tạo cá nhân.';
  }

  return {
    overallStatus,
    statusLabel,
    summary,
    notes
  };
}

export function analyzeColorHarmony(
  primaryHex: string,
  secondaryHex: string,
  pantsHex: string
): ColorAnalysisResult {
  const pColor = COLOR_PALETTE.find(c => c.hex.toLowerCase() === primaryHex.toLowerCase());
  const sColor = COLOR_PALETTE.find(c => c.hex.toLowerCase() === secondaryHex.toLowerCase());

  const pHSL = hexToHSL(primaryHex);
  const sHSL = hexToHSL(secondaryHex);

  // Compute hue difference
  let deltaHue = Math.abs(pHSL.h - sHSL.h);
  if (deltaHue > 180) {
    deltaHue = 360 - deltaHue;
  }

  const isPrimaryNeutral = pHSL.s < 18 || pHSL.l < 15 || pHSL.l > 88;
  const isSecondaryNeutral = sHSL.s < 18 || sHSL.l < 15 || sHSL.l > 88;

  let relationship: ColorAnalysisResult['relationship'] = 'tuong_dong';
  let relationshipLabel = 'Quan hệ Tương đồng (Analogous)';
  let aestheticReview = '';
  let adjustmentSuggestion = '';

  if (isPrimaryNeutral || isSecondaryNeutral) {
    relationship = 'trung_tinh';
    relationshipLabel = 'Phối màu Trung tính & Điểm nhấn (Neutral & Accent)';
    aestheticReview = 'Sự kết hợp giữa gam màu trung tính trang nhã (như trắng ngà, đen tuyền, be) và một gam màu chủ đạo giúp bộ đồ giữ được vẻ điềm đạm, tinh tế và rất dễ ứng dụng.';
    adjustmentSuggestion = 'Đây là công thức an toàn và chuẩn mực cho học đường hoặc công sở. Nếu muốn cá tính hơn khi chụp ảnh, bạn có thể tăng độ rực ở phụ kiện như dải thắt lưng hoặc túi tote.';
  } else if (deltaHue <= 45) {
    relationship = 'tuong_dong';
    relationshipLabel = 'Quan hệ Tương đồng (Analogous - Liền kề bánh xe màu)';
    aestheticReview = `Hai gam màu có độ lệch góc sắc thái ${deltaHue}°, nằm liền kề trên vòng tròn quang phổ, tạo cảm giác chuyển tông êm ái, thanh thoát và liền mạch thị giác.`;
    adjustmentSuggestion = 'Để tránh cảm giác đơn điệu, bạn nên giữ quần màu tương phản nhẹ (như trắng ngà hoặc đen lĩnh) để tạo điểm tựa thị giác vững chãi.';
  } else if (deltaHue >= 140 && deltaHue <= 180) {
    relationship = 'bo_tuc';
    relationshipLabel = 'Quan hệ Bổ túc trực tiếp (Complementary - Đối đỉnh)';
    aestheticReview = `Hai gam màu đối đỉnh trên bánh xe màu (độ lệch ${deltaHue}°), tạo hiệu ứng thị giác rực rỡ, sống động và thu hút ánh nhìn mạnh mẽ.`;
    adjustmentSuggestion = 'Cặp màu bổ túc rất hợp cho sân khấu biểu diễn hoặc thời trang đường phố Gen Z. Khi ứng dụng vào đời thường, nên chọn 1 màu làm chủ đạo (chiếm đa số) và màu kia chỉ làm điểm nhấn viền cổ/dải buộc để tránh chói mắt.';
  } else {
    relationship = 'tuong_phan';
    relationshipLabel = 'Quan hệ Tương phản / Tam giác (Triadic / Split-Contrast)';
    aestheticReview = `Độ lệch sắc thái ${deltaHue}° tạo độ tương phản thời trang rõ nét (Color-blocking), mang lại vẻ trẻ trung, phá cách và tinh thần thể nghiệm cao.`;
    adjustmentSuggestion = 'Sự kết hợp này rất ăn ảnh khi chụp ngoại cảnh. Nếu muốn dịu mắt hơn khi vào không gian trang trọng, hãy hạ nhẹ độ bão hòa của màu viền.';
  }

  // Folk element explanation (framed as folk cultural philosophy, NOT fortune telling)
  const pElement = pColor?.element || 'Thủy';
  const sElement = sColor?.element || 'Kim';
  const folkElementNote = `Trong quan niệm thẩm mỹ Á Đông cổ truyền, màu sắc được quy chiếu theo Ngũ Hành biểu trưng: màu ${pColor?.name || 'thân áo'} mang hành ${pElement}, màu ${sColor?.name || 'điểm nhấn'} mang hành ${sElement}. Đây là hệ quy chiếu văn hóa dân gian phản ánh mong muốn hòa hợp với thiên nhiên của cha ông, mang ý nghĩa tham khảo biểu tượng văn hóa.`;

  const ratioNotice = 'Gợi ý tham khảo tỷ lệ thời trang (60-30-10): Ước lượng 60% Thân áo chính, 30% Quần & Tà trong, 10% Điểm nhấn phụ kiện/viền cúc. (Lưu ý: Đây là quy tắc thị giác ước lượng trong thiết kế thời trang, không phải tỷ lệ đo diện tích tuyệt đối).';

  return {
    relationship,
    relationshipLabel,
    primaryHue: pHSL.h,
    secondaryHue: sHSL.h,
    deltaHue,
    aestheticReview,
    adjustmentSuggestion,
    folkElementNote,
    ratioNotice
  };
}
