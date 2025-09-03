
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

// Mock data for light curve visualization
const generateMockLightCurve = (hasTransit: boolean = false) => {
  const data = [];
  const baseFlux = 1.0;
  
  for (let i = 0; i < 200; i++) {
    let flux = baseFlux + (Math.random() - 0.5) * 0.01; // Add some noise
    
    // Add transit dips if planet detected
    if (hasTransit && (i >= 50 && i <= 55 || i >= 120 && i <= 125)) {
      flux *= 0.98; // 2% dip for transit
    }
    
    data.push({
      time: i * 0.1,
      flux: flux,
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
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              لوحة التحكم والتحليل
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ستظهر نتائج التحليل والرسوم البيانية هنا بعد رفع البيانات
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid gap-8">
            {/* Main Chart Placeholder */}
            <Card className="card-cosmic">
              <CardHeader>
                <CardTitle className="text-xl text-accent flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  منحنى الضوء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">سيظهر منحنى الضوء هنا بعد التحليل</p>
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
                      <p className="text-sm text-muted-foreground">حالة الاكتشاف</p>
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
                      <p className="text-sm text-muted-foreground">مستوى الثقة</p>
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
                      <p className="text-sm text-muted-foreground">عمق العبور</p>
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
                      <p className="text-sm text-muted-foreground">الدورة المدارية</p>
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
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              لوحة التحكم والتحليل
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              جاري تحليل البيانات وإنشاء الرسوم البيانية...
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid gap-8">
            {/* Loading Chart */}
            <Card className="card-cosmic">
              <CardHeader>
                <CardTitle className="text-xl text-accent flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  منحنى الضوء - {fileName}
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
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            لوحة التحكم والتحليل
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نتائج تحليل البيانات والرسوم البيانية التفصيلية
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8">
          {/* Main Chart */}
          <Card className="card-cosmic">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-accent flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  منحنى الضوء - {fileName}
                </CardTitle>
                <Badge variant={result.planetDetected ? "default" : "secondary"} className="text-sm">
                  {result.planetDetected ? "🪐 كوكب مكتشف" : "🌟 لا يوجد كوكب"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lightCurveData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      label={{ value: 'الزمن (أيام)', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      label={{ value: 'شدة الضوء', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="flux" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      dot={false}
                    />
                    {result.planetDetected && (
                      <>
                        <ReferenceLine x={5.0} stroke="hsl(var(--destructive))" strokeDasharray="5 5" />
                        <ReferenceLine x={12.0} stroke="hsl(var(--destructive))" strokeDasharray="5 5" />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {result.planetDetected && (
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  الخطوط المتقطعة تشير إلى مواضع العبور المحتملة
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
                    <p className="text-sm text-muted-foreground">حالة الاكتشاف</p>
                    <p className="text-2xl font-bold text-accent mt-1">
                      {result.planetDetected ? "مؤكد" : "غير مؤكد"}
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
                    <p className="text-sm text-muted-foreground">مستوى الثقة</p>
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
                    <p className="text-sm text-muted-foreground">عمق العبور</p>
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
                    <p className="text-sm text-muted-foreground">الدورة المدارية</p>
                    <p className="text-2xl font-bold text-accent mt-1">{result.period} يوم</p>
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
