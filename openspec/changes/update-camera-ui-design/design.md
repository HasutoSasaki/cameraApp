# Camera UI Design Architecture

## Overview
This design document outlines the architectural approach for updating the camera UI to match the Figma specifications while maintaining the existing component structure and functionality.

## Current Architecture Analysis

### Component Hierarchy
```
CameraLayout (root container)
├── TopControlBar
│   ├── RatioSelector
│   └── CameraToolsPanel
├── CameraView (expo-camera)
├── Overlays (Grid, Drawing, Tilt)
└── BottomControlBar
    ├── ModeSelector
    ├── ShutterButton
    ├── Thumbnail
    └── ZoomSelector
```

### Current vs Design Gaps

| Component | Current Implementation | Design Requirements | Gap Analysis |
|-----------|----------------------|-------------------|--------------|
| Background | Black (#000) | Cyan (#2CD3F4) | Color mismatch |
| ModeSelector | Icon-based with images | Text-based Japanese labels | Complete redesign needed |
| Layout | Standard mobile layout | Custom framed layout | Positioning changes required |
| Controls | Standard spacing | Specific positioning | Layout adjustments needed |
| Typography | Default styling | Custom Japanese fonts | Font integration required |

## Design Decisions

### 1. Component Structure Preservation
**Decision**: Maintain existing component hierarchy while updating styling
**Rationale**: Preserves existing functionality and hooks integration
**Trade-offs**: Some layout constraints vs. complete redesign flexibility

### 2. Styling Strategy
**Decision**: Use StyleSheet with design tokens for colors and spacing
**Rationale**: Consistent with existing React Native patterns in the codebase
**Alternative Considered**: Styled-components (rejected due to project consistency)

### 3. Mode Selection Redesign
**Decision**: Replace icon-based selector with text-based Japanese labels
**Rationale**: Matches design specifications and improves localization
**Implementation**: Update ModeSelector component with text rendering and active state styling

### 4. Color System Integration
**Decision**: Create centralized color constants file with design tokens
**Rationale**: Ensures consistent color usage across all components
**Location**: Extend existing `src/assets/style/` directory structure

### 5. Layout Positioning
**Decision**: Use absolute positioning with responsive calculations for key elements
**Rationale**: Matches the precise positioning shown in Figma design
**Risk Mitigation**: Maintain relative positioning for nested elements to preserve responsiveness

## Implementation Strategy

### Phase 1: Color System
1. Define color constants matching Figma design
2. Create design tokens for consistent usage
3. Update existing color references

### Phase 2: Component Updates
1. Update CameraLayout background styling
2. Redesign ModeSelector with Japanese text labels
3. Update control positioning and spacing
4. Apply new color scheme throughout

### Phase 3: Visual Elements
1. Add camera viewfinder frame overlay
2. Implement framing guides as shown in design
3. Update active state indicators
4. Apply final visual polish

## Technical Considerations

### Performance Impact
- Minimal performance impact expected
- Color and layout changes don't affect camera rendering
- Existing gesture handling preserved

### Platform Compatibility
- Design works consistently across iOS and Android
- Font rendering may require platform-specific adjustments
- Color system compatible with React Native color handling

### Accessibility
- Ensure color contrast meets WCAG guidelines
- Maintain touch target sizes for accessibility
- Text labels improve screen reader compatibility

### Maintainability
- Centralized design tokens improve maintainability
- Component structure allows for future design updates
- Clear separation of styling from functionality logic