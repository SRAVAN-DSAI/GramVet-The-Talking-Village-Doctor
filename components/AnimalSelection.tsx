
import React, { useEffect, useState } from 'react';
import { ANIMALS, SAMPLE_SYMPTOMS } from '../constants';
import { Animal, Translations, AnimalType } from '../types';
import { playClick } from '../services/soundService';
import { speak } from '../services/speechService';
import { ArrowLeft, CheckCircle2, PawPrint, Stethoscope, AlertTriangle, Info } from 'lucide-react';

interface Props {
  onSelect: (animal: Animal) => void;
  onBack: () => void;
  t: Translations;
  langCode: string;
}

export const AnimalSelection: React.FC<Props> = ({ onSelect, onBack, t, langCode }) => {
  const [selectedType, setSelectedType] = useState<AnimalType | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelect = (animal: Animal) => {
      setSelectedType(animal.type);
      
      // Instruct the user to take a photo of the selected animal
      const animalName = t.animals[animal.type];
      speak(`${animalName}. ${t.takePhoto}`, langCode);
      
      // Delay navigation to show the visual feedback and let instruction start
      setTimeout(() => {
          onSelect(animal);
      }, 1000);
  };

  const handleSymptomClick = (label: string) => {
      playClick();
      // Speak the symptom name for reference
      speak(label, langCode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 pt-12 pb-4 shadow-sm rounded-b-[30px] flex flex-col space-y-4">
        <div className="flex items-center justify-between">
            <button 
              onClick={() => { playClick(); onBack(); }}
              className="p-3 bg-stone-100 rounded-full active:bg-stone-200 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-stone-700" />
            </button>
            
            {/* Step Indicator */}
            <div className="flex items-center space-x-2 bg-emerald-100 px-4 py-1.5 rounded-full">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">{t.step1}</span>
            </div>
            
            <div className="w-12" /> {/* Spacer */}
        </div>
        
        <div className="flex items-center space-x-3 px-2">
            <div className="p-3 bg-emerald-100 rounded-full">
                <Stethoscope className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-stone-800 leading-none">{t.whoIsSick}</h2>
                <p className="text-stone-500 text-sm mt-1">{t.selectPatient}</p>
            </div>
        </div>
      </div>

      {/* Animal Grid */}
      <div className="p-4 grid grid-cols-2 gap-4 mt-2">
        {ANIMALS.map((animal, index) => (
          <AnimalCard 
            key={animal.type} 
            animal={animal} 
            name={t.animals[animal.type] || animal.type}
            index={index} 
            isSelected={selectedType === animal.type}
            isAnySelected={selectedType !== null}
            onSelect={handleSelect} 
          />
        ))}
      </div>

      {/* Sample Symptoms Gallery (Reference) */}
      <div className="mt-4 pb-24">
          <div className="px-6 mb-3 flex items-center justify-between opacity-80">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Common Symptoms</span>
              </div>
              <Info className="w-4 h-4 text-stone-300" />
          </div>
          
          <div className="flex overflow-x-auto space-x-4 px-6 pb-6 no-scrollbar snap-x">
              {SAMPLE_SYMPTOMS.map((symptom, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSymptomClick(symptom.label)}
                    className="flex-shrink-0 w-32 flex flex-col items-center group snap-start active:scale-95 transition-transform"
                  >
                      <div className="relative w-32 h-24 rounded-xl overflow-hidden shadow-sm border border-stone-200 bg-stone-100 group-active:ring-2 group-active:ring-emerald-500">
                          <img src={symptom.url} alt="Symptom" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/5 group-active:bg-black/0 transition-colors" />
                      </div>
                      <span className="text-[10px] text-stone-500 mt-2 font-medium bg-white px-2 py-0.5 rounded-full shadow-sm border border-stone-100">
                          {symptom.label}
                      </span>
                  </button>
              ))}
          </div>
      </div>
    </div>
  );
};

const AnimalCard: React.FC<{ 
    animal: Animal, 
    name: string, 
    index: number, 
    isSelected: boolean,
    isAnySelected: boolean,
    onSelect: (a: Animal) => void 
}> = ({ animal, name, index, isSelected, isAnySelected, onSelect }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <button
            onClick={() => !isAnySelected && onSelect(animal)}
            disabled={isAnySelected}
            style={{ animationDelay: `${index * 50}ms` }}
            className={`
                group relative aspect-[3/4] rounded-3xl overflow-hidden animate-fade-in-up transition-all duration-300
                ${isSelected 
                    ? 'ring-4 ring-emerald-500 scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)] z-10' 
                    : 'bg-stone-200 shadow-md active:scale-95'
                }
                ${isAnySelected && !isSelected ? 'opacity-50 blur-[1px] scale-95' : 'opacity-100'}
            `}
          >
            {!imgError ? (
                <img 
                  src={animal.imageUrl} 
                  alt={name} 
                  onError={() => setImgError(true)}
                  className={`
                      absolute inset-0 w-full h-full object-cover transition-transform duration-700
                      ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
                  `}
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-300">
                    <PawPrint className="w-12 h-12 text-stone-500 opacity-50" />
                </div>
            )}
            
            <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${isSelected ? 'from-emerald-900/80 via-transparent to-transparent' : 'from-black/70 via-black/10 to-transparent'}`} />
            
            {/* Selection Checkmark */}
            <div className={`
                absolute top-3 right-3 bg-emerald-500 rounded-full p-1.5 shadow-lg transition-all duration-300 transform
                ${isSelected ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-[-45deg]'}
            `}>
                <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            
             {/* Name Label */}
             <div className="absolute bottom-4 left-0 right-0 text-center z-10 px-2 flex justify-center">
                 <span className={`
                     font-bold text-lg tracking-wider uppercase transition-all duration-300 px-4 py-1 rounded-full
                     ${isSelected 
                        ? 'bg-emerald-600 text-white shadow-lg scale-110' 
                        : 'text-white drop-shadow-md'
                     }
                 `}>
                     {name}
                 </span>
            </div>
          </button>
    )
}
