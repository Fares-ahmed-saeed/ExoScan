
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { TrendingDown, Clock, Target, Activity } from "lucide-react";

// type AnalysisResult = {
//   planetDetected: boolean;
//   confidence: number;
//   transitDepth: string;
//   period: string;
//   transitTimes?: number[];
// };

// type DashboardProps = {
//   result: AnalysisResult | null;
//   isLoading: boolean;
//   fileName?: string;
// };

// // Mock data for light curve visualization
// const generateMockLightCurve = (hasTransit: boolean = false) => {
//   const data = [];
//   const baseFlux = 1.0;
  
//   for (let i = 0; i < 200; i++) {
//     let flux = baseFlux + (Math.random() - 0.5) * 0.01; // Add some noise
    
//     // Add transit dips if planet detected
//     if (hasTransit && (i >= 50 && i <= 55 || i >= 120 && i <= 125)) {
//       flux *= 0.98; // 2% dip for transit
//     }
    
//     data.push({
//       time: i * 0.1,
//       flux: flux,
//       isTransit: hasTransit && (i >= 50 && i <= 55 || i >= 120 && i <= 125)
//     });
//   }
  
//   return data;
// };

// const Dashboard = ({ result, isLoading, fileName }: DashboardProps) => {
//   const lightCurveData = result ? generateMockLightCurve(result.planetDetected) : generateMockLightCurve(false);

//   if (!result && !isLoading) {
//     // Empty state placeholder
//     return (
//       <section id="dashboard" className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="section-title mb-4">
//               Dashboard & Analysis
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Analysis results and charts will appear here after uploading data
//             </p>
//           </div>

//           <div className="max-w-6xl mx-auto grid gap-8">
//             {/* Main Chart Placeholder */}
//             <Card className="card-cosmic">
//               <CardHeader>
//                 <CardTitle className="text-xl text-accent flex items-center gap-2">
//                   <Activity className="w-5 h-5" />
//                   Light Curve
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
//                   <div className="text-center">
//                     <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
//                     <p className="text-muted-foreground">Light curve will appear here after analysis</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Stats Cards Placeholder */}
//             <div className="grid md:grid-cols-4 gap-6">
//               <Card className="card-cosmic">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-muted-foreground">Detection Status</p>
//                       <div className="h-6 bg-muted/30 rounded mt-2"></div>
//                     </div>
//                     <Target className="w-8 h-8 text-muted-foreground opacity-50" />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="card-cosmic">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-muted-foreground">Confidence Level</p>
//                       <div className="h-6 bg-muted/30 rounded mt-2"></div>
//                     </div>
//                     <TrendingDown className="w-8 h-8 text-muted-foreground opacity-50" />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="card-cosmic">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-muted-foreground">Transit Depth</p>
//                       <div className="h-6 bg-muted/30 rounded mt-2"></div>
//                     </div>
//                     <TrendingDown className="w-8 h-8 text-muted-foreground opacity-50" />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="card-cosmic">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-muted-foreground">Orbital Period</p>
//                       <div className="h-6 bg-muted/30 rounded mt-2"></div>
//                     </div>
//                     <Clock className="w-8 h-8 text-muted-foreground opacity-50" />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (isLoading) {
//     // Loading state
//     return (
//       <section id="dashboard" className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="section-title mb-4">
//               Dashboard & Analysis
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Analyzing data and generating charts...
//             </p>
//           </div>

//           <div className="max-w-6xl mx-auto grid gap-8">
//             {/* Loading Chart */}
//             <Card className="card-cosmic">
//               <CardHeader>
//                 <CardTitle className="text-xl text-accent flex items-center gap-2">
//                   <Activity className="w-5 h-5" />
//                   Light Curve - {fileName}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Skeleton className="h-64 w-full" />
//               </CardContent>
//             </Card>

//             {/* Loading Stats */}
//             <div className="grid md:grid-cols-4 gap-6">
//               {[1, 2, 3, 4].map((i) => (
//                 <Card key={i} className="card-cosmic">
//                   <CardContent className="p-6">
//                     <Skeleton className="h-16 w-full" />
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Results state
//   return (
//     <section id="dashboard" className="py-20">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="section-title mb-4">
//             Dashboard & Analysis
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Data analysis results and detailed charts
//           </p>
//         </div>

//         <div className="max-w-6xl mx-auto grid gap-8">
//           {/* Main Chart */}
//           <Card className="card-cosmic">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-xl text-accent flex items-center gap-2">
//                   <Activity className="w-5 h-5" />
//                   Light Curve - {fileName}
//                 </CardTitle>
//                 <Badge variant={result.planetDetected ? "default" : "secondary"} className="text-sm">
//                   {result.planetDetected ? "🪐 Planet Detected" : "🌟 No Planet"}
//                 </Badge>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={lightCurveData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                     <XAxis 
//                       dataKey="time" 
//                       stroke="hsl(var(--muted-foreground))"
//                       label={{ value: 'Time (days)', position: 'insideBottom', offset: -10 }}
//                     />
//                     <YAxis 
//                       stroke="hsl(var(--muted-foreground))"
//                       label={{ value: 'Light Intensity', angle: -90, position: 'insideLeft' }}
//                     />
//                     <Tooltip 
//                       contentStyle={{
//                         backgroundColor: 'hsl(var(--card))',
//                         border: '1px solid hsl(var(--border))',
//                         borderRadius: '8px'
//                       }}
//                     />
//                     <Line 
//                       type="monotone" 
//                       dataKey="flux" 
//                       stroke="hsl(var(--accent))" 
//                       strokeWidth={2}
//                       dot={false}
//                     />
//                     {result.planetDetected && (
//                       <>
//                         <ReferenceLine x={5.0} stroke="hsl(var(--destructive))" strokeDasharray="5 5" />
//                         <ReferenceLine x={12.0} stroke="hsl(var(--destructive))" strokeDasharray="5 5" />
//                       </>
//                     )}
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//               {result.planetDetected && (
//                 <p className="text-sm text-muted-foreground mt-4 text-center">
//                   Dashed lines indicate potential transit positions
//                 </p>
//               )}
//             </CardContent>
//           </Card>

//           {/* Stats Cards */}
//           <div className="grid md:grid-cols-4 gap-6">
//             <Card className="card-cosmic">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Detection Status</p>
//                     <p className="text-2xl font-bold text-accent mt-1">
//                       {result.planetDetected ? "Confirmed" : "Not Confirmed"}
//                     </p>
//                   </div>
//                   <Target className={`w-8 h-8 ${result.planetDetected ? 'text-green-400' : 'text-muted-foreground'}`} />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="card-cosmic">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Confidence Level</p>
//                     <p className="text-2xl font-bold text-accent mt-1">{result.confidence}%</p>
//                   </div>
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
//                     result.confidence > 80 ? 'bg-green-500' : 
//                     result.confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'
//                   }`}>
//                     {result.confidence > 80 ? '✓' : result.confidence > 60 ? '!' : '✗'}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="card-cosmic">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Transit Depth</p>
//                     <p className="text-2xl font-bold text-accent mt-1">{result.transitDepth}%</p>
//                   </div>
//                   <TrendingDown className="w-8 h-8 text-blue-400" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="card-cosmic">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Orbital Period</p>
//                     <p className="text-2xl font-bold text-accent mt-1">{result.period} days</p>
//                   </div>
//                   <Clock className="w-8 h-8 text-purple-400" />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Dashboard;






import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingDown, Clock, Target, Activity } from "lucide-react";

type AnalysisResult = {
  planetDetected: boolean;
  confidence: number;
  transitDepth: string;
  period: string;
  transitTimes?: number[];
};

type DashboardProps = {
  result: AnalysisResult | null;
  isLoading: boolean;
  fileName?: string;
};

// Enhanced light curve data with multiple waveforms
const generateMockLightCurve = (hasTransit: boolean = false) => {
  const data = [];
  const points = 200;
  
  for (let i = 0; i < points; i++) {
    const time = i * 0.1;
    
    // Base flux with noise
    const baseFlux = 1.0 + (Math.random() - 0.5) * 0.008;
    
    // Multiple frequency components (like in the reference image)
    const wave1 = 1.0 + Math.sin(time * 0.8) * 0.015;
    const wave2 = 1.0 + Math.sin(time * 1.5) * 0.012;
    const wave3 = 1.0 + Math.sin(time * 2.2) * 0.01;
    const wave4 = 1.0 + Math.sin(time * 0.5) * 0.018;
    
    // Apply transit dips if planet detected
    let transitFactor = 1.0;
    if (hasTransit && (i >= 50 && i <= 55 || i >= 120 && i <= 125)) {
      transitFactor = 0.98;
    }
    
    data.push({
      time: time,
      flux: baseFlux * transitFactor,
      wave1: wave1 * transitFactor,
      wave2: wave2 * transitFactor,
      wave3: wave3 * transitFactor,
      wave4: wave4 * transitFactor,
      isTransit: hasTransit && (i >= 50 && i <= 55 || i >= 120 && i <= 125)
    });
  }
  
  return data;
};

const Dashboard = ({ result, isLoading, fileName }: DashboardProps) => {
  const lightCurveData = result ? generateMockLightCurve(result.planetDetected) : generateMockLightCurve(false);

  if (!result && !isLoading) {
    // Empty state placeholder
    return (
      <section id="dashboard" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">
              Dashboard & Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Analysis results and charts will appear here after uploading data
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid gap-8">
            {/* Main Chart Placeholder */}
            <Card className="card-cosmic">
              <CardHeader>
                <CardTitle className="text-xl text-accent flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Light Curve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Light curve will appear here after analysis</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards Placeholder */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="card-cosmic">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Detection Status</p>
                      <div className="h-6 bg-muted/30 rounded mt-2"></div>
                    </div>
                    <Target className="w-8 h-8 text-muted-foreground opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-cosmic">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Confidence Level</p>
                      <div className="h-6 bg-muted/30 rounded mt-2"></div>
                    </div>
                    <TrendingDown className="w-8 h-8 text-muted-foreground opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-cosmic">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Transit Depth</p>
                      <div className="h-6 bg-muted/30 rounded mt-2"></div>
                    </div>
                    <TrendingDown className="w-8 h-8 text-muted-foreground opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-cosmic">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Orbital Period</p>
                      <div className="h-6 bg-muted/30 rounded mt-2"></div>
                    </div>
                    <Clock className="w-8 h-8 text-muted-foreground opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    // Loading state
    return (
      <section id="dashboard" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">
              Dashboard & Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Analyzing data and generating charts...
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid gap-8">
            {/* Loading Chart */}
            <Card className="card-cosmic">
              <CardHeader>
                <CardTitle className="text-xl text-accent flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Light Curve - {fileName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>

            {/* Loading Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="card-cosmic">
                  <CardContent className="p-6">
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Results state
  return (
    <section id="dashboard" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">
            Dashboard & Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Data analysis results and detailed charts
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8">
          {/* Main Chart */}
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-accent flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Light Curve - {fileName}
                </CardTitle>
                <Badge variant={result.planetDetected ? "default" : "secondary"} className="text-sm">
                  {result.planetDetected ? "🪐 Planet Detected" : "🌟 No Planet"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lightCurveData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      label={{ value: 'Time (days)', position: 'insideBottom', offset: -5, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      domain={[0.94, 1.04]}
                      label={{ value: 'Normalized Flux', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    
                    {/* Multiple colored waveforms similar to reference image */}
                    <Line 
                      type="monotone" 
                      dataKey="wave1" 
                      stroke="hsl(270, 70%, 60%)" 
                      strokeWidth={2.5}
                      dot={false}
                      name="Signal 1"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="wave2" 
                      stroke="hsl(190, 85%, 60%)" 
                      strokeWidth={2.5}
                      dot={false}
                      name="Signal 2"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="wave3" 
                      stroke="hsl(15, 85%, 60%)" 
                      strokeWidth={2.5}
                      dot={false}
                      name="Signal 3"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="wave4" 
                      stroke="hsl(45, 93%, 65%)" 
                      strokeWidth={2.5}
                      dot={false}
                      name="Signal 4"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="flux" 
                      stroke="hsl(320, 65%, 55%)" 
                      strokeWidth={3}
                      dot={false}
                      name="Primary Flux"
                    />
                    
                    {result.planetDetected && (
                      <>
                        <ReferenceLine x={5.0} stroke="hsl(var(--destructive))" strokeDasharray="5 5" opacity={0.6} />
                        <ReferenceLine x={12.0} stroke="hsl(var(--destructive))" strokeDasharray="5 5" opacity={0.6} />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 flex-wrap text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5" style={{backgroundColor: 'hsl(270, 70%, 60%)'}}></div>
                  <span className="text-muted-foreground">Signal 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5" style={{backgroundColor: 'hsl(190, 85%, 60%)'}}></div>
                  <span className="text-muted-foreground">Signal 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5" style={{backgroundColor: 'hsl(15, 85%, 60%)'}}></div>
                  <span className="text-muted-foreground">Signal 3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5" style={{backgroundColor: 'hsl(45, 93%, 65%)'}}></div>
                  <span className="text-muted-foreground">Signal 4</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5" style={{backgroundColor: 'hsl(320, 65%, 55%)'}}></div>
                  <span className="text-muted-foreground">Primary Flux</span>
                </div>
              </div>
              {result.planetDetected && (
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Dashed red lines indicate potential transit positions
                </p>
              )}
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="card-cosmic">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Detection Status</p>
                    <p className="text-2xl font-bold text-accent mt-1">
                      {result.planetDetected ? "Confirmed" : "Not Confirmed"}
                    </p>
                  </div>
                  <Target className={`w-8 h-8 ${result.planetDetected ? 'text-green-400' : 'text-muted-foreground'}`} />
                </div>
              </CardContent>
            </Card>

            <Card className="card-cosmic">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Confidence Level</p>
                    <p className="text-2xl font-bold text-accent mt-1">{result.confidence}%</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    result.confidence > 80 ? 'bg-green-500' : 
                    result.confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {result.confidence > 80 ? '✓' : result.confidence > 60 ? '!' : '✗'}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-cosmic">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Transit Depth</p>
                    <p className="text-2xl font-bold text-accent mt-1">{result.transitDepth}%</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-cosmic">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Orbital Period</p>
                    <p className="text-2xl font-bold text-accent mt-1">{result.period} days</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
