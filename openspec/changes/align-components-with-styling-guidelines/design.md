# Design: Component Styling Guidelines Alignment

## Architecture Overview

This change aligns all UI components with the established styling guidelines documented in `docs/styling-guidelines.md`. The goal is to achieve complete visual consistency while maintaining the existing component functionality and design token structure.

## Current State Analysis

### Already Implemented
- Design tokens system (`colors.ts`, `layout.ts`)
- Basic component structure with proper imports
- Safe area handling for iOS devices
- Z-index management system

### Areas for Improvement
- **Background Patterns**: Some components still use hardcoded backgrounds instead of the standardized semi-transparent patterns
- **Border Radius**: Inconsistent border radius values across similar component types
- **Shadow Consistency**: Some components lack the standardized shadow patterns
- **Interactive Feedback**: Missing or inconsistent pressed state implementations
- **Sizing Standards**: Component heights and padding need alignment with guidelines

## Design Guidelines Implementation

### 1. Semi-Transparent Background Pattern
All control elements should use the established pattern:
```typescript
backgroundColor: 'rgba(0, 0, 0, 0.6)' // 60% opacity black
```

### 2. Modern Border Radius Standards
- Large containers: `borderRadius: 18`
- Small buttons: `borderRadius: 14`
- Tool buttons: `borderRadius: 20` (circular for 40px elements)

### 3. Consistent Shadow & Elevation
Standard shadow pattern for all interactive elements:
```typescript
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
```

### 4. Active State Enhancement
Enhanced shadows and accent color for active states:
```typescript
backgroundColor: Colors.ACCENT_COLOR, // #FFE32D
shadowColor: Colors.ACCENT_COLOR,
shadowOpacity: 0.4,
shadowRadius: 4,
elevation: 6,
```

### 5. Interactive Feedback Standards
All pressable elements should implement:
```typescript
// Pressed state
opacity: 0.8,
transform: [{ scale: 0.95 }],
```

## Component-Specific Patterns

### Control Container Pattern
For control bars and panels:
- Height: 32px for compact containers
- Padding: 3px horizontal for internal elements
- Background: Semi-transparent black (rgba(0, 0, 0, 0.6))

### Button Element Pattern  
For individual buttons within containers:
- Height: 26px
- Padding: 12px horizontal, 5px vertical
- Minimum width: 36px
- Margin: 1.5px between elements

### Tool Button Pattern
For standalone tool buttons:
- Size: 40px × 40px (circular)
- Border radius: 20px
- Icon size: 20px
- Enhanced shadow for depth

## Typography Alignment

### Active Text Pattern
```typescript
color: Colors.TEXT_BLACK,
fontSize: 14,
fontWeight: '700',
letterSpacing: 0.5,
```

### Inactive Text Pattern
```typescript
color: Colors.TEXT_WHITE,
fontSize: 14,
fontWeight: '600',
letterSpacing: 0.5,
```

## Implementation Strategy

### Phase 1: Background and Shadow Alignment
- Apply consistent semi-transparent backgrounds
- Implement standardized shadow patterns
- Ensure proper elevation hierarchy

### Phase 2: Interactive State Enhancement
- Add missing pressed state feedback
- Implement scale transforms for interactive elements
- Enhance active state visual feedback

### Phase 3: Sizing and Spacing Refinement
- Align component heights with guidelines
- Standardize internal padding and margins
- Ensure consistent border radius values

### Phase 4: Typography and Icon Consistency
- Apply standardized text styles
- Ensure icon sizes match guidelines
- Verify proper contrast ratios