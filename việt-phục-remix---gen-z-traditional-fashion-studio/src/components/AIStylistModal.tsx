import React, { useState, useEffect } from 'react';
import { OutfitLook } from '../types/fashion';
import { TRADITIONAL_GARMENTS, EVENTS } from '../data/garments';
import { X, Sparkles, Send, Bot, User, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

interface AIStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLook: OutfitLook;
  onApplySuggestedLook: (suggested: Partial<OutfitLook>) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isFallback?: boolean;
  fallbackSource?: string | null;
  suggestedLook?: Partial<OutfitLook>;
  error?: boolean;
}

export const AIStylistModal: React.FC<AIStylistModalProps> = ({
  isOpen,
  onClose,
  currentLook,
  onApplySuggestedLook
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Chào bạn! Mình là Trợ lý phối đồ Việt Phục Remix. Bạn có thể hỏi về bất kỳ dịp nào (ví dụ: "Mình sắp dự lễ tốt nghiệp Đại học...", "Đi dạo cà phê phố cổ...", "Dự đám cưới bạn thân..."). Mình sẽ tư vấn cách phối đồ vừa hiện đại vừa tôn trọng giá trị văn hóa theo câu hỏi của bạn!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);

  // Close modal on Escape
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

  const currentGarment = TRADITIONAL_GARMENTS.find(g => g.id === currentLook.garmentType);
  const currentEvent = EVENTS.find(e => e.id === currentLook.event);

  const samplePrompts = [
    'Mình sắp dự lễ tốt nghiệp Đại học, muốn vừa trang trọng vừa trẻ trung',
    'Tối nay dạo phố cà phê phố cổ se lạnh 20°C',
    'Đi xem triển lãm nghệ thuật phong cách phá cách',
    'Phối áo ngũ thân tay chẽn với sneaker trắng và kính râm'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setLastFailedQuery(null);

    try {
      const res = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          garmentName: currentGarment?.name,
          eventName: currentEvent?.name
        })
      });

      if (!res.ok) {
        throw new Error(`Mã lỗi máy chủ ${res.status}`);
      }

      const data = await res.json();
      if (data && data.reply) {
        setMessages(prev => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            sender: 'ai',
            text: data.reply,
            isFallback: Boolean(data.isFallback),
            fallbackSource: data.fallbackSource,
            suggestedLook: data.suggestedLook
          }
        ]);
      } else {
        throw new Error('Không nhận được nội dung phản hồi');
      }
    } catch (err: any) {
      console.error('Stylist API Error:', err);
      setLastFailedQuery(textToSend);
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'ai',
          text: 'Rất tiếc, đã có lỗi kết nối đến dịch vụ gợi ý. Bạn có thể bấm "Thử lại" bên dưới.',
          error: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full h-[85vh] shadow-2xl border border-[#E3DCCF] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#E3DCCF] flex items-center justify-between bg-[#F7F3EB]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#244A3A] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#B6533C]" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-[#252822]">
                Trợ lý phối đồ Việt Phục Remix
              </h2>
              <p className="text-xs text-[#555A50] font-sans">
                Tư vấn chuẩn xác theo câu hỏi và dịp của bạn
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] rounded-xl text-[#555A50] hover:text-[#252822] hover:bg-stone-200/60 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A]"
            aria-label="Đóng trợ lý phối đồ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message flow */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F7F3EB]/60">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-[#252822] text-white'
                    : m.error
                    ? 'bg-rose-600 text-white'
                    : 'bg-[#244A3A] text-white'
                }`}
              >
                {m.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : m.error ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#252822] text-white rounded-tr-none'
                    : m.error
                    ? 'bg-rose-50 border border-rose-200 text-rose-950 rounded-tl-none'
                    : 'bg-white border border-[#E3DCCF] text-[#252822] rounded-tl-none shadow-2xs'
                }`}
              >
                {/* Fallback label indicator */}
                {m.isFallback && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 mb-2 rounded-md bg-amber-100 text-amber-900 text-[11px] font-medium border border-amber-300">
                    <span>💡 Gợi ý có sẵn (Hệ thống tham khảo)</span>
                  </div>
                )}

                <p className="whitespace-pre-line">{m.text}</p>

                {/* If there is an actionable outfit suggestion */}
                {m.suggestedLook && (
                  <div className="mt-3 pt-2.5 border-t border-[#E3DCCF] flex items-center justify-between gap-2">
                    <span className="text-xs text-[#555A50] italic">
                      Đã tạo cấu hình đồ phù hợp
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onApplySuggestedLook(m.suggestedLook!);
                        onClose();
                      }}
                      className="min-h-[38px] px-3 py-1.5 bg-[#244A3A] hover:bg-[#1A372B] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <span>Áp dụng bộ này</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#555A50] bg-white p-3 rounded-xl border border-[#E3DCCF] w-fit shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-[#B6533C]" />
              <span>Đang phân tích câu hỏi và chuẩn mực di sản...</span>
            </div>
          )}

          {lastFailedQuery && !isLoading && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <span>Không nhận được phản hồi trực tuyến.</span>
              <button
                type="button"
                onClick={() => handleSend(lastFailedQuery)}
                className="min-h-[36px] px-3 py-1 bg-[#244A3A] hover:bg-[#1A372B] text-white rounded-lg font-medium flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Thử lại</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick sample prompt chips */}
        <div className="px-3.5 py-2 border-t border-[#E3DCCF] bg-white overflow-x-auto flex items-center gap-1.5">
          <span className="text-xs text-[#555A50] shrink-0 font-medium">Gợi ý:</span>
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(p)}
              className="text-xs text-[#4A4E46] hover:text-[#252822] bg-[#F7F3EB] hover:bg-[#EFE8DC] border border-[#E3DCCF] rounded-lg px-2.5 py-1.5 whitespace-nowrap transition-colors"
            >
              {p.slice(0, 30)}...
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-[#E3DCCF] bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Hỏi về dịp tốt nghiệp, dạo phố, đám cưới..."
            className="flex-1 min-h-[44px] text-xs sm:text-sm border border-[#E3DCCF] rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#244A3A] text-[#252822]"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="min-w-[44px] min-h-[44px] rounded-xl bg-[#244A3A] hover:bg-[#1A372B] disabled:opacity-40 text-white flex items-center justify-center transition-colors"
            title="Gửi câu hỏi"
            aria-label="Gửi câu hỏi cho trợ lý"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
