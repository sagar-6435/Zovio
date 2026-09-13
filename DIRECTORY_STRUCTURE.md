# Directory Structure for Icons & Splash Screens

## Before Setup (What Exists)
```
zovio/
├── assets/                          # ← NEW FOLDER (created)
│   └── images/                      # ← NEW FOLDER (created)
│       ├── favicon.png              # ← COPY YOUR LOGO HERE
│       └── splash_logo.png          # ← COPY YOUR LOGO HERE
├── lib/
│   ├── main.dart                    # ✓ UPDATED with splash screen
│   ├── core/
│   │   └── theme/
│   │       ├── app_theme.dart
│   │       └── app_colors.dart
│   └── ...
├── web/
│   ├── index.html                   # ✓ Already references favicon
│   ├── favicon.png                  # ← Generated here
│   ├── icons/                       # ← Generated icons here
│   ├── splash/                      # ← Generated splash here
│   └── manifest.json
├── android/
│   └── app/src/main/res/
│       ├── mipmap-hdpi/
│       ├── mipmap-mdpi/
│       ├── mipmap-xhdpi/
│       ├── mipmap-xxhdpi/
│       └── mipmap-xxxhdpi/
│           └── ic_launcher.png      # ← Generated for each density
├── ios/
│   └── Runner/Assets.xcassets/
│       ├── AppIcon.appiconset/      # ← Generated icons here
│       └── LaunchImage.imageset/    # ← Generated splash here
├── windows/
│   └── runner/resources/
│       └── app_icon.ico             # ← Generated here
├── macos/
│   └── Runner/Assets.xcassets/
│       └── AppIcon.appiconset/      # ← Generated here
├── linux/
│   └── linux/                       # ← Icons generated here
├── pubspec.yaml                     # ✓ UPDATED with dependencies
├── pubspec.lock                     # ✓ Updated automatically
│
├── 📄 ICON_SETUP.md                 # ← NEW Guide
├── 📄 SETUP_SUMMARY.md              # ← NEW Complete overview
├── 📄 ICON_QUICK_START.md           # ← NEW Quick reference
├── 📄 DIRECTORY_STRUCTURE.md        # ← NEW (this file)
├── 📄 SAVE_LOGO_HERE.txt            # ← NEW Reminder
└── 🔨 generate_icons.bat            # ← NEW Windows helper script
```

## Step-by-Step

### 1. Create Assets Directory ✓
```
assets/
└── images/
    ├── favicon.png       # Your logo here (1024x1024 PNG recommended)
    └── splash_logo.png   # Your logo here (same image)
```

### 2. Generated Web Assets
```
web/
├── favicon.png           # Updated with your logo
├── icons/
│   ├── Icon-192.png
│   ├── Icon-512.png
│   ├── Icon-maskable-192.png
│   └── Icon-maskable-512.png
├── splash/
│   ├── splash-540-960.png
│   ├── splash-1080-1920.png
│   └── ... (responsive sizes)
├── manifest.json         # References all icons
└── index.html
```

### 3. Generated Android Assets
```
android/app/src/main/res/
├── mipmap-ldpi/
│   └── ic_launcher.png
├── mipmap-mdpi/
│   └── ic_launcher.png
├── mipmap-hdpi/
│   └── ic_launcher.png
├── mipmap-xhdpi/
│   └── ic_launcher.png
├── mipmap-xxhdpi/
│   └── ic_launcher.png
└── mipmap-xxxhdpi/
    └── ic_launcher.png
```

### 4. Generated iOS Assets
```
ios/Runner/Assets.xcassets/
├── AppIcon.appiconset/
│   ├── Icon-App-20x20@1x.png
│   ├── Icon-App-20x20@2x.png
│   ├── Icon-App-20x20@3x.png
│   ├── Icon-App-29x29@1x.png
│   ├── Icon-App-29x29@2x.png
│   ├── Icon-App-29x29@3x.png
│   ├── Icon-App-40x40@1x.png
│   ├── Icon-App-40x40@2x.png
│   ├── Icon-App-40x40@3x.png
│   ├── Icon-App-60x60@2x.png
│   ├── Icon-App-60x60@3x.png
│   ├── Icon-App-76x76@1x.png
│   ├── Icon-App-76x76@2x.png
│   ├── Icon-App-83.5x83.5@2x.png
│   ├── Icon-App-1024x1024@1x.png
│   └── Contents.json
└── LaunchImage.imageset/
    ├── LaunchImage.png
    ├── LaunchImage@2x.png
    ├── LaunchImage@3x.png
    └── Contents.json
```

### 5. Generated Windows Assets
```
windows/runner/resources/
└── app_icon.ico          # Generated from your logo
```

### 6. Generated macOS Assets
```
macos/Runner/Assets.xcassets/
└── AppIcon.appiconset/
    ├── app_icon_16.png
    ├── app_icon_32.png
    ├── app_icon_64.png
    ├── app_icon_128.png
    ├── app_icon_256.png
    ├── app_icon_512.png
    ├── app_icon_1024.png
    └── Contents.json
```

### 7. Generated Linux Assets
```
linux/
├── flutter/
└── ... (various icon configurations)
```

## Key Files You Need to Know

| File | Purpose | Status |
|------|---------|--------|
| `assets/images/favicon.png` | Source logo | ⚠️ **YOU NEED TO ADD THIS** |
| `assets/images/splash_logo.png` | Source splash | ⚠️ **YOU NEED TO ADD THIS** |
| `pubspec.yaml` | Configuration | ✅ Already configured |
| `lib/main.dart` | Splash initialization | ✅ Already updated |
| `generate_icons.bat` | Generator script | ✅ Ready to use |

## Do NOT Manually Edit

❌ Don't manually edit these files - they're auto-generated:
- All files in `web/icons/`
- All files in `web/splash/`
- All files in `android/app/src/main/res/mipmap-*/`
- All `AppIcon.appiconset/` files
- All platform-specific icon directories

## Recovery If Something Goes Wrong

If icon generation breaks something:

```powershell
git restore android/          # Restore Android
git restore ios/              # Restore iOS
git restore windows/          # Restore Windows
git restore web/              # Restore Web
flutter clean                 # Clean build
dart run flutter_launcher_icons  # Regenerate
dart run flutter_native_splash:create
```

---

**Last Updated:** September 11, 2026
**Flutter Project:** Zovio v1.0.0
