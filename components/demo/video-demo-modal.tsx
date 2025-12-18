'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  autoPlay?: boolean;
}

export function VideoDemoModal({
  isOpen,
  onClose,
  videoUrl,
  title = 'SalaryLens Demo',
  description = 'Xem cách sử dụng công cụ tính lương',
  thumbnail,
  autoPlay = true,
}: VideoDemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play when modal opens
  useEffect(() => {
    if (isOpen && autoPlay && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isOpen, autoPlay]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Hide controls after inactivity
  useEffect(() => {
    if (!isPlaying || !isOpen) return;

    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowControls(true);
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    resetTimeout();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, isOpen]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        {/* Modal Container */}
        <motion.div
          className="relative w-full max-w-5xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          {/* Glass Card */}
          <div className="
            relative overflow-hidden rounded-3xl
            backdrop-blur-2xl bg-white/5
            border-2 border-white/10
            shadow-2xl
          ">
            {/* Header */}
            <motion.div
              className="p-6 border-b border-white/10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: showControls ? 1 : 0, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-1">
                    {title}
                  </h3>
                  <p className="text-black/70 text-sm">
                    {description}
                  </p>
                </div>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="
                    rounded-full bg-white/10 hover:bg-white/20
                    text-black border-2 border-white/20
                    hover:border-white/30
                  "
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </motion.div>

            {/* Video Container */}
            <div
              className="relative aspect-video bg-black/50"
              onMouseMove={() => setShowControls(true)}
            >
              {/* Video Element */}
              <video
                ref={videoRef}
                src={videoUrl}
                poster={thumbnail}
                className="w-full h-full object-contain"
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Play Overlay (when paused) */}
              {!isPlaying && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.button
                    onClick={togglePlay}
                    className="
                      w-24 h-24 rounded-full
                      bg-white/20 backdrop-blur-md
                      border-4 border-white/30
                      flex items-center justify-center
                      hover:bg-white/30 hover:scale-110
                      transition-all duration-300
                      group
                    "
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="h-12 w-12 text-black ml-2" fill="white" />
                  </motion.button>
                </motion.div>
              )}

              {/* Video Controls */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Play/Pause */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={togglePlay}
                        className="text-black hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                        ) : (
                          <Play className="h-6 w-6" fill="currentColor" />
                        )}
                      </Button>

                      {/* Mute/Unmute */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMute}
                        className="text-black hover:bg-white/20"
                      >
                        {isMuted ? (
                          <VolumeX className="h-6 w-6" />
                        ) : (
                          <Volume2 className="h-6 w-6" />
                        )}
                      </Button>

                      {/* Progress Bar */}
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/80"
                          style={{
                            width: `${(videoRef.current?.currentTime || 0) / (videoRef.current?.duration || 1) * 100}%`
                          }}
                        />
                      </div>

                      {/* Fullscreen */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreen}
                        className="text-black hover:bg-white/20"
                      >
                        {isFullscreen ? (
                          <Minimize className="h-6 w-6" />
                        ) : (
                          <Maximize className="h-6 w-6" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer with Tips */}
            <motion.div
              className="p-4 bg-white/5 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between text-sm text-black/60">
                <span>
                  💡 Tips: Nhấn <kbd className="px-2 py-1 rounded bg-white/10">Space</kbd> để play/pause,{' '}
                  <kbd className="px-2 py-1 rounded bg-white/10">F</kbd> fullscreen,{' '}
                  <kbd className="px-2 py-1 rounded bg-white/10">ESC</kbd> để đóng
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}