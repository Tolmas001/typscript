'use client';

interface BuyButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function BuyButton({ onClick, disabled }: BuyButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full md:w-[352px] px-4 md:px-[60px] py-3 md:py-5 rounded-[20px]
        bg-[#fdb056] text-[#191e1f]
        text-lg md:text-xl font-bold leading-[26px]
        hover:brightness-110 hover:shadow-lg
        active:scale-[0.95] active:bg-[#f8a038]
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      Купить
    </button>
  );
}