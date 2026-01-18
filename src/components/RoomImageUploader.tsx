import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoomImageUploaderProps {
  onImageSelect: (file: File | null, preview: string | null) => void;
  currentImage: string | null;
  disabled?: boolean;
  className?: string;
}

export function RoomImageUploader({ 
  onImageSelect, 
  currentImage, 
  disabled,
  className 
}: RoomImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(file, e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [disabled, handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    onImageSelect(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageSelect]);

  return (
    <div className={cn('relative', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {currentImage ? (
        <div className="relative overflow-hidden rounded-xl border border-border">
          <img 
            src={currentImage} 
            alt="Room preview" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="flex-1"
              >
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-12 transition-all cursor-pointer',
            isDragging 
              ? 'border-gold bg-gold/5' 
              : 'border-border hover:border-gold/50 hover:bg-muted/50',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <div className={cn(
            'flex h-16 w-16 items-center justify-center rounded-full transition-colors',
            isDragging ? 'bg-gold/20' : 'bg-muted'
          )}>
            {isDragging ? (
              <Upload className="h-8 w-8 text-gold" />
            ) : (
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          
          <div className="text-center">
            <p className="font-semibold text-foreground">
              {isDragging ? 'Drop your room photo' : 'Upload Your Room Photo'}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Drag & drop or click to browse
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              For best results, use a photo with clear floor visibility
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
