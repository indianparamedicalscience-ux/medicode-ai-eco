
import React from 'react';
import { AppName } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-4 mt-auto">
      <div className="max-w-5xl mx-auto text-center text-textSecondary text-sm">
        <p>&copy; {new Date().getFullYear()} {AppName}. All rights reserved.</p>
      </div>
    </footer>
  );
};
