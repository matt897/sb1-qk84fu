import React from 'react';
import { DollarSign, Info } from 'lucide-react';
import { Location } from '../types';
import { Tooltip } from './Tooltip';

interface Props {
  totalCost: { min: number; max: number };
  location: string;
  locations: Location[];
  moldType: string;
  severity: string;
  accessibility: string;
  needsTesting: boolean;
  needsRepair: boolean;
  squareFootage: number;
}

export function CostBreakdown({
  totalCost,
  location,
  locations,
  moldType,
  severity,
  accessibility,
  needsTesting,
  needsRepair,
  squareFootage,
}: Props) {
  const selectedLocation = locations.find(loc => loc.name === location);

  const costFactors = [
    {
      label: 'Base Location Cost',
      min: selectedLocation?.minCost || 0,
      max: selectedLocation?.maxCost || 0,
      info: 'Starting cost based on typical remediation for this location',
    },
    {
      label: 'Square Footage',
      min: squareFootage * 10,
      max: squareFootage * 25,
      info: 'Additional cost based on affected area size',
    },
    ...(moldType === 'black' ? [{
      label: 'Black Mold Premium',
      min: (selectedLocation?.minCost || 0) * 0.5,
      max: (selectedLocation?.maxCost || 0) * 0.75,
      info: 'Additional cost for handling toxic black mold',
    }] : []),
    ...(accessibility !== 'standard' ? [{
      label: `${accessibility === 'difficult' ? 'Difficult' : 'Limited'} Access Fee`,
      min: (selectedLocation?.minCost || 0) * 0.25,
      max: (selectedLocation?.maxCost || 0) * 0.5,
      info: 'Additional cost for hard-to-reach areas',
    }] : []),
    ...(needsTesting ? [{
      label: 'Testing Costs',
      min: 250,
      max: 700,
      info: 'Professional mold testing and inspection',
    }] : []),
    ...(needsRepair ? [{
      label: 'Structural Repair',
      min: 2000,
      max: 10000,
      info: 'Repairs to damaged building materials',
    }] : []),
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Estimated Cost Range
          <Tooltip content={
            <div>
              <p>This estimate is based on national averages and may vary by location. We recommend getting multiple quotes from local professionals.</p>
            </div>
          } />
        </h2>
        <div className="text-3xl font-bold text-blue-600">
          ${totalCost.min.toLocaleString()} - ${totalCost.max.toLocaleString()}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Detailed Cost Breakdown
          </h3>
          <div className="space-y-3">
            {costFactors.map((factor, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  {factor.label}
                  <Tooltip content={factor.info} />
                </div>
                <span className="font-medium">
                  ${factor.min.toLocaleString()} - ${factor.max.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> These estimates are based on national averages. Local costs may vary based on your specific location and circumstances. We recommend getting quotes from multiple certified professionals.
          </p>
        </div>
      </div>
    </div>
  );
}