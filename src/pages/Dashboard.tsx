import { motion } from 'framer-motion';
import { Leaf, Wind, Droplets, TrendingUp, Recycle, MapPin, Upload, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Area Cleanliness', value: '78%', icon: Leaf, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Pollution Risk', value: 'Medium', icon: Wind, color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Green Points', value: '1,250', icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/10' },
  { label: 'Items Recycled', value: '34', icon: Recycle, color: 'text-primary', bg: 'bg-primary/10' },
];

const recentActivity = [
  { text: 'Classified 2kg plastic waste as Recyclable', time: '2 hours ago', icon: '♻️' },
  { text: 'Earned 50 points for community cleanup', time: '5 hours ago', icon: '🌟' },
  { text: 'Listed glass bottles in marketplace', time: '1 day ago', icon: '🛒' },
  { text: 'Reported new dustbin location', time: '2 days ago', icon: '📍' },
  { text: 'Joined "Green City Warriors" group', time: '3 days ago', icon: '👥' },
];

const quickActions = [
  { label: 'Upload Waste', icon: Upload, path: '/dashboard/upload', gradient: true },
  { label: 'Smart Map', icon: MapPin, path: '/dashboard/map' },
  { label: 'Community', icon: Users, path: '/dashboard/community' },
  { label: 'Health Risks', icon: Droplets, path: '/dashboard/disease' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      {/* Welcome */}
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="mb-6">
          <h1 className="page-title">Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋</h1>
          <p className="text-muted-foreground mt-1">Here's your environmental impact overview</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="mb-6">
          <h3 className="text-lg font-semibold mb-3 font-display">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.path}>
                <Button
                  variant="outline"
                  className={`w-full h-auto py-4 flex flex-col gap-2 ${
                    action.gradient ? 'gradient-eco text-primary-foreground border-0 hover:opacity-90' : ''
                  }`}
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={item}>
          <h3 className="text-lg font-semibold mb-3 font-display">Recent Activity</h3>
          <div className="bg-card rounded-xl border border-border/50 divide-y divide-border/50">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
