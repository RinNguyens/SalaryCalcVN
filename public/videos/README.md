# Videos Directory

This directory contains demo videos and thumbnails for SalaryCalc VN.

## Structure

```
videos/
├── README.md
├── salary-calc-demo.mp4     # Main demo video (2:00 duration)
├── demo-thumbnail.jpg       # Main demo thumbnail (1920x1080)
└── thumbs/                  # Feature-specific thumbnails
    ├── gross-to-net.jpg
    ├── net-to-gross.jpg
    ├── annual.jpg
    └── growth.jpg
```

## Video Specifications

- **Resolution**: 1920x1080 (Full HD)
- **FPS**: 60
- **Format**: MP4 (H.264)
- **Audio**: AAC, 192 kbps, 48kHz
- **Duration**: 2:00
- **File Size**: < 50MB (optimized for web)

## Thumbnail Specifications

- **Dimensions**: 1920x1080 px
- **Format**: JPG
- **File Size**: < 200KB
- **Compression**: Optimized for web

## Hosting Options

1. **Self-hosted** (default): Videos served from `/public/videos/`
2. **YouTube**: Embed YouTube video
3. **Cloudflare Stream**: Professional video CDN
4. **Vimeo**: Professional video hosting

## Next Steps

1. Create demo video following storyboard in `.claude/docs/SalaryCalcVN-Video-Demo-System.md`
2. Generate thumbnail image
3. Optimize video for web
4. Upload to directory
5. Test video modal functionality