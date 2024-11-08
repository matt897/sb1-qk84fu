import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LocationSelect } from './components/LocationSelect';
import { SquareFootageInput } from './components/SquareFootageInput';
import { MoldTypeSelect } from './components/MoldTypeSelect';
import { SeverityLevel } from './components/SeverityLevel';
import { AdditionalOptions } from './components/AdditionalOptions';
import { CostBreakdown } from './components/CostBreakdown';
import { Location } from './types';

function App() {
  const [squareFootage, setSquareFootage] = useState<number>(100);
  const [location, setLocation] = useState<string>('bathroom');
  const [moldType, setMoldType] = useState<string>('unknown');
  const [severity, setSeverity] = useState<string>('minor');
  const [needsTesting, setNeedsTesting] = useState<boolean>(true);
  const [needsRepair, setNeedsRepair] = useState<boolean>(false);
  const [accessibility, setAccessibility] = useState<string>('standard');
  const [totalCost, setTotalCost] = useState<{ min: number; max: number }>({ min: 0, max: 0 });

  const locations: Location[] = [
    { name: 'bathroom', minCost: 500, maxCost: 1500 },
    { name: 'basement', minCost: 500, maxCost: 4000 },
    { name: 'attic', minCost: 1000, maxCost: 9000 },
    { name: 'crawl space', minCost: 500, maxCost: 2000 },
    { name: 'hvac', minCost: 3000, maxCost: 10000 },
    { name: 'whole house', minCost: 10000, maxCost: 30000 },
  ];

  useEffect(() => {
    calculateTotal();
  }, [squareFootage, location, moldType, severity, needsTesting, needsRepair, accessibility]);

  const calculateTotal = () => {
    const selectedLocation = locations.find(loc => loc.name === location);
    if (!selectedLocation) return;

    let minCost = selectedLocation.minCost;
    let maxCost = selectedLocation.maxCost;

    // Adjust for square footage
    const basePerSqFt = { min: 10, max: 25 };
    minCost += squareFootage * basePerSqFt.min;
    maxCost += squareFootage * basePerSqFt.max;

    // Adjust for mold type
    if (moldType === 'stachybotrys') {
      minCost *= 1.75;
      maxCost *= 2.0;
    } else if (['aspergillus', 'penicillium'].includes(moldType)) {
      minCost *= 1.3;
      maxCost *= 1.5;
    } else if (['cladosporium', 'alternaria'].includes(moldType)) {
      minCost *= 1.2;
      maxCost *= 1.35;
    }

    // Adjust for severity
    if (severity === 'moderate') {
      minCost *= 1.3;
      maxCost *= 1.4;
    } else if (severity === 'severe') {
      minCost *= 1.6;
      maxCost *= 1.8;
    }

    // Adjust for accessibility
    if (accessibility === 'limited') {
      minCost *= 1.25;
      maxCost *= 1.35;
    } else if (accessibility === 'difficult') {
      minCost *= 1.35;
      maxCost *= 1.5;
    }

    // Testing costs
    if (needsTesting) {
      minCost += 250;
      maxCost += 700;
    }

    // Repair costs
    if (needsRepair) {
      minCost += 2000;
      maxCost += 10000;
    }

    setTotalCost({ min: Math.round(minCost), max: Math.round(maxCost) });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Header />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <LocationSelect
                location={location}
                locations={locations}
                onChange={setLocation}
              />
              <SquareFootageInput
                value={squareFootage}
                onChange={setSquareFootage}
              />
              <MoldTypeSelect
                moldType={moldType}
                onChange={setMoldType}
              />
              <SeverityLevel
                severity={severity}
                onChange={setSeverity}
              />
              <AdditionalOptions
                needsTesting={needsTesting}
                needsRepair={needsRepair}
                accessibility={accessibility}
                onTestingChange={setNeedsTesting}
                onRepairChange={setNeedsRepair}
                onAccessibilityChange={setAccessibility}
              />
            </div>

            <CostBreakdown
              totalCost={totalCost}
              location={location}
              locations={locations}
              moldType={moldType}
              severity={severity}
              accessibility={accessibility}
              needsTesting={needsTesting}
              needsRepair={needsRepair}
              squareFootage={squareFootage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;