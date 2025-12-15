import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/assets/style/colors';

interface CameraToolsPanelProps {
  toggleDrawingMode: () => void;
  toggleGridVisibility: () => void;
  toggleLevelIndicator: () => void;
  isDrawingEnabled: boolean;
  isGridVisible: boolean;
  isLevelIndicatorVisible: boolean;
}

const CAMERA_TOOLS = [
  {
    id: 'drawing-mode',
    source: require('@/assets/images/icon/grid_plus.png'),
    action: 'toggleDrawingMode' as const,
    accessibilityLabel: 'Toggle drawing mode tool',
    stateKey: 'isDrawingEnabled' as const,
  },
  {
    id: 'grid-visibility',
    source: require('@/assets/images/icon/grid.png'),
    action: 'toggleGridVisibility' as const,
    accessibilityLabel: 'Toggle grid visibility',
    stateKey: 'isGridVisible' as const,
  },
  {
    id: 'level-indicator',
    source: require('@/assets/images/icon/deg.png'),
    action: 'toggleLevelIndicator' as const,
    accessibilityLabel: 'Toggle level indicator',
    stateKey: 'isLevelIndicatorVisible' as const,
  },
] as const;

export function CameraToolsPanel({
  toggleDrawingMode,
  toggleGridVisibility,
  toggleLevelIndicator,
  isDrawingEnabled = false,
  isGridVisible = false,
  isLevelIndicatorVisible = false,
}: CameraToolsPanelProps) {
  const actionMap = {
    toggleDrawingMode,
    toggleGridVisibility,
    toggleLevelIndicator,
  };

  const stateMap = {
    isDrawingEnabled,
    isGridVisible,
    isLevelIndicatorVisible,
  };

  const handleToolPress = (action: keyof typeof actionMap) => {
    const handler = actionMap[action];
    if (handler) {
      handler();
    }
  };

  return (
    <View style={styles.container}>
      {CAMERA_TOOLS.map(tool => {
        const isActive = stateMap[tool.stateKey];

        return (
          <Pressable
            key={tool.id}
            style={({ pressed }) => [
              styles.toolButton,
              isActive && styles.activeToolButton,
              pressed && styles.pressedToolButton,
            ]}
            onPress={() => handleToolPress(tool.action)}
            accessibilityLabel={tool.accessibilityLabel}
            accessibilityState={{ selected: isActive }}
          >
            <Image
              source={tool.source}
              style={[styles.toolIcon, isActive && styles.activeToolIcon]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toolButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.DARK_OVERLAY_60,
    borderWidth: 1,
    borderColor: Colors.WHITE_OVERLAY_30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeToolButton: {
    backgroundColor: Colors.ACCENT_COLOR,
    borderColor: Colors.ACCENT_COLOR,
    shadowColor: Colors.ACCENT_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  toolIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.TEXT_WHITE,
  },
  activeToolIcon: {
    tintColor: Colors.TEXT_BLACK,
  },
  pressedToolButton: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});
