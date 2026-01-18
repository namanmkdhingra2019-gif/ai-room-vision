import { Rug } from '@/types/rug';
import { cn } from '@/lib/utils';
import { Check, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RugSelectorProps {
  rugs: Rug[];
  selectedRug: Rug | null;
  onSelect: (rug: Rug) => void;
  disabled?: boolean;
  className?: string;
}

export function RugSelector({ rugs, selectedRug, onSelect, disabled, className }: RugSelectorProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">Select a Rug</h3>
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="h-3 w-3" />
          {rugs.length} available
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {rugs.map((rug) => (
          <button
            key={rug.id}
            onClick={() => onSelect(rug)}
            disabled={disabled}
            className={cn(
              'group relative overflow-hidden rounded-xl border-2 transition-all text-left',
              selectedRug?.id === rug.id
                ? 'border-gold ring-2 ring-gold/20'
                : 'border-border hover:border-gold/50',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {/* Rug Image */}
            <div className="aspect-square w-full overflow-hidden bg-muted">
              <img 
                src={rug.imageUrl} 
                alt={rug.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>

            {/* Selection indicator */}
            {selectedRug?.id === rug.id && (
              <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-primary-foreground">
                <Check className="h-4 w-4" />
              </div>
            )}

            {/* Sale badge */}
            {rug.originalPrice && (
              <Badge className="absolute top-2 left-2 bg-burgundy text-primary-foreground border-0">
                Sale
              </Badge>
            )}

            {/* Info */}
            <div className="p-3 bg-card">
              <p className="font-medium text-sm text-foreground truncate">{rug.name}</p>
              <p className="text-xs text-muted-foreground">{rug.collection}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-semibold text-sm text-gold">
                  {formatPrice(rug.price)}
                </span>
                {rug.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(rug.originalPrice)}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {rug.dimensions.width}' × {rug.dimensions.height}'
              </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  );
}
