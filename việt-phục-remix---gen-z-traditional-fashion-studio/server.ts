import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Helper to determine intent from user message
function getFallbackStylingAdvice(userMessage: string, currentGarment?: string, currentEvent?: string) {
  const msg = (userMessage || '').toLowerCase();

  // Intent 1: Graduation / Commencement / Academic
  if (
    msg.includes('tốt nghiệp') ||
    msg.includes('khai giảng') ||
    msg.includes('đại học') ||
    msg.includes('nhận bằng') ||
    msg.includes('học đường') ||
    msg.includes('kỷ yếu') ||
    msg.includes('sinh viên') ||
    msg.includes('học sinh') ||
    msg.includes('ra trường')
  ) {
    return {
      reply: 'Dù bối cảnh đang chọn trên màn hình chính là gì, đối với dịp Lễ Tốt Nghiệp / Khai Giảng, bộ phối lý tưởng nhất là Áo Ngũ Thân Tay Chẽn (màu Xanh Ngọc Bích hoặc Lam Chàm thanh tao) kết hợp quần âu suông cạp cao màu trắng ngà. Điểm xuyết khăn xếp 7 nếp truyền thống cùng giày chunky sneaker trắng tối giản để thoải mái bước lên bục nhận bằng. Bạn vừa giữ trọn vẻ đoan trang, lịch thiệp trong lễ đường vừa tự tin, năng động trong mọi khung hình kỷ yếu!',
      suggestedLook: {
        garmentType: 'ngu_than_tay_chen',
        primaryColor: '#0F766E', // Xanh ngọc bích
        secondaryColor: '#FAF5EE',
        pantsColor: '#F8F9FA',
        pantsStyle: 'wide_leg_trousers',
        event: 'graduation',
        traditionalAccessories: ['khan_xep', 'kieng_bac'],
        modernAccessories: ['chunky_sneaker', 'canvas_tote']
      }
    };
  }

  // Intent 2: Street / Coffee / Casual hangout
  if (
    msg.includes('dạo phố') ||
    msg.includes('cà phê') ||
    msg.includes('cafe') ||
    msg.includes('tạ hiện') ||
    msg.includes('hà nội') ||
    msg.includes('phố cổ') ||
    msg.includes('street') ||
    msg.includes('chụp ảnh') ||
    msg.includes('check-in') ||
    msg.includes('checkin') ||
    msg.includes('cuối tuần') ||
    msg.includes('đi chơi')
  ) {
    return {
      reply: 'Dạo phố cà phê cuối tuần hoặc check-in phố cổ cần sự phóng khoáng và thoải mái tối đa. Gợi ý hàng đầu là Áo Tứ Thân Kinh Bắc hoặc Ngũ Thân tay chẽn phối cùng quần jeans suông ống rộng / váy đũi xếp ly, kết hợp tai nghe over-ear kim loại và kính râm retro. Bạn có thể khoác hờ tà áo bay bổng khi bước qua phố cổ chụp ảnh cực nghệ!',
      suggestedLook: {
        garmentType: 'tu_than',
        primaryColor: '#78350F',
        secondaryColor: '#DB2777',
        pantsColor: '#111827',
        pantsStyle: 'pleated_skirt',
        event: 'street_coffee',
        traditionalAccessories: ['quat_giay'],
        modernAccessories: ['overear_headphones', 'matrix_sunglasses', 'chunky_sneaker']
      }
    };
  }

  // Intent 3: Wedding / Engagement / Guest
  if (
    msg.includes('đám cưới') ||
    msg.includes('ăn hỏi') ||
    msg.includes('dự tiệc') ||
    msg.includes('hôn lễ') ||
    msg.includes('tiệc cưới') ||
    msg.includes('bạn thân') ||
    msg.includes('cưới')
  ) {
    return {
      reply: 'Đi dự đám cưới hoặc lễ ăn hỏi bạn bè nên ưu tiên gam màu tươi sáng, nhã nhặn như Vàng hoàng yến, Hồng ngọc hoặc Xanh ngọc bích trên nền Áo Ngũ Thân tay chẽn hoặc Áo Dài tân thời. Lưu ý tinh tế: Tránh mặc màu đỏ tươi rực rỡ lấn át cô dâu chú rể, phối cùng kiềng bạc hoặc vòng ngọc trai để tôn lên nét thanh lịch của khách mời!',
      suggestedLook: {
        garmentType: 'ngu_than_tay_chen',
        primaryColor: '#D97706',
        secondaryColor: '#FAF5EE',
        pantsColor: '#F8F9FA',
        pantsStyle: 'wide_leg_trousers',
        event: 'wedding_guest',
        traditionalAccessories: ['kieng_bac'],
        modernAccessories: ['pearl_choker', 'chunky_sneaker']
      }
    };
  }

  // Intent 4: Temple / Spiritual ceremony
  if (
    msg.includes('chùa') ||
    msg.includes('lễ hội') ||
    msg.includes('tâm linh') ||
    msg.includes('đền') ||
    msg.includes('phủ') ||
    msg.includes('bái yết') ||
    msg.includes('dâng hương')
  ) {
    return {
      reply: 'Khi đi Chùa hoặc tham gia Lễ hội truyền thống, sự tôn nghiêm và kín đáo là ưu tiên số một. Bạn nên diện Áo Ngũ Thân tay chẽn hoặc tay thụng dài qua gối, quần lụa suông kín mắt cá chân, tông màu trầm ấm như Lam chàm, Xanh rêu hoặc Nâu đũi. Tránh quần jeans rách hoặc kính râm khi bước vào nội điện.',
      suggestedLook: {
        garmentType: 'ngu_than_tay_chen',
        primaryColor: '#1E3A8A',
        secondaryColor: '#FAF5EE',
        pantsColor: '#F8F9FA',
        pantsStyle: 'traditional_silk',
        event: 'temple_festival',
        traditionalAccessories: ['khan_xep', 'kieng_bac'],
        modernAccessories: []
      }
    };
  }

  // Intent 5: Fashion Week / Stage Runway / Avant-garde
  if (
    msg.includes('fashion week') ||
    msg.includes('avant-garde') ||
    msg.includes('sàn diễn') ||
    msg.includes('runway') ||
    msg.includes('biểu diễn') ||
    msg.includes('sân khấu') ||
    msg.includes('nghệ thuật') ||
    msg.includes('haute couture')
  ) {
    return {
      reply: 'Sân khấu biểu diễn và Fashion Week là thánh địa để bứt phá giới hạn thẩm mỹ! Hãy thử Áo Nhật Bình Hoàng Triều kết hợp cùng thắt lưng corset da thắt eo, kính râm matrix sắc lẹm và boots da cổ cao platform. Một phong thái "Vương Triều Tương Lai" kết hợp trọn vẹn giữa đường nét cung đình Huế và hơi thở avant-garde quốc tế!',
      suggestedLook: {
        garmentType: 'nhat_binh',
        primaryColor: '#B91C1C',
        secondaryColor: '#D97706',
        pantsColor: '#F8F9FA',
        pantsStyle: 'wide_leg_trousers',
        event: 'fashion_week',
        traditionalAccessories: ['kieng_bac', 'ngoc_boi'],
        modernAccessories: ['matrix_sunglasses', 'corset_belt', 'doc_martens']
      }
    };
  }

  // Intent 6: Cultural Exchange / Tourism
  if (
    msg.includes('giao lưu') ||
    msg.includes('quốc tế') ||
    msg.includes('du lịch') ||
    msg.includes('bạn bè quốc tế') ||
    msg.includes('nước ngoài') ||
    msg.includes('trao đổi')
  ) {
    return {
      reply: 'Khi giao lưu quốc tế hoặc du lịch quảng bá văn hóa, hãy chọn Áo Ngũ Thân tay chẽn hoặc Áo Tứ Thân. Bạn có thể tự tin kể câu chuyện Tứ thân phụ mẫu và đạo Ngũ thường cho bạn bè thế giới. Kết hợp túi tote canvas tiện lợi và giày sneaker êm ái để sẵn sàng cho mọi hành trình khám phá!',
      suggestedLook: {
        garmentType: 'ngu_than_tay_chen',
        primaryColor: '#1A365D',
        secondaryColor: '#D97706',
        pantsColor: '#F8F9FA',
        pantsStyle: 'wide_leg_trousers',
        event: 'cultural_exchange',
        traditionalAccessories: ['khan_xep', 'non_quai_thao'],
        modernAccessories: ['canvas_tote', 'chunky_sneaker']
      }
    };
  }

  // Default context-aware advice prioritizing the message
  return {
    reply: `Với câu hỏi của bạn: "${userMessage}", phong cách phối đồ lý tưởng là tận dụng thế mạnh của Áo Ngũ Thân hoặc Giao Lĩnh, kết hợp bảng màu tương phản hài hòa (như Lam Chàm phối Vàng Hoàng Yến) và điểm xuyết phụ kiện Gen Z nhẹ nhàng như chunky sneaker hoặc túi tote canvas. Bạn vừa giữ trọn nét thanh tao của cổ phục vừa toát lên tinh thần thời trang đường phố tự tin!`,
    suggestedLook: {
      garmentType: 'ngu_than_tay_chen',
      primaryColor: '#1E3A8A',
      secondaryColor: '#D97706',
      pantsColor: '#F8F9FA',
      pantsStyle: 'wide_leg_trousers',
      traditionalAccessories: ['kieng_bac'],
      modernAccessories: ['chunky_sneaker', 'canvas_tote']
    }
  };
}

// Server-side Gemini API proxy route
app.post('/api/stylist', async (req, res) => {
  const { message, garmentName, eventName } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // If no live API key configured
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    const fallback = getFallbackStylingAdvice(message, garmentName, eventName);
    return res.json({
      reply: fallback.reply,
      isFallback: true,
      fallbackSource: 'Gợi ý có sẵn (Hệ thống tham khảo)',
      suggestedLook: fallback.suggestedLook
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Explicit prompt instructing Gemini to PRIORITIZE message intent over background event
    const prompt = `Câu hỏi của người dùng: "${message}".
Thông tin bổ trợ đang mở trên app (CHỈ dùng khi người dùng không hỏi về sự kiện khác):
- Dáng áo đang xem: ${garmentName || 'Áo Ngũ Thân'}
- Sự kiện nền đang chọn trên app: ${eventName || 'Không xác định'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `Bạn là Chuyên gia tư vấn thời trang Việt Phục Remix (Stylist Cổ Phục Gen Z).
QUY TẮC CỐT LÕI:
1. Bạn PHẢI ƯU TIÊN TUYỆT ĐỐI ý định, sự kiện và hoàn cảnh được nêu trong tin nhắn mới nhất của người dùng.
2. Nếu người dùng hỏi về một sự kiện cụ thể (ví dụ: "Mình sắp dự lễ tốt nghiệp Đại học...", "Đi dạo phố cà phê...", "Dự đám cưới...", v.v.), BẠN BẮT BUỘC PHẢI TƯ VẤN THẲNG VÀO SỰ KIỆN ĐÓ. Tuyệt đối không được trả lời lạc đề theo sự kiện nền cũ trên ứng dụng (như Đi Chùa, v.v.).
3. Phong cách trả lời: Dưới 150 từ, trẻ trung, am hiểu di sản văn hóa Việt Nam (Áo ngũ thân, Tứ thân, Nhật bình, Giao lĩnh, Lemur) và tư duy phối đồ Gen Z hiện đại (sneaker, kính râm, tai nghe, túi tote, phối màu). Đưa ra lời khuyên phối đồ thực tế và lưu ý giữ gìn tính tôn nghiêm văn hóa.`
      }
    });

    const replyText = response.text || '';
    if (replyText.trim()) {
      const fallbackLook = getFallbackStylingAdvice(message, garmentName, eventName).suggestedLook;
      return res.json({
        reply: replyText,
        isFallback: false,
        fallbackSource: null,
        suggestedLook: fallbackLook
      });
    }

    // If Gemini returned empty text
    const fallback = getFallbackStylingAdvice(message, garmentName, eventName);
    return res.json({
      reply: fallback.reply,
      isFallback: true,
      fallbackSource: 'Gợi ý có sẵn (Hệ thống tham khảo)',
      suggestedLook: fallback.suggestedLook
    });
  } catch (aiErr: any) {
    console.warn('Gemini API call failed, falling back to deterministic advice:', aiErr?.message || aiErr);
    const fallback = getFallbackStylingAdvice(message, garmentName, eventName);
    return res.json({
      reply: fallback.reply,
      isFallback: true,
      fallbackSource: 'Gợi ý có sẵn (Hệ thống tham khảo do mất kết nối AI)',
      suggestedLook: fallback.suggestedLook
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
