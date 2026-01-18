export interface Rug {
  id: string;
  name: string;
  collection: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  dimensions: {
    width: number;
    height: number;
    unit: 'ft' | 'cm' | 'm';
  };
  material: string;
  style: string;
  colors: string[];
  description?: string;
}

export interface FloorAnalysis {
  floorDetected: boolean;
  floorRegion: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  perspectiveAngle: number;
  vanishingPointY: number;
  recommendedRugPlacement: {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotationDeg: number;
  };
  floorMaterial: string;
  lightDirection: string;
  shadowIntensity: number;
  confidence: number;
}

export interface ViewInRoomResult {
  success: boolean;
  compositeImageUrl?: string;
  floorAnalysis?: FloorAnalysis;
  aiMessage?: string;
  processingDetails?: {
    floorDetected: boolean;
    confidence: number;
    perspectiveApplied: boolean;
    shadowGenerated: boolean;
    method: string;
  };
  error?: string;
}

export type ProcessingStage = 
  | 'idle'
  | 'uploading'
  | 'analyzing-floor'
  | 'detecting-perspective'
  | 'placing-rug'
  | 'generating-shadows'
  | 'compositing'
  | 'complete'
  | 'error';
