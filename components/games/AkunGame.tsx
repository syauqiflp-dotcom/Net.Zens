import React, { useState, useEffect, useCallback } from 'react';
import { akunGameData } from '../../data/akunGameData';
import { GameTask, SwipeTaskData } from '../../data/hoaxGameData';
import JigsawTask from './JigsawTask';
import SwipeTask from './SwipeTask';
import DragAndDropTask from './DragAndDropTask';
import Confetti from './Confetti';

const TOTAL_TASKS = akunGameData.length;
const SWIPE_FEEDBACK_DURATION = 2000; // 2 seconds
const OTHER_TASK_FEEDBACK_DURATION = 2500; // 2.5 seconds

const AkunGame: React.FC<{ onGoBack: () => void; }> = ({ onGoBack }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<'playing' | 'retrying_intro' | 'retrying_tasks' | 'finished'>('playing');
  const [incorrectTaskIndices, setIncorrectTaskIndices] = useState<number[]>([]);
  const [currentRetryIndex, setCurrentRetryIndex] = useState(0);

  useEffect(() => {
    if (gamePhase === 'retrying_intro') {
      const timer = setTimeout(() => {
        setGamePhase('retrying_tasks');
      }, 3000); // Show intro for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [gamePhase]);

  const handlePlayTaskComplete = useCallback((isCorrect: boolean) => {
    let newIncorrectIndices = [...incorrectTaskIndices];
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      newIncorrectIndices.push(currentTaskIndex);
      setIncorrectTaskIndices(newIncorrectIndices);
    }

    const showNext = () => {
      const isLastTask = currentTaskIndex === TOTAL_TASKS - 1;
      if (isLastTask) {
        if (newIncorrectIndices.length > 0) {
          setIncorrectTaskIndices(newIncorrectIndices); // Update here for retry phase
          setGamePhase('retrying_intro');
        } else {
          setGamePhase('finished');
        }
      } else {
        setCurrentTaskIndex(prev => prev + 1);
      }
    };

    // Always apply a delay for all task types to allow feedback to be seen.
    // Swipe tasks display feedback internally, this timeout ensures transition.
    const taskType = akunGameData[currentTaskIndex].type;
    const delayDuration = taskType === 'swipe' ? SWIPE_FEEDBACK_DURATION : OTHER_TASK_FEEDBACK_DURATION;
    setTimeout(showNext, delayDuration);

  }, [currentTaskIndex, incorrectTaskIndices]);
  
  const handleRetryTaskComplete = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const showNext = () => {
      if (currentRetryIndex < incorrectTaskIndices.length - 1) {
        setCurrentRetryIndex(prev => prev + 1);
      } else {
        setGamePhase('finished');
      }
    };

    // Always apply a delay for all task types to allow feedback to be seen.
    // Swipe tasks display feedback internally, this timeout ensures transition.
    const taskType = akunGameData[incorrectTaskIndices[currentRetryIndex]].type;
    const delayDuration = taskType === 'swipe' ? SWIPE_FEEDBACK_DURATION : OTHER_TASK_FEEDBACK_DURATION;
    setTimeout(showNext, delayDuration);

  }, [currentRetryIndex, incorrectTaskIndices]);

  const getFinishedMicrocopy = (finalScore: number, totalTasks: number) => {
    const incorrectCount = totalTasks - finalScore;

    if (incorrectCount === 0) {
      return "Wuih, kamu pasti bukan manusia biasa, canggih banget!";
    } else if (incorrectCount >= 2 && incorrectCount <= 3) {
      return "Kamu minum air apa sih? Analisismu gak ada lawannya.";
    } else if (incorrectCount >= 4 && incorrectCount <= 5) {
      return "on the track jadi orang pintar.";
    } else { // This covers incorrectCount from 1, and from 6 up to TOTAL_TASKS (11).
             // Since 1 incorrect wasn't specifically mentioned, and 2-3 and 4-5 are handled,
             // it falls into the "needs upgrade" category by default, which seems appropriate for 1 incorrect too given the other positive messages.
             // Or, more precisely, if incorrectCount === 1, it falls into this 'else'.
             // If incorrectCount >= 6, it also falls into this 'else'.
      return "skill deteksi kamu perlu diupgrade lagi.";
    }
  };

  const renderTask = (task: GameTask, handler: (isCorrect: boolean) => void) => {
    switch (task.type) {
      case 'jigsaw':
        return <JigsawTask taskData={task} onSubmit={handler} />;
      case 'swipe':
        let nextSwipeTask: SwipeTaskData | undefined;
        if (gamePhase === 'playing' && currentTaskIndex < TOTAL_TASKS - 1) {
          const nextTask = akunGameData[currentTaskIndex + 1];
          if (nextTask?.type === 'swipe') nextSwipeTask = nextTask;
        } else if (gamePhase === 'retrying_tasks' && currentRetryIndex < incorrectTaskIndices.length - 1) {
            const nextTask = akunGameData[incorrectTaskIndices[currentRetryIndex + 1]];
            if (nextTask?.type === 'swipe') nextSwipeTask = nextTask;
        }
        return <SwipeTask taskData={task} onSwipe={handler} nextTaskData={nextSwipeTask} />;
      case 'drag-drop':
        return <DragAndDropTask taskData={task} onSubmit={handler} />;
      default:
        return <div>Tugas tidak ditemukan.</div>;
    }
  };

  if (gamePhase === 'finished') {
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

  if (gamePhase === 'retrying_intro') {
    return (
      <section className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#122340]">
        <div className="text-center">
            <div className="text-6xl mb-6 animate-bounce">🤔</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 animate-pulse">
                Yuk perbaiki lagi jawaban kamu yang belum tepat
            </h2>
        </div>
      </section>
    );
  }
  
  const isPlaying = gamePhase === 'playing';
  const taskToRender = isPlaying ? akunGameData[currentTaskIndex] : akunGameData[incorrectTaskIndices[currentRetryIndex]];
  const completionHandler = isPlaying ? handlePlayTaskComplete : handleRetryTaskComplete;

  const progress = isPlaying 
    ? (currentTaskIndex + 1) / TOTAL_TASKS
    : (currentRetryIndex + 1) / incorrectTaskIndices.length;
    
  const taskCounterText = isPlaying 
    ? `TUGAS ${currentTaskIndex + 1} DARI ${TOTAL_TASKS}`
    : `PERBAIKAN ${currentRetryIndex + 1} DARI ${incorrectTaskIndices.length}`;

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-start pt-4 pb-12 px-4 bg-[#0D1A2E]">
       <div className="w-full max-w-4xl mx-auto">
         <div className="mb-4 flex justify-between items-center">
            <button onClick={onGoBack} className="bg-slate-800/50 hover:bg-slate-700/80 text-slate-300 font-semibold py-2 px-4 rounded-full transition-all duration-300 transform active:scale-95 text-sm">
                &larr; Kembali
            </button>
            <div className="text-slate-400 font-semibold">Skor: {score}</div>
         </div>
        
        <div className="w-full bg-slate-700 rounded-full h-4 mb-8">
            <div 
                className="bg-gradient-to-r from-[#A8D121] to-lime-300 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${progress * 100}%` }}
            ></div>
        </div>
        <div className="text-center mb-4 text-slate-300 font-bold">
            {taskCounterText}
        </div>

        {taskToRender && renderTask(taskToRender, completionHandler)}
       </div>
    </section>
  );
};

export default AkunGame;