# Zovio Icon & Splash Screen Setup - Complete ✓

Your Flutter project has been configured to use the Zovio logo for favicon, app icons, and splash screens across all platforms.

## What's Been Done

### 1. ✓ Dependencies Added
- `flutter_launcher_icons: ^0.13.1` - Generates app icons for all platforms
- `flutter_native_splash: ^2.3.11` - Generates native splash screens

### 2. ✓ Main App Updated
- `lib/main.dart` now includes splash screen initialization
- Splash screen will display for 2 seconds on app startup
- Automatically hides after app loads

### 3. ✓ Configuration Files
- `pubspec.yaml` configured with:
  - Asset paths for favicon and splash images
  - Icon generation settings for all 6 platforms
  - Splash screen settings with black background

### 4. ✓ Helper Scripts
- `generate_icons.bat` - One-click script to generate all icons
- `ICON_SETUP.md` - Detailed setup guide
- `SAVE_LOGO_HERE.txt` - Quick reference

## What You Need to Do

### Step 1: Save Your Logo Images
Copy the provided Zovio logo image to:

```
assets/images/favicon.png      (required)
assets/images/splash_logo.png  (same image works fine)
```

### Step 2: Generate Icons (Choose One)

**Option A: Windows Batch Script**
```bash
Double-click: generate_icons.bat
```

**Option B: Manual Commands**
```bash
flutter pub get
dart run flutter_launcher_icons
dart run flutter_native_splash:create
```

**Option C: From VS Code**
- Open Terminal
- Run commands from Option B

### Step 3: Build & Test
```bash
flutter run
```

## What Gets Generated

### ✓ Web
- `web/favicon.png` - Browser tab icon
- `web/icons/` - All web icon sizes
- `web/splash/` - Web splash screen

### ✓ Android
- `android/app/src/main/res/mipmap-*/ic_launcher.png` - All densities
- Splash screen in launch_screen configuration

### ✓ iOS
- `ios/Runner/Assets.xcassets/AppIcon.appiconset/` - All sizes
- Splash screen in LaunchScreen.storyboard

### ✓ Windows
- `windows/runner/resources/` - App icon

### ✓ macOS
- `macos/Runner/Assets.xcassets/AppIcon.appiconset/` - All sizes

### ✓ Linux
- `linux/` - App icon files

## Customization Options

### Change Splash Screen Duration
Edit `lib/main.dart`:
```dart
Future.delayed(const Duration(seconds: 3), () {  // Change 3 to your desired seconds
  FlutterNativeSplash.remove();
});
```

### Change Splash Screen Background Color
Edit `pubspec.yaml` in `flutter_native_splash` section:
```yaml
color: "#ffffff"  # Change to your preferred color
```

### Adjust Icon Appearance
For more options, edit `flutter_launcher_icons` section in `pubspec.yaml`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Icons not updating | Delete `build/` folder, run `flutter clean`, then retry |
| Splash doesn't show | Ensure `flutter_native_splash:create` completed successfully |
| Web favicon not updating | Clear browser cache, do hard refresh (Ctrl+Shift+R) |
| Generation fails | Ensure image files exist at correct paths as PNG |

## Platform-Specific Notes

### Web
- Favicon appears in browser tab
- Splash screen shows while index.html loads
- Both are served from `web/` directory

### Android & iOS
- Generated files should not be modified manually
- Regenerate if you change the source logo
- Test on actual devices for best results

### Windows/macOS/Linux
- Desktop apps will have properly sized icons
- Splash screens work on Windows and Linux
- macOS uses system app bundle conventions

## Next Commands

After saving your logo images:
```bash
cd c:\My projects\zovio
flutter pub get
dart run flutter_launcher_icons
dart run flutter_native_splash:create
flutter run
```

## Still Need Help?

Check the detailed guide: `ICON_SETUP.md`

---

**Setup Date:** September 11, 2026
**Zovio Version:** 1.0.0
