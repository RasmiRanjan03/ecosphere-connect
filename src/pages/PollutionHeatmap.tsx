import { motion } from 'framer-motion';
import { Wind, Droplets, Factory, ThermometerSun } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// TODO: Replace with real pollution API data
const mockAreas = [
  { name: 'Sector 15, Noida', aqi: 156, waste: 72, risk: 'High', color: 'text-destructive' },
  { name: 'MG Road, Bangalore', aqi: 85, waste: 34, risk: 'Medium', color: 'text-warning' },
  { name: 'Marine Drive, Mumbai', aqi: 45, waste: 18, risk: 'Low', color: 'text-primary' },
  { name: 'Koramangala, Bangalore', aqi: 95, waste: 45, risk: 'Medium', color: 'text-warning' },
  { name: 'Connaught Place, Delhi', aqi: 210, waste: 88, risk: 'High', color: 'text-destructive' },
];

const PollutionHeatmap = () => {
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title mb-1">Pollution Heatmap</h1>
        <p className="text-muted-foreground mb-6">Real-time environmental monitoring</p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-muted rounded-2xl h-[400px] border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <ThermometerSun className="w-12 h-12 text-warning mx-auto mb-3" />
                  <p className="font-semibold font-display">Pollution Heatmap</p>
                  <p className="text-sm text-muted-foreground">Heatmap overlay coming soon</p>
                </div>
              </div>

              {/* Heatmap spots (simulated) */}
              <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-destructive/20 blur-3xl" />
              <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-warning/20 blur-2xl" />
              <div className="absolute bottom-1/4 left-1/2 w-28 h-28 rounded-full bg-primary/15 blur-2xl" />

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border/50 text-sm space-y-1.5">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary" /> Low Risk</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-warning" /> Medium Risk</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-destructive" /> High Risk</div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-5 h-5 text-secondary" />
                <span className="font-semibold font-display">AQI Score</span>
              </div>
              <p className="text-3xl font-bold text-warning font-display">156</p>
              <p className="text-sm text-muted-foreground">Unhealthy</p>
              <Progress value={62} className="mt-3 h-2" />
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-secondary" />
                <span className="font-semibold font-display">Waste Density</span>
              </div>
              <p className="text-3xl font-bold text-foreground font-display">72%</p>
              <p className="text-sm text-muted-foreground">Above average</p>
              <Progress value={72} className="mt-3 h-2" />
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-2 mb-2">
                <Factory className="w-5 h-5 text-destructive" />
                <span className="font-semibold font-display">Pollution Score</span>
              </div>
              <p className="text-3xl font-bold text-destructive font-display">High</p>
              <p className="text-sm text-muted-foreground">Immediate action needed</p>
              <Progress value={85} className="mt-3 h-2" />
            </div>
          </div>
        </div>

        {/* Area Breakdown */}
        <h3 className="text-lg font-semibold mt-8 mb-3 font-display">Area Breakdown</h3>
        <div className="bg-card rounded-xl border border-border/50 divide-y divide-border/50">
          {mockAreas.map((area) => (
            <div key={area.name} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-foreground">{area.name}</p>
                <p className="text-sm text-muted-foreground">AQI: {area.aqi} · Waste: {area.waste}%</p>
              </div>
              <span className={`font-semibold ${area.color}`}>{area.risk}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PollutionHeatmap;
