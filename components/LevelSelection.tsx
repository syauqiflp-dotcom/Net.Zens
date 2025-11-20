import React from 'react';
import DigitalShield from './DigitalShield';

const LevelCard: React.FC<{
  title: string;
  description: string;
  className: string;
  onClick: () => void;
}> = ({ title, description, className, onClick }) => (
  <div 
    onClick={onClick}
    className={`level-card group relative flex flex-col justify-between p-8 rounded-2xl border border-slate-400/30 bg-white/10 backdrop-blur-lg hover:bg-white/20 hover:border-slate-300/50 transition-all duration-300 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-slate-900/50 active:scale-95 overflow-hidden cursor-pointer ${className}`}
  >
    <div className="absolute top-0 right-0 h-24 w-24 bg-white/5 rounded-full blur-3xl group-hover:scale-150 group-hover:bg-white/10 transition-all duration-500"></div>
    <div className="relative">
      <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
    <div className="relative mt-8 w-full text-center bg-[#A8D121] text-[#0D1A2E] font-bold py-3 px-4 rounded-full text-lg group-hover:bg-blue-500 group-active:bg-blue-600 transform group-hover:scale-105 transition-all duration-300">
      Pilih
    </div>
  </div>
);

const LevelSelection: React.FC<{ onSelectLevel: (level: string) => void; onGoBack: () => void; }> = ({ onSelectLevel, onGoBack }) => {
  return (
    <section id="level-selection" className="min-h-screen w-full flex flex-col items-center justify-start pt-4 pb-20 sm:pt-4 sm:pb-28 px-4 sm:px-8 bg-[#122340]">
      <div className="w-full max-w-5xl mx-auto mb-8 text-left">
          <button 
              onClick={onGoBack} 
              className="bg-slate-800/50 hover:bg-slate-700/80 text-slate-300 font-semibold py-2 px-6 rounded-full transition-all duration-300 transform active:scale-95"
          >
              &larr; Kembali
          </button>
      </div>
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-slate-100">
          Cek Kekuatan Digitalmu!
        </h2>
        <p className="text-slate-400 text-lg">Setiap orang punya potensi menjadi pelindung di dunia digital yang liar. Yuk, ketahui seberapa dahsyat insting kamu dalam melawan hoax dan scam!</p>
        
        <div className="my-12 flex justify-center h-56" aria-hidden="true">
          <DigitalShield />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <LevelCard
            title="Adiguna"
            description="Skill deteksi hoax bisa jadi adalah superpower digitalmu. Sekali aktif, ancaman tersembunyi langsung mental."
            className="basic-level"
            onClick={() => onSelectLevel('adiguna')}
          />
          <LevelCard
            title="Sakti Mandraguna"
            description="Deepfake? Scam investasi? Bukan tandinganmu lagi. Kuasai skill ini dan hidupmu bebas dari tipu-tipu digital."
            className="advanced-level"
            onClick={() => onSelectLevel('sakti-mandraguna')}
          />
        </div>
      </div>
    </section>
  );
}

export default LevelSelection;