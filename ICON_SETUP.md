# Icon & Splash Screen Setup Guide

This guide will help you use the Zovio logo for favicon, app icons, and splash screens.

## Step 1: Save the Logo Image

Save the provided logo image to the following locations:
- **`assets/images/favicon.png`** - Main icon file (1024x1024 recommended)
- **`assets/images/splash_logo.png`** - Splash screen logo (same image works fine)

## Step 2: Install Dependencies

Already added to `pubspec.yaml`:
- `flutter_launcher_icons: ^0.13.1` - Generates app icons for all platforms
- `flutter_native_splash: ^2.3.11` - Generates splash screens

Run:
```bash
flutter pub get
```

## Step 3: Generate Icons for All Platforms

Run the following commands:

### Generate App Icons (Favicon, iOS, Android, Web, Desktop)
```bash
dart run flutter_launcher_icons
```

### Generate Splash Screens
```bash
dart run flutter_native_splash:create
```

## What Gets Generated

### Android Icons
- `android/app/src/main/res/mipmap-*/ic_launcher.png` (multiple resolutions)

### iOS Icons
- `ios/Runner/Assets.xcassets/AppIcon.appiconset/` (multiple sizes)

### Web Favicon
- `web/favicon.png`
- `web/icons/` (auto-generated web icons)

### Web Splash Screen
- `web/splash/` (splash screen assets)

### Windows/macOS/Linux
- Platform-specific icon directories

## Step 4: Update Web Manifest (Optional)

The `web/manifest.json` has been automatically configured with icon references.

## Step 5: Main App Setup

To show the splash screen on app startup, update your `lib/main.dart`:

```dart
import 'package:flutter_native_splash/flutter_native_splash.dart';

void main() {
  WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  runApp(const MyApp());
  
  // Hide splash screen after app loads
  Future.delayed(const Duration(seconds: 2), () {
    FlutterNativeSplash.remove();
  });
}
```

## Platform-Specific Notes

### Android
- Icons are automatically placed in mipmap folders
- Splash screen uses `android/app/src/main/res/`

### iOS
- Icons are added to Assets.xcassets
- Splash screen uses LaunchScreen.storyboard

### Web
- Favicon displays in browser tab
- Splash screen shows while app loads

### Windows/macOS/Linux
- Icons are automatically configured

## Next Steps

1. Copy the logo image to `assets/images/`
2. Run `flutter pub get`
3. Run `dart run flutter_launcher_icons`
4. Run `dart run flutter_native_splash:create`
5. Update `main.dart` with splash screen handling
6. Run `flutter run` or build for your target platform

## Troubleshooting

- **Icons not updating**: Delete `build/` folder and run again
- **Splash screen not showing**: Make sure `flutter_native_splash` ran successfully
- **Web favicon not updating**: Clear browser cache and restart dev server
