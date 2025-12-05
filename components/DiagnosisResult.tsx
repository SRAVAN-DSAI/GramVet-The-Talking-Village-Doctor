
import React, { useEffect, useState, useRef } from 'react';
import { DiagnosisResponse, RemedyIconType, Language, Translations } from '../types';
import { speak, stopSpeaking } from '../services/speechService';
import { playClick } from '../services/soundService';
import { GOVT_LINKS } from '../constants';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { 
  Leaf, 
  Droplets, 
  ShieldAlert, 
  Syringe, 
  Wheat, 
  Volume2, 
  RotateCcw,
  Phone,
  Ban,
  Download,
  BadgeCheck,
  FileText,
  ExternalLink,
  PauseCircle,
  Stethoscope,
  MessageCircle
} from 'lucide-react';

interface Props {
  result: DiagnosisResponse;
  language: Language;
  onReset: () => void;
  t: Translations;
  previewUrl?: string; // To show the user what they scanned
}

// Map enum types to specific Icons
const RemedyIcon: React.FC<{ type: RemedyIconType }> = ({ type }) => {
  switch (type) {
    case RemedyIconType.HERBAL: 
      return <Leaf className="w-10 h-10 text-white" />;
    case RemedyIconType.WASH: 
      return <Droplets className="w-10 h-10 text-white" />;
    case RemedyIconType.ISOLATE: 
      return <Ban className="w-10 h-10 text-white" />;
    case RemedyIconType.DOCTOR: 
      return <Syringe className="w-10 h-10 text-white" />;
    case RemedyIconType.FEED: 
      return <Wheat className="w-10 h-10 text-white" />;
    default: 
      return <Leaf className="w-10 h-10 text-white" />;
  }
};

// Map enum types to specific Background Styles
const RemedyStyles: Record<RemedyIconType, string> = {
  [RemedyIconType.HERBAL]: 'bg-emerald-500 shadow-emerald-200',
  [RemedyIconType.WASH]: 'bg-blue-500 shadow-blue-200',
  [RemedyIconType.ISOLATE]: 'bg-orange-500 shadow-orange-200',
  [RemedyIconType.DOCTOR]: 'bg-red-500 shadow-red-200',
  [RemedyIconType.FEED]: 'bg-yellow-500 shadow-yellow-200'
};

export const DiagnosisResult: React.FC<Props> = ({ result, language, onReset, t, previewUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Auto-play the full report on mount
  useEffect(() => {
    let isMounted = true;

    const playReport = () => {
        if (!isMounted) return;
        
        // Ensure strictly fresh start
        stopSpeaking();

        // Speak the full report
        speak(result.spokenResponse, language.code, {
            onStart: () => {
                if (isMounted) setIsPlaying(true);
            },
            onEnd: () => {
                if (isMounted) setIsPlaying(false);
            },
            onError: (e) => {
                // Ignore interruption errors
                if (e.error !== 'interrupted' && e.error !== 'canceled') {
                     console.error("Auto-play error", e);
                }
                if (isMounted) setIsPlaying(false);
            }
        });
    };

    // 1-second delay is optimal to allow screen transition to finish 
    // and browser audio context to be ready (unlocked by previous click)
    const timer = setTimeout(playReport, 1000);

    return () => {
        isMounted = false;
        clearTimeout(timer);
        stopSpeaking();
    };
  }, [result, language]);

  const isCritical = result.severity === 'CRITICAL' || result.severity === 'HIGH';

  const handleReplay = () => {
      playClick();
      // Explicit user action to replay
      speak(result.spokenResponse, language.code, {
          onStart: () => setIsPlaying(true),
          onEnd: () => setIsPlaying(false),
          onError: () => setIsPlaying(false)
      });
  };

  const handleStop = () => {
      playClick();
      stopSpeaking();
      setIsPlaying(false);
  }

  const handleReset = () => {
      playClick();
      onReset();
  };

  const handleRemedyClick = (instruction: string) => {
    playClick();
    speak(instruction, language.code);
  };

  const handleDownloadPDF = async () => {
    playClick();
    if (!reportRef.current) return;
    
    setIsGeneratingPdf(true);

    try {
        // Use html2canvas to capture the hidden report div
        // This preserves the Indian language scripts which standard PDF fonts don't support
        const canvas = await html2canvas(reportRef.current, {
            scale: 2, // Higher resolution
            useCORS: true, // For images
            backgroundColor: "#ffffff"
        });

        const imgData = canvas.toDataURL('image/png');
        
        // A4 Dimensions in mm
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Calculate image aspect ratio to fit PDF
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
        pdf.save(`GramVet_Report_${Date.now()}.pdf`);
    } catch (error) {
        console.error("PDF Generation failed", error);
        alert("Could not generate PDF.");
    } finally {
        setIsGeneratingPdf(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-stone-50 relative animate-fade-in-up`}>
      
      {/* --- HIDDEN REPORT TEMPLATE (Rendered off-screen for PDF capture) --- */}
      <div className="absolute left-[-9999px] top-0 w-[800px] bg-white text-black p-12" ref={reportRef}>
         {/* Report Header */}
         <div className="flex justify-between items-start border-b-2 border-emerald-600 pb-6 mb-6">
             <div className="flex items-center space-x-4">
                 <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-10 h-10 text-white" />
                 </div>
                 <div>
                     <h1 className="text-4xl font-bold text-emerald-900">GramVet</h1>
                     <p className="text-emerald-700 text-lg">Official Veterinary Digital Health Record</p>
                 </div>
             </div>
             <div className="text-right">
                 <p className="text-gray-500 text-sm">Date: {new Date().toLocaleDateString()}</p>
                 <p className="text-gray-500 text-sm">Time: {new Date().toLocaleTimeString()}</p>
                 <div className="mt-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold inline-block border border-emerald-200">
                    Verified Protocol: NDDB / IVRI
                 </div>
             </div>
         </div>

         {/* Patient Info & User Note */}
         <div className="flex space-x-8 mb-8">
             <div className="w-1/3">
                 {previewUrl && (
                     <div className="border border-gray-200 p-1 rounded-xl">
                        <img src={previewUrl} alt="Patient" className="w-full h-48 object-cover rounded-lg" />
                     </div>
                 )}
             </div>
             <div className="w-2/3 space-y-6">
                 <div>
                     <span className="text-gray-500 text-sm uppercase font-bold tracking-widest">Diagnosis</span>
                     <h2 className="text-3xl font-bold text-gray-900">{result.diagnosis}</h2>
                 </div>
                 <div>
                     <span className="text-gray-500 text-sm uppercase font-bold tracking-widest">Severity</span>
                     <div className={`inline-block ml-4 px-4 py-1 rounded-full text-sm font-bold text-white ${isCritical ? 'bg-red-600' : 'bg-green-600'}`}>
                         {result.severity}
                     </div>
                 </div>
                 
                 {/* Transcribed User Note */}
                 {result.user_note && (
                     <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                         <span className="text-gray-500 text-xs uppercase font-bold tracking-widest block mb-1">Farmer Reported Symptoms</span>
                         <p className="text-gray-700 italic">"{result.user_note}"</p>
                     </div>
                 )}
             </div>
         </div>

         {/* Treatments */}
         <div className="mb-8">
             <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">{t.treatments}</h3>
             <ul className="space-y-4">
                 {result.remedies.map((r, i) => (
                     <li key={i} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                         <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                             {i + 1}
                         </div>
                         <div>
                             <span className="text-xs font-bold text-emerald-600 uppercase mb-1 block">{r.iconType}</span>
                             <p className="text-lg text-gray-800">{r.instruction}</p>
                         </div>
                     </li>
                 ))}
             </ul>
         </div>

         {/* Disclaimer & Footer */}
         <div className="mt-12 pt-6 border-t-2 border-gray-100 text-center">
             <h4 className="text-sm font-bold text-gray-600 uppercase mb-4">Official Government References</h4>
             <div className="flex justify-center space-x-6 text-blue-600 text-sm mb-6">
                 {GOVT_LINKS.map((l, i) => (
                     <span key={i}>{l.title} ({l.url})</span>
                 ))}
             </div>
             <p className="text-xs text-gray-400 italic">
                 Generated by GramVet AI. Remedies based on Ethno-veterinary Medicine (EVM) standards by NDDB. 
                 This is an assistive tool. In critical emergencies, please contact the nearest veterinary officer.
             </p>
         </div>
      </div>
      {/* --- END HIDDEN REPORT --- */}


      {/* Header Severity Banner */}
      <div className={`pt-12 pb-24 px-6 rounded-b-[40px] shadow-xl relative overflow-hidden transition-colors duration-500 ${isCritical ? 'bg-red-600' : 'bg-emerald-600'}`}>
         {/* Background Circles */}
         <div className="absolute top-[-20%] right-[-20%] w-64 h-64 rounded-full bg-white/10 blur-3xl" />
         <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 rounded-full bg-white/10 blur-2xl" />
         
         <div className="relative z-10 flex flex-col items-center text-center">
            {/* Uploaded Image Thumbnail */}
            {previewUrl && (
                <div className="absolute top-0 right-0 m-4 w-16 h-16 rounded-xl overflow-hidden border-2 border-white/50 shadow-md">
                    <img src={previewUrl} alt="Analyzed" className="w-full h-full object-cover" />
                </div>
            )}

            {isCritical ? (
                <ShieldAlert className="w-20 h-20 text-white mb-4 animate-pulse" />
            ) : (
                <Leaf className="w-20 h-20 text-white mb-4" />
            )}
            
            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">{result.diagnosis}</h2>
            
            {/* Playing Indicator */}
            {isPlaying && (
                <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full mb-2 backdrop-blur-sm animate-fade-in-up">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    <span className="text-xs font-bold text-white">Speaking Report...</span>
                </div>
            )}

            {/* Audio Replay Button (Hero) */}
            <div className="mt-4 flex space-x-4">
                {!isPlaying ? (
                    <button 
                      onClick={handleReplay}
                      className="bg-white/20 backdrop-blur-md border border-white/40 p-4 rounded-full active:bg-white/40 transition-all shadow-lg group"
                    >
                      <Volume2 className="w-8 h-8 text-white group-active:scale-110 transition-transform" />
                    </button>
                ) : (
                    <button 
                      onClick={handleStop}
                      className="bg-red-500/80 backdrop-blur-md border border-red-400 p-4 rounded-full active:bg-red-600 transition-all shadow-lg"
                    >
                      <PauseCircle className="w-8 h-8 text-white" />
                    </button>
                )}
            </div>
         </div>
      </div>

      {/* Floating Action Card if Critical */}
      {isCritical && (
          <div className="mx-6 -mt-10 mb-4 z-20">
              <a href="tel:1962" onClick={playClick} className="flex items-center justify-center space-x-4 bg-white p-4 rounded-2xl shadow-xl border-l-8 border-red-500 active:scale-95 transition-transform">
                  <div className="p-3 bg-red-100 rounded-full">
                      <Phone className="w-8 h-8 text-red-600 animate-bounce" />
                  </div>
                  <div className="flex flex-col">
                      <span className="font-bold text-stone-800 text-lg">{t.callVet}</span>
                      <span className="text-stone-500 text-sm">{t.emergency}</span>
                  </div>
              </a>
          </div>
      )}

      {/* Source Verification Badge */}
      <div className="px-6 mt-4 flex items-center justify-center opacity-80">
        <div className="flex items-center space-x-2 bg-stone-200/50 px-3 py-1 rounded-full border border-stone-200">
           <BadgeCheck className="w-4 h-4 text-emerald-600" />
           <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">{t.verifiedSource}</span>
        </div>
      </div>

      {/* Remedies List */}
      <div className="flex-1 px-6 pt-4 pb-12 space-y-5">
        <div className="flex items-center justify-between">
            <h3 className="text-stone-500 text-sm uppercase tracking-widest font-bold ml-2">{t.treatments}</h3>
            <button 
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="flex items-center space-x-2 bg-emerald-100 px-3 py-1.5 rounded-lg active:scale-95 transition-transform disabled:opacity-50"
            >
                {isGeneratingPdf ? (
                    <span className="text-xs font-bold text-emerald-700 animate-pulse">Generating...</span>
                ) : (
                    <>
                        <Download className="w-4 h-4 text-emerald-700" />
                        <span className="text-xs font-bold text-emerald-700">PDF Report</span>
                    </>
                )}
            </button>
        </div>

        {result.remedies.map((remedy, idx) => {
            // Safe fallback if the model returns an unknown type
            const styleClass = RemedyStyles[remedy.iconType] || 'bg-gray-400 shadow-gray-200';
            
            return (
              <button 
                key={idx} 
                onClick={() => handleRemedyClick(remedy.instruction)}
                className="w-full text-left bg-white rounded-3xl p-4 shadow-lg flex items-center space-x-5 animate-slide-up-fade border border-stone-50 hover:scale-[1.02] active:scale-95 active:ring-2 active:ring-emerald-500 transition-all duration-300"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Visual Icon */}
                <div className={`p-4 rounded-2xl shadow-inner ${styleClass} flex-shrink-0 relative`}>
                  <RemedyIcon type={remedy.iconType} />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                      <Volume2 className="w-3 h-3 text-stone-400" />
                  </div>
                </div>
                
                {/* Instruction Text */}
                <div className="flex-1">
                    <p className="text-lg font-medium text-stone-800 leading-snug">
                        {remedy.instruction}
                    </p>
                </div>
              </button>
            );
        })}

        {/* Government Resources Section */}
        <div className="mt-8 pt-6 border-t border-stone-200">
          <div className="flex items-center space-x-2 mb-4">
             <FileText className="w-5 h-5 text-stone-400" />
             <h3 className="text-stone-500 text-sm uppercase tracking-widest font-bold">{t.officialDocs}</h3>
          </div>
          
          <div className="space-y-3">
            {GOVT_LINKS.map((link, i) => (
              <a 
                key={i} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer"
                onClick={playClick}
                className="flex items-center justify-between bg-stone-100 p-4 rounded-xl active:bg-stone-200 transition-colors"
              >
                 <span className="font-medium text-stone-700 text-sm">{link.title}</span>
                 <ExternalLink className="w-4 h-4 text-stone-400" />
              </a>
            ))}
          </div>
        </div>

        {/* Padding for sticky bottom button */}
        <div className="h-24"></div>
      </div>

      {/* Bottom Sticky Actions */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-stone-50 via-stone-50 to-transparent z-30 flex space-x-4">
        <button 
          onClick={handleReset}
          className="flex-1 bg-stone-900 text-white rounded-2xl py-5 flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
        >
          <RotateCcw className="w-6 h-6 mr-2" />
          <span className="font-bold text-lg">{t.newScan}</span>
        </button>
      </div>
    </div>
  );
};
