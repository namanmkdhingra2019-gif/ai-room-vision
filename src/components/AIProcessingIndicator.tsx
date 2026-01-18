import { cn } from '@/lib/utils';
import { ProcessingStage } from '@/types/rug';
import { Brain, ScanLine, Move, Sun, Layers, CheckCircle, AlertCircle } from 'lucide-react';

interface AIProcessingIndicatorProps {
  stage: ProcessingStage;
  progress: number;
  className?: string;
}

const stageConfig: Record<ProcessingStage, { label: string; icon: typeof Brain; description: string }> = {
  'idle': { label: 'Ready', icon: Brain, description: 'Upload a room photo to begin' },
  'uploading': { label: 'Uploading', icon: Layers, description: 'Preparing images for AI analysis' },
  'analyzing-floor': { label: 'AI Floor Detection', icon: ScanLine, description: 'Neural network analyzing floor boundaries' },
  'detecting-perspective': { label: 'Perspective Analysis', icon: Move, description: 'Computing room geometry and vanishing points' },
  'placing-rug': { label: 'Rug Placement', icon: Layers, description: 'Applying perspective transformation to rug' },
  'generating-shadows': { label: 'Shadow Generation', icon: Sun, description: 'Creating realistic contact shadows' },
  'compositing': { label: 'Final Compositing', icon: Layers, description: 'Blending rug into room environment' },
  'complete': { label: 'Complete', icon: CheckCircle, description: 'AI-generated preview ready' },
  'error': { label: 'Error', icon: AlertCircle, description: 'Something went wrong' }
};

export function AIProcessingIndicator({ stage, progress, className }: AIProcessingIndicatorProps) {
  const config = stageConfig[stage];
  const Icon = config.icon;
  const isProcessing = stage !== 'idle' && stage !== 'complete' && stage !== 'error';

  return (
    <div className={cn(
      'rounded-xl border border-border bg-card p-6 transition-all duration-300',
      isProcessing && 'ring-2 ring-gold/30',
      stage === 'complete' && 'ring-2 ring-green-500/30',
      stage === 'error' && 'ring-2 ring-destructive/30',
      className
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          'relative flex h-14 w-14 items-center justify-center rounded-full',
          isProcessing && 'bg-gold/10',
          stage === 'complete' && 'bg-green-500/10',
          stage === 'error' && 'bg-destructive/10',
          stage === 'idle' && 'bg-muted'
        )}>
          {isProcessing && (
            <div className="absolute inset-0 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          )}
          <Icon className={cn(
            'h-6 w-6',
            isProcessing && 'text-gold',
            stage === 'complete' && 'text-green-600',
            stage === 'error' && 'text-destructive',
            stage === 'idle' && 'text-muted-foreground'
          )} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-foreground">{config.label}</h3>
            {isProcessing && (
              <span className="text-sm font-medium text-gold">{progress}%</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{config.description}</p>
          
          {isProcessing && (
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {isProcessing && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(stageConfig)
            .filter(([key]) => !['idle', 'complete', 'error'].includes(key))
            .map(([key, value], index) => {
              const stageIndex = Object.keys(stageConfig).indexOf(stage);
              const itemIndex = Object.keys(stageConfig).indexOf(key);
              const isComplete = itemIndex < stageIndex;
              const isCurrent = key === stage;
              
              return (
                <div 
                  key={key}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all',
                    isComplete && 'bg-green-500/10 text-green-600',
                    isCurrent && 'bg-gold/10 text-gold',
                    !isComplete && !isCurrent && 'bg-muted text-muted-foreground'
                  )}
                >
                  {isComplete && <CheckCircle className="h-3 w-3" />}
                  {isCurrent && <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />}
                  {value.label}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
