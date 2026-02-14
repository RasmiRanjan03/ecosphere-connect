import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, X, Upload, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Using a static map placeholder since Leaflet requires additional setup
// TODO: Integrate with Google Maps or OpenStreetMap via react-leaflet

const mockLocations = [
  { id: 1, type: 'Dustbin', subtype: 'Dry', lat: 28.6139, lng: 77.209, status: 'verified', label: 'Sector 15 Dry Waste Bin' },
  { id: 2, type: 'Recycling Center', subtype: '', lat: 28.62, lng: 77.215, status: 'verified', label: 'GreenCycle Hub' },
  { id: 3, type: 'E-waste Center', subtype: '', lat: 28.608, lng: 77.22, status: 'verified', label: 'TechRecycle Point' },
  { id: 4, type: 'Compost Pit', subtype: '', lat: 28.618, lng: 77.2, status: 'verified', label: 'Community Compost' },
  { id: 5, type: 'Dustbin', subtype: 'Wet', lat: 28.615, lng: 77.218, status: 'pending', label: 'New Report - Pending' },
];

const typeIcons: Record<string, string> = {
  Dustbin: '🗑️',
  'Recycling Center': '♻️',
  'E-waste Center': '🔌',
  'Compost Pit': '🌱',
};

const SmartMap = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="page-title">Smart Map</h1>
            <p className="text-muted-foreground">Find nearby waste facilities</p>
          </div>
          <Button onClick={() => setShowModal(true)} className="gradient-eco text-primary-foreground border-0">
            <Plus className="w-4 h-4 mr-2" /> Add Dustbin
          </Button>
        </div>

        {/* Map placeholder */}
        <div className="relative bg-muted rounded-2xl overflow-hidden h-[400px] md:h-[500px] border border-border/50 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-3 animate-bounce" />
              <p className="text-foreground font-semibold font-display">Interactive Map</p>
              <p className="text-sm text-muted-foreground">Map integration coming soon</p>
              <p className="text-xs text-muted-foreground mt-1">Leaflet / Google Maps will render here</p>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border/50 text-sm space-y-1.5">
            {Object.entries(typeIcons).map(([type, icon]) => (
              <div key={type} className="flex items-center gap-2">
                <span>{icon}</span>
                <span className="text-foreground">{type}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1 border-t border-border/50">
              <span className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Pending Verification</span>
            </div>
          </div>
        </div>

        {/* Locations list */}
        <h3 className="text-lg font-semibold mb-3 font-display">Nearby Locations</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockLocations.map((loc) => (
            <div key={loc.id} className="stat-card flex items-center gap-3">
              <span className="text-2xl">{typeIcons[loc.type]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{loc.label}</p>
                <p className="text-xs text-muted-foreground">{loc.type}{loc.subtype ? ` · ${loc.subtype}` : ''}</p>
              </div>
              <span className={loc.status === 'verified' ? 'eco-badge-success' : 'eco-badge-warning'}>
                {loc.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Add Dustbin Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-display">Add Dustbin</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>GPS Location (auto-detected)</Label>
                <Input value="28.6139° N, 77.2090° E" readOnly className="mt-1 bg-muted" />
              </div>

              <div>
                <Label>Dustbin Type</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {['Wet', 'Dry', 'E-waste'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className={`p-2.5 rounded-xl border text-sm font-medium transition-all ${
                        selectedType === t ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Condition</Label>
                <select className="w-full mt-1 h-10 rounded-lg border border-border bg-background px-3 text-sm">
                  <option>Good</option>
                  <option>Moderate</option>
                  <option>Poor</option>
                  <option>Overflowing</option>
                </select>
              </div>

              <div>
                <Label>Upload Photo</Label>
                <div className="mt-1 border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">Click to upload</p>
                </div>
              </div>

              {/* TODO: AI image verification integration point */}
              <Button className="w-full gradient-eco text-primary-foreground border-0 h-11" onClick={() => setShowModal(false)}>
                Submit for Verification
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SmartMap;
