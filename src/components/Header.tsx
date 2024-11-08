import React from 'react';
import { Calculator } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <Calculator className="w-8 h-8 text-blue-600" />
      <h1 className="text-3xl font-bold text-gray-800">Mold Remediation Cost Calculator</h1>
    </div>
  );
}