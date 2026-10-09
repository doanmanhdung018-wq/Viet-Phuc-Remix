import React, { useState } from 'react';
import { REGIONS_WEATHER } from '../data/garments';
import { WeatherConditionType } from '../types/fashion';
import { CloudSun, Wind, Sun, CloudRain, Snowflake, Cloud, Check } from 'lucide-react';

interface WeatherEventSelectorProps {
  selectedCity: 'hanoi' | 'hue' | 'saigon' | 'sapa';
  onCityChange: (city: 'hanoi' | 'hue' | 'saigon' | 'sapa') => void;
}

export const WeatherEventSelector: React.FC<WeatherEventSelectorProps> = ({
  selectedCity,
  onCityChange
}) => {
  const [selectedCondition, setSelectedCondition] = useState<WeatherConditionType>('mild');

  const currentRegion = REGIONS_WEATHER.find(r => r.city === selectedCity) || REGIONS_WEATHER[0];
  const activeConditionData = currentRegion.conditionOptions?.[selectedCondition] || {
    temp: currentRegion.temp,
    desc: currentRegion.condition,
    advice: currentRegion.fabricAdvice
  };

  const weatherIcons: Record<WeatherConditionType, React.ReactNode> = {
    hot: <Sun className="w-4 h-4 text-amber-500" />,
    mild: <Cloud className="w-4 h-4 text-sky-600" />,
    cold: <Snowflake className="w-4 h-4 text-indigo-500" />,
    rainy: <CloudRain className="w-4 h-4 text-blue-500" />
  };

  const weatherLabels: Record<WeatherConditionType, string> = {
    hot: 'Nóng',
    mild: 'Mát mẻ',
    cold: 'Lạnh',
    rainy: 'Mưa'
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E3DCCF] shadow-sm p-4 sm:p-5 space-y-3.5">
      {/* Header with explicit simulated label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-[#E3DCCF] gap-1">
        <div className="flex items-center gap-2">
          <CloudSun className="w-4 h-4 text-[#244A3A]" />
          <h3 className="text-sm font-semibold text-[#252822] font-sans">
            Thời tiết & khí hậu địa phương
          </h3>
        </div>
        <span className="text-[11px] text-[#555A50] font-sans bg-[#F7F3EB] px-2 py-0.5 rounded-full border border-[#E3DCCF] w-fit">
          Thời tiết minh họa theo mùa
        </span>
      </div>

      {/* 4 Cities Selection (Hà Nội, Huế, TP. Hồ Chí Minh, Sa Pa) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {REGIONS_WEATHER.map(rw => {
          const isSelected = selectedCity === rw.city;
          return (
            <button
              key={rw.city}
              type="button"
              onClick={() => onCityChange(rw.city)}
              className={`min-h-[50px] p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
                isSelected
                  ? 'border-[#244A3A] bg-[#244A3A] text-white shadow-xs ring-2 ring-[#244A3A]/20'
                  : 'border-[#E3DCCF] hover:border-[#244A3A]/40 bg-white text-[#252822]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">{rw.name}</span>
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>
              <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-[#EFE8DC]' : 'text-[#555A50]'}`}>
                {rw.season.split('(')[0].trim()}
              </div>
            </button>
          );
        })}
      </div>

      {/* Manual Weather Condition Selector */}
      <div className="p-3 rounded-xl bg-[#F7F3EB] border border-[#E3DCCF]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#555A50] font-sans">
            Tùy chọn thời tiết:
          </span>
          <span className="text-xs font-bold text-[#244A3A] font-mono">
            {activeConditionData.temp}°C · {activeConditionData.desc}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {(['hot', 'mild', 'cold', 'rainy'] as WeatherConditionType[]).map(cond => {
            const isActive = selectedCondition === cond;
            return (
              <button
                key={cond}
                type="button"
                onClick={() => setSelectedCondition(cond)}
                className={`min-h-[44px] py-1.5 px-2 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#244A3A] ${
                  isActive
                    ? 'bg-white border-[#244A3A] text-[#244A3A] shadow-xs font-semibold ring-1 ring-[#244A3A]'
                    : 'bg-white/60 border-[#E3DCCF] text-[#4A4E46] hover:bg-white hover:text-[#252822]'
                }`}
              >
                {weatherIcons[cond]}
                <span>{weatherLabels[cond]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fabric & Layering Advice */}
      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-[#252822] leading-relaxed flex items-start gap-2.5">
        <Wind className="w-4 h-4 text-[#B6533C] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#B6533C] font-semibold">Khuyên dùng chất liệu: </strong>
          <span className="text-[#4A4E46]">{activeConditionData.advice}</span>
        </div>
      </div>
    </div>
  );
};
