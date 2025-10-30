
import React, { useState, useCallback } from 'react';
import { suggestCodes } from '../services/geminiService';
import { MedicalCode } from '../types';
import { CodeCard } from './CodeCard';
import { LoadingSpinner } from './LoadingSpinner';
import { AlertTriangle, Lightbulb } from 'lucide-react';

export const CodeSuggester: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [suggestedCodes, setSuggestedCodes] = useState<MedicalCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestCodes = useCallback(async () => {
    if (!notes.trim()) {
      setError('Please enter clinical notes to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestedCodes([]);

    try {
      const codes = await suggestCodes(notes);
      setSuggestedCodes(codes);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [notes]);

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Clinical Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste or type clinical notes here... e.g., 'Patient presents with acute exacerbation of asthma. Complains of shortness of breath and wheezing.'"
          className="w-full h-48 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition duration-150 ease-in-out"
          disabled={isLoading}
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSuggestCodes}
            disabled={isLoading || !notes.trim()}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <LoadingSpinner /> : 'Analyze Notes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center" role="alert">
          <AlertTriangle className="h-5 w-5 mr-3" />
          <p>{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="text-center p-6 bg-surface rounded-lg shadow">
            <p className="text-lg text-textSecondary">AI is analyzing the notes, please wait...</p>
        </div>
      )}

      {!isLoading && suggestedCodes.length === 0 && !error && (
        <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 rounded-md flex items-start">
            <Lightbulb className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
            <p>Enter clinical notes above and click "Analyze Notes" to get AI-powered code suggestions. The results will appear here.</p>
        </div>
      )}

      {suggestedCodes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-textPrimary">Suggested Codes</h3>
          {suggestedCodes.map((code, index) => (
            <CodeCard key={`${code.code}-${index}`} code={code} />
          ))}
        </div>
      )}
    </div>
  );
};
