import React from 'react';

interface Category {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const allCategories: Category[] = [
  {
    id: 'deteksi-hoax',
    icon: '🔍',
    title: 'Deteksi Hoax',
    description: 'Latih kemampuanmu mengenali berita palsu dan informasi menyesatkan.',
  },
  {
    id: 'hindari-penipuan',
    icon: '🛡️',
    title: 'Hindari Penipuan',
    description: 'Pelajari cara mengenali dan menghindari berbagai modus penipuan online.',
  },
  {
    id: 'keamanan-akun',
    icon: '🔐',
    title: 'Keamanan Akun',
    description: 'Uji pengetahuanmu tentang keamanan password dan perlindungan akun.',
  },
  {
    id: 'privasi-digital',
    icon: '📱',
    title: 'Privasi Digital',
    description: 'Pahami cara melindungi data pribadi dan privasi di dunia digital.',
  },
  {
    id: 'identifikasi-deepfake',
    icon: '🎭',
    title: 'Identifikasi Deepfake',
    description: 'Kenali teknologi deepfake dan cara membedakan konten asli dari palsu.',
  },
  {
    id: 'media-sosial-aman',
    icon: '💬',
    title: 'Media Sosial Aman',
    description: 'Belajar berinteraksi dengan aman dan bijak di media sosial.',
  },
];

const levelCategoryMap: { [key: string]: string[] } = {
    'adiguna': ['Deteksi Hoax', 'Hindari Penipuan', 'Media Sosial Aman'],
    'sakti-mandraguna': ['Keamanan Akun', 'Privasi Digital', 'Identifikasi Deepfake'],
};

interface CategoryCardProps {
    category: Category;
    onStartGame: (id: string) => void;
    currentLevel: string; // Added currentLevel prop
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onStartGame, currentLevel }) => {
    // A game is 'actually playable' if it's one of the implemented games AND the current level is not 'sakti-mandraguna'.
    const isActuallyPlayable = (category.id === 'deteksi-hoax' || category.id === 'keamanan-akun') && currentLevel !== 'sakti-mandraguna';

    return (
      <div className={`category-card bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col text-center items-center transform transition-all duration-300 ${isActuallyPlayable ? 'hover:-translate-y-2 hover:bg-white/20 hover:border-white/30' : ''}`}>
        <div className="text-5xl mb-4">{category.icon}</div>
        <h3 className="text-xl font-bold text-slate-100 mb-2">{category.title}</h3>
        <p className="text-slate-400 mb-6 flex-grow">{category.description}</p>
        <button 
            onClick={() => isActuallyPlayable && onStartGame(category.id)}
            disabled={!isActuallyPlayable}
            className={`w-full font-bold py-3 px-4 rounded-full transition-all duration-300 ${
                isActuallyPlayable 
                ? 'bg-[#A8D121] text-[#0D1A2E] hover:bg-blue-500 transform hover:scale-105 active:scale-95' 
                : 'bg-[#A8D121] text-[#0D1A2E] opacity-50 cursor-not-allowed'
            }`}
        >
          {isActuallyPlayable ? 'Mulai Bermain' : 'Segera Hadir'}
        </button>
      </div>
    );
};

const GameCategories: React.FC<{ level: string; onGoBack: () => void; onStartGame: (id: string) => void; }> = ({ level, onGoBack, onStartGame }) => {
    const levelTitle = level === 'adiguna' ? 'Adiguna' : 'Sakti Mandraguna';
    
    const categoryTitlesForLevel = levelCategoryMap[level] || [];
    const displayedCategories = allCategories.filter(cat => categoryTitlesForLevel.includes(cat.title));

  return (
    <section id="game-categories" className="pt-4 pb-20 sm:pt-4 sm:pb-28 px-4 bg-[#0D1A2E] min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
            <button 
                onClick={onGoBack} 
                className="bg-slate-800/50 hover:bg-slate-700/80 text-slate-300 font-semibold py-2 px-6 rounded-full transition-all duration-300 transform active:scale-95"
            >
                &larr; Kembali
            </button>
        </div>
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100">{levelTitle}</h2>
            <p className="text-slate-400 text-lg mt-4">Pilih skill terkuat di dunia digital yang ingin kamu kuasai lebih dulu</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} onStartGame={onStartGame} currentLevel={level} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GameCategories;