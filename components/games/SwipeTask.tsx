import React, { useState, useRef, useEffect } from 'react';
import { SwipeTaskData } from '../../data/hoaxGameData';

const SWIPE_THRESHOLD = 120; // pixels to trigger a swipe
const ROTATION_FACTOR = 15; // how much the card rotates

// --- New Components ---
const Heart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MessageCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const Share2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const Music: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
    </svg>
);

const ThumbsUp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 10v12" />
        <path d="M17 10V4a2 2 0 0 0-2-2H8.5a2.5 2.5 0 0 0-2.34 3.24L7.5 10H17" />
    </ThumbsUp>
);

const MoreHorizontal: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
    </svg>
);

const Globe: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Globe>
);

const Gift: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

const ArrowRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const Clock: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const CheckCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const Send: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

const Bookmark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
);

const ImageWithFallback: React.FC<{ src?: string, alt: string, className?: string }> = ({ src, alt, className }) => {
    if (!src) return <div className={`bg-gray-800 ${className}`} aria-label={alt}></div>;
    return <img src={src} alt={alt} className={className} />;
};

const FeedbackOverlay: React.FC<{ isCorrect: boolean; correctSwipe: 'left' | 'right'; }> = ({ isCorrect, correctSwipe }) => {
  const correctText = correctSwipe === 'left' ? '← Hoax' : '→ Fakta';
  const message = isCorrect ? 'Cakep!' : `Ups, Belum Pas. Jawaban: ${correctText}`;
  const backgroundColor = isCorrect ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className={`absolute inset-0 flex items-center justify-center z-50 rounded-2xl overflow-hidden`}>
        <div className={`absolute inset-0 ${backgroundColor} opacity-95`}></div>
        <div className="relative z-10 p-6 text-center">
            {/* Optional Icon */}
            {isCorrect && <div className="text-4xl mb-2">🎉</div>}
            <p className="text-3xl font-bold text-white drop-shadow-md">
                {message}
            </p>
        </div>
    </div>
  );
};
// --- End New Components ---


const CardContent: React.FC<{ taskData: SwipeTaskData }> = ({ taskData }) => {
    const [liked, setLiked] = useState(false);
    
    // Instagram View
    if (taskData.displayType === 'instagram') {
        return (
            <div className="relative w-full h-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden text-black">
                <div className="h-full w-full overflow-y-auto bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 sticky top-0 bg-white z-10">
                        <div className="flex items-center gap-3">
                            <ImageWithFallback 
                                src={taskData.authorAvatar}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-black">{taskData.authorName}</span>
                                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.52 10 10 10 10-4.52 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                        </div>
                        <button>
                          <MoreHorizontal className="w-6 h-6 text-black" />
                        </button>
                    </div>

                    {/* Post Image */}
                    <div className="w-full aspect-square">
                        <ImageWithFallback 
                          src={taskData.articleImage}
                          alt="Instagram Post"
                          className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-4">
                            <button><Heart className="w-7 h-7 text-black" /></button>
                            <button><MessageCircle className="w-7 h-7 text-black" /></button>
                            <button><Send className="w-7 h-7 text-black" /></button>
                        </div>
                        <button><Bookmark className="w-7 h-7 text-black" /></button>
                    </div>
                    
                    {/* Likes */}
                    <div className="px-4 pb-2">
                        <span className="text-black font-semibold text-sm">12,543 likes</span>
                    </div>

                    {/* Caption */}
                    <div className="px-4 pb-2 text-sm text-black">
                        <span className="font-bold">{taskData.authorName}</span>
                        <span className="ml-1">{taskData.claim}</span>
                        {taskData.articleBody && (
                            <div className="whitespace-pre-wrap mt-1">
                                {taskData.articleBody.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className={index > 0 ? 'mt-2' : ''}>{paragraph}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    
                     {/* Timestamp */}
                    <div className="px-4 pt-2 pb-4">
                        <span className="text-gray-500 text-xs uppercase">9 weeks ago</span>
                    </div>
                </div>
            </div>
        );
    }

    // Website Phishing View
    if (taskData.displayType === 'website-phishing') {
        return (
            <div className="relative w-full h-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden text-black">
                <div className="h-full w-full overflow-y-auto bg-white">
                  {/* Browser Bar */}
                  <div className="sticky top-0 bg-gray-100 border-b border-gray-300 px-4 py-3 z-10">
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-300">
                      <ImageWithFallback 
                        src={taskData.authorAvatar}
                        alt="Favicon"
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700 flex-1 truncate">{taskData.sourceInfo}</span>
                      <div className="w-4 h-4 text-green-600">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hero Section */}
                  <div className="bg-white text-black px-6 py-8 text-center">
                    <div className="mb-4">
                      <ImageWithFallback 
                        src={taskData.authorAvatar}
                        alt="BCA Logo"
                        className="w-32 h-32 mx-auto"
                      />
                    </div>
                    <h1 className="text-black text-xl mb-6">
                      {taskData.claim}
                    </h1>
                    
                    <div className="bg-red-600 text-white rounded-lg px-4 py-3 mb-6 inline-flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>Waktu tersisa: 05:47</span>
                    </div>

                    <button className="w-full bg-yellow-400 text-black py-4 rounded-lg flex items-center justify-center gap-2 animate-pulse">
                      <Gift className="w-6 h-6" />
                      <span>CEK SEKARANG</span>
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Prize Section */}
                  <div className="px-6 py-8">
                    <h2 className="text-black text-center mb-6">
                      Hadiah Yang Bisa Anda Menangkan:
                    </h2>
                    
                    <div className="mb-6">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=500&fit=crop"
                        alt="Luxury Car"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                        <div className="text-black text-center">🚗 Mercedes-Benz C-Class</div>
                        <div className="text-gray-600 text-sm text-center">Senilai Rp 1.2 Miliar</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">100% GRATIS tanpa biaya apapun</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">Proses klaim hanya 2 menit</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">Langsung ditransfer ke rekening Anda</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">Terbatas hanya untuk 100 orang pertama!</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="text-gray-900 mb-4">Pemenang Sebelumnya:</div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <ImageWithFallback 
                            src="https://i.pravatar.cc/150?img=32"
                            alt="Winner"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="text-black">Budi S. - Jakarta</div>
                            <div className="text-gray-600 text-sm">⭐⭐⭐⭐⭐ "Terima kasih! Saya benar-benar dapat mobil!"</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <ImageWithFallback 
                            src="https://i.pravatar.cc/150?img=45"
                            alt="Winner"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="text-black">Siti R. - Bandung</div>
                            <div className="text-gray-600 text-sm">⭐⭐⭐⭐⭐ "Awalnya tidak percaya, tapi ternyata benar!"</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="sticky bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm mx-auto w-fit">
                    {taskData.sourceInfo}
                  </div>
                </div>
            </div>
        );
    }

    // Website News View
    if (taskData.displayType === 'website-news') {
        return (
            <div className="relative w-full h-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden text-black">
                <div className="h-full w-full overflow-y-auto bg-gray-50">
                  {/* Browser Bar */}
                  <div className="sticky top-0 bg-gray-100 border-b border-gray-300 px-4 py-3 z-10">
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-300">
                      <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/></svg>
                      <span className="text-sm text-gray-700 flex-1 truncate">{taskData.sourceInfo}</span>
                    </div>
                  </div>
                  
                  {/* Black Header for Logo */}
                  <div className="bg-black px-6 py-3">
                      <ImageWithFallback src={taskData.authorAvatar} alt="Publication logo" className="h-8 w-auto" />
                  </div>

                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{taskData.claim}</h1>
                    <div className="text-sm text-gray-600 mb-4 border-b pb-4">
                        <p className="font-semibold">{taskData.authorName}</p>
                        <p>{taskData.authorHandle}</p>
                    </div>

                    <ImageWithFallback src={taskData.articleImage} alt="Article image" className="w-full h-48 object-cover rounded-lg my-4" />

                    <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                        {taskData.articleBody}
                    </div>
                  </div>
                </div>
            </div>
        );
    }
    
    // TikTok View
    if (taskData.displayType === 'tiktok') {
        return (
            <div className="relative w-full h-[450px] bg-black rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col justify-end text-white">
                 {/* Top Navigation */}
                <div className="absolute top-0 left-0 right-0 z-20 flex justify-center gap-6 pt-4">
                    <button className="text-white/60 text-sm">Following</button>
                    <button className="text-white text-sm font-bold">For You</button>
                </div>

                {/* Main Content Image */}
                <div className="absolute inset-0">
                    <ImageWithFallback
                        src={taskData.backgroundImage}
                        alt="TikTok content"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Right Side Actions */}
                <div className="absolute right-2 bottom-28 flex flex-col gap-5 z-10">
                    <div className="relative flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                            <ImageWithFallback
                                src={taskData.authorAvatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setLiked(!liked)}
                        className="flex flex-col items-center gap-1"
                    >
                        <Heart
                            className={`w-8 h-8 transition-colors ${liked ? "text-red-500 fill-red-500" : "text-white"}`}
                        />
                        <span className="text-white text-xs font-bold">245.8K</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                        <MessageCircle className="w-8 h-8 text-white" />
                        <span className="text-white text-xs font-bold">3847</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                        <Share2 className="w-8 h-8 text-white" />
                        <span className="text-white text-xs font-bold">1025</span>
                    </button>
                </div>
                
                {/* Bottom User Info & Caption */}
                <div className="absolute bottom-0 left-0 right-16 p-4 z-10 space-y-2">
                    <span className="text-white font-bold">{taskData.authorName}</span>
                    <p className="text-white text-sm">{taskData.claim}</p>
                    <div className="flex items-center gap-2 text-white text-sm">
                        <Music className="w-4 h-4" />
                        <span>{taskData.sourceInfo}</span>
                    </div>
                </div>
            </div>
        );
    }
    
    // Poster View
    if (taskData.displayType === 'poster') {
        return (
            <div className="relative w-full h-[450px] bg-gray-900 backdrop-blur-lg rounded-2xl p-6 text-center shadow-2xl border border-white/20 overflow-hidden flex flex-col justify-center items-center text-white">
                <img src={taskData.authorAvatar} alt="Poster background" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative z-10">
                    <h3 className="text-4xl font-extrabold tracking-tight drop-shadow-lg">{taskData.claim}</h3>
                    <p className="mt-4 text-lg text-slate-200 drop-shadow-md">{taskData.sourceInfo}</p>
                </div>
            </div>
        );
    }
    
    // Website View
    if (taskData.displayType === 'website') {
        return (
            <div className="w-full h-[450px] bg-white/10 backdrop-blur-lg rounded-2xl p-0 text-left shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                <div className="bg-slate-800/50 p-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    <div className="flex-1 bg-black/30 text-slate-300 text-xs rounded-full px-3 py-1 text-center">
                        <span className="font-mono">{taskData.sourceInfo}</span>
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-grow items-center text-center min-h-[250px] justify-center">
                    {taskData.authorAvatar && <img src={taskData.authorAvatar} alt="Website favicon" className="w-16 h-16 mb-4 object-contain" />}
                    <h3 className="text-xl font-bold text-slate-100 leading-tight">{taskData.claim}</h3>
                </div>
            </div>
        );
    }

    // News Article View
    if (taskData.displayType === 'news-article') {
        return (
            <div className="w-full h-[450px] bg-white/10 backdrop-blur-lg rounded-2xl p-0 text-left shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                {taskData.authorAvatar && (
                    <img src={taskData.authorAvatar} alt="Article visual" className="w-full h-40 object-cover" />
                )}
                <div className="p-4 flex flex-col flex-grow">
                    {taskData.sourceInfo && <p className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">{taskData.sourceInfo}</p>}
                    <h3 className="text-lg font-bold text-slate-100 leading-tight">{taskData.claim}</h3>
                </div>
            </div>
        );
    }
    
    // Social Media View (for Facebook)
    if (taskData.displayType === 'social-media') {
        return (
            <div className="relative w-full h-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden text-black">
                <div className="h-full w-full overflow-y-auto">
                    <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <ImageWithFallback 
                                  src={taskData.authorAvatar}
                                  alt={taskData.authorName || 'Author'}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                  <div className="text-black font-semibold">{taskData.authorName}</div>
                                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                                    <span>{taskData.authorHandle}</span>
                                    <span>•</span>
                                    <Globe className="w-3 h-3" />
                                  </div>
                                </div>
                            </div>
                            <button className="text-gray-500">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mb-4">
                          <p className="text-black whitespace-pre-wrap">{taskData.claim}</p>
                        </div>

                        {taskData.articleImage && (
                            <div className="mb-3 -mx-4 border-t border-b border-gray-200">
                                <ImageWithFallback 
                                    src={taskData.articleImage}
                                    alt={taskData.articleHeadline || 'Article Preview'}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-3 bg-gray-50">
                                    <div className="text-gray-500 text-xs mb-1 uppercase">{taskData.articleSource}</div>
                                    <div className="text-black font-semibold">{taskData.articleHeadline}</div>
                                </div>
                            </div>
                        )}
                        
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <div className="flex items-center gap-1">
                                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white">
                                    <ThumbsUp className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-gray-600 text-sm">1.2K</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 text-sm">
                                <span>234 comments</span>
                                <span>89 shares</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-around py-1 text-gray-600 font-semibold">
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg flex-1 justify-center">
                                <ThumbsUp className="w-5 h-5" />
                                <span>Like</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg flex-1 justify-center">
                                <MessageCircle className="w-5 h-5" />
                                <span>Comment</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg flex-1 justify-center">
                                <Share2 className="w-5 h-5" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
                 {taskData.sourceInfo && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm opacity-80 pointer-events-none">
                        {taskData.sourceInfo}
                    </div>
                 )}
            </div>
        );
    }

    // Default "glassy" View
    return (
        <div className="w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl flex flex-col justify-center items-center text-center p-6 min-h-[300px]">
            <p className="text-xl md::text-2xl font-bold text-slate-100 mb-4 drop-shadow-md">
                "{taskData.claim}"
            </p>
            <p className="text-slate-300 text-sm drop-shadow-md">
                {taskData.sourceInfo}
            </p>
        </div>
    );
};

const SwipeTask: React.FC<{
  taskData: SwipeTaskData;
  onSwipe: (isCorrect: boolean) => void;
  nextTaskData?: SwipeTaskData;
}> = ({ taskData, onSwipe, nextTaskData }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'none' | 'correct' | 'incorrect'>('none'); // New state for feedback
  const [swipedDirection, setSwipedDirection] = useState<'left' | 'right' | null>(null); // New state to store swiped direction
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  // Reset position and feedback state when taskData.id changes (new task)
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
    setFeedbackState('none');
    setSwipedDirection(null);
  }, [taskData.id]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (feedbackState !== 'none') return; // Prevent dragging while feedback is shown
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    if (cardRef.current) {
        cardRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setPosition({ x: dx, y: dy });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (cardRef.current) {
        cardRef.current.releasePointerCapture(e.pointerId);
    }
    
    if (Math.abs(position.x) > SWIPE_THRESHOLD) {
      const direction = position.x > 0 ? 'right' : 'left';
      const isCorrect = direction === taskData.correctSwipe;
      
      setSwipedDirection(direction);
      setFeedbackState(isCorrect ? 'correct' : 'incorrect');
      
      // Snap back to center immediately so the feedback overlay is visible on top of the card.
      // The parent component manages the delay (e.g., 2 seconds) before switching to the next task.
      setPosition({ x: 0, y: 0 });
      
      onSwipe(isCorrect); 
    } else {
      setPosition({ x: 0, y: 0 }); // Snap back to center if threshold not met
    }
  };

  const getCardStyle = () => {
    const rotation = (position.x / window.innerWidth) * ROTATION_FACTOR;
    return {
      transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
      transition: isDragging ? 'none' : 'transform 0.3s ease-out',
    };
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">PILAHLAH!</p>
      <h3 className="text-center font-bold text-white text-lg mb-4">
        Geser ke kiri (←) untuk Hoax dan kanan (→) untuk Fakta
      </h3>
      
      <div className="relative w-full">
        {/* Sizer div to dynamically set container height based on current card's content */}
        <div className="w-full p-4 invisible">
          <CardContent taskData={taskData} />
        </div>
        
        {/* --- Stack of absolutely positioned cards --- */}
        <div className="absolute top-0 left-0 w-full h-full p-4">
            <div className="w-full h-full bg-black/20 backdrop-blur-lg rounded-2xl shadow-lg transform rotate-[2deg] scale-90"></div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full p-4">
            {nextTaskData ? (
                <div className="w-full h-full transform rotate-[-4deg] scale-95">
                    <CardContent taskData={nextTaskData} />
                </div>
            ) : (
                <div className="w-full h-full bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg transform rotate-[-4deg] scale-95"></div>
            )}
        </div>

        <div
          ref={cardRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={getCardStyle()}
          className="absolute top-0 left-0 w-full h-full p-4 cursor-grab active:cursor-grabbing touch-none select-none"
        >
          <CardContent taskData={taskData} />
          {feedbackState !== 'none' && (
            <FeedbackOverlay 
              isCorrect={feedbackState === 'correct'} 
              correctSwipe={taskData.correctSwipe} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SwipeTask;