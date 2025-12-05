import React, { useState } from 'react';
import { LANGUAGES } from '../constants';
import { Language } from '../types';
import { speak } from '../services/speechService';
import { playClick } from '../services/soundService';
import { Volume2, Stethoscope, HelpCircle, ArrowRight, Activity, ShieldCheck, Smartphone } from 'lucide-react';
import { HelpModal } from './HelpModal';

interface Props {
  onSelect: (lang: Language) => void;
}

export const LanguageSelection: React.FC<Props> = ({ onSelect }) => {
  const [showHelp, setShowHelp] = useState(false);

  const handlePreview = (lang: Language, e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    speak(lang.welcomeMessage, lang.code);
  };

  const handleSelect = (lang: Language) => {
    playClick();
    onSelect(lang);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 relative overflow-hidden font-sans">
      
      {/* Background Texture & Gradients */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-[80px]" />
      </div>

      {/* Top Bar */}
      <div className="relative z-20 px-6 pt-6 flex justify-between items-center">
         <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
               <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-extrabold text-stone-800 leading-none tracking-tight">GramVet</h1>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Village AI Doctor</span>
            </div>
         </div>
         <button 
            onClick={() => { playClick(); setShowHelp(true); }}
            className="p-2.5 bg-white rounded-full shadow-sm border border-stone-200 active:bg-stone-100"
         >
            <HelpCircle className="w-6 h-6 text-stone-600" />
         </button>
      </div>

      {/* Main Content Area: Problem & Solution Story */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20">
          
          {/* Hero Visual Card */}
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/50 p-6 relative overflow-hidden group">
              
              {/* Trust Badge */}
              <div className="absolute top-6 right-6 flex items-center space-x-1 bg-emerald-100 px-2 py-1 rounded-md">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span className="text-[10px] font-bold text-emerald-800">Govt. Protocol</span>
              </div>

              <h2 className="text-2xl font-bold text-stone-800 mb-6 w-3/4 leading-tight">
                  Instant Cure for Livestock
              </h2>

              {/* Visual Workflow Chain */}
              <div className="flex items-center justify-between mb-8 relative">
                  {/* Connection Line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-stone-200 via-emerald-200 to-stone-200 -z-10" />

                  {/* Step 1 */}
                  <div className="flex flex-col items-center space-y-2">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-md border border-stone-100 flex items-center justify-center relative">
                          <Activity className="w-7 h-7 text-red-500 animate-pulse" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                      </div>
                      <span className="text-xs font-bold text-stone-500">Sick</span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-5 h-5 text-stone-300" />

                  {/* Step 2 */}
                  <div className="flex flex-col items-center space-y-2">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center transform scale-110">
                          <Smartphone className="w-8 h-8 text-white" />
                          <div className="absolute inset-0 bg-white/20 animate-scan rounded-2xl overflow-hidden pointer-events-none" />
                      </div>
                      <span className="text-xs font-bold text-emerald-700">Scan</span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-5 h-5 text-stone-300" />

                  {/* Step 3 */}
                  <div className="flex flex-col items-center space-y-2">
                       <div className="w-14 h-14 bg-white rounded-2xl shadow-md border border-stone-100 flex items-center justify-center">
                          <div className="flex space-x-0.5">
                              <div className="w-2 h-6 bg-blue-500 rounded-full" />
                              <div className="w-2 h-4 bg-yellow-500 rounded-full mt-2" />
                              <div className="w-2 h-5 bg-green-500 rounded-full mt-1" />
                          </div>
                      </div>
                      <span className="text-xs font-bold text-stone-500">Cure</span>
                  </div>
              </div>

              <div className="bg-stone-50 rounded-2xl p-4 text-center border border-stone-100">
                  <p className="text-sm text-stone-600 font-medium leading-relaxed">
                      "Take a photo. Get standard Indian Government remedies instantly."
                  </p>
              </div>
          </div>
      </div>

      {/* Bottom Sheet: Language Selection */}
      <div className="relative z-30 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[30px] border-t border-stone-100">
          
          <div className="px-6 pt-6 pb-2">
             <div className="flex items-center space-x-2 mb-4">
                <Volume2 className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-stone-800 uppercase tracking-widest">Select Language</span>
             </div>
          </div>

          {/* Horizontal Scrollable Language Strip */}
          <div className="overflow-x-auto no-scrollbar px-6 pb-8 flex space-x-4 snap-x snap-mandatory">
              {LANGUAGES.map((lang, index) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang)}
                    className="snap-start flex-shrink-0 group relative w-32 h-40 bg-stone-50 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:bg-white transition-all duration-300 flex flex-col items-center justify-center active:scale-95"
                  >
                      {/* Flag Circle */}
                      <div className="w-14 h-14 rounded-full border-4 border-white shadow-md overflow-hidden mb-3 group-hover:scale-110 transition-transform">
                          <img src={lang.flagUrl} alt={lang.label} className="w-full h-full object-cover" />
                      </div>

                      <span className="text-stone-800 font-bold text-lg leading-tight group-hover:text-emerald-700">
                          {lang.label}
                      </span>
                      
                      {/* Audio Preview Button (small overlay) */}
                      <div 
                         onClick={(e) => handlePreview(lang, e)}
                         className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow-sm flex items-center justify-center text-stone-400 active:text-emerald-600 active:bg-emerald-50"
                      >
                          <Volume2 className="w-3.5 h-3.5" />
                      </div>
                  </button>
              ))}
              
              {/* Spacer for right padding */}
              <div className="w-2 flex-shrink-0" />
          </div>
      </div>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
};