# Update Camera UI Design

## Problem
The current camera UI implementation differs significantly from the Figma design specifications in terms of layout, styling, and visual hierarchy. The existing implementation uses a basic layout without the specific color scheme, positioning, and visual elements shown in the Figma design for the "B-black" camera interface.

## Proposed Solution
Update the camera UI components to match the Figma design specifications, implementing:

1. **Color Scheme Alignment**: Apply the specified color palette (#2CD3F4 main background, #FFE32D accents, white/black text)
2. **Layout Structure**: Reorganize components to match the Figma layout with proper positioning and spacing
3. **Mode Selection**: Update the mode selector to show text labels ("自撮", "全身", "グループ", "アップ") with highlight styling for active mode
4. **Visual Elements**: Add camera viewfinder overlay, framing guides, and proper visual feedback elements
5. **Control Positioning**: Reposition controls to match the design specifications

## Impact
- Enhanced visual consistency with design specifications
- Improved user experience through better visual hierarchy
- Maintained functionality while updating appearance
- Better alignment with Japanese UI conventions

## Success Criteria
- Camera UI matches Figma design visual specifications
- All existing functionality remains intact
- Color palette and typography match design system
- Layout positioning aligns with Figma measurements
- Mode selection displays Japanese labels with proper highlighting

## Dependencies
- Existing camera functionality must be preserved
- Color constants and design tokens need definition
- Component styling requires comprehensive updates
- Text labels need Japanese localization support

## Risks
- Visual layout changes may affect usability if not implemented carefully
- Color contrast needs validation for accessibility
- Component positioning changes could impact gesture handling