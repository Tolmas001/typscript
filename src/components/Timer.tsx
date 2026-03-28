'use client';

interface TimerProps {
  formattedTime: string;
  isUrgent: boolean;
}

export function Timer({ formattedTime, isUrgent }: TimerProps) {
  const [minutes, seconds] = formattedTime.split(':');

  return (
    <div className={`flex items-center justify-center gap-1 font-raleway transition-colors duration-300 ${isUrgent ? 'text-[#fd5656] animate-pulse' : 'text-[#ffba00]'}`}>
      <span className="text-2xl md:text-[40px] font-bold md:leading-[52px] tracking-[0] text-current">
        {String(minutes).padStart(2, '0')}
      </span>
      <span className="text-2xl md:text-[40px] font-bold md:leading-[52px] tracking-[0] text-current">
        :
      </span>
      <span className="text-2xl md:text-[40px] font-bold md:leading-[52px] tracking-[0] text-current">
        {String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}