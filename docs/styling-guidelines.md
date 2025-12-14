# Camera App Styling Guidelines

このドキュメントは、カメラアプリ全体で統一されたスタイリッシュなUIを維持するためのスタイルガイドラインです。ZoomSelectorで実装されたモダンなUIパターンをベースとしています。

## Design Principles

### 1. Semi-Transparent Backgrounds
コントロール要素には半透明の背景を使用し、背景のコンテンツを適度に透過させる。

```typescript
backgroundColor: 'rgba(0, 0, 0, 0.6)', // 60% opacity black
```

### 2. Modern Border Radius
角の丸みを適切に設定し、モダンな印象を与える。

```typescript
borderRadius: 18, // Large components (containers)
borderRadius: 14, // Small components (buttons)
```

### 3. Subtle Shadows & Elevation
影とエレベーションを使用して要素の階層を表現する。

```typescript
shadowColor: '#000',
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5, // Android
```

### 4. Active State Highlighting
アクティブな状態では、アクセントカラーとより強い影を使用する。

```typescript
// Active state
backgroundColor: Colors.ACCENT_COLOR, // #FFE32D
shadowColor: Colors.ACCENT_COLOR,
shadowOpacity: 0.4,
shadowRadius: 4,
elevation: 6,
```

### 5. Interactive Feedback
タッチ時の視覚的フィードバックを提供する。

```typescript
// Pressed state
opacity: 0.8,
transform: [{ scale: 0.95 }],
```

## Component Styling Patterns

### Control Container Pattern
```typescript
const controlContainerStyle = {
  flexDirection: 'row',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: 18,
  height: 32,
  alignItems: 'center',
  paddingHorizontal: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};
```

### Button Element Pattern
```typescript
const buttonElementStyle = {
  paddingHorizontal: 12,
  paddingVertical: 5,
  height: 26,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 14,
  minWidth: 36,
  marginHorizontal: 1.5,
};
```

### Active Button Pattern
```typescript
const activeButtonStyle = {
  backgroundColor: Colors.ACCENT_COLOR,
  shadowColor: Colors.ACCENT_COLOR,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.4,
  shadowRadius: 4,
  elevation: 6,
};
```

### Pressed State Pattern
```typescript
const pressedStateStyle = {
  opacity: 0.8,
  transform: [{ scale: 0.95 }],
};
```

## Typography Standards

### Primary Text (Active)
```typescript
const primaryTextStyle = {
  color: Colors.TEXT_BLACK,
  fontSize: 14,
  fontWeight: '700',
  letterSpacing: 0.5,
};
```

### Secondary Text (Inactive)
```typescript
const secondaryTextStyle = {
  color: Colors.TEXT_WHITE,
  fontSize: 14,
  fontWeight: '600',
  letterSpacing: 0.5,
};
```

## Spacing & Sizing Guidelines

### Component Heights
- Small controls: 26px - 32px
- Medium controls: 40px - 50px  
- Large controls: 70px - 80px

### Padding & Margins
- Internal padding: 3px - 12px
- Element margins: 1.5px - 3px
- Section margins: 12px - 20px

### Border Radius Values
- Small elements: 14px
- Medium elements: 18px
- Large panels: 20px+

## Color Usage

### Background Colors
- Semi-transparent overlays: `rgba(0, 0, 0, 0.6)`
- Dark panels: `Colors.DARK_PANEL`
- Main background: `Colors.MAIN_BACKGROUND`

### Accent Colors
- Active states: `Colors.ACCENT_COLOR` (#FFE32D)
- Selected elements: `Colors.ACCENT_COLOR`

### Text Colors
- Primary text: `Colors.TEXT_BLACK` (on light backgrounds)
- Secondary text: `Colors.TEXT_WHITE` (on dark backgrounds)

## Implementation Notes

### Pressable Components
常にPressableコンポーネントを使用し、pressed stateを実装する。

```typescript
<Pressable
  style={({ pressed }) => [
    baseStyle,
    isActive && activeStyle,
    pressed && pressedStyle,
  ]}
>
  {/* Content */}
</Pressable>
```

### Shadow Consistency
すべてのコントロール要素に統一された影を適用し、階層を明確にする。

### Safe Area Awareness
Layout定数を使用してSafe Areaに対応する。

```typescript
import { Layout } from '@/assets/style/layout';

paddingBottom: Layout.SAFE_AREA_BOTTOM + Layout.CONTROL_BAR_PADDING,
```

## Usage Examples

### Applying to New Components

1. **Container**: Control container patternを使用
2. **Buttons**: Button element patternを使用
3. **Active States**: Active button patternを適用
4. **Interactions**: Pressed state patternを実装
5. **Typography**: 適切なtext styleを選択

### Best Practices

- 新しいコンポーネントを作成する際は、このガイドラインのパターンを参照
- カスタムスタイルを作成する前に、既存のパターンで対応できないか検討
- 一貫性を保つため、独自の影やボーダー設定は避ける
- アクセシビリティを考慮し、十分なコントラストを確保

このガイドラインに従うことで、アプリケーション全体で統一されたスタイリッシュなUIを維持できます。