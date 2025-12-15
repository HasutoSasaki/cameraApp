// Design system colors from Figma specifications
export const Colors = {
  // Main color scheme
  MAIN_BACKGROUND: '#2CD3F4', // Cyan/turquoise main background
  ACCENT_COLOR: '#FFE32D', // Yellow accent for active states

  // Text colors
  TEXT_WHITE: '#FFFFFF', // Primary text on colored backgrounds
  TEXT_BLACK: '#000000', // Secondary/contrasting text

  // UI element colors
  DARK_PANEL: '#333333', // Dark background for bottom panel
  SEMI_TRANSPARENT_OVERLAY: 'rgba(210, 210, 210, 0.6)', // Semi-transparent gray overlays
  DARK_OVERLAY_60: 'rgba(0, 0, 0, 0.6)', // Standard dark semi-transparent background
  WHITE_OVERLAY_30: 'rgba(255, 255, 255, 0.3)', // Standard light semi-transparent border
  WHITE_OVERLAY_70: 'rgba(255, 255, 255, 0.7)', // Standard light semi-transparent active element

  // Legacy/existing colors (for backward compatibility)
  BLACK: '#000000',
  WHITE: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof Colors;