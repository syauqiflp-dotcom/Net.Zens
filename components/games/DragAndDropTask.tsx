import React, { useState, useEffect } from 'react';
import { DragDropTaskData } from '../../data/hoaxGameData';

type DropZoneType = 'zoneA' | 'zoneB';
type Location = 'source' | DropZoneType;

// Define a type for the item being dragged for clarity
type DraggedItem = {
    id: string;
    from: Location;
};

const FeedbackDisplay: React.FC<{ isCorrect: boolean; taskData: DragDropTaskData }> = ({ isCorrect, taskData }) => (
    <div className="mt-6 text-center animate-in fade-in zoom-in duration-300">
        {isCorrect ? (
            <p className="text-4xl font-extrabold text-green-400 drop-shadow-lg">Cakep!</p>
        ) : (
            <div className="bg-slate-800/90 p-6 rounded-xl border border-red-500/50 shadow-xl backdrop-blur-md max-w-3xl mx-auto">
                <p className="text-3xl font-bold text-red-400 mb-6">Ups, Belum Pas</p>
                
                <div className="text-left">
                    <p className="text-slate-300 text-sm mb-3 font-semibold uppercase tracking-wider">Jawaban yang benar:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/40 p-4 rounded-lg border border-white/10">
                                <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                                <span className="text-2xl">{taskData.dropZoneLabels.zoneA.icon}</span>
                                <h5 className="font-bold text-slate-200 text-lg">{taskData.dropZoneLabels.zoneA.label}</h5>
                                </div>
                                <ul className="space-y-2">
                                {taskData.items.filter(i => i.correctDrop === 'zoneA').map(item => (
                                    <li key={item.id} className="text-sm text-slate-300 flex items-start gap-2 leading-snug">
                                        <span className="text-green-400 mt-0.5 text-xs">●</span>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                                </ul>
                        </div>
                        
                        <div className="bg-black/40 p-4 rounded-lg border border-white/10">
                                <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                                <span className="text-2xl">{taskData.dropZoneLabels.zoneB.icon}</span>
                                <h5 className="font-bold text-slate-200 text-lg">{taskData.dropZoneLabels.zoneB.label}</h5>
                                </div>
                                <ul className="space-y-2">
                                {taskData.items.filter(i => i.correctDrop === 'zoneB').map(item => (
                                    <li key={item.id} className="text-sm text-slate-300 flex items-start gap-2 leading-snug">
                                        <span className="text-green-400 mt-0.5 text-xs">●</span>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);

const ArticleView: React.FC<{
    content: NonNullable<DragDropTaskData['articleContent']>;
    getMessage: () => React.ReactNode;
    onDrop: (e: React.DragEvent<HTMLDivElement>, to: Location) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}> = ({ content, getMessage, onDrop, onDragOver }) => (
    <div
        onDrop={(e) => onDrop(e, 'source')}
        onDragOver={onDragOver}
        className="bg-white text-gray-800 rounded-2xl shadow-lg w-full max-w-3xl mx-auto overflow-hidden"
    >
        {content.imageUrl && (
            <img src={content.imageUrl} alt={content.headline} className="w-full h-[470px] object-cover" />
        )}
        <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">{content.headline}</h1>
            <p className="text-sm text-gray-500 mb-4">{`Oleh ${content.author} - ${content.date}`}</p>
            <div className="text-gray-700 leading-relaxed space-y-4">
                {getMessage()}
            </div>
        </div>
    </div>
);


const DragAndDropTask: React.FC<{ taskData: DragDropTaskData, onSubmit: (isCorrect: boolean) => void }> = ({ taskData, onSubmit }) => {
    // State to track the location of each draggable item by its ID
    const [itemLocations, setItemLocations] = useState<Record<string, Location>>({});
    const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Initialize item locations when the task changes
    useEffect(() => {
        const initialLocations: Record<string, Location> = {};
        taskData.items.forEach(item => {
            initialLocations[item.id] = 'source';
        });
        setItemLocations(initialLocations);
        setIsComplete(false);
        setIsCorrect(null);
    }, [taskData]);

    // Effect to automatically submit the result after checking the solution
    useEffect(() => {
        if (isComplete && isCorrect !== null) {
            // The parent component (HoaxGame/AkunGame) has a setTimeout 
            // to handle the delay before showing the next task.
            // This allows the user to see the feedback.
            onSubmit(isCorrect);
        }
    }, [isComplete, isCorrect, onSubmit]);


    // Fix: Changed the event type to `HTMLElement` to allow dragging from both `div` and `span` elements.
    const handleDragStart = (e: React.DragEvent<HTMLElement>, id: string, from: Location) => {
        if (isComplete) return;
        setDraggedItem({ id, from });
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, to: Location) => {
        e.preventDefault();
        if (!draggedItem || isComplete) return;

        // If dropping back to the same zone, do nothing
        if (draggedItem.from === to) {
            setDraggedItem(null);
            return;
        }

        // Update the location of the dragged item
        setItemLocations(prev => ({
            ...prev,
            [draggedItem.id]: to,
        }));

        setDraggedItem(null);
    };

    const checkSolution = () => {
        if (isComplete) return;

        const allItemsPlaced = Object.values(itemLocations).every(loc => loc !== 'source');
        if (!allItemsPlaced) {
             return;
        }

        const wasCorrect = taskData.items.every(item => itemLocations[item.id] === item.correctDrop);
        setIsCorrect(wasCorrect);
        setIsComplete(true);
    };
    
    const allItemsPlaced = Object.values(itemLocations).every(loc => loc !== 'source');

    const zoneAItems = taskData.items.filter(item => itemLocations[item.id] === 'zoneA');
    const zoneBItems = taskData.items.filter(item => itemLocations[item.id] === 'zoneB');
    
    const getFullMessage = (parts: NonNullable<DragDropTaskData['messageParts'] | DragDropTaskData['articleContent']["messageParts"]>) => {
        return parts.map((part, index) => {
            if (part.isDraggable && part.id && itemLocations[part.id] === 'source') {
                return (
                    <span
                        key={part.id || index}
                        draggable={!isComplete}
                        onDragStart={(e) => handleDragStart(e, part.id!, 'source')}
                        className="bg-sky-600/20 text-sky-800 font-bold p-1 rounded cursor-grab active:cursor-grabbing border-b-2 border-sky-400"
                    >
                        {part.text}
                    </span>
                );
            }
            return <span key={index}>{part.text}</span>;
        });
    };

    const renderDropZone = (items: typeof taskData.items, zone: DropZoneType, label: string, icon: string) => (
        <div
            onDrop={(e) => handleDrop(e, zone)}
            onDragOver={handleDragOver}
            className={`flex-1 p-4 bg-black/20 backdrop-blur-md rounded-lg border-2 border-dashed ${draggedItem ? 'border-blue-400' : 'border-slate-600'} transition-all min-h-[150px]`}
        >
            <h4 className="text-lg font-bold text-center mb-4">{icon} {label}</h4>
            <div className="flex flex-col gap-2">
                {items.map(item => (
                    <div
                        key={item.id}
                        draggable={!isComplete}
                        onDragStart={(e) => handleDragStart(e, item.id, zone)}
                        className={`p-2 bg-slate-700 text-white rounded-md cursor-grab active:cursor-grabbing ${isComplete ? 'opacity-70' : ''}`}
                    >
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    );
    
    if (taskData.displayType === 'article' && taskData.articleContent) {
        return (
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-8">
                <h3 className="text-center font-bold text-slate-100 text-xl">{taskData.scenario}</h3>
                
                <ArticleView 
                    content={taskData.articleContent} 
                    getMessage={() => getFullMessage(taskData.articleContent!.messageParts)}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                />

                <p className="text-slate-300 text-center">Seret potongan kalimat yang disorot dari artikel di atas ke dalam kategori yang sesuai di bawah ini.</p>

                <div className="w-full flex flex-col md:flex-row gap-6">
                    {renderDropZone(zoneAItems, 'zoneA', taskData.dropZoneLabels.zoneA.label, taskData.dropZoneLabels.zoneA.icon)}
                    {renderDropZone(zoneBItems, 'zoneB', taskData.dropZoneLabels.zoneB.label, taskData.dropZoneLabels.zoneB.icon)}
                </div>

                <button
                  onClick={checkSolution}
                  disabled={!allItemsPlaced || isComplete}
                  className="w-full mt-4 bg-[#A8D121] text-[#0D1A2E] font-bold py-3 rounded-full text-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  Periksa
                </button>
                
                {isComplete && <FeedbackDisplay isCorrect={isCorrect!} taskData={taskData} />}
            </div>
        );
    }

    // Default view
    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
            <h3 className="text-center font-bold mb-2 text-slate-100 text-xl">{taskData.scenario}</h3>
            
            <div
                onDrop={(e) => handleDrop(e, 'source')}
                onDragOver={handleDragOver}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 min-h-[150px] text-slate-300 leading-relaxed"
            >
                {taskData.messageParts && getFullMessage(taskData.messageParts)}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {renderDropZone(zoneAItems, 'zoneA', taskData.dropZoneLabels.zoneA.label, taskData.dropZoneLabels.zoneA.icon)}
                {renderDropZone(zoneBItems, 'zoneB', taskData.dropZoneLabels.zoneB.label, taskData.dropZoneLabels.zoneB.icon)}
            </div>

            <button
              onClick={checkSolution}
              disabled={!allItemsPlaced || isComplete}
              className="w-full mt-4 bg-[#A8D121] text-[#0D1A2E] font-bold py-3 rounded-full text-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              Periksa
            </button>
            
            {isComplete && <FeedbackDisplay isCorrect={isCorrect!} taskData={taskData} />}
        </div>
    );
};

export default DragAndDropTask;