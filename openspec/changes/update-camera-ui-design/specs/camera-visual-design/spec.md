# Camera Visual Design Specification

## ADDED Requirements

### Requirement: Camera Interface Design System
The camera interface SHALL implement the design system colors and layout constants as specified in the Figma design.

#### Scenario: Main Background Color
Given the camera interface is displayed
When the user views the camera screen
Then the background color must be #2CD3F4 (cyan/turquoise)
And the color must be applied to the main container background

#### Scenario: Accent Color Application
Given camera controls require highlighting
When a control is in active/selected state
Then the accent color #FFE32D (yellow) must be applied
And the color must provide sufficient contrast for visibility

#### Scenario: Text Color Consistency
Given text elements are displayed on the interface
When text appears over the cyan background
Then white (#FFFFFF) text must be used for primary content
And black (#000000) text must be used for secondary/contrasting elements

#### Scenario: Layout Constants Usage
Given UI components need consistent spacing and sizing
When components are positioned and styled
Then layout constants from src/assets/style/layout.ts SHALL be used
And Safe Area insets SHALL be properly applied for iOS compatibility
And component heights SHALL use predefined constants for consistency

### Requirement: Flexible Mode Selector Display
The mode selection interface SHALL support both Japanese text labels and icon display modes.

#### Scenario: Text Mode Display
Given the camera mode selector is visible
When the display mode is set to "text"
Then the modes must be displayed as text: "自撮", "全身", "グループ", "アップ"
And each mode must be clearly readable with appropriate font size

#### Scenario: Icon Mode Display  
Given the camera mode selector is visible
When the display mode is set to "icon"
Then the modes must be displayed using the existing icon assets
And each icon must be clearly visible with appropriate sizing

#### Scenario: Display Mode Switching
Given the mode selector is rendered
When the user or system changes the display preference
Then the selector must seamlessly switch between text and icon displays
And the active state highlighting must work in both modes

#### Scenario: Active Mode Highlighting
Given a camera mode is currently selected
When the "アップ" mode is active (as shown in design)
Then the active mode must be displayed in #FFE32D (yellow)
And inactive modes must be displayed in white (text) or with appropriate contrast (icons)
And the active mode must be visually distinguished from inactive modes in both display types

### Requirement: Bottom Control Bar Layout
The bottom control bar SHALL match the Figma design layout and styling.

#### Scenario: Dark Background Panel
Given the bottom control area needs to be displayed
When the camera interface loads
Then the bottom panel must have a dark background (#333333)
And the panel height must accommodate all control elements comfortably

#### Scenario: Control Element Positioning
Given control elements need proper positioning
When the bottom control bar is rendered
Then the mode selector must be positioned in the center area
And the thumbnail preview must be positioned on the left
And the zoom controls must be positioned on the right
And the shutter button must be centered below the mode selector

### Requirement: Camera Viewfinder Frame
The camera preview area SHALL include visual framing elements as shown in the design.

#### Scenario: Framing Overlay
Given the camera is in "アップ" (close-up) mode
When the camera preview is displayed
Then a dotted circle overlay must be visible for face framing guidance
And the overlay must be centered in the camera preview area
And the overlay must not interfere with camera functionality

#### Scenario: Semi-transparent Borders
Given the camera preview needs visual boundaries
When the interface is displayed
Then semi-transparent gray overlays must border the camera preview
And the overlays must create a focused viewing area
And the opacity must be approximately 60% (#D2D2D2 with 0.6 alpha)
**NOTE**: Currently disabled (commented out) in implementation due to UI interference - feature available but not active

### Requirement: Top Control Panel Styling
The top control panel SHALL match the design specifications for tool controls.

#### Scenario: Tool Button Styling
Given camera tools are available in the top panel
When tool buttons (edit, grid, angle) are displayed
Then each button must have a circular background
And the background color must coordinate with the main design
And icons must be clearly visible with appropriate contrast

#### Scenario: Aspect Ratio Indicator
Given the camera aspect ratio setting is visible
When the "1:1" ratio is selected
Then the ratio indicator must be displayed in the top-left area
And the indicator must have a clear background with black border
And the text must be black and clearly readable

## MODIFIED Requirements

### Requirement: Existing Component Functionality Preservation
All existing camera functionality SHALL be preserved during visual updates.

#### Scenario: Camera Operations Maintained
Given the visual design is updated
When users interact with camera controls
Then all existing camera operations (zoom, capture, mode switching) must function identically
And no functionality must be lost or degraded
And gesture handling must remain responsive

#### Scenario: Permission Handling Unchanged
Given camera and media permissions are required
When the app requests permissions
Then the existing permission flow must remain unchanged
And permission UI must be updated to match new design scheme

## REMOVED Requirements

None. This is an additive visual update that preserves all existing functionality.