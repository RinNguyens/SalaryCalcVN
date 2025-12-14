# User Avatars

This directory contains user profile pictures for the hero section.

## Structure

```
avatars/
├── README.md
├── user-1.jpg     # Nguyễn Văn A
├── user-2.jpg     # Trần Thị B
├── user-3.jpg     # Lê Văn C
├── user-4.jpg     # Phạm Thị D
└── placeholder/   # Additional avatars if needed
    ├── user-5.jpg
    └── user-6.jpg
```

## Avatar Specifications

- **Dimensions**: 32x32 px minimum (higher resolution supported)
- **Format**: JPG, PNG, or WebP
- **Style**: Professional headshots
- **Background**: Clean, preferably light background
- **Size**: Each file < 50KB

## Implementation Notes

1. The UserAvatars component automatically handles image loading errors
2. Fallback to gradient if image fails to load
3. Supports hover tooltips with user names
4. Shows overflow count (+N) if total users > displayed avatars
5. Smooth animations on load and hover

## To Add Real Avatars

1. Replace placeholder files with actual user photos
2. Update the `userReviews` array in `app/page.tsx` with real names
3. Ensure images are optimized for web

## Alternative: Use DiceBear API

For placeholder avatars, you can use services like:
- DiceBear: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
- UI Avatars: `https://ui-avatars.com/api/?name=${userName}&background=random`

Example usage in the array:
```javascript
const userReviews = [
  { name: 'Nguyễn Văn A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nguyen-van-a' },
  { name: 'Trần Thị B', avatar: 'https://ui-avatars.com/api/?name=Trần+Thị+B&background=a0a0a0' },
];
```