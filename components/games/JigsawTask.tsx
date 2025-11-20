import React, { useState, useEffect, useMemo } from 'react';
import { JigsawTaskData } from '../../data/hoaxGameData';

// Helper to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const cardColors = ['bg-blue-600', 'bg-purple-600', 'bg-teal-600', 'bg-indigo-600', 'bg-rose-600'];

// SVG Icons
const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>;
const DoubleCheckIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8.5L5.5 12L14 3.5" stroke="#4FC3F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 8.5L10.5 12L19 3.5" stroke="#4FC3F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(-5)"/></svg>;
const EmojiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
const PaperclipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 transform -rotate-45"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const MicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;

const WhatsAppView: React.FC<{ taskData: JigsawTaskData }> = ({ taskData }) => (
    <div className="w-full max-w-sm mx-auto bg-black rounded-[40px] shadow-2xl border-4 border-gray-800 p-1 flex-shrink-0">
      <div 
        className="bg-[#E5DDD5] bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-center rounded-[32px] overflow-hidden flex flex-col"
        style={{ height: '650px' }}
      >
        <header className="bg-[#075E54] text-white shadow-md z-10 flex-shrink-0">
          <div className="px-4 pt-2 flex justify-between items-center text-xs font-sans font-semibold">
            <span>17:48</span>
            <div className="flex items-center gap-1">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path></svg>
              <span>80%</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="transform -rotate-90">
                  <path d="M17 4h-3V2h-4v2H7c-1.1 0-2 .9-2 2v16h14V6c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
          </div>
          
          <div className="p-2 flex items-center">
            <BackArrowIcon />
            <img className="w-10 h-10 rounded-full ml-2" src="https://i.pravatar.cc/150?img=5" alt="Group Avatar" />
            <div className="ml-3 flex-1 min-w-0">
              <p className="font-semibold text-base leading-tight truncate">Info Grup Keluarga</p>
              <p className="text-xs text-white/80 leading-tight truncate">ketuk di sini untuk info grup</p>
            </div>
            <div className="flex items-center pl-3">
                <MenuIcon />
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col">
          <div className="flex justify-center my-2">
            <span className="bg-[#E1F2FB] text-gray-700 text-xs font-semibold px-2 py-1 rounded-lg shadow">7 AGUSTUS 2023</span>
          </div>
          <div className="flex items-start gap-2.5 my-4">
            <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/150?img=32" alt="Adik Avatar" />
            <div className="relative bg-white p-2.5 rounded-xl rounded-tl-none shadow w-full max-w-[80%]">
              <div className="absolute top-0 left-[-7px] w-2 h-2 text-white">
                  <svg viewBox="0 0 8 8" fill="currentColor"><path d="M8 0 L0 0 L8 8 Z" /></svg>
              </div>
              <p className="text-sm font-semibold text-purple-600">Adik</p>
              <p className="text-sm font-normal text-gray-800 whitespace-pre-wrap">{taskData.viralMessage}</p>
              <div className="text-right text-xs text-gray-500 mt-1 flex items-center justify-end gap-1">
                <span>11:45</span>
                <DoubleCheckIcon />
              </div>
            </div>
          </div>
          <div className="flex-grow"></div> {/* Spacer */}
        </div>
        
        <div className="bg-transparent px-2 pb-1 flex items-center gap-2 flex-shrink-0">
          <div className="flex-1 bg-white rounded-full flex items-center px-3 py-2 shadow">
            <EmojiIcon />
            <span className="text-gray-500 ml-2">Pesan</span>
            <div className="ml-auto flex items-center gap-3">
              <PaperclipIcon />
              <CameraIcon />
            </div>
          </div>
          <button className="bg-[#00897B] rounded-full p-3 shadow">
            <MicIcon />
          </button>
        </div>
        
        <div className="bg-black py-2.5 flex justify-around items-center rounded-b-[30px] flex-shrink-0">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
        </div>
      </div>
    </div>
);

const SocialMediaPost: React.FC<{ taskData: JigsawTaskData }> = ({ taskData }) => (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl p-4 text-gray-900 shadow-lg">
        <div className="flex items-start">
            <img className="w-12 h-12 rounded-full" src={taskData.authorAvatar} alt="Author Avatar" />
            <div className="ml-4 flex-1">
                <div className="flex items-center">
                    <span className="font-bold">{taskData.authorName}</span>
                    <span className="text-gray-500 ml-2">{taskData.authorHandle}</span>
                </div>
                <p className="mt-1 text-base whitespace-pre-wrap">{taskData.viralMessage}</p>
            </div>
        </div>
        <div className="flex justify-around mt-4 text-gray-500">
            <div className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15c0-1.1-.9-2-2-2H7l-4 4V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10z"></path></svg>
                <span>32</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-green-500 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"></path></svg>
                <span>112</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-pink-500 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                <span>1.2K</span>
            </div>
             <div className="hover:text-blue-500 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"></path></svg>
            </div>
        </div>
    </div>
);


const JigsawTask: React.FC<{ taskData: JigsawTaskData, onSubmit: (isCorrect: boolean) => void }> = ({ taskData, onSubmit }) => {
  const { correctOrder, options, question } = taskData;
  const numSlots = correctOrder.length;

  const [placedCards, setPlacedCards] = useState<(string | null)[]>(Array(numSlots).fill(null));
  const [availableCards, setAvailableCards] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<(null | 'correct' | 'incorrect')[]>(Array(numSlots).fill(null));
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const colorMap = useMemo(() => {
    return options.reduce((acc, option, index) => {
      acc[option] = cardColors[index % cardColors.length];
      return acc;
    }, {} as Record<string, string>);
  }, [options]);

  useEffect(() => {
    setAvailableCards(shuffleArray(options));
    setPlacedCards(Array(numSlots).fill(null));
    setFeedback(Array(numSlots).fill(null));
    setIsComplete(false);
    setIsCorrect(null);
  }, [taskData, options, numSlots]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, cardText: string) => {
    setDraggedItem(cardText);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, slotIndex: number) => {
    e.preventDefault();
    if (placedCards[slotIndex] || !draggedItem) return;

    const newPlacedCards = [...placedCards];
    newPlacedCards[slotIndex] = draggedItem;
    setPlacedCards(newPlacedCards);
    setAvailableCards(availableCards.filter(card => card !== draggedItem));
    setDraggedItem(null);
  };
  
  const handleSlotClick = (slotIndex: number) => {
      const cardToReturn = placedCards[slotIndex];
      if (!cardToReturn || isComplete) return;

      const newPlacedCards = [...placedCards];
      newPlacedCards[slotIndex] = null;
      setPlacedCards(newPlacedCards);
      
      const newFeedback = [...feedback];
      newFeedback[slotIndex] = null;
      setFeedback(newFeedback);

      setAvailableCards(prev => [...prev, cardToReturn]);
  };

  const checkSolution = () => {
    if (isComplete || placedCards.some(c => c === null)) return;
    const newFeedback = placedCards.map((card, index) =>
      card === correctOrder[index] ? 'correct' : 'incorrect'
    );
    setFeedback(newFeedback);
    const correct = newFeedback.every(f => f === 'correct');
    setIsCorrect(correct);
    setIsComplete(true);
  };
  
  const handleContinue = () => {
      if (isCorrect !== null) {
          onSubmit(isCorrect);
      }
  };

  const allSlotsFilled = placedCards.every(card => card !== null);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">URUTKAN</p>
      <h3 className="text-center font-bold mb-6 text-slate-100 text-lg">{question}</h3>
      <div className="w-full flex flex-col md:flex-row items-start justify-center gap-8">
        
        <div className="w-full md:w-1/2 flex items-start justify-center p-4">
            {taskData.displayType === 'social-media' ? (
                <SocialMediaPost taskData={taskData} />
            ) : (
                <WhatsAppView taskData={taskData} />
            )}
        </div>
        
        {/* Game Column */}
        <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-white/20">
          
          <div className="flex flex-wrap justify-center gap-2 my-4 min-h-[4.5rem] items-stretch">
            {placedCards.map((card, index) => (
              <div
                key={index}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
                onClick={() => handleSlotClick(index)}
                className={`flex-1 min-w-[120px] flex items-center justify-center p-2 rounded-lg border-2 border-dashed transition-all duration-300 ${
                  draggedItem ? 'border-blue-400' : 'border-slate-400/50'
                } ${!card && 'bg-black/10'} ${isComplete && 'cursor-not-allowed'}`}
              >
                {card ? (
                  <div className={`w-full h-full flex items-center justify-center text-center p-2 rounded-lg text-white font-semibold text-sm shadow-md select-none ${colorMap[card]} ${feedback[index] === 'incorrect' && 'shake-animation'}`}>
                    {card}
                  </div>
                ) : (
                  <span className="text-slate-400 text-sm">#{index + 1}</span>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 min-h-[50px] my-4 p-3 bg-black/10 rounded-lg">
            {availableCards.map((card) => (
              <div
                key={card}
                draggable={!isComplete}
                onDragStart={(e) => handleDragStart(e, card)}
                className={`px-4 py-2 rounded-lg text-white font-semibold text-sm shadow-md cursor-grab active:cursor-grabbing ${colorMap[card]} ${isComplete && 'opacity-50 cursor-not-allowed'}`}
              >
                {card}
              </div>
            ))}
          </div>

          <button
              onClick={isComplete ? handleContinue : checkSolution}
              disabled={!isComplete && !allSlotsFilled}
              className="w-full mt-4 bg-[#A8D121] text-[#0D1A2E] font-bold py-3 rounded-full text-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
              {isComplete ? 'Lanjutkan' : 'Periksa'}
          </button>
          
           {isComplete && (
            <div className="mt-4 text-center text-xl font-bold">
              {isCorrect ? (
                <p className="text-green-400 animate-pulse">Cakep!</p>
              ) : (
                <div>
                  <p className="text-red-400">Ups, Belum Pas</p>
                  <div className="mt-4 text-sm text-slate-300">
                    <p className="font-semibold mb-2">Jawaban yang benar:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {correctOrder.map((card, index) => (
                        <div key={index} className={`px-3 py-1 rounded-md text-white font-semibold text-xs shadow-md ${colorMap[card]}`}>
                          {index + 1}. {card}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default JigsawTask;