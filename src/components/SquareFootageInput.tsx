import React from 'react';
import { Droplets } from 'lucide-react';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export function SquareFootageInput({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Droplets className="w-4 h-4 inline-block mr-2" />
        Affected Area (sq ft)
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}