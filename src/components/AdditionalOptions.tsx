import React from 'react';

interface Props {
  needsTesting: boolean;
  needsRepair: boolean;
  accessibility: string;
  onTestingChange: (value: boolean) => void;
  onRepairChange: (value: boolean) => void;
  onAccessibilityChange: (value: string) => void;
}

export function AdditionalOptions({
  needsTesting,
  needsRepair,
  accessibility,
  onTestingChange,
  onRepairChange,
  onAccessibilityChange,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Accessibility Level
        </label>
        <select
          value={accessibility}
          onChange={(e) => onAccessibilityChange(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="standard">Standard Access</option>
          <option value="limited">Limited Access (Higher Cost)</option>
          <option value="difficult">Difficult Access (Highest Cost)</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="testing"
          checked={needsTesting}
          onChange={(e) => onTestingChange(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="testing" className="ml-2 text-sm text-gray-700">
          Include Professional Testing ($250-$700)
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="repair"
          checked={needsRepair}
          onChange={(e) => onRepairChange(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="repair" className="ml-2 text-sm text-gray-700">
          Requires Structural Repair
        </label>
      </div>
    </div>
  );
}