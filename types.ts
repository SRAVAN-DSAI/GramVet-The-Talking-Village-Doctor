
export enum AppStage {
  LANGUAGE_SELECT,
  ANIMAL_SELECT,
  DETAILS_INPUT,
  CAMERA_INPUT,
  ANALYZING,
  RESULT
}

export interface Language {
  code: string; // ISO code for TTS (e.g., 'hi-IN')
  label: string; // Native language label
  flagUrl: string; // URL to flag image
  welcomeMessage: string; // "Which language do you speak?" in that language
}

export enum AnimalType {
  COW = 'Cow',
  OX = 'Ox',
  BUFFALO = 'Buffalo',
  DOG = 'Dog',
  GOAT = 'Goat',
  SHEEP = 'Sheep'
}

export interface Animal {
  type: AnimalType;
  imageUrl: string; // URL to real animal image
}

export enum RemedyIconType {
  HERBAL = 'HERBAL',     // Mixing bowl/leaves
  WASH = 'WASH',         // Water/Cleaning
  ISOLATE = 'ISOLATE',   // Fence/Separation
  DOCTOR = 'DOCTOR',     // Syringe/Hospital
  FEED = 'FEED'          // Food
}

export interface Remedy {
  iconType: RemedyIconType;
  instruction: string;
}

export interface DiagnosisResponse {
  diagnosis: string;
  severity: 'LOW' | 'HIGH' | 'CRITICAL';
  user_note: string; // Transcribed user input
  remedies: Remedy[];
  spokenResponse: string; // The full text to speak
}

export interface Translations {
  step1: string;
  whoIsSick: string;
  selectPatient: string;
  step2: string; // Now refers to details
  step3: string; // Now refers to camera
  whatIsWrong: string;
  describeSymptoms: string;
  tapToSpeak: string;
  skipAndScan: string;
  nextStep: string;
  takePhoto: string;
  tapToScan: string;
  treatments: string;
  downloadReport: string;
  newScan: string;
  verifiedSource: string;
  callVet: string;
  emergency: string;
  analyzing: string;
  error: string;
  officialDocs: string;
  addNote: string;
  analyzeNow: string;
  retakePhoto: string;
  recordAudio: string;
  stopRecording: string;
  audioRecorded: string;
  deleteAudio: string;
  tapToRecord: string;
  animals: Record<string, string>;
}
