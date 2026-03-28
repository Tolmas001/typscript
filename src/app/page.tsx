'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { TariffCard } from '@/components/TariffCard';
import { Checkbox } from '@/components/Checkbox';
import { BuyButton } from '@/components/BuyButton';
import { useTimer } from '@/hooks/useTimer';
import { useTariffs } from '@/hooks/useTariffs';

export default function Home() {
  const { formattedTime, isUrgent, isExpired } = useTimer();
  const { tariffs, selectedTariff, isLoading, error, selectTariff } = useTariffs();
  const [agreed, setAgreed] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleBuy = () => {
    if (!agreed) {
      setCheckboxError(true);
      return;
    }
    setShowSuccessModal(true);
    setCheckboxError(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#fdb056] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#333] font-medium">Загрузка тарифов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4">
        <div className="text-center p-8 bg-[#313637] rounded-[34px] border-2 border-[#484d4e] max-w-sm">
          <h2 className="text-xl font-semibold text-white mb-2">Ошибка загрузки</h2>
          <p className="text-[#cdcdcd]">{error}</p>
        </div>
      </div>
    );
  }

  const mainTariff = tariffs.find(t => t.is_best);
  const smallTariffs = tariffs.filter(t => !t.is_best);
  
  // Tartib Figma bo'yicha: 3 месяца, 1 месяц, 1 неделя (server teskari beryapti)
  const sortedSmallTariffs = [...smallTariffs].reverse();

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5] overflow-x-hidden pt-16 lg:pt-[80px]">
      <Header formattedTime={formattedTime} isUrgent={isUrgent} />
      
      <main className="flex-grow w-full flex flex-col">
        <div className="flex-grow bg-[#2a2f30] w-full shadow-2xl overflow-hidden relative px-4 lg:px-8 py-8 lg:py-12">
          <div className="max-w-[1200px] mx-auto w-full">
            
            <h1 className="text-[28px] lg:text-[40px] font-bold text-center text-white mb-8 lg:mb-12 z-10 relative">
              Выбери подходящий для себя <span className="text-[#fdb056]">тариф</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start justify-center relative z-10">
              {/* Left Column: Image */}
              <div className="w-full max-w-[300px] lg:max-w-[400px] flex justify-center lg:mt-0 order-2 lg:order-1">
                <img src="/man.png" alt="Fitness Man" className="w-full h-auto object-contain drop-shadow-2xl" />
              </div>

              {/* Right Column: Tariffs */}
              <div className="w-full lg:max-w-[650px] flex flex-col order-1 lg:order-2">
                
                {/* Main Tariff */}
                {mainTariff && (
                  <div 
                    onClick={() => selectTariff(mainTariff)}
                    className={`relative cursor-pointer w-full bg-[#313637] rounded-[34px] border-2 transition-all p-6 lg:p-[30px_40px] mb-6 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-4 ${
                      selectedTariff?.period === mainTariff.period ? 'border-[#fdb056]' : 'border-[#484d4e]'
                    }`}
                  >
                    <div className="absolute top-2.5 right-6">
                      <span className="text-[18px] lg:text-[22px] font-medium text-[#fdb056]">хит!</span>
                    </div>
                    {!isExpired && (
                      <div className="absolute top-0 left-6 lg:left-10 bg-[#fd5656] px-3 py-1 lg:py-[5px] rounded-[0_0_8px_8px] transition-opacity duration-500">
                        <span className="text-[16px] lg:text-[20px] font-medium text-white">
                          -{Math.round(((mainTariff.full_price - mainTariff.price) / mainTariff.full_price) * 100)}%
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:items-start items-center gap-2 mt-4 sm:mt-0">
                      <span className="text-[22px] lg:text-[26px] font-medium text-white">Навсегда</span>
                      <p className="text-sm lg:text-base text-[#cdcdcd] max-w-[200px] sm:text-left text-center leading-[1.3]">
                        Для тех, кто хочет всегда быть в форме и поддерживать здоровье
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center sm:items-end relative h-[80px] lg:h-[100px] justify-center overflow-hidden w-[160px] lg:w-[200px]">
                      <div className={`transition-all duration-700 ease-in-out absolute flex flex-col items-center sm:items-end w-full ${isExpired ? 'opacity-0 translate-y-10 invisible' : 'opacity-100 translate-y-0 visible'}`}>
                        <span className="text-[40px] lg:text-[50px] font-semibold text-[#fdb056] leading-none mb-1 text-right">
                          {mainTariff.price.toLocaleString('ru-RU')} ₽
                        </span>
                        <div className="relative inline-block">
                          <span className="text-xl lg:text-2xl text-[#919191] line-through">
                            {mainTariff.full_price.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                      </div>

                      <div className={`transition-all duration-700 ease-in-out absolute flex flex-col items-center sm:items-end w-full ${isExpired ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-10 invisible'}`}>
                        <span className="text-[40px] lg:text-[50px] font-semibold text-[#fdb056] leading-none mb-1 text-right">
                          {mainTariff.full_price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Small Tariffs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {sortedSmallTariffs.map((tariff) => (
                    <TariffCard
                      key={tariff.period}
                      tariff={tariff}
                      isSelected={selectedTariff?.period === tariff.period}
                      isExpired={isExpired}
                      onSelect={selectTariff}
                    />
                  ))}
                </div>

                {/* Warning Info */}
                <div className="flex items-start gap-4 p-4 lg:p-5 bg-[#25292a] rounded-[20px] mb-8">
                  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" viewBox="0 0 24 26" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#ffba00"/>
                  </svg>
                  <p className="text-[14px] lg:text-[15px] text-white leading-relaxed">
                    Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
                  </p>
                </div>

                {/* Terms Checkbox */}
                <div className="mb-6 pl-2">
                  <Checkbox
                    checked={agreed}
                    onChange={(checked) => {
                      setAgreed(checked);
                      setCheckboxError(false);
                    }}
                    label={
                      <span className="text-[14px] lg:text-[15px] text-[#cdcdcd]">
                        Я согласен с <span className="underline text-white hover:text-[#fdb056] cursor-pointer">офертой рекуррентных платежей</span> и <span className="underline text-white hover:text-[#fdb056] cursor-pointer">Политикой конфиденциальности</span>
                      </span>
                    }
                    error={checkboxError}
                  />
                </div>

                {/* Buy Button */}
                <div className="w-full">
                  <BuyButton onClick={handleBuy} disabled={!selectedTariff} />
                </div>

                {/* Disclaimer */}
                <p className="mt-6 text-[12px] lg:text-[13px] text-[#888] leading-[1.4]">
                  Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. 
                  Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
                </p>
              </div>
            </div>

            {/* Guarantee Section */}
            <div className="relative z-10 mt-16 p-6 lg:p-8 rounded-[30px] border border-[#484d4e] w-full max-w-[1000px] mx-auto flex flex-col items-center sm:items-start">
              <div className="inline-flex items-center justify-center pt-3 pb-3 px-6 lg:px-8 bg-[#25292a] rounded-full border border-[#81fe95] mb-6 shadow-[0_0_15px_rgba(129,254,149,0.15)]">
                <span className="text-[20px] lg:text-[24px] font-medium text-[#81fe95] uppercase tracking-wide">гарантия возврата 30 дней</span>
              </div>
              <p className="text-[16px] lg:text-[20px] text-[#dcdcdc] leading-[1.5] text-center sm:text-left">
                Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! 
                Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowSuccessModal(false)}
          />
          <div className="bg-[#2a2f30] border border-[#484d4e] rounded-[30px] p-8 lg:p-10 w-full max-w-md relative z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] transform animate-fade-in-up flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#81fe95]/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#81fe95]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Отлично!</h3>
            
            <p className="text-[#cdcdcd] text-[16px] mb-8 leading-relaxed">
              Вы успешно выбрали тариф <br />
              <span className="text-[#fdb056] font-semibold text-lg">{selectedTariff?.period}</span> за <span className="text-white font-bold text-lg">{selectedTariff?.price}₽</span>.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#313637] hover:bg-[#3d4344] active:scale-95 text-white py-4 rounded-[20px] font-medium transition-all text-lg"
            >
              Продолжить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}