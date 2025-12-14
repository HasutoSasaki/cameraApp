import { View, StyleSheet, Dimensions } from 'react-native';
import { CameraRatio } from 'expo-camera';
import { Colors } from '@/assets/style/colors';

interface RenderCameraBordersProps {
  isVisible: boolean;
  ratio: CameraRatio;
}

export function RenderCameraBorders({ isVisible, ratio }: RenderCameraBordersProps) {
  if (!isVisible) return null;

  const screenDimensions = Dimensions.get('window');

  // ratio に応じて丁度良い数値を設定しています
  const getCameraAspectRatio = () => {
    switch (ratio) {
      case '1:1': return 1;
      case '4:3': return 3 / 4;
      case '16:9': return 9 / 16;
      default: return 3 / 4;
    }
  };

  const aspectRatio = getCameraAspectRatio();
  const cameraWidth = screenDimensions.width;
  const cameraHeight = cameraWidth / aspectRatio;

  // Container size based on aspect ratio
  const containerStyle = {
    width: cameraWidth,
    height: cameraHeight,
    top: (screenDimensions.height - cameraHeight) / 2,
    left: (screenDimensions.width - cameraWidth) / 2,
  };

  // Calculate overlay dimensions (containerに対する相対値)
  const overlayHeight = cameraHeight * 0.12; // containerの12%
  const sideWidth = cameraWidth * 0.15; // containerの15%

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Top overlay */}
      <View style={[styles.overlay, {
        top: 0,
        left: 0,
        right: 0,
        height: overlayHeight
      }]} />

      {/* Bottom overlay */}
      <View style={[styles.overlay, {
        bottom: 0,
        left: 0,
        right: 0,
        height: overlayHeight
      }]} />

      {/* Left overlay */}
      <View style={[styles.overlay, {
        top: overlayHeight,
        left: 0,
        width: sideWidth,
        height: cameraHeight - (overlayHeight * 2)
      }]} />

      {/* Right overlay */}
      <View style={[styles.overlay, {
        top: overlayHeight,
        right: 0,
        width: sideWidth,
        height: cameraHeight - (overlayHeight * 2)
      }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: Colors.SEMI_TRANSPARENT_OVERLAY,
  },
});