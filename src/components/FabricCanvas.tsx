import { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, FabricImage, FabricObject } from 'fabric';
import { Button } from '@/components/ui/button';
import { RotateCcw, Move, Download, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FabricCanvasProps {
  backgroundImageUrl: string;
  rugImageUrl: string;
  initialPlacement?: {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotationDeg: number;
  };
  className?: string;
}

export function FabricCanvas({
  backgroundImageUrl,
  rugImageUrl,
  initialPlacement,
  className,
}: FabricCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const rugObjectRef = useRef<FabricImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Initialize canvas and load images
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const initCanvas = async () => {
      setIsLoading(true);

      // Clean up existing canvas
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }

      // Calculate container dimensions
      const containerWidth = containerRef.current?.offsetWidth || 800;
      
      // Create canvas
      const canvas = new Canvas(canvasRef.current!, {
        width: containerWidth,
        height: containerWidth * 0.75,
        backgroundColor: '#f5f5f5',
        selection: true,
        preserveObjectStacking: true,
      });

      fabricCanvasRef.current = canvas;

      try {
        // Load background image
        const bgImage = await FabricImage.fromURL(backgroundImageUrl, {
          crossOrigin: 'anonymous',
        });

        // Calculate scale to fit container
        const bgScale = Math.min(
          containerWidth / bgImage.width!,
          (containerWidth * 0.75) / bgImage.height!
        );

        const newWidth = bgImage.width! * bgScale;
        const newHeight = bgImage.height! * bgScale;

        // Resize canvas to match image
        canvas.setDimensions({ width: newWidth, height: newHeight });
        setCanvasSize({ width: newWidth, height: newHeight });

        // Set as background
        bgImage.set({
          scaleX: bgScale,
          scaleY: bgScale,
          originX: 'left',
          originY: 'top',
          selectable: false,
          evented: false,
          lockMovementX: true,
          lockMovementY: true,
        });

        canvas.backgroundImage = bgImage;

        // Load rug image
        const rugImage = await FabricImage.fromURL(rugImageUrl, {
          crossOrigin: 'anonymous',
        });

        // Scale rug appropriately (about 30% of canvas width)
        const rugScale = (newWidth * 0.3) / rugImage.width!;

        // Calculate initial position
        const placement = initialPlacement || {
          x: newWidth / 2,
          y: newHeight * 0.65,
          scaleX: rugScale,
          scaleY: rugScale,
          rotationDeg: 0,
        };

        rugImage.set({
          left: placement.x,
          top: placement.y,
          scaleX: placement.scaleX || rugScale,
          scaleY: placement.scaleY || rugScale,
          angle: placement.rotationDeg || 0,
          originX: 'center',
          originY: 'center',
          selectable: true,
          hasControls: true,
          hasBorders: true,
          lockUniScaling: true, // Proportional scaling
          cornerColor: '#d4af37',
          cornerStrokeColor: '#8b7355',
          cornerSize: 12,
          cornerStyle: 'circle',
          borderColor: '#d4af37',
          borderScaleFactor: 2,
          transparentCorners: false,
          padding: 10,
        });

        rugObjectRef.current = rugImage;
        canvas.add(rugImage);
        canvas.setActiveObject(rugImage);
        canvas.renderAll();

      } catch (error) {
        console.error('Error loading images:', error);
      }

      setIsLoading(false);
    };

    initCanvas();

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [backgroundImageUrl, rugImageUrl, initialPlacement]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !fabricCanvasRef.current) return;
      
      // Debounce resize
      const timeout = setTimeout(() => {
        // Re-initialize on significant resize
        if (containerRef.current) {
          const newWidth = containerRef.current.offsetWidth;
          if (Math.abs(newWidth - canvasSize.width) > 50) {
            // Trigger re-init by updating a dependency
          }
        }
      }, 200);

      return () => clearTimeout(timeout);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canvasSize.width]);

  // Reset rug position
  const handleResetRug = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    const rug = rugObjectRef.current;
    if (!canvas || !rug) return;

    const rugScale = (canvasSize.width * 0.3) / rug.width!;
    
    rug.set({
      left: canvasSize.width / 2,
      top: canvasSize.height * 0.65,
      scaleX: rugScale,
      scaleY: rugScale,
      angle: 0,
    });

    canvas.setActiveObject(rug);
    canvas.renderAll();
  }, [canvasSize]);

  // Center rug on canvas
  const handleCenterRug = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    const rug = rugObjectRef.current;
    if (!canvas || !rug) return;

    rug.set({
      left: canvasSize.width / 2,
      top: canvasSize.height * 0.6,
    });

    canvas.setActiveObject(rug);
    canvas.renderAll();
  }, [canvasSize]);

  // Download canvas as PNG
  const handleDownload = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // Deselect objects for clean export
    canvas.discardActiveObject();
    canvas.renderAll();

    // Export at high resolution (2x)
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'room-with-rug.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reselect rug
    const rug = rugObjectRef.current;
    if (rug) {
      canvas.setActiveObject(rug);
      canvas.renderAll();
    }
  }, []);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl border-2 border-gold/30 ring-4 ring-gold/10 bg-muted"
      >
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent" />
              <p className="text-sm text-muted-foreground">Loading canvas...</p>
            </div>
          </div>
        )}
        
        <canvas 
          ref={canvasRef} 
          className="touch-none"
          style={{ display: 'block', maxWidth: '100%' }}
        />

        {/* Interactive hint overlay */}
        {!isLoading && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center">
            <div className="rounded-full bg-charcoal/70 px-3 py-1.5 backdrop-blur-sm">
              <p className="text-xs text-cream">
                <span className="hidden sm:inline">Click and drag the rug to reposition. Use corners to resize/rotate.</span>
                <span className="sm:hidden">Tap and drag to move. Pinch to resize.</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Control Panel */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          onClick={handleResetRug}
          variant="outline"
          size="sm"
          className="gap-2 border-gold/30 hover:bg-gold/10 hover:border-gold"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Rug
        </Button>

        <Button
          onClick={handleCenterRug}
          variant="outline"
          size="sm"
          className="gap-2 border-gold/30 hover:bg-gold/10 hover:border-gold"
        >
          <Move className="h-4 w-4" />
          Center Rug
        </Button>

        <Button
          onClick={handleDownload}
          variant="secondary"
          size="sm"
          className="gap-2 bg-gold/10 hover:bg-gold/20 text-gold"
        >
          <Download className="h-4 w-4" />
          Download Image
        </Button>
      </div>
    </div>
  );
}
