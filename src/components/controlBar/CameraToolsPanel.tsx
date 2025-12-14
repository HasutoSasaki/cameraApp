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
            style={[styles.toolButton, isActive && styles.activeToolButton]}
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
    backgroundColor: 'rgba(128, 128, 128, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  activeToolButton: {
    backgroundColor: Colors.ACCENT_COLOR,
    borderColor: Colors.ACCENT_COLOR,
    shadowColor: Colors.ACCENT_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  toolIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.TEXT_WHITE,
  },
  activeToolIcon: {
    tintColor: Colors.TEXT_BLACK,
  },
});
