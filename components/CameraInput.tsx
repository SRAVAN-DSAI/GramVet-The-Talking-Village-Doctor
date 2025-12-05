
import React, { useRef, useState, useEffect } from 'react';
import { Camera, ArrowLeft, ScanLine, Zap, Send, RotateCcw, PenTool, Mic, Trash2, StopCircle } from 'lucide-react';
import { playClick } from '../services/soundService';
import { unlockAudio } from '../services/speechService'; // Import unlockAudio
import { Translations } from '../types';

interface Props {
  onFileSelected: (file: File, details?: string, audioBlob?: Blob) => void;
  onBack: () => void;
  t: Translations;
  initialDetails?: string;
  initialAudio?: Blob;
}

export const CameraInput: React.FC<Props> = ({ onFileSelected, onBack, t, initialDetails, initialAudio }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Initialize state with props from previous step
  const [detailsText, setDetailsText] = useState<string>(initialDetails || "");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(initialAudio || null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  // Audio Recording State for Preview Editing (optional)
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Setup initial audio preview if passed
  useEffect(() => {
    if (initialAudio) {
        const url = URL.createObjectURL(initialAudio);
        setAudioUrl(url);
    }
    // No cleanup in this specific effect for initial prop to avoid revoking prop
  }, [initialAudio]);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  // Clean up audio URL
  useEffect(() => {
      return () => {
          if (audioUrl) URL.revokeObjectURL(audioUrl);
      }
  }, [audioUrl]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRetake = () => {
    playClick();
    setSelectedFile(null);
    // Note: We do NOT reset details/audio here to allow re-taking just the photo while keeping description
  };

  const handleSubmit = () => {
    if (selectedFile) {
        playClick();
        unlockAudio(); // CRITICAL FIX: Unlock audio context on user gesture
        onFileSelected(selectedFile, detailsText, audioBlob || undefined);
    }
  };

  const handleBack = () => {
      playClick();
      if (selectedFile) {
          handleRetake();
      } else {
          onBack();
      }
  }

  // Audio Recording Logic (Allow modifying in preview if needed)
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
          console.warn("Error accessing microphone:", err);
          alert("Microphone access denied. Please type text instead.");
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
  }

  // PREVIEW SCREEN (Confirmation)
  if (selectedFile && previewUrl) {
    return (
        <div className="min-h-screen flex flex-col bg-stone-900 relative">
             <div className="absolute inset-0 z-0">
                 <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-30 blur-sm" />
             </div>

             <div className="relative z-10 flex-1 flex flex-col px-6 py-6 overflow-y-auto no-scrollbar pb-32">
                 
                 {/* Image Preview Card */}
                 <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-4 animate-fade-in-up border-2 border-emerald-500/50 flex-shrink-0">
                     <div className="h-48 w-full relative">
                         <img src={previewUrl} alt="Captured" className="w-full h-full object-cover" />
                     </div>
                 </div>
                 
                 {/* Input Controls (Editable) */}
                 <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                     
                     {/* Audio Input Section */}
                     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                         <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center space-x-2 text-emerald-300">
                                 <Mic className="w-5 h-5" />
                                 <span className="text-sm font-bold uppercase tracking-wider">{t.recordAudio}</span>
                             </div>
                             {isRecording && <span className="text-red-400 text-xs font-mono animate-pulse">● REC 00:00</span>}
                         </div>
                         
                         <div className="flex items-center space-x-4">
                             {!isRecording && !audioUrl && (
                                 <button 
                                    onClick={startRecording}
                                    className="flex-1 py-4 bg-emerald-600 rounded-xl flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-transform"
                                 >
                                     <Mic className="w-6 h-6 text-white" />
                                     <span className="text-white font-bold">{t.tapToRecord}</span>
                                 </button>
                             )}

                             {isRecording && (
                                 <button 
                                    onClick={stopRecording}
                                    className="flex-1 py-4 bg-red-500 rounded-xl flex items-center justify-center space-x-2 shadow-lg animate-pulse"
                                 >
                                     <StopCircle className="w-6 h-6 text-white" />
                                     <span className="text-white font-bold">{t.stopRecording}</span>
                                 </button>
                             )}

                             {audioUrl && !isRecording && (
                                 <div className="flex-1 flex items-center space-x-2">
                                     <audio src={audioUrl} controls className="h-10 w-full rounded-lg" />
                                     <button onClick={deleteRecording} className="p-2 bg-red-100 rounded-full">
                                         <Trash2 className="w-5 h-5 text-red-500" />
                                     </button>
                                 </div>
                             )}
                         </div>
                     </div>

                     {/* Text Input Section */}
                     <div className="bg-white rounded-2xl p-3 shadow-md">
                         <div className="flex items-center space-x-2 mb-2 text-stone-500">
                             <PenTool className="w-4 h-4" />
                             <span className="text-xs font-bold uppercase tracking-widest">{t.addNote}</span>
                         </div>
                         <textarea 
                             className="w-full h-20 p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none placeholder-stone-400 text-lg"
                             placeholder="..."
                             value={detailsText}
                             onChange={(e) => setDetailsText(e.target.value)}
                         />
                     </div>
                 </div>
             </div>

             {/* Bottom Action Bar */}
             <div className="fixed bottom-0 left-0 w-full z-30 bg-stone-900/80 backdrop-blur-xl p-6 pb-8 border-t border-white/10 flex items-center space-x-4">
                 <button 
                    onClick={handleRetake}
                    className="flex flex-col items-center justify-center w-20 h-16 bg-stone-800 rounded-2xl active:bg-stone-700 shadow-lg border border-stone-600"
                 >
                     <RotateCcw className="w-6 h-6 text-white mb-1" />
                     <span className="text-[10px] text-stone-300 font-bold uppercase">{t.retakePhoto}</span>
                 </button>

                 <button 
                    onClick={handleSubmit}
                    className="flex-1 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center space-x-3 active:bg-emerald-700 shadow-lg shadow-emerald-900/50 border border-emerald-500 transition-all duration-200 hover:scale-[1.02]"
                 >
                     <Send className="w-6 h-6 text-white" />
                     <span className="text-xl font-bold text-white uppercase tracking-wider">{t.analyzeNow}</span>
                 </button>
             </div>
        </div>
    )
  }

  // CAMERA HUD SCREEN
  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Background Camera Placeholder Effect */}
      <div className="absolute inset-0 bg-stone-900 flex items-center justify-center opacity-50">
         <ScanLine className="w-full h-full text-stone-800 opacity-20" />
      </div>

      {/* Viewfinder Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col">
        {/* Top Spacer/Mask */}
        <div className="h-24 bg-black/40 backdrop-blur-[2px]" />
        
        <div className="flex-1 flex">
             {/* Left Mask */}
             <div className="w-4 sm:w-8 bg-black/40 backdrop-blur-[2px]" />
             
             {/* Active Viewfinder Area */}
             <div className="flex-1 relative border border-white/20 rounded-3xl overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
                 
                 {/* Rule of Thirds Grid */}
                 <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20">
                    <div className="border-r border-b border-white"></div>
                    <div className="border-r border-b border-white"></div>
                    <div className="border-b border-white"></div>
                    <div className="border-r border-b border-white"></div>
                    <div className="border-r border-b border-white"></div>
                    <div className="border-b border-white"></div>
                    <div className="border-r border-white"></div>
                    <div className="border-r border-white"></div>
                    <div></div>
                 </div>

                 {/* High-Tech Corners */}
                 <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl opacity-80" />
                 <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl opacity-80" />
                 <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl opacity-80" />
                 <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl opacity-80" />

                 {/* Scanning Laser */}
                 <div className="absolute left-0 right-0 h-1 bg-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,1)] animate-scan z-20" />
                 <div className="absolute left-0 right-0 h-32 bg-gradient-to-b from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 animate-scan z-10" />

                 {/* Center Focus Reticle */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-60">
                     <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-2 border-white rounded-full opacity-50"></div>
                        <div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full animate-spin"></div>
                        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                     </div>
                 </div>
                 
                 {/* Status HUD */}
                 <div className="absolute top-3 left-0 right-0 flex justify-center space-x-4">
                     <span className="bg-black/40 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">AI ACTIVE</span>
                     <span className="bg-black/40 text-white/70 text-[10px] font-mono px-2 py-0.5 rounded border border-white/10">AUTO-FOCUS</span>
                 </div>
             </div>

             {/* Right Mask */}
             <div className="w-4 sm:w-8 bg-black/40 backdrop-blur-[2px]" />
        </div>

        {/* Bottom Mask/Control Area */}
        <div className="h-[200px] bg-black/60 backdrop-blur-md" />
      </div>

      {/* Top Bar (Navigation) */}
      <div className="absolute top-0 left-0 w-full z-30 p-4 flex justify-between items-start">
        <button 
          onClick={handleBack}
          className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white active:bg-black/60 border border-white/10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col items-end">
             <div className="flex items-center space-x-2 bg-emerald-500 px-3 py-1 rounded-full shadow-lg border border-emerald-400/50">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{t.step3}</span>
            </div>
        </div>
      </div>

      {/* Instruction Overlay */}
      <div className="absolute top-28 left-0 right-0 z-20 flex justify-center pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 flex items-center space-x-2 shadow-lg">
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-white font-medium text-sm tracking-wide shadow-black drop-shadow-md">{t.takePhoto}</span>
          </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 w-full z-30 h-[200px] flex items-center justify-center pb-8">
        <input
          type="file"
          accept="image/*,video/*"
          capture="environment"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
        />

        {/* Shutter Button */}
        <button
          onClick={handleClick}
          className="relative group cursor-pointer"
        >
          {/* Outer Ring */}
          <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center bg-transparent group-active:scale-95 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
             {/* Inner Ring */}
             <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                 {/* Core */}
                 <div className="w-16 h-16 rounded-full bg-white group-active:bg-emerald-500 transition-colors duration-200" />
             </div>
          </div>
          
          <Camera className="absolute inset-0 w-8 h-8 text-stone-400 m-auto opacity-0 group-active:opacity-100 z-10 text-white" />
        </button>
        
        <div className="absolute bottom-12 text-white/50 text-[10px] font-mono tracking-[0.3em] uppercase animate-pulse">
          {t.tapToScan}
        </div>
      </div>
    </div>
  );
};
