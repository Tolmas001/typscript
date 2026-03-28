'use client';

import { ReactNode } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  error?: boolean;
}

export function Checkbox({ checked, onChange, label, error }: CheckboxProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative flex-shrink-0 mt-0.5 w-8 h-8">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`
            w-8 h-8 rounded border-2 flex items-center justify-center
            transition-all duration-200
            ${checked ? 'bg-[#fdb056] border-[#fdb056]' : 'bg-transparent border-[#484d4e]'}
            ${error && !checked ? 'border-red-500 bg-red-500/10 shadow-[0_0_12px_rgba(239,68,68,0.6)] animate-pulse' : ''}
          `}
        >
          {checked && (
            <svg className="w-5 h-5 text-[#191e1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className={`text-base leading-[17.6px] ${error ? 'text-red-500' : 'text-[#cdcdcd]'}`}>
        {label}
      </span>
    </label>
  );
}