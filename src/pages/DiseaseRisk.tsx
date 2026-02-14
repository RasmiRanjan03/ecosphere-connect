import { motion } from 'framer-motion';
import { HeartPulse, ShieldAlert, Hospital, Activity, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// TODO: Connect to ML disease prediction API
const diseases = [
  { name: 'Asthma', risk: 75, severity: 'High', icon: '🫁', desc: 'Triggered by poor AQI and particulate matter' },
  { name: 'Cholera', risk: 40, severity: 'Medium', icon: '💧', desc: 'Risk from contaminated water sources near waste sites' },
  { name: 'Dengue', risk: 60, severity: 'High', icon: '🦟', desc: 'Stagnant water in waste areas breeds mosquitoes' },
  { name: 'Skin Disorders', risk: 30, severity: 'Low', icon: '🩹', desc: 'Contact with hazardous waste materials' },
];

const hospitals = [
  { name: 'City General Hospital', distance: '1.2 km', type: 'Government' },
  { name: 'Apollo Clinic', distance: '2.8 km', type: 'Private' },
  { name: 'PHC Sector 15', distance: '0.8 km', type: 'Primary Health Center' },
  { name: 'Max Healthcare', distance: '4.5 km', type: 'Private' },
];

const preventiveMeasures = [
  'Wear masks in high AQI areas (>150)',
  'Avoid open waste burning sites',
  'Use water purifiers near waste zones',
  'Apply mosquito repellent regularly',
  'Get annual health checkups',
  'Report waste accumulation immediately',
];

const riskColor = (risk: number) => {
  if (risk >= 70) return 'text-destructive';
  if (risk >= 40) return 'text-warning';
  return 'text-primary';
};

const DiseaseRisk = () => {
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title mb-1">Health Risk Analysis</h1>
        <p className="text-muted-foreground mb-6">AI-powered disease risk prediction for your area</p>

        {/* Overview Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="stat-card text-center">
            <Activity className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-3xl font-bold text-warning font-display">156</p>
            <p className="text-sm text-muted-foreground">Pollution Score</p>
          </div>
          <div className="stat-card text-center">
            <ShieldAlert className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-3xl font-bold text-destructive font-display">High</p>
            <p className="text-sm text-muted-foreground">Risk Level</p>
          </div>
          <div className="stat-card text-center">
            <HeartPulse className="w-8 h-8 text-secondary mx-auto mb-2" />
            <p className="text-3xl font-bold text-secondary font-display">4</p>
            <p className="text-sm text-muted-foreground">Diseases Tracked</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Disease Cards */}
          <div>
            <h3 className="text-lg font-semibold mb-3 font-display">Possible Health Risks</h3>
            <div className="space-y-3">
              {diseases.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="stat-card"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{d.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold font-display">{d.name}</h4>
                        <span className={`text-sm font-bold ${riskColor(d.risk)}`}>{d.risk}% Risk</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{d.desc}</p>
                      <Progress value={d.risk} className="mt-2 h-2" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Preventive Measures */}
            <div>
              <h3 className="text-lg font-semibold mb-3 font-display">Preventive Measures</h3>
              <div className="stat-card space-y-2">
                {preventiveMeasures.map((m, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <p className="text-sm text-foreground">{m}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospitals */}
            <div>
              <h3 className="text-lg font-semibold mb-3 font-display flex items-center gap-2">
                <Hospital className="w-5 h-5 text-secondary" /> Nearby Hospitals
              </h3>
              <div className="space-y-2">
                {hospitals.map((h) => (
                  <div key={h.name} className="stat-card flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{h.name}</p>
                      <p className="text-xs text-muted-foreground">{h.type}</p>
                    </div>
                    <span className="text-sm text-primary font-medium">{h.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DiseaseRisk;
