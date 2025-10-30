
import React, { useState } from 'react';
import { MedicalCode } from '../types';
import { Clipboard, Check } from 'lucide-react';

interface CodeCardProps {
  code: MedicalCode;
}

const TypeBadge: React.FC<{ type: MedicalCode['type'] }> = ({ type }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  const typeClasses = {
    'ICD-10': 'bg-blue-100 text-blue-800',
    'CPT': 'bg-green-100 text-green-800',
    'Unknown': 'bg-gray-100 text-gray-800',
  };
  return <span className={`${baseClasses} ${typeClasses[type]}`}>{type}</span>;
};

export const CodeCard: React.FC<CodeCardProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface rounded-lg shadow-md border border-gray-200 overflow-hidden transition-shadow hover:shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h4 className="text-lg font-bold text-primary">{code.code}</h4>
              <TypeBadge type={code.type} />
            </div>
            <p className="mt-1 text-textPrimary">{code.description}</p>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:bg-gray-100 hover:text-primary rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
            title="Copy Code"
          >
            {copied ? <Check className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {(code.justification || code.details) && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <p className="text-sm text-textSecondary">
            <strong className="font-semibold text-gray-700">
              {code.justification ? 'Justification: ' : 'Details: '}
            </strong>
            {code.justification || code.details}
          </p>
        </div>
      )}
    </div>
  );
};
