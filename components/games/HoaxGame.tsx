import React, { useState, useCallback } from 'react';
import { hoaxGameData, GameTask, SwipeTaskData } from '../../data/hoaxGameData';
import JigsawTask from './JigsawTask';
import SwipeTask from './SwipeTask';
import DragAndDropTask from './DragAndDropTask';
import Confetti from './Confetti';

const TOTAL_TASKS = hoaxGameData.length;
const SWIPE_FEEDBACK_DURATION = 2000; // 2 seconds
const OTHER_TASK_FEEDBACK_DURATION = 2500; // 2.5 seconds

const HoaxGame: React.FC<{ onGoBack: () => void; }> = ({ onGoBack }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const handleTaskCompletion = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    const showNextTask = () => {
      if (currentTaskIndex < TOTAL_TASKS - 1) {
        setCurrentTaskIndex(prev => prev + 1);
      } else {
        setIsGameFinished(true);
      }
    };

    // Always apply a delay for all task types to allow feedback to be seen.
    // Swipe tasks display feedback internally, this timeout ensures transition.
    const delayDuration = hoaxGameData[currentTaskIndex].type === 'swipe' 
      ? SWIPE_FEEDBACK_DURATION 
      : OTHER_TASK_FEEDBACK_DURATION;
    setTimeout(showNextTask, delayDuration);
  }, [currentTaskIndex]);

  const getFinishedMicrocopy = (finalScore: number, totalTasks: number) => {
    const incorrectCount = totalTasks - finalScore;

    if (incorrectCount === 0) {
      return "Wuih, kamu pasti bukan manusia biasa, canggih banget!";
    } else if (incorrectCount >= 2 && incorrectCount <= 3) {
      return "Kamu minum air apa sih? Analisismu gak ada lawannya.";
    } else if (incorrectCount === 4) {
      return "On the track jadi orang pintar.";
    } else { // Covers 5 incorrect, and 0 to TOTAL_TASKS incorrect
      return "Yuk upgrade skill lagi.";
    }
  };

  const currentTask = hoaxGameData[currentTaskIndex];

  const renderTask = (task: GameTask) => {
    switch (task.type) {
      case 'jigsaw':
        return <JigsawTask taskData={task} onSubmit={handleTaskCompletion} />;
      case 'swipe':
        const nextTask = hoaxGameData[currentTaskIndex + 1];
        const nextSwipeTask = (nextTask && nextTask.type === 'swipe') ? (nextTask as SwipeTaskData) : undefined;
        return <SwipeTask taskData={task} onSwipe={handleTaskCompletion} nextTaskData={nextSwipeTask} />;
      case 'drag-drop':
        return <DragAndDropTask taskData={task} onSubmit={handleTaskCompletion} />;
      default:
        return <div>Tugas tidak ditemukan.</div>;
    }
  };

  if (isGameFinished) {
    return (
      <section className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#122340] relative">
        <Confetti />
        <div className="text-center bg-slate-800/50 p-8 rounded-2xl shadow-lg max-w-lg w-full z-10">
          <h2 className="text-3xl font-extrabold text-[#A8D121] mb-4">{getFinishedMicrocopy(score, TOTAL_TASKS)}</h2>
          <p className="text-slate-300 text-xl mb-6">Skor akhir kamu adalah:</p>
          <p className="text-6xl font-bold text-white mb-8">{score} / {TOTAL_TASKS}</p>
          <button
            onClick={onGoBack}
            className="bg-[#A8D121] text-[#0D1A2E] font-bold py-3 px-10 rounded-full text-xl hover:bg-blue-500 transform hover:scale-105 transition-all duration-300"
          >
            Kembali ke Kategori
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-start pt-4 pb-12 px-4 bg-[#0D1A2E]">
       <div className="w-full max-w-4xl mx-auto">
         <div className="mb-4 flex justify-between items-center">
            <button onClick={onGoBack} className="bg-slate-800/50 hover:bg-slate-700/80 text-slate-300 font-semibold py-2 px-4 rounded-full transition-all duration-300 transform active:scale-95 text-sm">
                &larr; Kembali
            </button>
            <div className="text-slate-400 font-semibold">Skor: {score}</div>
         </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-4 mb-8">
            <div 
                className="bg-gradient-to-r from-[#A8D121] to-lime-300 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${((currentTaskIndex + 1) / TOTAL_TASKS) * 100}%` }}
            ></div>
        </div>
        <div className="text-center mb-4 text-slate-300 font-bold">
            TUGAS {currentTaskIndex + 1} DARI {TOTAL_TASKS}
        </div>

        {renderTask(currentTask)}
       </div>
    </section>
  );
};

export default HoaxGame;