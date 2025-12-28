
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmileAssistant from './components/SmileAssistant';

const App: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useEffect(() => {
    // Hide static content once React takes over to avoid double rendering
    const staticContent = document.getElementById('static-content');
    if (staticContent) {
      staticContent.style.display = 'none';
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
      
      {/* Floating Action Button for AI Assistant */}
      {!isAssistantOpen && (
        <button 
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all flex items-center justify-center group animate-bounce"
          aria-label="Open AI Assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap ml-0 group-hover:ml-2 font-bold">
            Assistant Sourire
          </span>
        </button>
      )}

      {isAssistantOpen && (
        <>
          {/* Backdrop for closing by clicking outside */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] animate-fadeIn"
            onClick={() => setIsAssistantOpen(false)}
            aria-hidden="true"
          />
          <SmileAssistant onClose={() => setIsAssistantOpen(false)} />
        </>
      )}
    </div>
  );
};

export default App;
