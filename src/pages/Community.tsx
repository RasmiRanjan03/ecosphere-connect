import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Users, Camera, Send, TrendingUp, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockPosts = [
  {
    id: 1, user: 'Priya Sharma', avatar: '👩', time: '2h ago',
    text: 'Organized a cleanup drive at Sector 15! We collected 50kg of waste. Proud of our community! 💚',
    image: true, likes: 42, comments: 8,
  },
  {
    id: 2, user: 'Rahul Verma', avatar: '👨', time: '5h ago',
    text: 'Found illegal dumping near the lake. Reported to authorities. Let\'s keep our water bodies clean! 🏞️',
    image: false, likes: 28, comments: 12,
  },
  {
    id: 3, user: 'Ananya Patel', avatar: '👩‍🦱', time: '1d ago',
    text: 'Composting workshop this weekend! Learn how to turn kitchen waste into garden gold 🌱',
    image: true, likes: 65, comments: 15,
  },
];

const groups = [
  { name: 'Green City Warriors', members: 234, area: 'Delhi NCR' },
  { name: 'Beach Cleanup Crew', members: 156, area: 'Mumbai' },
  { name: 'Zero Waste Living', members: 412, area: 'Pan India' },
];

const Community = () => {
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title mb-1">Community</h1>
        <p className="text-muted-foreground mb-6">Connect with eco-warriors near you</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="stat-card text-center">
            <p className="text-2xl font-bold text-primary font-display">78%</p>
            <p className="text-xs text-muted-foreground">Area Score</p>
          </div>
          <div className="stat-card text-center">
            <p className="text-2xl font-bold text-secondary font-display">1.2k</p>
            <p className="text-xs text-muted-foreground">Participants</p>
          </div>
          <div className="stat-card text-center">
            <p className="text-2xl font-bold text-foreground font-display">45</p>
            <p className="text-xs text-muted-foreground">Drives</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Post input */}
            <div className="stat-card">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full gradient-eco flex items-center justify-center text-primary-foreground shrink-0">A</div>
                <div className="flex-1 space-y-3">
                  <Input placeholder="Share your eco activity..." className="bg-muted border-0" />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-1" /> Photo
                    </Button>
                    <Button size="sm" className="gradient-eco text-primary-foreground border-0 ml-auto">
                      <Send className="w-4 h-4 mr-1" /> Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {mockPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="stat-card"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{post.avatar}</span>
                  <div>
                    <p className="font-medium text-foreground">{post.user}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground mb-3">{post.text}</p>
                {post.image && (
                  <div className="bg-muted rounded-xl h-48 mb-3 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      liked.has(post.id) ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${liked.has(post.id) ? 'fill-current' : ''}`} />
                    {post.likes + (liked.has(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Groups */}
          <div>
            <h3 className="text-lg font-semibold mb-3 font-display">Local Groups</h3>
            <div className="space-y-3">
              {groups.map((g) => (
                <div key={g.name} className="stat-card">
                  <h4 className="font-medium text-foreground">{g.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{g.members}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{g.area}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Join Group
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Community;
