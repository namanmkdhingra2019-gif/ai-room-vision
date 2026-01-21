import { useState, useCallback } from 'react';
import { useViewInRoom } from '@/hooks/useViewInRoom';
import { RoomImageUploader } from '@/components/RoomImageUploader';
import { RugSelector } from '@/components/RugSelector';
import { AIProcessingIndicator } from '@/components/AIProcessingIndicator';
import { ViewInRoomResultDisplay } from '@/components/ViewInRoomResultDisplay';
import { sampleRugs } from '@/data/sampleRugs';
import { Rug } from '@/types/rug';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, ArrowRight, Home } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function ViewInRoom() {
  const [roomImage, setRoomImage] = useState<{ file: File | null; preview: string | null }>({
    file: null,
    preview: null
  });
  const [selectedRug, setSelectedRug] = useState<Rug | null>(null);

  const { stage, result, progress, processViewInRoom, reset, isProcessing } = useViewInRoom({
    onSuccess: () => {
      toast.success('AI visualization complete!', {
        description: 'Your room preview has been generated using AI floor detection.'
      });
    },
    onError: (error) => {
      toast.error('Processing failed', {
        description: error
      });
    }
  });

  const handleImageSelect = useCallback((file: File | null, preview: string | null) => {
    setRoomImage({ file, preview });
    if (!file) {
      reset();
    }
  }, [reset]);

  const handleRugSelect = useCallback((rug: Rug) => {
    setSelectedRug(rug);
  }, []);

  const handleVisualize = useCallback(async () => {
    if (!roomImage.preview || !selectedRug) {
      toast.error('Please select both a room photo and a rug');
      return;
    }

    try {
      await processViewInRoom(roomImage.preview, selectedRug);
    } catch (err) {
      // Error already handled by hook
    }
  }, [roomImage.preview, selectedRug, processViewInRoom]);

  const handleReset = useCallback(() => {
    setRoomImage({ file: null, preview: null });
    setSelectedRug(null);
    reset();
  }, [reset]);

  const canVisualize = roomImage.preview && selectedRug && !isProcessing;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-5 w-5 text-muted-foreground" />
            <span className="font-display text-xl font-semibold text-foreground">
              Luxe<span className="text-gold">Rugs</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-2 text-sm">
            <Brain className="h-4 w-4 text-gold" />
            <span className="text-muted-foreground">AI-Powered Visualization</span>
          </div>
        </div>
      </header>

      <main className="container py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold mb-4">
            <Sparkles className="h-4 w-4" />
            AI Floor Detection Technology
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            View in Your Room
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of your room and our AI will analyze the floor perspective, 
            place the rug with realistic shadows, and generate a photorealistic preview.
          </p>
        </div>

        {/* Result Display */}
        {result?.success && result.compositeImageUrl && roomImage.preview && selectedRug && (
          <ViewInRoomResultDisplay
            result={result}
            originalRoomImage={roomImage.preview}
            selectedRug={selectedRug}
            onReset={handleReset}
            className="mb-12"
          />
        )}

        {/* Main Content - Only show if no result yet */}
        {(!result?.success || !result.compositeImageUrl) && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Room Upload */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-primary-foreground font-semibold text-sm">
                  1
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Upload Your Room Photo
                </h2>
              </div>

              <RoomImageUploader
                onImageSelect={handleImageSelect}
                currentImage={roomImage.preview}
                disabled={isProcessing}
              />

              {roomImage.preview && (
                <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-gold" />
                    AI will analyze floor boundaries and perspective automatically
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Rug Selection */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-primary-foreground font-semibold text-sm">
                  2
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Choose a Rug
                </h2>
              </div>

              <RugSelector
                rugs={sampleRugs}
                selectedRug={selectedRug}
                onSelect={handleRugSelect}
                disabled={isProcessing}
              />
            </div>
          </div>
        )}

        {/* Processing Indicator */}
        {(isProcessing || stage === 'error') && (
          <div className="mt-8">
            <AIProcessingIndicator stage={stage} progress={progress} />
          </div>
        )}

        {/* Visualize Button */}
        {(!result?.success || !result.compositeImageUrl) && (
          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              onClick={handleVisualize}
              disabled={!canVisualize}
              className="gap-2 bg-gradient-to-r from-burgundy to-burgundy-dark hover:from-burgundy-dark hover:to-burgundy text-primary-foreground px-8 py-6 text-lg shadow-luxury"
            >
              {isProcessing ? (
                <>
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  Visualize with AI
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20 grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: Brain,
              title: 'AI Floor Detection',
              description: 'Neural network analyzes your room to identify floor boundaries and materials'
            },
            {
              icon: Sparkles,
              title: 'Perspective Matching',
              description: 'Automatic perspective transformation ensures the rug fits naturally'
            },
            {
              icon: ArrowRight,
              title: 'Realistic Shadows',
              description: 'AI-generated contact shadows based on room lighting analysis'
            }
          ].map((feature, index) => (
            <div key={index} className="luxury-card p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 mb-4">
                <feature.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
