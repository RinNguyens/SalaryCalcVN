'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface UserAvatar {
  name: string;
  avatar: string;
}

interface UserAvatarsProps {
  users: UserAvatar[];
  count: number;
}

export function UserAvatars({ users, count }: UserAvatarsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {users.map((user, index) => (
          <motion.div
            key={index}
            className="relative group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ zIndex: 10, scale: 1.1 }}
          >
            <div className="w-8 h-8 rounded-full border-2 border-white/20 overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.style.background = 'linear-gradient(to bottom right, #a855f7, #ec4899)';
                }}
              />
            </div>
            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
              {user.name}
            </div>
          </motion.div>
        ))}
      </div>
      <span className="text-black/80 text-sm">{count.toLocaleString('vi-VN')}+ đánh giá 5 sao</span>
    </div>
  );
}