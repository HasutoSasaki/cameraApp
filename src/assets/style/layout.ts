// Layout constants for UI components
export const Layout = {
  // Safe Area Insets (iPhone対応)
  SAFE_AREA_TOP: 44, // ノッチ付きiPhone (iPhone X以降)
  SAFE_AREA_TOP_LEGACY: 20, // ノッチなしiPhone (iPhone 8以前)
  SAFE_AREA_BOTTOM: 34, // ホームインジケーター分
  SAFE_AREA_BOTTOM_LEGACY: 0, // ホームボタン付きiPhone

  // Control Bar Heights (Safe Area込み)
  TOP_CONTROL_BAR_HEIGHT: 70, // 44 (safe area) + 20 (padding) + 6 (margin)
  BOTTOM_CONTROL_BAR_HEIGHT: 150, // Control elements + safe area

  // Base Control Heights (Safe Area抜き)
  TOP_CONTROL_BASE_HEIGHT: 50, // コントロール部分のみ
  BOTTOM_CONTROL_BASE_HEIGHT: 120, // コントロール部分のみ

  // Spacing
  CONTROL_BAR_PADDING: 20,
  BUTTON_MARGIN: 12,

  // Component Sizes
  TOOL_BUTTON_SIZE: 40,
  SHUTTER_BUTTON_SIZE: 80,
  MODE_ICON_SIZE: 45,

} as const;

export type LayoutKey = keyof typeof Layout;