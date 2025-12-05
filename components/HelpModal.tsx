
import React, { useEffect } from 'react';
import { X, Hand, Camera, Ear, MoveRight } from 'lucide-react';
import { playClick, playShutter, playSuccess } from '../services/soundService';
import { speak, stopSpeaking } from '../services/speechService';

interface Props {
  onClose: () => void;
}

export const HelpModal: React.FC<Props> = ({ onClose }) => {
  
  useEffect(() => {
    // Sequence of audio cues
    const sequence = async () => {
        // Initial Spoken Instruction
        speak("Select. Scan. Listen.", "en-US");
        
        // Sound Effects timed with the speech/visuals
        setTimeout(() => playClick(), 500);   // "Select"
        setTimeout(() => playShutter(), 1500); // "Scan"
        setTimeout(() => playSuccess(), 2500); // "Listen"
    };

    sequence();

    return () => {
        stopSpeaking();
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in-up">
        <div className="bg-white rounded-3xl w-full max-w-sm p-6 relative shadow-2xl border-4 border-emerald-100">
            <button 
                onClick={() => { playClick(); onClose(); }}
                className="absolute top-4 right-4 p-3 bg-stone-100 rounded-full active:bg-stone-200 transition-colors"
            >
                <X className="w-8 h-8 text-stone-600" />
            </button>

            <h2 className="text-2xl font-bold text-center mb-10 text-stone-800 tracking-wide">Guide</h2>

            <div className="space-y-8 pl-4">
                {/* Step 1: Select */}
                <div className="flex items-center space-x-6 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 shadow-md">
                         <Hand className="w-10 h-10 text-emerald-600" />
                    </div>
                    <div className="flex-1 opacity-50">
                         {/* Visual abstraction of 'Select' */}
                         <div className="h-4 w-16 bg-stone-800 rounded-full mb-2"/>
                         <div className="h-4 w-10 bg-stone-300 rounded-full"/>
                    </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-start pl-8 -my-5 opacity-20">
                    <MoveRight className="w-8 h-8 text-stone-900 rotate-90" />
                </div>

                {/* Step 2: Scan */}
                <div className="flex items-center space-x-6 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                     <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center shrink-0 shadow-md">
                         <Camera className="w-10 h-10 text-blue-600" />
                    </div>
                     <div className="flex-1 opacity-50">
                         {/* Visual abstraction of 'Scan' */}
                         <div className="h-4 w-14 bg-stone-800 rounded-full mb-2"/>
                         <div className="h-4 w-20 bg-stone-300 rounded-full"/>
                    </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-start pl-8 -my-5 opacity-20">
                    <MoveRight className="w-8 h-8 text-stone-900 rotate-90" />
                </div>

                 {/* Step 3: Listen */}
                <div className="flex items-center space-x-6 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
                     <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center shrink-0 shadow-md">
                         <Ear className="w-10 h-10 text-orange-600" />
                    </div>
                     <div className="flex-1 opacity-50">
                         {/* Visual abstraction of 'Listen' */}
                         <div className="h-4 w-16 bg-stone-800 rounded-full mb-2"/>
                         <div className="h-4 w-12 bg-stone-300 rounded-full"/>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center opacity-50">
                <p className="text-xs uppercase tracking-widest font-bold text-stone-400">GramVet Assistance</p>
            </div>
        </div>
    </div>
  );
};
