
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const Hero: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const generateHeroImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              { text: 'A high-quality, professional, and bright photo of a modern luxury dental cabinet interior in Rabat Agdal, Morocco. Warm ambient lighting, state-of-the-art equipment, clean white and blue aesthetic, welcoming atmosphere.' },
            ],
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            setHeroImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Failed to generate hero image:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateHeroImage();
  }, []);

  return (
    <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                Rabat - Agdal
              </span>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                Éclairez votre <span className="text-blue-600">sourire</span> au cœur d'Agdal.
              </h1>
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                Bienvenue au Cabinet Dentaire Lumière. Nous combinons technologie de pointe et soins personnalisés pour une santé bucco-dentaire optimale.
              </p>
            </div>

            <div className="arabic border-r-4 border-blue-600 pr-6 space-y-3 bg-slate-50 p-6 rounded-l-2xl">
              <h2 className="text-3xl font-bold text-blue-900">
                أضيئوا ابتسامتكم في قلب أكدال
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                مرحباً بكم في عيادة لوميير لطب الأسنان. نجمع بين أحدث التقنيات والرعاية الشخصية لضمان أفضل صحة لأسنانكم.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#contact" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                Prendre rendez-vous
              </a>
              <a href="#services" className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-center hover:bg-slate-50 transition-all">
                Nos Services
              </a>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-100 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            
            <div className="relative rounded-3xl shadow-2xl overflow-hidden aspect-[4/3] w-full border-4 border-white bg-slate-100">
              {isGenerating ? (
                <div className="w-full h-full animate-pulse bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 flex items-center justify-center">
                   <svg className="w-12 h-12 text-blue-200 animate-spin" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                </div>
              ) : heroImage ? (
                <img 
                  src={heroImage} 
                  alt="Cabinet Dentaire Lumière Agdal" 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-blue-600 flex items-center justify-center p-12 text-center">
                  <span className="text-white font-bold">Cabinet Dentaire Lumière</span>
                </div>
              )}
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Consultations</p>
                  <p className="text-lg font-bold text-slate-900">100% Digital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
