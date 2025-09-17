
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AnalysisStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

type AnalysisResult = {
  planetDetected: boolean;
  confidence: number;
  transitDepth: string;
  period: string;
};

type AnalysisSectionProps = {
  onAnalysisComplete: (result: AnalysisResult, fileName: string) => void;
  onAnalysisStart: () => void;
  onAnalysisReset: () => void;
};

const AnalysisSection = ({ onAnalysisComplete, onAnalysisStart, onAnalysisReset }: AnalysisSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [fileName, setFileName] = useState<string>('');
  const { toast } = useToast();

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

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setStatus('uploading');
    onAnalysisStart();
    
    toast({
      title: "File uploaded",
      description: `Analyzing ${file.name}...`,
    });

    // Simulate file processing
    setTimeout(() => {
      setStatus('processing');
    }, 1000);

    setTimeout(() => {
      // Simulate analysis result
      const mockResult = {
        planetDetected: Math.random() > 0.5,
        confidence: Math.round(Math.random() * 100),
        transitDepth: (Math.random() * 2).toFixed(3),
        period: (Math.random() * 50 + 1).toFixed(2),
      };
      
      setStatus('complete');
      onAnalysisComplete(mockResult, file.name);
      
      toast({
        title: mockResult.planetDetected ? "🪐 Planet candidate detected!" : "🌟 No planet detected",
        description: `Confidence level: ${mockResult.confidence}%`,
      });
    }, 4000);
  };

  const handleReset = () => {
    setStatus('idle');
    setFileName('');
    onAnalysisReset();
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />;
      case 'complete':
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-8 h-8 text-red-400" />;
      default:
        return <Upload className="w-8 h-8 text-accent" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Analyzing data...';
      case 'complete':
        return 'Analysis completed successfully';
      case 'error':
        return 'Analysis error occurred';
      default:
        return 'Upload light curve file';
    }
  };

  return (
    <section id="analysis" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">
            Light Curve Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload telescope data and let us discover exoplanets for you
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="card-cosmic">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-accent">Upload Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`upload-zone ${dragActive ? 'upload-zone-active' : ''} 
                  rounded-lg p-8 text-center cursor-pointer transition-all duration-300 min-h-[300px] flex flex-col justify-center`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept=".csv,.txt,.dat"
                  onChange={handleFileInput}
                  className="hidden"
                />
                
                <div className="mb-6">
                  {getStatusIcon()}
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{getStatusText()}</h3>
                
                {status === 'idle' && (
                  <div>
                    <p className="text-muted-foreground mb-4">
                      Click here or drag file to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supported formats: CSV, TXT, DAT
                    </p>
                  </div>
                )}
                
                {fileName && (
                  <div className="flex items-center justify-center mt-4 p-3 bg-secondary/30 rounded-lg">
                    <FileText className="w-5 h-5 mr-2 text-accent" />
                    <span className="text-sm">{fileName}</span>
                  </div>
                )}
                
                {status === 'processing' && (
                  <div className="mt-4">
                    <div className="w-full bg-secondary/30 rounded-full h-2">
                      <div className="bg-cosmic-gradient h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Processing data with artificial intelligence...
                    </p>
                  </div>
                )}

                {status === 'complete' && (
                  <div className="mt-4">
                    <Button 
                      className="btn-stellar"
                      onClick={handleReset}
                    >
                      Analyze New File
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AnalysisSection;

