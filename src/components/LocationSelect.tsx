import React from 'react';
import { Home } from 'lucide-react';
import { Location } from '../types';
import { Tooltip } from './Tooltip';

interface Props {
  location: string;
  locations: Location[];
  onChange: (value: string) => void;
}

export function LocationSelect({ location, locations, onChange }: Props) {
  const locationInfo = {
    bathroom: 'Common in bathrooms due to high humidity. Check around tubs, toilets, and sinks.',
    basement: 'Often affected by water seepage and poor ventilation.',
    attic: 'Check for roof leaks and proper ventilation.',
    'crawl space': 'Inspect for water intrusion and proper vapor barriers.',
    hvac: 'Can spread mold throughout the building if contaminated.',
    'whole house': 'Extensive mold growth affecting multiple areas.',
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <Home className="w-4 h-4" />
        Location
        <Tooltip content={
          <div className="space-y-2">
            <p className="font-semibold">Location Guide:</p>
            <ul className="list-disc pl-4 space-y-1">
              {Object.entries(locationInfo).map(([key, info]) => (
                <li key={key}><span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {info}</li>
              ))}
            </ul>
          </div>
        } />
      </label>
      <select
        value={location}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {locations.map((loc) => (
          <option key={loc.name} value={loc.name}>
            {loc.name.charAt(0).toUpperCase() + loc.name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}