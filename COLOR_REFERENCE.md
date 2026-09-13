# Zovio Color Reference Guide

Quick reference for using colors in the Zovio Flutter app.

## Import Colors
```dart
import 'package:zovio/core/theme/app_colors.dart';
```

## Brand Colors

| Name | Hex | Usage | Dart Code |
|------|-----|-------|-----------|
| Cream Background | `#FCF6E9` | Main app background | `AppColors.cream` |
| Dark Navy | `#0D1B2E` | Text, navigation, headings | `AppColors.navy` |
| Primary Orange | `#E95A00` | Primary buttons, highlights | `AppColors.orange` |
| Primary Orange | `#E95A00` | Primary CTA buttons | `AppColors.primaryAction` |
| Primary Teal | `#009C98` | Trust, secondary actions | `AppColors.teal` |
| Primary Teal | `#009C98` | Secondary/trust button | `AppColors.secondaryAction` |
| Light Teal | `#A7E8E1` | Trust badges | `AppColors.lightTeal` |
| Soft Orange | `#FCE9D3` | Location badges | `AppColors.softOrange` |
| White | `#FFFFFF` | Cards, surfaces | `AppColors.white` |

## Text Colors

| Name | Usage | Dart Code |
|------|-------|-----------|
| Primary Text (Navy) | Headings, important text | `AppColors.textPrimary` |
| Secondary Text | Body text, descriptions | `AppColors.textSecondary` |
| Tertiary Text | Muted text | `AppColors.textTertiary` |

## Functional Colors

| Element | Color | Dart Code |
|---------|-------|-----------|
| Background | Cream | `AppColors.background` |
| Card/Surface | White | `AppColors.surface` |
| Border | Soft border | `AppColors.border` |
| Divider | Muted | `AppColors.divider` |
| Success | Green | `AppColors.success` |
| Warning | Amber | `AppColors.warning` |
| Error | Red | `AppColors.error` |
| Info | Teal | `AppColors.info` |

## Common Patterns

### Heading Text
```dart
Text(
  'Your Heading',
  style: TextStyle(color: AppColors.navy),
)
```

### Body Text
```dart
Text(
  'Your content',
  style: TextStyle(color: AppColors.textSecondary),
)
```

### Primary Button
```dart
ElevatedButton(
  onPressed: () {},
  child: Text('Click me'),
  // Already styled with orange background in theme
)
```

### Secondary Button
```dart
OutlinedButton(
  onPressed: () {},
  child: Text('Click me'),
  // Already styled with border in theme
)
```

### Card Container
```dart
Container(
  color: AppColors.surface, // White
  child: // Your content
)
```

### Card with Border
```dart
Container(
  color: AppColors.surface,
  decoration: BoxDecoration(
    border: Border.all(color: AppColors.border),
    borderRadius: BorderRadius.circular(16),
  ),
  child: // Your content
)
```

### Trust Badge
```dart
ZovioBadge(
  label: '✦ TRUSTED AROUND YOU',
  style: ZovioBadgeStyle.trust,
  // Background: Light Teal (#A7E8E1)
  // Text: Teal (#009C98)
)
```

### Location Badge
```dart
ZovioBadge(
  label: 'Your Location',
  style: ZovioBadgeStyle.location,
  // Background: Soft Orange (#FCE9D3)
  // Text: Orange (#E95A00)
)
```

### Error Text
```dart
Text(
  'Error message',
  style: TextStyle(color: AppColors.error),
)
```

### Success Text
```dart
Text(
  'Success!',
  style: TextStyle(color: AppColors.success),
)
```

## Hex to Dart Color Conversion

To create a custom color:
```dart
static const Color myColor = Color(0xFFHEXCODE);
```

Example: `#FCF6E9` becomes `Color(0xFFFCF6E9)`

## Theme Integration

All standard Flutter widgets are pre-styled:

```dart
// Automatically uses theme colors:
ElevatedButton(...) // Orange background
OutlinedButton(...) // Navy text, soft border
Text(...) // Dark navy headings, secondary gray body
Card(...) // White with soft border
TextField(...) // White with soft border, teal focus
```

## No Need to Specify Colors For:
- Button text color (pre-defined)
- Button background (pre-defined)
- Text in headings (uses theme)
- Input field borders (uses theme)
- Card styling (uses theme)

Just use the component, colors are automatic!
