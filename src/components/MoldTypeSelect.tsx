import React, { useState } from 'react';
import { Bug, CircleDot, AlertCircle, Skull, X, Flower2 } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface Props {
  moldType: string;
  onChange: (value: string) => void;
}

interface MoldType {
  value: string;
  label: string;
  commonName: string;
  description: string;
  color: string;
  location: string;
  health: string;
  icon: React.ReactNode;
}

export function MoldTypeSelect({ moldType, onChange }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMold, setSelectedMold] = useState<MoldType | null>(null);

  const moldTypes: MoldType[] = [
    {
      value: 'stachybotrys',
      label: 'Stachybotrys chartarum',
      commonName: 'Black Mold',
      description: 'Known as "black mold," this toxic variety requires professional remediation',
      color: 'Dark green to black, slimy texture',
      location: 'Areas with constant moisture: leaky pipes, water damage',
      health: 'Can cause severe respiratory issues and neurological problems',
      icon: <Skull className="w-12 h-12 text-gray-900" />
    },
    {
      value: 'aspergillus',
      label: 'Aspergillus',
      commonName: 'Common Indoor Mold',
      description: 'One of the most common indoor molds',
      color: 'Usually green, white, or gray',
      location: 'Air conditioning systems, food, soil',
      health: 'Can cause respiratory infections and allergic reactions',
      icon: <Flower2 className="w-12 h-12 text-emerald-600" />
    },
    {
      value: 'penicillium',
      label: 'Penicillium',
      commonName: 'Blue-Green Mold',
      description: 'Common in indoor environments',
      color: 'Blue-green to gray-green',
      location: 'Wallpaper, decaying fabrics, moist building materials',
      health: 'Can trigger asthma and allergies',
      icon: <CircleDot className="w-12 h-12 text-cyan-600" />
    },
    {
      value: 'cladosporium',
      label: 'Cladosporium',
      commonName: 'Dark Spot Mold',
      description: 'Can grow in both warm and cold conditions',
      color: 'Olive-green to brown or black',
      location: 'Fabrics, wood surfaces, HVAC insulation',
      health: 'Common allergen, can cause respiratory issues',
      icon: <Bug className="w-12 h-12 text-olive-700" />
    },
    {
      value: 'alternaria',
      label: 'Alternaria',
      commonName: 'Outdoor Mold',
      description: 'Most common outdoor mold',
      color: 'Dark green to brown with a velvet texture',
      location: 'Damp areas, particularly bathrooms and below leaking sinks',
      health: 'Can cause severe allergic reactions',
      icon: <AlertCircle className="w-12 h-12 text-amber-700" />
    }
  ];

  const handleMoldClick = (mold: MoldType) => {
    setSelectedMold(mold);
    setShowModal(true);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <Bug className="w-4 h-4" />
        Type of Mold
        <Tooltip content={
          <div className="space-y-2">
            <p className="font-semibold">Click a mold type to see detailed information.</p>
          </div>
        } />
      </label>
      
      <div className="space-y-4">
        <select
          value={moldType}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="unknown">Unknown Type</option>
          {moldTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.commonName}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {moldTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => handleMoldClick(type)}
              className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-sm hover:shadow-md transition-all hover:ring-2 hover:ring-blue-500"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  {type.icon}
                </div>
                <span className="font-medium text-sm text-gray-900">
                  {type.commonName}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {showModal && selectedMold && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedMold.commonName}</h3>
                  <p className="text-sm text-gray-500">{selectedMold.label}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-w-16 aspect-h-9 mb-4 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="p-6">
                      {selectedMold.icon}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Description</h4>
                      <p className="text-gray-600">{selectedMold.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900">Appearance</h4>
                      <p className="text-gray-600">{selectedMold.color}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Common Locations</h4>
                    <p className="text-gray-600">{selectedMold.location}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Health Concerns</h4>
                    <p className="text-gray-600">{selectedMold.health}</p>
                  </div>

                  <button
                    onClick={() => {
                      onChange(selectedMold.value);
                      setShowModal(false);
                    }}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-4"
                  >
                    Select This Mold Type
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}