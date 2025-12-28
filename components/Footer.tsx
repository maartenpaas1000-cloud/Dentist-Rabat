
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="flex justify-center items-center space-x-2 grayscale opacity-50">
          <div className="w-6 h-6 bg-slate-600 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="font-bold text-slate-900 tracking-tight">LUMIÈRE</span>
        </div>
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Cabinet Dentaire Lumière - Rabat-Agdal. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
