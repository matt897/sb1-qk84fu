import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface Props {
  severity: string;
  onChange: (value: string) => void;
}

export function SeverityLevel({ severity, onChange }: Props) {
  const levels = [
    {
      value: 'minor',
      label: 'Level 1 (Minor)',
      description: 'Surface mold on grout, caulking, or small areas (less than 10 sq ft)',
    },
    {
      value: 'moderate',
      label: 'Level 2 (Moderate)',
      description: 'Visible mold growth on walls, ceiling, or larger areas (10-100 sq ft)',
    },
    {
      value: 'severe',
      label: 'Level 3 (Severe)',
      description: 'Extensive mold growth, structural damage, or hidden mold (100+ sq ft)',
    },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        Severity Level
        <Tooltip content={
          <div className="space-y-2">
            <p className="font-semibold">Mold Severity Levels:</p>
            <ul className="list-disc pl-4 space-y-1">
              {levels.map(level => (
                <li key={level.value}>{level.description}</li>
              ))}
            </ul>
          </div>
        } />
      </label>
      <select
        value={severity}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {levels.map((level) => (
          <option key={level.value} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
    </div>
  );
}