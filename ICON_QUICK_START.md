# 🚀 Quick Start - Icon Setup (5 Minutes)

## The Fastest Way to Get Started

### 1️⃣ Save Your Logo (1 minute)
Save the Zovio logo image to these two locations:
- `assets/images/favicon.png`
- `assets/images/splash_logo.png`

That's the same image saved twice, different names.

### 2️⃣ Run Generation (3 minutes)
On Windows, just double-click: **`generate_icons.bat`**

Or run manually in PowerShell:
```powershell
cd c:\My projects\zovio
flutter pub get
dart run flutter_launcher_icons
dart run flutter_native_splash:create
```

### 3️⃣ Test It (1 minute)
```powershell
flutter run
```

You should see:
- ✅ Splash screen with your logo for 2 seconds
- ✅ App loads normally
- ✅ Web favicon in browser tab (if testing web)

## What Just Happened?

| Platform | Generated Files | Used For |
|----------|-----------------|----------|
| **Web** | `web/favicon.png` + icons | Browser tab + splash |
| **Android** | `android/app/src/main/res/mipmap-*` | App icon + splash |
| **iOS** | `ios/Runner/Assets.xcassets/` | App icon + splash |
| **Windows** | `windows/runner/resources/` | App icon + splash |
| **macOS** | `macos/Runner/Assets.xcassets/` | App icon + splash |
| **Linux** | `linux/` folder | App icon + splash |

## All Done! 🎉

Your app now has:
- ✅ Professional app icons on all platforms
- ✅ Beautiful splash screen
- ✅ Web favicon
- ✅ Consistent branding

## If Something's Wrong

1. **Icons not showing**: 
   - Check that PNG files exist at: `assets/images/favicon.png`
   - Delete `build/` folder
   - Run `flutter clean`
   - Try again

2. **Splash takes too long**:
   - Edit `lib/main.dart`
   - Change `const Duration(seconds: 2)` to less

3. **Need to re-run**:
   - Just run the `generate_icons.bat` again anytime

## More Options

For advanced customization, see: **`ICON_SETUP.md`** or **`SETUP_SUMMARY.md`**
