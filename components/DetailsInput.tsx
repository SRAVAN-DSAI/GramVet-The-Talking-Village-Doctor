
import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Mic, StopCircle, Trash2, ArrowRight, PenTool, HelpCircle } from 'lucide-react';
import { playClick } from '../services/soundService';
import { speak } from '../services/speechService';
import { Translations } from '../types';

interface Props {
  onNext: (details: string, audioBlob?: Blob) => void;
  onBack: () => void;
  t: Translations;
  langCode: string;
}

export const DetailsInput: React.FC<Props> = ({ onNext, onBack, t, langCode }) => {
  const [detailsText, setDetailsText] = useState("");
  
  // Audio State
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Speak instruction on mount
    speak(t.whatIsWrong + " " + t.describeSymptoms, langCode);
  }, []);

  // Cleanup audio URL
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    }
  }, [audioUrl]);

  const startRecording = async () => {
    playClick();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.warn("Mic Error:", err);
      // Don't crash, just alert
      alert("Please allow microphone access to record audio, or use text instead.");
    }
  };

  const stopRecording = () => {
    playClick();
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const deleteRecording = () => {
    playClick();
    setAudioBlob(null);
    setAudioUrl(null);
  };

  const handleNext = () => {
    playClick();
    onNext(detailsText, audioBlob || undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
       {/* Header */}
       <div className="bg-white/90 backdrop-blur-md px-6 pt-12 pb-4 shadow-sm rounded-b-[30px] flex flex-col space-y-4">
        <div className="flex items-center justify-between">
            <button 
              onClick={() => { playClick(); onBack(); }}
              className="p-3 bg-stone-100 rounded-full active:bg-stone-200"
            >
              <ArrowLeft className="w-6 h-6 text-stone-700" />
            </button>
            <div className="flex items-center space-x-2 bg-emerald-100 px-4 py-1.5 rounded-full">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">{t.step2}</span>
            </div>
            <div className="w-12"/>
        </div>
        
        <div className="flex items-center space-x-3 px-2">
            <div className="p-3 bg-emerald-100 rounded-full">
                <HelpCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-stone-800 leading-none">{t.whatIsWrong}</h2>
                <p className="text-stone-500 text-sm mt-1">{t.describeSymptoms}</p>
            </div>
        </div>
      </div>

      <div className="flex-1 px-6 pt-8 pb-32 overflow-y-auto">
        {/* Audio Section - Primary */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-stone-100 mb-6">
            <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center space-x-2 text-emerald-600">
                     <Mic className="w-5 h-5" />
                     <span className="text-sm font-bold uppercase tracking-wider">{t.recordAudio}</span>
                 </div>
                 {isRecording && <span className="text-red-500 text-xs font-mono animate-pulse">● REC</span>}
            </div>

            <div className="flex justify-center">
                {!isRecording && !audioUrl && (
                    <button 
                        onClick={startRecording}
                        className="w-full py-10 bg-emerald-50 rounded-2xl border-2 border-emerald-100 border-dashed flex flex-col items-center justify-center space-y-3 active:bg-emerald-100 transition-colors group"
                    >
                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                            <Mic className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-emerald-700 font-bold">{t.tapToRecord}</span>
                    </button>
                )}

                {isRecording && (
                    <button 
                        onClick={stopRecording}
                        className="w-full py-10 bg-red-50 rounded-2xl border-2 border-red-100 flex flex-col items-center justify-center space-y-3 animate-pulse"
                    >
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                            <StopCircle className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-red-600 font-bold">{t.stopRecording}</span>
                    </button>
                )}

                {audioUrl && !isRecording && (
                    <div className="w-full py-6 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col items-center space-y-4">
                        <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                            <span>{t.audioRecorded}</span>
                        </div>
                        <audio src={audioUrl} controls className="w-full px-4 h-10" />
                        <button 
                            onClick={deleteRecording}
                            className="flex items-center space-x-2 text-red-500 text-sm font-bold bg-white px-4 py-2 rounded-full border border-red-100 shadow-sm"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>{t.deleteAudio}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Text Section - Secondary */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-stone-100">
             <div className="flex items-center space-x-2 mb-4 text-stone-500">
                 <PenTool className="w-4 h-4" />
                 <span className="text-xs font-bold uppercase tracking-widest">{t.addNote}</span>
             </div>
             <textarea 
                 className="w-full h-32 p-4 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none placeholder-stone-400 text-lg"
                 placeholder="..."
                 value={detailsText}
                 onChange={(e) => setDetailsText(e.target.value)}
             />
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-stone-100 z-30">
        <button 
          onClick={handleNext}
          className="w-full h-16 bg-emerald-600 rounded-2xl flex items-center justify-center space-x-3 shadow-xl shadow-emerald-200 active:scale-95 transition-transform"
        >
          <span className="text-xl font-bold text-white uppercase tracking-wider">
            {(!detailsText && !audioBlob) ? t.skipAndScan : t.nextStep}
          </span>
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
