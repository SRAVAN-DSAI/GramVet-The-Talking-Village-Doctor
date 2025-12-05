
import React, { useState, useEffect } from 'react';
import { AppStage, Language, Animal, DiagnosisResponse, Translations } from './types';
import { TRANSLATIONS } from './constants';
import { LanguageSelection } from './components/LanguageSelection';
import { AnimalSelection } from './components/AnimalSelection';
import { DetailsInput } from './components/DetailsInput';
import { CameraInput } from './components/CameraInput';
import { DiagnosisResult } from './components/DiagnosisResult';
import { analyzeImage } from './services/geminiService';
import { speak } from './services/speechService';
import { playSuccess } from './services/soundService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LANGUAGE_SELECT);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [result, setResult] = useState<DiagnosisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  
  // Stored Details from DetailsInput stage
  const [userDetails, setUserDetails] = useState<string>("");
  const [userAudio, setUserAudio] = useState<Blob | undefined>(undefined);

  const handleLangSelect = (lang: Language) => {
    // Speak the language label (e.g., "Hindi") in the language's voice for confirmation
    speak(lang.label, lang.code);
    setSelectedLang(lang);
    setStage(AppStage.ANIMAL_SELECT);
  };

  const handleAnimalSelect = (animal: Animal) => {
    setSelectedAnimal(animal);
    setStage(AppStage.DETAILS_INPUT);
  };

  const handleDetailsSubmit = (details: string, audio?: Blob) => {
    setUserDetails(details);
    setUserAudio(audio);
    setStage(AppStage.CAMERA_INPUT);
  };

  const handleFileSelect = async (file: File, finalDetails?: string, finalAudio?: Blob) => {
    if (!selectedLang || !selectedAnimal) return;
    
    // Create URL for the result screen to display
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    setStage(AppStage.ANALYZING);
    try {
      // Use details/audio passed from CameraInput (which includes pre-filled data from DetailsInput)
      const analysis = await analyzeImage(
        file, 
        selectedAnimal.type, 
        selectedLang.label, 
        finalDetails || userDetails, 
        finalAudio || userAudio
      );
      setResult(analysis);
      playSuccess(); // Sound effect on success
      setStage(AppStage.RESULT);
    } catch (e) {
      console.error(e);
      setError("Error processing image.");
      // Auto reset after 3 seconds on error
      setTimeout(() => {
          setError(null);
          setStage(AppStage.CAMERA_INPUT);
      }, 3000);
    }
  };

  const handleReset = () => {
    setStage(AppStage.LANGUAGE_SELECT); // Full reset to start
    setResult(null);
    setSelectedAnimal(null);
    setSelectedLang(null);
    setUserDetails("");
    setUserAudio(undefined);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(undefined);
  };

  // Cleanup effect
  useEffect(() => {
      return () => {
          if (previewUrl) URL.revokeObjectURL(previewUrl);
      }
  }, []);

  // Get Translations for current language, fallback to English
  const t: Translations = selectedLang ? (TRANSLATIONS[selectedLang.code] || TRANSLATIONS['en-IN']) : TRANSLATIONS['en-IN'];

  // Render Logic
  if (error) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-600 p-8 text-center">
              <div>
                  <div className="text-6xl mb-4">⚠️</div>
                  <h1 className="text-2xl font-bold">{t.error}</h1>
              </div>
          </div>
      )
  }

  switch (stage) {
    case AppStage.LANGUAGE_SELECT:
      return <LanguageSelection onSelect={handleLangSelect} />;
    
    case AppStage.ANIMAL_SELECT:
      return (
        <AnimalSelection 
          onSelect={handleAnimalSelect} 
          onBack={() => setStage(AppStage.LANGUAGE_SELECT)}
          t={t} 
          langCode={selectedLang?.code || 'en-IN'}
        />
      );

    case AppStage.DETAILS_INPUT:
      return (
        <DetailsInput
          onNext={handleDetailsSubmit}
          onBack={() => setStage(AppStage.ANIMAL_SELECT)}
          t={t}
          langCode={selectedLang?.code || 'en-IN'}
        />
      );

    case AppStage.CAMERA_INPUT:
      return (
        <CameraInput 
          onFileSelected={handleFileSelect} 
          onBack={() => setStage(AppStage.DETAILS_INPUT)}
          t={t}
          initialDetails={userDetails}
          initialAudio={userAudio}
        />
      );

    case AppStage.ANALYZING:
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 space-y-6">
          <Loader2 className="w-24 h-24 text-emerald-600 animate-spin" />
          <h2 className="text-xl font-bold text-stone-500 animate-pulse">{t.analyzing}</h2>
          <div className="w-3/4 h-4 bg-gray-200 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-500 animate-pulse w-full"></div>
          </div>
        </div>
      );

    case AppStage.RESULT:
      return result && selectedLang ? (
        <DiagnosisResult 
          result={result} 
          language={selectedLang} 
          onReset={handleReset} 
          t={t}
          previewUrl={previewUrl}
        />
      ) : null;

    default:
      return null;
  }
};

export default App;
