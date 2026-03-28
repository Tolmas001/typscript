'use client';

import { Timer } from './Timer';

interface HeaderProps {
  formattedTime: string;
  isUrgent: boolean;
}

export function Header({ formattedTime, isUrgent }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1d5b43]">
      <div className="flex flex-col items-center gap-1 py-2">
        <span className="text-2xl font-semibold text-white text-center">
          Успейте открыть пробную неделю
        </span>
        <Timer formattedTime={formattedTime} isUrgent={isUrgent} />
      </div>
    </header>
  );
}