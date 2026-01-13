import { useState, useCallback } from "react";
import { Upload, X, Image, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentScreenshotUploadProps {
  onUpload: (file: File) => void;
  onSkip: () => void;
}

const PaymentScreenshotUpload = ({ onUpload, onSkip }: PaymentScreenshotUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setUploadedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = () => {
    if (uploadedFile) {
      onUpload(uploadedFile);
    }
  };

  return (
    <div className="space-y-4 p-5">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Upload Payment Screenshot</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Upload a screenshot of your payment confirmation for verification
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!uploadedFile ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
              ${dragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-secondary/30"
              }
            `}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="flex flex-col items-center gap-3">
              <div className={`
                p-4 rounded-full transition-colors
                ${dragActive ? "bg-primary/10" : "bg-secondary"}
              `}>
                <Upload className={`h-8 w-8 ${dragActive ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div>
                <p className="font-medium text-card-foreground">
                  {dragActive ? "Drop your image here" : "Drag & drop or click to upload"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG or JPEG (max 10MB)
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative bg-secondary/30 rounded-xl p-4"
          >
            <button
              onClick={removeFile}
              className="absolute top-2 right-2 p-1.5 bg-destructive/10 hover:bg-destructive/20 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-destructive" />
            </button>
            
            <div className="flex items-center gap-4">
              {previewUrl ? (
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img 
                    src={previewUrl} 
                    alt="Payment screenshot" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-card-foreground truncate">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <div className="flex items-center gap-1 text-accent mt-1">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">Ready to submit</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={onSkip}
        >
          Skip
        </Button>
        <Button
          variant="action"
          size="lg"
          className="flex-1"
          onClick={handleSubmit}
          disabled={!uploadedFile}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PaymentScreenshotUpload;
