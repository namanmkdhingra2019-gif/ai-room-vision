import { useState, useCallback } from 'react';
import { ViewInRoomResult, ProcessingStage, Rug } from '@/types/rug';
import { supabase } from '@/integrations/supabase/client';

interface UseViewInRoomOptions {
  onSuccess?: (result: ViewInRoomResult) => void;
  onError?: (error: string) => void;
}

export function useViewInRoom(options: UseViewInRoomOptions = {}) {
  const [stage, setStage] = useState<ProcessingStage>('idle');
  const [result, setResult] = useState<ViewInRoomResult | null>(null);
  const [progress, setProgress] = useState(0);

  const fileToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const urlToBase64 = useCallback(async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return fileToBase64(new File([blob], 'image'));
  }, [fileToBase64]);

  const processViewInRoom = useCallback(async (
    roomImage: File | string,
    rug: Rug
  ) => {
    setStage('uploading');
    setProgress(10);
    setResult(null);

    try {
      // Convert images to base64
      let roomImageBase64: string;
      if (typeof roomImage === 'string') {
        if (roomImage.startsWith('data:')) {
          roomImageBase64 = roomImage;
        } else {
          roomImageBase64 = await urlToBase64(roomImage);
        }
      } else {
        roomImageBase64 = await fileToBase64(roomImage);
      }

      setStage('analyzing-floor');
      setProgress(25);

      // For rug image, we need to convert URL to base64
      let rugImageBase64: string;
      if (rug.imageUrl.startsWith('data:')) {
        rugImageBase64 = rug.imageUrl;
      } else if (rug.imageUrl.startsWith('http') || rug.imageUrl.startsWith('/')) {
        // For demo, we'll use a placeholder since we don't have actual rug images yet
        // In production, fetch the actual rug image
        rugImageBase64 = roomImageBase64; // Fallback for demo
      } else {
        rugImageBase64 = rug.imageUrl;
      }

      setStage('detecting-perspective');
      setProgress(40);

      // Simulate stage transitions for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      setStage('placing-rug');
      setProgress(55);

      await new Promise(resolve => setTimeout(resolve, 500));
      setStage('generating-shadows');
      setProgress(70);

      // Call the AI edge function
      const { data, error } = await supabase.functions.invoke('view-in-room', {
        body: {
          roomImageBase64,
          rugImageBase64,
          rugName: rug.name,
          rugDimensions: rug.dimensions
        }
      });

      setStage('compositing');
      setProgress(90);

      if (error) {
        throw new Error(error.message || 'AI processing failed');
      }

      const viewInRoomResult = data as ViewInRoomResult;

      if (!viewInRoomResult.success) {
        throw new Error(viewInRoomResult.error || 'Failed to generate view');
      }

      setProgress(100);
      setStage('complete');
      setResult(viewInRoomResult);
      options.onSuccess?.(viewInRoomResult);

      return viewInRoomResult;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setStage('error');
      setResult({ success: false, error: errorMessage });
      options.onError?.(errorMessage);
      throw err;
    }
  }, [fileToBase64, urlToBase64, options]);

  const reset = useCallback(() => {
    setStage('idle');
    setResult(null);
    setProgress(0);
  }, []);

  return {
    stage,
    result,
    progress,
    processViewInRoom,
    reset,
    isProcessing: stage !== 'idle' && stage !== 'complete' && stage !== 'error'
  };
}
