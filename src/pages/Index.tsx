import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, Map, HeartPulse, Users, ArrowRight, Sparkles, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Sparkles, title: 'AI Waste Classification', desc: 'Upload waste images and get instant AI-powered classification' },
  { icon: Map, title: 'Smart Mapping', desc: 'Find dustbins, recycling centers, and compost pits nearby' },
  { icon: HeartPulse, title: 'Health Risk Analysis', desc: 'AI-predicted disease risks based on local pollution data' },
  { icon: Recycle, title: 'Waste Marketplace', desc: 'Buy and sell recyclable waste, earn green points' },
  { icon: Shield, title: 'Pollution Monitoring', desc: 'Real-time AQI tracking and pollution heatmaps' },
  { icon: Users, title: 'Community Drives', desc: 'Join local cleanup drives and compete on leaderboards' },
];

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50T+', label: 'Waste Classified' },
  { value: '200+', label: 'Areas Mapped' },
  { value: '95%', label: 'Accuracy' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-eco flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display text-foreground">EcoSphere</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button className="gradient-eco text-primary-foreground border-0">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 pb-24 max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="eco-badge-success mb-4 inline-flex">🌍 Smart Waste-to-Health Platform</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mt-4 leading-tight">
            Turn Waste Into <br />
            <span className="text-gradient-eco">Wellness</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
            AI-powered waste management, pollution monitoring, and disease risk awareness — all in one platform.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link to="/register">
              <Button size="lg" className="gradient-eco text-primary-foreground border-0 h-12 px-8 text-base">
                Start Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
        >
          {stats.map((s) => (
            <div key={s.label} className="stat-card text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary font-display">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            A complete ecosystem for waste management, health awareness, and community action
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="stat-card"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold font-display text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gradient-eco rounded-3xl p-12 text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Join thousands of eco-warriors making their cities cleaner and healthier.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            <span>EcoSphere © 2026</span>
          </div>
          <p>Smart Waste-to-Health Ecosystem</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
