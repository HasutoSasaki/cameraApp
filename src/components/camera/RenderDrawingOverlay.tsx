import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { ZIndex } from '@/assets/style/zindex';
import { useDrawingPaths } from '@/hooks/useDrawingPath';
import { DrawingCanvas } from './drawing';
import { RATIO_ASPECT_VALUES } from '@/assets/constants/ratio';

interface RenderDrawingOverlayProps {
  isVisible: boolean;
  ratio: string;
}

export function RenderDrawingOverlay({ isVisible, ratio }: RenderDrawingOverlayProps) {
  const { paths, currentPath, panGesture, clearAllPaths, hasDrawings } = useDrawingPaths();
  const aspectRatio = RATIO_ASPECT_VALUES[ratio];

  if (!isVisible) return null;

  return (
    <View style={[styles.overlay, { aspectRatio }]}>
      {hasDrawings && (
        <TouchableOpacity style={styles.clearButton} onPress={clearAllPaths}>
          <Text style={styles.clearButtonText}>クリア</Text>
        </TouchableOpacity>
      )}

      <GestureDetector gesture={panGesture}>
        <Animated.View style={StyleSheet.absoluteFillObject}>
          <DrawingCanvas paths={paths} currentPath={currentPath} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    zIndex: ZIndex.drawing_overlay,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  clearButton: {
    position: 'absolute',
    top: 100,
    right: 118,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 100,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
