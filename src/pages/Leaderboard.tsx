import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, TrendingUp, MapPin } from 'lucide-react';

const topUsers = [
  { rank: 1, name: 'Priya Sharma', points: 4250, badge: 'Gold', avatar: '👩', items: 156 },
  { rank: 2, name: 'Rahul Verma', points: 3800, badge: 'Gold', avatar: '👨', items: 134 },
  { rank: 3, name: 'Ananya Patel', points: 3200, badge: 'Silver', avatar: '👩‍🦱', items: 98 },
  { rank: 4, name: 'Vikram Singh', points: 2900, badge: 'Silver', avatar: '👨‍🦲', items: 87 },
  { rank: 5, name: 'Meera Joshi', points: 2500, badge: 'Bronze', avatar: '👩‍🦰', items: 72 },
  { rank: 6, name: 'Arjun Sharma', points: 1250, badge: 'Bronze', avatar: '👨‍💼', items: 34 },
];

const cleanAreas = [
  { rank: 1, name: 'Koramangala, Bangalore', score: 92, trend: '+5%' },
  { rank: 2, name: 'Marine Drive, Mumbai', score: 88, trend: '+3%' },
  { rank: 3, name: 'Jubilee Hills, Hyderabad', score: 85, trend: '+7%' },
  { rank: 4, name: 'MG Road, Bangalore', score: 82, trend: '+2%' },
  { rank: 5, name: 'Banjara Hills, Hyderabad', score: 79, trend: '+4%' },
];

const badgeColors: Record<string, { bg: string; text: string; icon: typeof Trophy }> = {
  Gold: { bg: 'bg-warning/10', text: 'text-warning', icon: Trophy },
  Silver: { bg: 'bg-muted', text: 'text-muted-foreground', icon: Medal },
  Bronze: { bg: 'bg-accent/10', text: 'text-accent', icon: Award },
};

const Leaderboard = () => {
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title mb-1">Leaderboard</h1>
        <p className="text-muted-foreground mb-6">Top eco-warriors and cleanest areas</p>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-3 mb-8">
          {[topUsers[1], topUsers[0], topUsers[2]].map((user, i) => {
            const heights = ['h-28', 'h-36', 'h-24'];
            const sizes = ['text-3xl', 'text-4xl', 'text-3xl'];
            return (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <span className={`${sizes[i]} block mb-2`}>{user.avatar}</span>
                <p className="text-sm font-medium text-foreground truncate max-w-[100px]">{user.name.split(' ')[0]}</p>
                <p className="text-xs text-primary font-bold">{user.points.toLocaleString()} GP</p>
                <div className={`${heights[i]} w-20 md:w-28 rounded-t-xl gradient-eco mt-2 flex items-start justify-center pt-2`}>
                  <span className="text-primary-foreground text-lg font-bold">#{user.rank}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Full Rankings */}
          <div>
            <h3 className="text-lg font-semibold mb-3 font-display flex items-center gap-2">
              <Star className="w-5 h-5 text-warning" /> Top Contributors
            </h3>
            <div className="bg-card rounded-xl border border-border/50 divide-y divide-border/50">
              {topUsers.map((user, i) => {
                const badge = badgeColors[user.badge];
                const BadgeIcon = badge.icon;
                return (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-4"
                  >
                    <span className="text-lg font-bold text-muted-foreground w-6 text-center">#{user.rank}</span>
                    <span className="text-xl">{user.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.items} items recycled</p>
                    </div>
                    <div className={`${badge.bg} rounded-lg p-1.5`}>
                      <BadgeIcon className={`w-4 h-4 ${badge.text}`} />
                    </div>
                    <span className="text-sm font-bold text-primary">{user.points.toLocaleString()}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Cleanest Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-3 font-display flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> Cleanest Areas
            </h3>
            <div className="bg-card rounded-xl border border-border/50 divide-y divide-border/50">
              {cleanAreas.map((area, i) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4"
                >
                  <span className="text-lg font-bold text-muted-foreground w-6 text-center">#{area.rank}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{area.name}</p>
                    <p className="text-xs text-muted-foreground">Score: {area.score}/100</p>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-primary font-medium">
                    <TrendingUp className="w-3.5 h-3.5" /> {area.trend}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
