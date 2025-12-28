
import React from 'react';

const SERVICES = [
  {
    title: "Contrôle & Prévention",
    titleAr: "الفحص والوقاية",
    description: "Des examens réguliers pour maintenir une hygiène bucco-dentaire irréprochable et prévenir les pathologies.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Blanchiment Dentaire",
    titleAr: "تبييض الأسنان",
    description: "Éclaircissez votre sourire en toute sécurité avec nos techniques professionnelles de pointe.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "bg-cyan-50 text-cyan-600"
  },
  {
    title: "Implants Dentaires",
    titleAr: "زراعة الأسنان",
    description: "Remplacez vos dents manquantes par des solutions durables, esthétiques et confortables.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a2 2 0 00-.81 2.373l.847 2.54a2 2 0 002.447 1.317l2.391-.598a2 2 0 001.248-2.036l-.182-3.429z" />
      </svg>
    ),
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    title: "Urgences Dentaires",
    titleAr: "طوارئ الأسنان",
    description: "Une douleur vive ou un accident ? Notre équipe vous reçoit en priorité pour un soulagement immédiat.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "bg-rose-50 text-rose-600"
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Nos Services Spécialisés</h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-slate-600 arabic text-xl">خدماتنا التخصصية المتميزة</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{service.title}</h3>
              <p className="text-blue-600 font-bold arabic mb-4">{service.titleAr}</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <button className="text-blue-600 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                En savoir plus
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
