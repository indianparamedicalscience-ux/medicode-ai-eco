
import React from 'react';
import { AppName } from '../constants';
import { Stethoscope } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-surface shadow-md sticky top-0 z-10">
      <div className="w-full max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          <Stethoscope className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary tracking-tight">{AppName}</h1>
        </div>
      </div>
    </header>
  );
};
