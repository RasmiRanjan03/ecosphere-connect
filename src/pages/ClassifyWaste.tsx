import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Upload, Leaf, Recycle, Home, ShoppingBag, AlertTriangle, Trash2, Camera, X, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type SuggestionType = 'compost' | 'reuse' | 'sell' | 'dispose';

interface Suggestion {
  type: SuggestionType;
  title: string;
  description: string;
  priority: number;
}

interface ClassificationResult {
  category: string;
  material: string;
  confidence: number;
  estimatedPrice: number | null;
  suggestions: Suggestion[];
}

const suggestionConfig: Record<SuggestionType, { icon: typeof Leaf; color: string; bg: string; label: string }> = {
  compost: { icon: Leaf, color: 'text-green-600', bg: 'bg-green-500/10', label: 'Compost / Home Use' },
  reuse: { icon: Home, color: 'text-blue-600', bg: 'bg-blue-500/10', label: 'Reuse at Home' },
  sell: { icon: ShoppingBag, color: 'text-amber-600', bg: 'bg-amber-500/10', label: 'Sell on Marketplace' },
  dispose: { icon: Trash2, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Safe Disposal' },
};

const categoryConfig: Record<string, { icon: typeof Recycle; color: string; bg: string }> = {
  Organic: { icon: Leaf, color: 'text-green-600', bg: 'bg-green-500/10' },
  Recyclable: { icon: Recycle, color: 'text-primary', bg: 'bg-primary/10' },
  Hazardous: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10' },
  'Non-Recyclable': { icon: Trash2, color: 'text-muted-foreground', bg: 'bg-muted' },
};

// Mock AI classification — prioritizes compost/reuse over selling
const classifyWasteAI = async (): Promise<ClassificationResult> => {
  await new Promise((r) => setTimeout(r, 2000));

  const results: ClassificationResult[] = [
    {
      category: 'Organic',
      material: 'Vegetable Waste',
      confidence: 96,
      estimatedPrice: null,
      suggestions: [
        { type: 'compost', title: 'Use as Compost', description: 'Add to your compost bin or garden soil. Vegetable peels decompose in 2-4 weeks and enrich soil with nutrients.', priority: 1 },
        { type: 'reuse', title: 'Feed Your Plants', description: 'Soak vegetable scraps in water for 24-48 hours to make nutrient-rich plant fertilizer. Great for indoor plants!', priority: 2 },
        { type: 'reuse', title: 'Make Vegetable Broth', description: 'Collect onion peels, carrot tops, celery ends in a freezer bag. Boil with water for a zero-waste soup stock.', priority: 3 },
      ],
    },
    {
      category: 'Recyclable',
      material: 'Plastic (PET)',
      confidence: 92,
      estimatedPrice: 50,
      suggestions: [
        { type: 'reuse', title: 'Reuse as Planter', description: 'Cut the bottle in half and use as a mini planter for herbs or small plants. Poke holes at the bottom for drainage.', priority: 1 },
        { type: 'reuse', title: 'DIY Storage Container', description: 'Clean and use as a storage container for small items, craft supplies, or to organize your workspace.', priority: 2 },
        { type: 'sell', title: 'Sell on Marketplace', description: 'Plastic PET bottles are in demand at recycling centers. Collect in bulk for better prices.', priority: 3 },
      ],
    },
    {
      category: 'Recyclable',
      material: 'Cardboard',
      confidence: 89,
      estimatedPrice: 80,
      suggestions: [
        { type: 'compost', title: 'Add to Compost', description: 'Shred cardboard and add to compost as "brown material." It balances nitrogen-rich food scraps perfectly.', priority: 1 },
        { type: 'reuse', title: 'Use for Gardening', description: 'Lay flat cardboard sheets in garden beds as a weed barrier. Cover with mulch for a clean, weed-free garden.', priority: 2 },
        { type: 'sell', title: 'Sell in Bulk', description: 'Cardboard is recyclable and fetches ₹15-20/kg. Flatten and collect for better value.', priority: 3 },
      ],
    },
    {
      category: 'Organic',
      material: 'Fruit Peels',
      confidence: 94,
      estimatedPrice: null,
      suggestions: [
        { type: 'compost', title: 'Compost It', description: 'Fruit peels are excellent compost material. They add nitrogen and break down quickly in 1-3 weeks.', priority: 1 },
        { type: 'reuse', title: 'Natural Cleaner', description: 'Citrus peels soaked in vinegar for 2 weeks make an amazing all-purpose household cleaner.', priority: 2 },
        { type: 'reuse', title: 'Banana Peel Fertilizer', description: 'Chop banana peels and bury near rose plants. They release potassium that helps flowers bloom beautifully.', priority: 3 },
      ],
    },
    {
      category: 'Hazardous',
      material: 'Battery (Li-ion)',
      confidence: 88,
      estimatedPrice: null,
      suggestions: [
        { type: 'dispose', title: 'Drop at E-Waste Center', description: 'Batteries contain toxic chemicals. Never throw in regular trash. Find the nearest e-waste collection point.', priority: 1 },
        { type: 'sell', title: 'Sell to E-Waste Dealer', description: 'Some e-waste dealers buy old batteries for metal recovery. Check your local marketplace.', priority: 2 },
      ],
    },
  ];

  return results[Math.floor(Math.random() * results.length)];
};

const ClassifyWaste = () => {
  const [image, setImage] = useState<string | null>(null);
  const [classifying, setClassifying] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleClassify = async () => {
    setClassifying(true);
    const res = await classifyWasteAI();
    setResult(res);
    setClassifying(false);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  const catCfg = result ? categoryConfig[result.category] : null;

  return (
    <div className="page-container max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title">Classify Waste</h1>
        <p className="text-muted-foreground mb-6">Upload a photo and our AI will classify it &amp; suggest the best action</p>

        {/* Upload area */}
        {!image ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-2xl p-10 text-center cursor-pointer hover:border-primary/50 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground font-display">Take a Photo or Upload</p>
                <p className="text-sm text-muted-foreground mt-1">Snap a picture of your waste item</p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" size="sm"><Camera className="w-4 h-4 mr-1.5" /> Camera</Button>
                <Button variant="outline" size="sm"><Upload className="w-4 h-4 mr-1.5" /> Gallery</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Image preview */}
            <div className="relative rounded-2xl overflow-hidden border border-border">
              <img src={image} alt="Waste item" className="w-full max-h-64 object-cover" />
              <button
                onClick={reset}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-foreground/70 text-background flex items-center justify-center hover:bg-foreground/90 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Classify button */}
            {!result && (
              <Button
                onClick={handleClassify}
                disabled={classifying}
                className="w-full gradient-eco text-primary-foreground border-0 h-12 text-base"
              >
                {classifying ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> Classify with AI
                  </>
                )}
              </Button>
            )}

            {/* Classification result */}
            {result && catCfg && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Category badge */}
                <div className={`${catCfg.bg} rounded-2xl p-4 border border-border/50`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${catCfg.bg} flex items-center justify-center`}>
                      <catCfg.icon className={`w-6 h-6 ${catCfg.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground font-display text-lg">{result.material}</p>
                      <p className="text-sm text-muted-foreground">
                        {result.category} · {result.confidence}% confidence
                      </p>
                    </div>
                    {result.estimatedPrice && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Est. value</p>
                        <p className="font-bold text-primary font-display flex items-center">
                          <IndianRupee className="w-4 h-4" />{result.estimatedPrice}/kg
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Suggestions — ordered by priority (compost/reuse first) */}
                <div>
                  <h3 className="font-semibold text-foreground font-display mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> What You Can Do
                  </h3>
                  <div className="space-y-3">
                    {result.suggestions
                      .sort((a, b) => a.priority - b.priority)
                      .map((suggestion, i) => {
                        const cfg = suggestionConfig[suggestion.type];
                        const Icon = cfg.icon;
                        const isBest = i === 0;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`stat-card relative ${isBest ? 'ring-2 ring-primary/30' : ''}`}
                          >
                            {isBest && (
                              <span className="absolute -top-2.5 left-4 px-2 py-0.5 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                                ✨ Best Option
                              </span>
                            )}
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                                <Icon className={`w-5 h-5 ${cfg.color}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-foreground font-display">{suggestion.title}</p>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} font-medium`}>
                                    {cfg.label}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{suggestion.description}</p>
                              </div>
                            </div>
                            {suggestion.type === 'sell' && result.estimatedPrice && (
                              <Button
                                size="sm"
                                className="mt-3 ml-13 gradient-eco text-primary-foreground border-0"
                                onClick={() => navigate('/dashboard/upload')}
                              >
                                <ShoppingBag className="w-3.5 h-3.5 mr-1" /> List on Marketplace · ₹{result.estimatedPrice}/kg
                              </Button>
                            )}
                          </motion.div>
                        );
                      })}
                  </div>
                </div>

                {/* Try again */}
                <Button variant="outline" className="w-full" onClick={reset}>
                  Classify Another Item
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ClassifyWaste;
