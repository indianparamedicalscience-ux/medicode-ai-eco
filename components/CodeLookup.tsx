
import React, { useState, useCallback } from 'react';
import { lookupCode } from '../services/geminiService';
import { MedicalCode } from '../types';
import { CodeCard } from './CodeCard';
import { LoadingSpinner } from './LoadingSpinner';
import { AlertTriangle, Search } from 'lucide-react';

export const CodeLookup: React.FC = () => {
  const [query, setQuery] = useState('');
  const [foundCode, setFoundCode] = useState<MedicalCode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a code to look up.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFoundCode(null);

    try {
      const code = await lookupCode(query);
      setFoundCode(code);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Search Medical Code</h2>
        <form onSubmit={handleLookup} className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a code, e.g., 'J45.909' or '99213'"
              className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition duration-150 ease-in-out"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <LoadingSpinner /> : 'Search'}
          </button>
        </form>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center" role="alert">
          <AlertTriangle className="h-5 w-5 mr-3" />
          <p>{error}</p>
        </div>
      )}

      {isLoading && (
         <div className="text-center p-6 bg-surface rounded-lg shadow">
            <p className="text-lg text-textSecondary">Looking up code, please wait...</p>
        </div>
      )}

      {foundCode && (
        <div>
          <h3 className="text-xl font-semibold text-textPrimary mb-4">Search Result</h3>
          <CodeCard code={foundCode} />
        </div>
      )}
    </div>
  );
};
