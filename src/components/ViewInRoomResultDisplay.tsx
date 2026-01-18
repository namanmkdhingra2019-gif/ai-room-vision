import { ViewInRoomResult } from '@/types/rug';
import { cn } from '@/lib/utils';
import { Brain, CheckCircle, Download, RefreshCw, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ViewInRoomResultDisplayProps {
  result: ViewInRoomResult;
  originalRoomImage: string;
  onReset: () => void;
  className?: string;
}

export function ViewInRoomResultDisplay({ 
  result, 
  originalRoomImage,
  onReset,
  className 
}: ViewInRoomResultDisplayProps) {
  const handleDownload = () => {
    if (!result.compositeImageUrl) return;
    
    const link = document.createElement('a');
    link.href = result.compositeImageUrl;
    link.download = 'view-in-room.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Result Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI-Generated Preview</h3>
            <p className="text-sm text-muted-foreground">
              Confidence: {Math.round((result.processingDetails?.confidence || 0.9) * 100)}%
            </p>
          </div>
        </div>
        
        <Badge className="gap-1 bg-gold/10 text-gold border-gold/20">
          <Brain className="h-3 w-3" />
          AI Powered
        </Badge>
      </div>

      {/* Comparison View */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Original Room */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Original Room</p>
          <div className="relative overflow-hidden rounded-xl border border-border">
            <img 
              src={originalRoomImage} 
              alt="Original room" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* AI Result */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">With Rug (AI Generated)</p>
          <div className="relative overflow-hidden rounded-xl border-2 border-gold/30 ring-4 ring-gold/10">
            {result.compositeImageUrl ? (
              <img 
                src={result.compositeImageUrl} 
                alt="AI generated room with rug" 
                className="w-full h-auto"
              />
            ) : (
              <div className="flex h-64 items-center justify-center bg-muted">
                <p className="text-muted-foreground">Image not available</p>
              </div>
            )}
            
            {/* AI Badge overlay */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-charcoal/80 text-cream border-0 backdrop-blur-sm">
                <Brain className="h-3 w-3 mr-1" />
                AI Floor Detection
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Details */}
      {result.processingDetails && (
        <div className="rounded-xl bg-muted/50 p-4">
          <h4 className="font-medium text-sm text-foreground mb-3">AI Processing Details</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Floor Detected</p>
              <p className="font-medium text-foreground">
                {result.processingDetails.floorDetected ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Perspective</p>
              <p className="font-medium text-foreground">
                {result.processingDetails.perspectiveApplied ? 'Applied' : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Shadows</p>
              <p className="font-medium text-foreground">
                {result.processingDetails.shadowGenerated ? 'Generated' : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Method</p>
              <p className="font-medium text-foreground text-xs">
                AI Semantic
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floor Analysis */}
      {result.floorAnalysis && (
        <div className="rounded-xl bg-muted/50 p-4">
          <h4 className="font-medium text-sm text-foreground mb-3">Floor Analysis</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Material</p>
              <p className="font-medium text-foreground capitalize">
                {result.floorAnalysis.floorMaterial}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Perspective</p>
              <p className="font-medium text-foreground">
                {result.floorAnalysis.perspectiveAngle}°
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Light Direction</p>
              <p className="font-medium text-foreground capitalize">
                {result.floorAnalysis.lightDirection}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Confidence</p>
              <p className="font-medium text-foreground">
                {Math.round(result.floorAnalysis.confidence * 100)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Another Room
        </Button>
        {result.compositeImageUrl && (
          <>
            <Button onClick={handleDownload} variant="secondary" className="gap-2">
              <Download className="h-4 w-4" />
              Download Image
            </Button>
            <Button variant="secondary" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
