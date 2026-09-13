# Zovio Flutter Design System

## Overview
The Zovio Flutter app now implements a complete design system based on the Zovio brand visual identity. The system features warm, premium colors with a focus on trustworthiness and human-centered design.

## Color Palette

### Primary Brand Colors
- **Warm Cream Background** (`#FCF6E9`) - Main application background
- **Dark Navy** (`#0D1B2E`) - Headlines, navigation, strong contrast elements
- **Primary Orange** (`#E95A00`) - Primary CTAs, important highlights, active actions
- **Primary Teal** (`#009C98`) - Trust indicators, secondary actions, information
- **Light Teal** (`#A7E8E1`) - Trust badges, background highlights
- **Soft Orange** (`#FCE9D3`) - Location badges, promotional elements

### Surfaces & Text
- **White** (`#FFFFFF`) - Cards, input fields, modals, elevated surfaces
- **Secondary Text** (`#526579`) - Body text, descriptions, secondary information
- **Border** (`#E8DDCC`) - Soft borders, subtle dividers
- **Muted Background** (`#F5EEDF`) - Disabled states, subtle backgrounds

### Status Colors
- **Success** (`#238636`) - Success messages
- **Warning** (`#D97706`) - Warning messages
- **Error** (`#DC2626`) - Error messages
- **Info** (`#009C98`) - Information (using teal)

## Color Usage

| Element | Color | Usage |
|---------|-------|-------|
| Page Background | Cream | Main scaffold background |
| Headings (H1, H2) | Navy | Large, bold typography |
| Body Text | Secondary Text | Regular content |
| Primary Buttons | Orange | Main call-to-action |
| Secondary Buttons | Teal | Secondary actions |
| Cards | White | Content containers |
| Borders | Soft Border | Subtle dividers |
| Trust Badges | Light Teal | Trust indicators |
| Location Badges | Soft Orange | Location/region badges |

## Typography

### Hierarchy
- **Display** (57px, bold, navy) - Page titles, hero sections
- **Headline** (28-32px, bold, navy) - Section titles
- **Title** (16-22px, semi-bold, navy) - Card titles, important labels
- **Body** (14-16px, regular, secondary text) - Main content, descriptions
- **Label** (11-14px, semi-bold, navy) - Buttons, badges, small labels

### Font Weight
- 700 (Bold) - Display, Headlines, Titles
- 600 (Semi-bold) - Labels, Button text
- 400 (Regular) - Body text

## Components

### Button Styles

#### Primary Button
```dart
ElevatedButton(
  style: ElevatedButton.styleFrom(
    backgroundColor: AppColors.primaryAction, // Orange
    foregroundColor: AppColors.white,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(16),
    ),
  ),
)
```

#### Secondary Button
```dart
OutlinedButton(
  style: OutlinedButton.styleFrom(
    foregroundColor: AppColors.textPrimary, // Navy
    side: BorderSide(color: AppColors.border),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(16),
    ),
  ),
)
```

#### Teal Action Button
```dart
ElevatedButton(
  style: ElevatedButton.styleFrom(
    backgroundColor: AppColors.secondaryAction, // Teal
    foregroundColor: AppColors.white,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(16),
    ),
  ),
)
```

### Card Style
- Background: White
- Border Radius: 16px
- Border: 1px soft border (`#E8DDCC`)
- Shadow: Minimal (opacity: 0.02, blur: 4px)
- Padding: 16-24px

### Input Fields
- Background: White
- Border: Soft (`#E8DDCC`)
- Focus Border: Teal with 2px width
- Border Radius: 14px
- Padding: 12px vertical, 16px horizontal

### Badges

#### Trust Badge
```dart
ZovioBadge(
  label: '✦ TRUSTED AROUND YOU',
  style: ZovioBadgeStyle.trust,
)
```
- Background: Light Teal (`#A7E8E1`)
- Text: Teal (`#009C98`)
- Shape: Rounded pill

#### Location Badge
```dart
ZovioBadge(
  label: 'Kakinada',
  style: ZovioBadgeStyle.location,
)
```
- Background: Soft Orange (`#FCE9D3`)
- Text: Orange (`#E95A00`)
- Shape: Rounded pill

## Files

### Core Theme Files
- `lib/core/theme/app_colors.dart` - Centralized color definitions
- `lib/core/theme/app_theme.dart` - Material theme configuration

### Reusable Widgets
- `lib/widgets/common/zovio_button.dart` - Primary button component
- `lib/widgets/common/zovio_card.dart` - Card component with optional tap handler
- `lib/widgets/common/zovio_badge.dart` - Badge component with style variants
- `lib/widgets/common/zovio_app_bar.dart` - Custom app bar
- `lib/widgets/common/zovio_rating.dart` - Rating display component
- `lib/widgets/common/zovio_service_card.dart` - Service card component

## Design Principles

1. **Warm & Premium** - Use cream backgrounds and quality typography
2. **Trustworthy** - Teal elements indicate trust and verification
3. **Clear Hierarchy** - Large navy headings with secondary text
4. **Accessible** - High contrast ratios, generous spacing
5. **Local & Human** - Orange accents feel approachable and energetic
6. **Minimal Shadows** - Prefer borders over shadows for clean look
7. **Rounded Corners** - 14-16px border radius for modern feel

## Implementation Guidelines

### Using Colors
Always import `AppColors` from `core/theme/app_colors.dart`:
```dart
import 'package:zovio/core/theme/app_colors.dart';

Text(
  'Hello',
  style: TextStyle(color: AppColors.textPrimary),
)
```

### Using Typography
Use `Theme.of(context).textTheme`:
```dart
Text(
  'Heading',
  style: Theme.of(context).textTheme.headlineLarge,
)
```

### Using Buttons
Use Flutter's standard `ElevatedButton` and `OutlinedButton` - they're already styled:
```dart
ElevatedButton(
  onPressed: () {},
  child: Text('Click me'),
)
```

### Using Cards
Prefer the custom `ZovioCard` widget:
```dart
ZovioCard(
  child: Text('Content'),
  onTap: () {},
)
```

### Using Badges
Use `ZovioBadge` for indicators:
```dart
ZovioBadge(
  label: 'TRUSTED',
  style: ZovioBadgeStyle.trust,
)
```

## Responsive Design

The design system works across:
- **Mobile**: < 600px
- **Tablet**: 600–1023px
- **Desktop**: ≥ 1024px

Adapt layouts using responsive widgets and breakpoints, but maintain consistent color and typography.

## Do's and Don'ts

### Do's
✅ Use the centralized color system  
✅ Use the predefined text styles  
✅ Use 14-16px border radius for modern feel  
✅ Maintain generous spacing and padding  
✅ Use navy for important text  
✅ Use orange for primary CTAs  
✅ Use teal for trust/secondary actions  

### Don'ts
❌ Use purple, generic blue, or other brand colors  
❌ Use excessive gradients or shadows  
❌ Use tight spacing - embrace whitespace  
❌ Use hard shadows - prefer minimal or none  
❌ Mix old teal-only palette with new system  
❌ Scatter color values throughout the app  
❌ Use Material default colors - always use `AppColors`  

## Status

✅ Design system foundation complete  
✅ Color palette implemented  
✅ Typography configured  
✅ Button styles defined  
✅ Reusable widgets created  
✅ Project compiles without errors  
✅ Ready for screen implementation  

Next: Build Home screen, Services screen, and other UI components using this system.
