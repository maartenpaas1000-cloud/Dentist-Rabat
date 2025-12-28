
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const About: React.FC = () => {
  const [aboutImage, setAboutImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const generateAboutImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              { text: 'A professional group photo of a small dental medical team (dentist and assistant) in a bright, modern, high-end clinic lobby in Rabat. They are smiling, wearing clean white professional uniforms, elegant and trustworthy atmosphere.' },
            ],
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            setAboutImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Failed to generate about image:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateAboutImage();
  }, []);

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Content */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 right-10 w-40 h-40 bg-cyan-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-100 aspect-square sm:aspect-video lg:aspect-square">
              {isGenerating ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-50 animate-pulse">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium text-slate-400">Immortalisation de l'équipe...</span>
                  </div>
                </div>
              ) : aboutImage ? (
                <img src={aboutImage} alt="L'équipe Lumière" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                  <p className="text-white font-bold">Notre Équipe à Agdal</p>
                </div>
              )}
            </div>

            {/* Floating Stats Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 hidden sm:block">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">10+</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Années</p>
                </div>
                <div className="text-center border-l border-slate-100 pl-8">
                  <p className="text-3xl font-bold text-blue-600">5k+</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Sourires</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">À Propos de Nous</h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                L'excellence dentaire, <br />
                <span className="text-blue-500">une passion familiale.</span>
              </h3>
            </div>

            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                Situé au cœur du quartier dynamique d'Agdal à Rabat, le **Cabinet Dentaire Lumière** est dédié à offrir une expérience de soin exceptionnelle dans un environnement serein et moderne.
              </p>
              
              <div className="arabic bg-blue-50/50 p-6 rounded-2xl border-r-4 border-blue-600">
                <p className="text-lg text-slate-800 font-medium">
                  نحن نؤمن بأن الابتسامة الصحية هي مفتاح الثقة بالنفس. نضع خبرتنا في خدمتك لتوفير رعاية أسنان لا تضاهى، باستخدام أحدث التقنيات الرقمية.
                </p>
              </div>

              <p>
                Notre philosophie repose sur l'écoute attentive et la personnalisation de chaque traitement. Que ce soit pour une simple prévention ou une réhabilitation esthétique complexe, nous vous accompagnons vers votre plus beau sourire.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
                <span className="text-slate-700 font-medium">Équipements 3D de pointe</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
                <span className="text-slate-700 font-medium">Normes d'hygiène strictes</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
