import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, Trash2, Recycle, Leaf, AlertTriangle, MapPin, Package, X, IndianRupee, Camera, Image, Upload, History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const typeConfig: Record<string, { icon: typeof Recycle; color: string; bg: string }> = {
  Recyclable: { icon: Recycle, color: 'text-primary', bg: 'bg-primary/10' },
  Compostable: { icon: Leaf, color: 'text-success', bg: 'bg-success/10' },
  Hazardous: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10' },
  'Non-Recyclable': { icon: Trash2, color: 'text-muted-foreground', bg: 'bg-muted' },
};

const initialListings = [
  { id: 1, type: 'Plastic Bottles', image: '🧴', location: 'Sector 15, Noida', price: 120, status: 'Available', weight: '2.5 kg' },
  { id: 2, type: 'Cardboard Boxes', image: '📦', location: 'MG Road, Bangalore', price: 80, status: 'Available', weight: '5 kg' },
  { id: 3, type: 'Glass Jars', image: '🫙', location: 'Andheri West, Mumbai', price: 150, status: 'Sold', weight: '3 kg' },
  { id: 4, type: 'Metal Cans', image: '🥫', location: 'Koramangala, Bangalore', price: 200, status: 'Available', weight: '1.5 kg' },
  { id: 5, type: 'Paper Waste', image: '📄', location: 'Connaught Place, Delhi', price: 60, status: 'Sold', weight: '4 kg' },
  { id: 6, type: 'E-Waste (Phone)', image: '📱', location: 'HSR Layout, Bangalore', price: 500, status: 'Available', weight: '0.3 kg' },
];

const initialHistory = [
  { id: 1, type: 'Plastic Bottles', action: 'sold', price: 120, date: '2024-12-10', buyer: 'Rahul M.' },
  { id: 2, type: 'Cardboard Boxes', action: 'bought', price: 80, date: '2024-12-08', seller: 'Priya S.' },
  { id: 3, type: 'Glass Jars', action: 'sold', price: 150, date: '2024-12-05', buyer: 'Amit K.' },
  { id: 4, type: 'Metal Cans', action: 'bought', price: 200, date: '2024-11-28', seller: 'Neha R.' },
];

const statusColors: Record<string, string> = {
  Available: 'eco-badge-success',
  Sold: 'eco-badge-info',
};

const wasteTypes = ['Plastic Bottles', 'Cardboard Boxes', 'Glass Jars', 'Metal Cans', 'Paper Waste', 'E-Waste', 'Other'];
const wasteEmojis: Record<string, string> = { 'Plastic Bottles': '🧴', 'Cardboard Boxes': '📦', 'Glass Jars': '🫙', 'Metal Cans': '🥫', 'Paper Waste': '📄', 'E-Waste': '📱', Other: '♻️' };

// TODO: Connect to AI waste classification API
const classifyWaste = async () => {
  await new Promise((r) => setTimeout(r, 1500));
  return {
    type: 'Recyclable',
    confidence: 94,
    material: 'Plastic (PET)',
    suggestedAction: 'Sell on marketplace or drop at recycling center',
    price: 50,
  };
};

const UploadWaste = () => {
  const [filter, setFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'marketplace' | 'history'>('marketplace');
  const [listings, setListings] = useState(initialListings);
  const [showListModal, setShowListModal] = useState(false);
  const [newItem, setNewItem] = useState({ type: '', weight: '', price: '', location: '' });
  const [listImage, setListImage] = useState<string | null>(null);
  const [classifying, setClassifying] = useState(false);
  const [classification, setClassification] = useState<null | Awaited<ReturnType<typeof classifyWaste>>>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filters = ['All', 'Available', 'Sold'];
  const filtered = filter === 'All' ? listings : listings.filter((l) => l.status === filter);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setListImage(e.target?.result as string);
      setClassification(null);
    };
    reader.readAsDataURL(file);
  };

  const handleClassify = async () => {
    setClassifying(true);
    const result = await classifyWaste();
    setClassification(result);
    setClassifying(false);
    if (result.price) setNewItem((p) => ({ ...p, price: String(result.price) }));
  };

  const handleListItem = () => {
    if (!newItem.type || !newItem.weight || !newItem.price || !newItem.location) return;
    const item = {
      id: Date.now(),
      type: newItem.type,
      image: wasteEmojis[newItem.type] || '♻️',
      location: newItem.location,
      price: Number(newItem.price),
      status: 'Available',
      weight: newItem.weight,
    };
    setListings((prev) => [item, ...prev]);
    setNewItem({ type: '', weight: '', price: '', location: '' });
    setListImage(null);
    setClassification(null);
    setShowListModal(false);
  };

  const resetModal = () => {
    setShowListModal(false);
    setListImage(null);
    setClassification(null);
    setNewItem({ type: '', weight: '', price: '', location: '' });
  };

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="page-title">Waste Hub</h1>
            <p className="text-muted-foreground">Buy, sell & trade recyclable waste</p>
          </div>
          <Button onClick={() => setShowListModal(true)} className="gradient-eco text-primary-foreground border-0">
            <Package className="w-4 h-4 mr-2" /> List Item
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border pb-0">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
              activeTab === 'marketplace'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Marketplace
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
              activeTab === 'history'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <History className="w-4 h-4" /> History
          </button>
        </div>

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    filter === f
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="stat-card"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{item.image}</span>
                    <span className={statusColors[item.status]}>{item.status}</span>
                  </div>
                  <h3 className="font-semibold text-foreground font-display">{item.type}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.weight}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                    <span className="text-lg font-bold text-primary font-display flex items-center">
                      <IndianRupee className="w-4 h-4" />{item.price}
                    </span>
                    {item.status === 'Available' && (
                      <Button size="sm" className="gradient-eco text-primary-foreground border-0">
                        <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Buy
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {initialHistory.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="stat-card flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.action === 'sold' ? 'bg-primary/10' : 'bg-accent/20'
                }`}>
                  {item.action === 'sold' ? (
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-accent-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground font-display">{item.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.action === 'sold' ? `Sold to ${item.buyer}` : `Bought from ${item.seller}`} · {item.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-bold font-display flex items-center ${
                    item.action === 'sold' ? 'text-primary' : 'text-foreground'
                  }`}>
                    {item.action === 'sold' ? '+' : '-'}<IndianRupee className="w-3.5 h-3.5" />{item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* List Item Modal with integrated classification */}
        <AnimatePresence>
          {showListModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={resetModal}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card rounded-2xl p-6 w-full max-w-md shadow-xl border border-border max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold font-display">List Item for Sale</h2>
                  <button onClick={resetModal} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Image upload + AI classify */}
                  <div>
                    <Label>Photo (optional — AI classifies waste)</Label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-1.5 border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                      />
                      {listImage ? (
                        <img src={listImage} alt="Preview" className="max-h-32 mx-auto rounded-lg object-cover" />
                      ) : (
                        <div className="space-y-1">
                          <Upload className="w-6 h-6 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">Upload image</p>
                        </div>
                      )}
                    </div>
                    {listImage && !classification && (
                      <Button
                        onClick={handleClassify}
                        disabled={classifying}
                        size="sm"
                        variant="outline"
                        className="w-full mt-2"
                      >
                        {classifying ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="mr-2">
                            <Sparkles className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <Sparkles className="w-4 h-4 mr-2" />
                        )}
                        {classifying ? 'Classifying...' : 'AI Classify'}
                      </Button>
                    )}
                    {classification && (
                      <div className="mt-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{classification.type} — {classification.material}</span>
                          <span className="text-sm font-bold text-primary">{classification.confidence}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Est. ₹{classification.price} · {classification.suggestedAction}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Waste Type</Label>
                    <Select value={newItem.type} onValueChange={(v) => setNewItem((p) => ({ ...p, type: v }))}>
                      <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        {wasteTypes.map((t) => (
                          <SelectItem key={t} value={t}>{wasteEmojis[t]} {t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Weight</Label>
                      <Input className="mt-1.5" placeholder="e.g. 2.5 kg" value={newItem.weight} onChange={(e) => setNewItem((p) => ({ ...p, weight: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Price (₹)</Label>
                      <Input className="mt-1.5" type="number" placeholder="e.g. 150" value={newItem.price} onChange={(e) => setNewItem((p) => ({ ...p, price: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input className="mt-1.5" placeholder="e.g. Sector 15, Noida" value={newItem.location} onChange={(e) => setNewItem((p) => ({ ...p, location: e.target.value }))} />
                  </div>
                  <Button onClick={handleListItem} className="w-full gradient-eco text-primary-foreground border-0 h-11 mt-2">
                    <Package className="w-4 h-4 mr-2" /> List for Sale
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UploadWaste;
