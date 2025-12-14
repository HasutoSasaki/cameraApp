import { View, StyleSheet, Dimensions } from 'react-native';
import { CameraRatio } from 'expo-camera';
import { Colors } from '@/assets/style/colors';

interface RenderViewfinderFrameProps {
  isVisible: boolean;
  mode: string;
  ratio: CameraRatio;
}

export function RenderViewfinderFrame({ isVisible, mode, ratio }: RenderViewfinderFrameProps) {
  if (!isVisible || mode !== 'closeup') return null;

  const screenDimensions = Dimensions.get('window');

  // ratioに基づいてカメラエリアのサイズを計算
  const getCameraAspectRatio = () => {
    switch (ratio) {
      case '1:1': return 1;
      case '4:3': return 3 / 4;
      case '16:9': return 9 / 16;
      default: return 3 / 4;
    }
  };

  const aspectRatio = getCameraAspectRatio();
  const cameraHeight = screenDimensions.width / aspectRatio;

  // 顔の位置を考慮した上方向オフセット（カメラ高さの30%上に）
  const verticalOffset = -(cameraHeight * 0.30);

  return (
    <View style={styles.container}>
      <View style={[styles.frameCircle, { marginTop: verticalOffset }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  frameCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: Colors.TEXT_WHITE,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
});