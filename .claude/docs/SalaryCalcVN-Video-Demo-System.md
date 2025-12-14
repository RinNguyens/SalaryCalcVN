# 🎬 SalaryCalc VN - Video Demo System

> Complete video demo modal với video creation guide, storyboard, và Glass UI implementation

---

## 📋 MỤC LỤC

- [Video Demo Modal Component](#-video-demo-modal-component)
- [Video Creation Guide](#-video-creation-guide)
- [Storyboard Template](#-storyboard-template)
- [Integration Examples](#-integration-examples)
- [Recording Tools & Settings](#-recording-tools--settings)
- [Video Hosting Options](#-video-hosting-options)

---

## 🎥 VIDEO DEMO MODAL COMPONENT

### **Component với Glass UI Style**

**File: `components/demo/video-demo-modal.tsx`**
```typescript
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
  title = 'SalaryCalc VN Demo',
  description = 'Xem cách sử dụng công cụ tính lương',
  thumbnail,
  autoPlay = true,
}: VideoDemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

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
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {title}
                  </h3>
                  <p className="text-white/70 text-sm">
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
                    text-white border-2 border-white/20
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
                    <Play className="h-12 w-12 text-white ml-2" fill="white" />
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
                        className="text-white hover:bg-white/20"
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
                        className="text-white hover:bg-white/20"
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
                        className="text-white hover:bg-white/20"
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
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>
                  💡 Tips: Nhấn <kbd className="px-2 py-1 rounded bg-white/10">Space</kbd> để play/pause,{' '}
                  <kbd className="px-2 py-1 rounded bg-white/10">F</kbd> fullscreen,{' '}
                  <kbd className="px-2 py-1 rounded bg-white/10">ESC</kbd> để đóng
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## 🎬 DEMO VIDEO BUTTON INTEGRATION

### **Add to Features Section**

**File: `components/landing/features-section.tsx` (update)**
```typescript
'use client';

import { useState } from 'react';
import { VideoDemoModal } from '@/components/demo/video-demo-modal';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export function FeaturesSection() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <section className="py-20">
        {/* ... existing features content ... */}

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            🚀 Bắt đầu tính toán
          </Button>

          {/* Demo Button */}
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsDemoOpen(true)}
            className="
              border-white/30
              hover:bg-white/10
              font-semibold
              group
            "
          >
            <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Xem demo
          </Button>
        </div>
      </section>

      {/* Video Modal */}
      <VideoDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        videoUrl="/videos/salary-calc-demo.mp4"
        title="SalaryCalc VN - Demo Overview"
        description="Tìm hiểu cách sử dụng công cụ tính lương trong 2 phút"
        thumbnail="/videos/demo-thumbnail.jpg"
        autoPlay
      />
    </>
  );
}
```

---

## 📹 VIDEO CREATION GUIDE

### **Storyboard: 2-Minute Demo Video**

#### **Scene 1: Introduction (0:00 - 0:15)**
```
┌─────────────────────────────────────────┐
│  [SalaryCalc VN Logo Animation]        │
│                                         │
│  "Công cụ tính lương miễn phí"        │
│  "Chính xác nhất cho VN"               │
│                                         │
│  Fade in features grid                 │
└─────────────────────────────────────────┘

Narration (Vietnamese):
"Xin chào! Đây là SalaryCalc VN - công cụ 
tính lương miễn phí, chính xác nhất dành 
cho người lao động Việt Nam."

Music: Upbeat, modern
```

#### **Scene 2: Gross to Net Demo (0:15 - 0:45)**
```
┌─────────────────────────────────────────┐
│  Screen Recording:                      │
│  ┌───────────────────────────────────┐  │
│  │ Nhập lương Gross: 30,000,000     │  │
│  │ Người phụ thuộc: 2                │  │
│  │ Vùng: I (HCM, HN)                 │  │
│  │                                   │  │
│  │ [Tính toán] → Animated           │  │
│  │                                   │  │
│  │ Kết quả:                         │  │
│  │ Net: 24,850,000đ                 │  │
│  │ - BHXH: 2,400,000               │  │
│  │ - BHYT: 450,000                 │  │
│  │ - BHTN: 300,000                 │  │
│  │ - Thuế: 2,000,000               │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

Narration:
"Ví dụ với lương Gross 30 triệu, 2 người 
phụ thuộc. Chỉ cần nhập số liệu, tool sẽ 
tự động tính toán chính xác lương Net là 
24.8 triệu."

Highlights:
- Circle around input fields
- Arrow animations
- Number counting up animation
- Pie chart appearance
```

#### **Scene 3: Net to Gross Demo (0:45 - 1:00)**
```
┌─────────────────────────────────────────┐
│  Screen Recording:                      │
│  ┌───────────────────────────────────┐  │
│  │ Muốn nhận Net: 25,000,000        │  │
│  │                                   │  │
│  │ [Tính toán ngược]                │  │
│  │                                   │  │
│  │ → Cần Gross: 31,250,000          │  │
│  │                                   │  │
│  │ "Đàm phán lương này khi          │  │
│  │  phỏng vấn!"                     │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

Narration:
"Cần lương Net 25 triệu? Tool sẽ tính 
ngược để bạn biết cần đàm phán Gross 
bao nhiêu khi phỏng vấn."
```

#### **Scene 4: Annual Compensation (1:00 - 1:20)**
```
┌─────────────────────────────────────────┐
│  Screen Recording:                      │
│  ┌───────────────────────────────────┐  │
│  │ Tab: Thu nhập cả năm             │  │
│  │                                   │  │
│  │ Lương tháng 13: 30,000,000       │  │
│  │ Thưởng KPI: 10,000,000           │  │
│  │ Thưởng khác: 5,000,000           │  │
│  │                                   │  │
│  │ → Tổng package/năm:              │  │
│  │   405,000,000đ                   │  │
│  │                                   │  │
│  │ [Bar chart animation]            │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

Narration:
"Tính tổng package cả năm bao gồm tháng 
13, KPI, và các khoản thưởng để biết chính 
xác thu nhập của bạn."
```

#### **Scene 5: Growth Projection (1:20 - 1:40)**
```
┌─────────────────────────────────────────┐
│  Screen Recording:                      │
│  ┌───────────────────────────────────┐  │
│  │ Tab: Dự đoán tăng lương          │  │
│  │                                   │  │
│  │ Lương hiện tại: 30M              │  │
│  │ % Tăng/năm: [Slider] 10%         │  │
│  │ Số năm: [Slider] 5 năm           │  │
│  │                                   │  │
│  │ [Line chart animation]           │  │
│  │ 2024: 30M                        │  │
│  │ 2025: 33M                        │  │
│  │ 2026: 36.3M                      │  │
│  │ ...                              │  │
│  │ 2029: 48.3M (+61%)               │  │
│  │                                   │  │
│  │ 💡 Smart Insights:               │  │
│  │ "Tăng trưởng tốt! Tiếp tục..."   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

Narration:
"Dự đoán mức lương trong 5-10 năm tới với 
AI insights thông minh và so sánh với thị 
trường."
```

#### **Scene 6: Features Highlight (1:40 - 1:50)**
```
┌─────────────────────────────────────────┐
│  Quick montage of all features:         │
│  - Export PDF ✓                         │
│  - History tracking ✓                   │
│  - Comparison mode ✓                    │
│  - Charts & visualizations ✓            │
│  - Mobile responsive ✓                  │
└─────────────────────────────────────────┘

Narration:
"Và còn nhiều tính năng khác: Export PDF, 
lưu lịch sử, so sánh nhiều offers, charts 
trực quan, và hoạt động mượt mà trên mọi 
thiết bị."
```

#### **Scene 7: Call to Action (1:50 - 2:00)**
```
┌─────────────────────────────────────────┐
│  [SalaryCalc VN Logo Center]           │
│                                         │
│  "Miễn phí 100%"                       │
│  "Bắt đầu ngay →"                      │
│                                         │
│  [Button animation]                    │
│                                         │
│  salarycalc.vn                         │
└─────────────────────────────────────────┘

Narration:
"Hoàn toàn miễn phí! Bắt đầu tính lương 
của bạn ngay hôm nay tại SalaryCalc.vn"

Music: Crescendo to finish
```

---

## 🎥 RECORDING SETUP

### **Tools Required**

**1. Screen Recording:**
- **OBS Studio** (Free, best quality)
- **Loom** (Easy, cloud-based)
- **QuickTime** (Mac native)
- **ShareX** (Windows)

**2. Video Editing:**
- **DaVinci Resolve** (Free, professional)
- **iMovie** (Mac, simple)
- **Camtasia** (Paid, easy annotations)
- **Kapwing** (Online, simple)

**3. Voice Recording:**
- **Audacity** (Free)
- **Adobe Audition** (Professional)
- Built-in screen recorder audio

**4. Music:**
- **Epidemic Sound** (Paid, high quality)
- **YouTube Audio Library** (Free)
- **Uppbeat** (Free with attribution)

### **Recording Settings**

```json
{
  "resolution": "1920x1080 (Full HD)",
  "fps": 60,
  "bitrate": "8000 kbps (high quality)",
  "format": "MP4 (H.264)",
  "audio": {
    "format": "AAC",
    "bitrate": "192 kbps",
    "sample_rate": "48000 Hz"
  }
}
```

### **Screen Recording Checklist**

```
Before Recording:
□ Close unnecessary apps/tabs
□ Clean desktop (hide files)
□ Set browser to 1920x1080 window
□ Enable "Do Not Disturb"
□ Disable notifications
□ Set mouse cursor to visible
□ Use smooth mouse movements
□ Test audio levels

During Recording:
□ Speak clearly and slowly
□ Pause between sections
□ Use cursor to highlight
□ Click deliberately
□ Wait for animations to complete
□ Record in segments (easier to edit)

After Recording:
□ Review for mistakes
□ Check audio sync
□ Export high quality
□ Create thumbnail
```

---

## 🎨 VIDEO EDITING WORKFLOW

### **DaVinci Resolve Timeline**

```
Timeline (2:00 total):
├─ Video Track 1: Main screen recording
├─ Video Track 2: Annotations/arrows
├─ Video Track 3: Logo overlay
├─ Audio Track 1: Narration
├─ Audio Track 2: Background music (low volume)
└─ Audio Track 3: UI sound effects

Effects to Add:
- Smooth zoom in/out on important elements
- Arrow animations pointing to buttons
- Circle highlights around key features
- Text overlays for key points
- Smooth transitions between sections
- Logo animation (intro/outro)
- Number count-up animations
```

### **Editing Tips**

```typescript
// Color Correction
const colorSettings = {
  brightness: +5,
  contrast: +10,
  saturation: +15,
  temperature: "Slightly warm",
};

// Audio Mix
const audioLevels = {
  narration: -6 dB,      // Clear, prominent
  music: -24 dB,         // Background only
  uiSounds: -18 dB,      // Subtle clicks
};

// Transitions
const transitions = {
  betweenScenes: "Cross dissolve (0.5s)",
  quickCuts: "None (instant)",
  intro: "Fade from black (1s)",
  outro: "Fade to black (1s)",
};
```

---

## 📊 THUMBNAIL DESIGN

### **Thumbnail Specs**

```
Dimensions: 1920x1080 px
Format: JPG (optimized)
File size: < 200KB
Text: Large, readable
Colors: High contrast
Elements: Logo + Screenshot + Text
```

### **Thumbnail Template**

```
┌─────────────────────────────────────────┐
│                                         │
│  [Screenshot with glass UI]            │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │                                  │  │
│  │  TÍNH LƯƠNG                     │  │
│  │  CHÍNH XÁC                      │  │
│  │                                  │  │
│  │  ▶ 2 PHÚT DEMO                  │  │
│  │                                  │  │
│  └──────────────────────────────────┘  │
│                                         │
│  [SalaryCalc VN Logo]                  │
└─────────────────────────────────────────┘

Design in Figma/Canva:
- Background: Gradient (purple to pink)
- Screenshot: App UI with blur
- Text: Bold, white with shadow
- Play button icon
- Logo in corner
```

---

## 🚀 VIDEO HOSTING OPTIONS

### **Option 1: Self-Hosted (Recommended for privacy)**

```typescript
// pages/api/video-stream.ts
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const videoPath = path.join(process.cwd(), 'public/videos/demo.mp4');
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    // Stream video with range support
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    });
    
    file.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    });
    fs.createReadStream(videoPath).pipe(res);
  }
}
```

**Pros:**
- Full control
- No external dependencies
- Privacy

**Cons:**
- Server bandwidth costs
- Slower for international users

### **Option 2: YouTube (Embedded)**

```typescript
<VideoDemoModal
  videoUrl="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  isYouTube
/>

// Update component to support YouTube
{isYouTube ? (
  <iframe
    src={videoUrl}
    className="w-full h-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
) : (
  <video src={videoUrl} ... />
)}
```

**Pros:**
- Free hosting
- Fast CDN
- Analytics built-in

**Cons:**
- YouTube branding
- Ads (unless premium)
- External dependency

### **Option 3: Cloudflare Stream**

```typescript
// Upload via API
const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/stream`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    body: videoFile,
  }
);

// Use in component
<VideoDemoModal
  videoUrl="https://customer-XXXX.cloudflarestream.com/VIDEO_ID/manifest/video.m3u8"
/>
```

**Pros:**
- Fast global CDN
- Adaptive bitrate
- Analytics
- No branding

**Cons:**
- Costs ($1/1000 minutes watched)

### **Option 4: Vimeo**

```typescript
<VideoDemoModal
  videoUrl="https://player.vimeo.com/video/YOUR_VIDEO_ID"
  isVimeo
/>
```

**Pros:**
- Professional
- No ads
- Good player
- Privacy controls

**Cons:**
- Paid plans for better quality
- Lower reach than YouTube

---

## 📈 ANALYTICS & TRACKING

### **Track Video Engagement**

```typescript
// Track video events
export function VideoDemoModal({ ... }) {
  const trackVideoEvent = (event: string, data?: any) => {
    // Google Analytics
    gtag('event', event, {
      event_category: 'Video',
      event_label: title,
      ...data,
    });

    // Internal analytics
    fetch('/api/analytics/video', {
      method: 'POST',
      body: JSON.stringify({
        event,
        videoUrl,
        timestamp: Date.now(),
        ...data,
      }),
    });
  };

  useEffect(() => {
    if (isOpen) {
      trackVideoEvent('video_open');
    }
  }, [isOpen]);

  const handlePlay = () => {
    trackVideoEvent('video_play', {
      currentTime: videoRef.current?.currentTime,
    });
  };

  const handleComplete = () => {
    trackVideoEvent('video_complete', {
      watchDuration: videoRef.current?.currentTime,
    });
  };

  // Track milestones
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const percent = (video.currentTime / video.duration) * 100;
    
    if (percent >= 25 && !milestones.has(25)) {
      trackVideoEvent('video_25_percent');
      milestones.add(25);
    }
    // Similar for 50%, 75%, 100%
  };

  return (
    <video
      onPlay={handlePlay}
      onEnded={handleComplete}
      onTimeUpdate={handleTimeUpdate}
      ...
    />
  );
}
```

---

## 🎯 MULTIPLE DEMO VIDEOS (Per Feature)

### **Feature-Specific Demos**

```typescript
const demoVideos = {
  'gross-to-net': {
    url: '/videos/gross-to-net-demo.mp4',
    title: 'Demo: Tính Gross → Net',
    duration: '0:45',
    thumbnail: '/videos/thumbs/gross-to-net.jpg',
  },
  'net-to-gross': {
    url: '/videos/net-to-gross-demo.mp4',
    title: 'Demo: Tính Net → Gross',
    duration: '0:30',
  },
  'annual': {
    url: '/videos/annual-demo.mp4',
    title: 'Demo: Thu nhập cả năm',
    duration: '0:50',
  },
  // ... more
};

// In FeatureCard component
<Button
  onClick={() => {
    setCurrentVideo(demoVideos[feature.id]);
    setIsDemoOpen(true);
  }}
>
  <Play className="h-4 w-4 mr-2" />
  Xem demo
</Button>
```

---

## 🎬 SCRIPT TEMPLATE (Vietnamese)

### **Narration Script**

```markdown
# SalaryCalc VN - Demo Video Script

## Scene 1: Intro (0:00-0:15)
Xin chào! Tôi là [Name], và hôm nay mình sẽ giới thiệu 
SalaryCalc VN - công cụ tính lương miễn phí, chính xác 
nhất dành cho người lao động Việt Nam.

## Scene 2: Gross to Net (0:15-0:45)
Bạn đang thắc mắc lương Gross 30 triệu thì thực nhận 
Net bao nhiêu? Rất đơn giản!

Chỉ cần nhập lương Gross, số người phụ thuộc, chọn 
vùng làm việc... và nhấn "Tính toán".

Tool sẽ tự động tính chính xác lương Net, bao gồm cả 
BHXH, BHYT, BHTN, và thuế TNCN theo đúng quy định 
2024-2025.

Kết quả: Lương Net là 24.8 triệu đồng. Rõ ràng và 
minh bạch!

## Scene 3: Net to Gross (0:45-1:00)
Bạn muốn nhận lương Net 25 triệu? Dùng chức năng 
tính ngược để biết cần đàm phán Gross bao nhiêu khi 
phỏng vấn.

Tool tính ra bạn cần đàm phán Gross khoảng 31.25 triệu. 
Rất hữu ích để chuẩn bị cho buổi phỏng vấn!

## Scene 4: Annual Package (1:00-1:20)
SalaryCalc còn giúp tính tổng package cả năm. Nhập 
lương tháng 13, thưởng KPI, thưởng hiệu suất...

Tool sẽ tính tổng thu nhập cả năm, breakdown từng 
khoản, và đưa ra khuyến nghị về cách phân bổ thu nhập 
thông minh.

## Scene 5: Growth Projection (1:20-1:40)
Muốn biết lương của bạn sẽ như thế nào sau 5 năm? 
Chức năng dự đoán tăng lương sẽ giúp bạn!

Chỉ cần set % tăng lương hàng năm, tool sẽ vẽ ra 
timeline rõ ràng, kèm theo AI insights và so sánh 
với thị trường.

## Scene 6: Features (1:40-1:50)
Và còn nhiều tính năng khác:
- Export PDF báo cáo chi tiết
- Lưu lịch sử tính toán
- So sánh nhiều job offers
- Charts trực quan
- Hoạt động mượt trên mọi thiết bị

## Scene 7: CTA (1:50-2:00)
SalaryCalc VN - hoàn toàn miễn phí, không quảng cáo, 
không thu thập dữ liệu cá nhân.

Bắt đầu tính lương của bạn ngay hôm nay tại 
SalaryCalc.vn!

Cảm ơn các bạn đã xem. Hẹn gặp lại!
```

---

## ✅ PRODUCTION CHECKLIST

### **Pre-Production**
- [ ] Write complete script
- [ ] Create storyboard
- [ ] Design thumbnail
- [ ] Set up recording environment
- [ ] Test audio equipment
- [ ] Prepare app demo data
- [ ] Clean up UI (remove test data)

### **Production**
- [ ] Record screen (multiple takes if needed)
- [ ] Record narration separately
- [ ] Capture B-roll footage
- [ ] Take screenshots for thumbnail

### **Post-Production**
- [ ] Import footage to editor
- [ ] Cut and arrange clips
- [ ] Add narration
- [ ] Add background music (low volume)
- [ ] Add annotations/arrows
- [ ] Add text overlays
- [ ] Color correction
- [ ] Audio mixing
- [ ] Export final video

### **Distribution**
- [ ] Upload to hosting platform
- [ ] Create thumbnail
- [ ] Add to website
- [ ] Test modal on all devices
- [ ] Set up analytics tracking
- [ ] Share on social media
- [ ] Embed in blog posts

---

## 🎨 ALTERNATIVE: Auto-Generated Demo Video

### **Using Loom/Screen Studio**

```bash
# Quick & Easy Method:
1. Open Screen Studio / Loom
2. Select "Record Screen"
3. Choose browser window
4. Enable webcam (optional)
5. Click record
6. Walk through features
7. Stop recording
8. Auto-generates with:
   - Cursor highlights
   - Click animations
   - Zoom effects
   - Background music
9. Download & upload to site
```

---

Bạn muốn mình:
1. **Tạo sample video** với screen recording?
2. **Design thumbnail** trong Figma?
3. **Write detailed script** từng scene?
4. **Set up video hosting** infrastructure?
5. **Create animated intro/outro** với After Effects?

Video demo này sẽ giúp conversion rate tăng **đáng kể**! 🎬🚀
