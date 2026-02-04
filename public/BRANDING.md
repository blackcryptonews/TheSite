# BlackCryptoNews Branding Assets

## Logo Files

### Primary Logo Icon
- **File:** `/public/images/logo-icon.png`
- **Size:** 1024x1024px
- **Usage:** Header, app icon, social media profile
- **Colors:** Gold (#FFD700), Purple (#BD00FF), Cyan (#00F0FF)
- **Background:** Transparent

### Full Logo with Text
- **File:** `/public/images/logo-full.png`
- **Size:** 1920x1080px
- **Usage:** Open Graph images, Twitter cards, banners
- **Background:** Dark (works on black backgrounds)

### BCN Icon (High Resolution)
- **File:** `/public/icons/bcn-icon.png`
- **Size:** 1024x1024px
- **Usage:** High-res displays, print materials
- **Background:** Transparent

## Favicon Files

### Multi-Size Favicon
- **File:** `/public/favicon.ico`
- **Sizes:** 16x16, 24x24, 32x32, 48x48, 64x64, 128x128, 256x256
- **Usage:** Browser tabs, bookmarks
- **Format:** ICO with multiple embedded sizes

### PNG Favicons
- `/public/icons/favicon-512.png` - 512x512px
- `/public/icons/icon-192.png` - 192x192px (PWA)
- `/public/icons/icon-512.png` - 512x512px (PWA)
- `/public/icons/apple-touch-icon.png` - 180x180px (iOS)

## Color Palette

The BCN logo uses the official brand colors:

```css
--onyx: #050505;           /* Background */
--electric-purple: #BD00FF; /* Primary brand color */
--cyber-blue: #00F0FF;      /* Secondary brand color */
--gold: #FFD700;            /* Accent/highlight */
--silver: #C8C8C8;          /* Text/secondary */
```

## Logo Design Elements

The BCN logo features:
- **Bold "B" letterform** in gold gradient
- **Stylized blockchain/tech elements** in purple and cyan
- **Circular badge** with hexagonal tech patterns
- **Glowing effects** suggesting digital innovation
- **Circuit board details** for blockchain theme

## Usage Guidelines

### ✅ DO:
- Use on dark backgrounds (#050505 preferred)
- Maintain aspect ratio when resizing
- Keep clear space around logo (minimum 20px)
- Use high-res versions for print/large displays
- Use favicon.ico for browser compatibility

### ❌ DON'T:
- Stretch or distort the logo
- Change the colors
- Add shadows or effects
- Place on busy backgrounds
- Use low-res versions for large displays

## File Structure

```
public/
├── favicon.ico                    ← Multi-size browser favicon
├── icons/
│   ├── favicon-512.png           ← 512px favicon
│   ├── bcn-icon.png              ← High-res icon
│   ├── icon-192.png              ← PWA icon (192px)
│   ├── icon-512.png              ← PWA icon (512px)
│   └── apple-touch-icon.png      ← iOS home screen icon
└── images/
    ├── logo-icon.png             ← Logo icon only
    └── logo-full.png             ← Logo with full text
```

## Integration Status

✅ **Header** - Logo integrated in navigation
✅ **Favicon** - Multi-size favicon.ico created
✅ **Metadata** - OpenGraph and Twitter cards configured
✅ **PWA Icons** - Mobile app icons ready
✅ **Apple Touch Icon** - iOS home screen ready

## Next Steps

1. **Add to Oracle Button** - Consider adding icon to "Ask The Oracle" button
2. **Loading Screen** - Use logo for loading animation
3. **404 Page** - Create branded error page with logo
4. **Email Templates** - Use logo in newsletter headers
5. **Social Media** - Use logo-full.png for social shares

## Technical Notes

- All icons are optimized PNGs
- Transparent backgrounds where appropriate
- Multiple sizes for different display contexts
- Next.js Image component ready
- Proper metadata for SEO and social sharing

---

**Brand Colors:** Gold • Purple • Cyan  
**Typography:** Space Grotesk • Orbitron • Inter  
**Theme:** Futuristic • Tech • Blockchain • Empowerment
