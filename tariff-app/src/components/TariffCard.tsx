'use client';

import { useState, useEffect } from 'react';
import { Tariff } from '@/types/tariff';

interface TariffCardProps {
  tariff: Tariff;
  isSelected: boolean;
  isExpired: boolean;
  onSelect: (tariff: Tariff) => void;
}

export function TariffCard({ tariff, isSelected, isExpired, onSelect }: TariffCardProps) {
  const discount = Math.round(((tariff.full_price - tariff.price) / tariff.full_price) * 100);

  return (
    <div
      onClick={() => onSelect(tariff)}
      className={`
        relative cursor-pointer transition-all duration-300 w-full
        ${isSelected ? 'scale-[1.02] lg:scale-[1.05]' : 'hover:scale-[1.02]'}
      `}
    >
      <div
        className={`
          relative overflow-hidden rounded-[20px] lg:rounded-[34px] p-5 lg:p-6 lg:pt-10
          bg-[#313637] border-2 flex flex-row lg:flex-col items-center lg:items-center justify-between lg:justify-start lg:h-full gap-4
          ${isSelected ? 'border-[#fdb056]' : 'border-[#484d4e]'}
        `}
      >
        {/* Discount Badge */}
        {!isExpired && discount > 0 && (
          <div className="absolute top-0 right-4 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 z-10 bg-[#fd5656] px-2 py-1 lg:py-[5px] rounded-[0_0_8px_8px] transition-opacity duration-500">
            <span className="text-[12px] lg:text-[16px] font-medium text-white">-{discount}%</span>
          </div>
        )}

        {/* Left Side (Mobile) / Top Side (Desktop) */}
        <div className="flex flex-col items-start lg:items-center w-1/2 lg:w-full gap-2 lg:gap-4 mt-2 lg:mt-0">
          <h3 className="text-[16px] lg:text-[22px] font-medium text-white">{tariff.period}</h3>

          <div className="flex flex-col items-start lg:items-center h-[60px] lg:h-[80px] justify-center relative w-full overflow-hidden">
            
            {/* Old Price + Discount Display (Slides Down on Expire) */}
            <div className={`transition-all duration-700 ease-in-out absolute w-full flex flex-col items-start lg:items-center ${isExpired ? 'opacity-0 translate-y-10 invisible' : 'opacity-100 translate-y-0 visible'}`}>
              <span className="text-[24px] lg:text-[36px] font-semibold text-white leading-none">
                {tariff.price.toLocaleString('ru-RU')} ₽
              </span>
              {tariff.full_price > tariff.price && (
                <div className="relative mt-1">
                  <span className="text-[14px] lg:text-[18px] text-[#919191] line-through">
                    {tariff.full_price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              )}
            </div>

            {/* New Full Price Display (Slides Down from Top on Expire) */}
            <div className={`transition-all duration-700 ease-in-out absolute w-full flex flex-col items-start lg:items-center ${isExpired ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-10 invisible'}`}>
              <span className="text-[24px] lg:text-[36px] font-semibold text-white leading-none">
                {tariff.full_price.toLocaleString('ru-RU')} ₽
              </span>
            </div>

          </div>
        </div>

        {/* Right Side (Mobile) / Bottom Side (Desktop) */}
        <div className="w-1/2 lg:w-full flex items-center lg:items-start justify-end lg:justify-center text-right lg:text-center mt-2 lg:mt-0">
          <p className="text-[12px] lg:text-[14px] text-[#cdcdcd] leading-[1.3] max-w-[120px] lg:max-w-none">
            {tariff.text}
          </p>
        </div>
      </div>
    </div>
  );
}