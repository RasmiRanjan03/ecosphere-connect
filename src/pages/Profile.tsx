import { motion } from 'framer-motion';
import { User, Mail, MapPin, Award, Recycle, Calendar, Edit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="page-container max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Profile Header */}
        <div className="stat-card text-center mb-6">
          <div className="w-20 h-20 rounded-full gradient-eco flex items-center justify-center text-primary-foreground text-3xl font-bold mx-auto mb-4">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <h1 className="text-2xl font-bold font-display">{user?.name || 'User'}</h1>
          <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1">
            <Mail className="w-4 h-4" /> {user?.email || 'user@example.com'}
          </p>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="w-3.5 h-3.5" /> Sector 15, Noida
          </div>
          <span className="eco-badge-success mt-3 inline-flex">{user?.role === 'recycler' ? '♻️ Recycler' : '🏠 User'}</span>
          <div className="mt-4">
            <Button variant="outline" size="sm"><Edit className="w-3.5 h-3.5 mr-1" /> Edit Profile</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="stat-card text-center">
            <Award className="w-6 h-6 text-warning mx-auto mb-1" />
            <p className="text-xl font-bold font-display">{user?.greenPoints?.toLocaleString() || '1,250'}</p>
            <p className="text-xs text-muted-foreground">Green Points</p>
          </div>
          <div className="stat-card text-center">
            <Recycle className="w-6 h-6 text-primary mx-auto mb-1" />
            <p className="text-xl font-bold font-display">34</p>
            <p className="text-xs text-muted-foreground">Items Recycled</p>
          </div>
          <div className="stat-card text-center">
            <Calendar className="w-6 h-6 text-secondary mx-auto mb-1" />
            <p className="text-xl font-bold font-display">12</p>
            <p className="text-xs text-muted-foreground">Drives Joined</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="stat-card mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold font-display">Level Progress</span>
            <span className="text-sm text-primary font-medium">Level 5 → 6</span>
          </div>
          <Progress value={62} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">750 more points to next level</p>
        </div>

        {/* Badges */}
        <div className="stat-card">
          <h3 className="font-semibold font-display mb-3">Badges Earned</h3>
          <div className="flex flex-wrap gap-3">
            {['🌱 First Upload', '♻️ Recycler Pro', '🏆 Top 10', '🧹 Cleanup Hero', '📍 Map Pioneer'].map((b) => (
              <span key={b} className="eco-badge-success">{b}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
