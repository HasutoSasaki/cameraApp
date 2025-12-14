import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { useCamera } from '@/hooks/useCamera';
import { RenderRequestPermission } from '../camera/RenderRequestPermission';
import { RenderCameraGesture } from '../camera/RenderCameraGesture';
import { RenderTiltIndicator } from '../camera/RenderTiltIndicator';
import { RenderCameraGrid } from '../camera/RenderCameraGrid';
import { RenderDrawingOverlay } from '../camera/RenderDrawingOverlay';
import { RenderViewfinderFrame } from '../camera/RenderViewfinderFrame';
import { RenderCameraBorders } from '../camera/RenderCameraBorders';
import { TopControlBar } from '../ui/controls/TopControlBar';
import { BottomControlBar } from '../ui/controls/BottomControlBar';
import { Colors } from '@/assets/style/colors';
import { Layout } from '@/assets/style/layout';

export function CameraLayout() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const {
    ref,
    zoom,
    handleCameraReady,
    aspectRatio,
    handleZoomChange,
    handleRatioChange,
    ratio,
    takePicture,
    lastPhoto,
    photos,
  } = useCamera();
  // top control bar state
  const [isLevelIndicatorVisible, setIsLevelIndicatorVisible] = useState(true);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);

  // camera mode state
  const [cameraMode, setCameraMode] = useState('closeup');

  if (!permission || !mediaPermission) return <View />;

  if (!permission.granted || !mediaPermission.granted) {
    return (
      <RenderRequestPermission
        requestPermission={requestPermission}
        requestMediaPermission={requestMediaPermission}
      />
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopControlBar
        ratio={ratio}
        setRatio={handleRatioChange}
        isLevelIndicatorVisible={isLevelIndicatorVisible}
        setIsLevelIndicatorVisible={setIsLevelIndicatorVisible}
        isGridVisible={isGridVisible}
        setIsGridVisible={setIsGridVisible}
        isDrawingEnabled={isDrawingEnabled}
        setIsDrawingEnabled={setIsDrawingEnabled}
      />
      <CameraView
        style={[styles.camera, { aspectRatio }]}
        ref={ref}
        mute={false}
        zoom={zoom}
        responsiveOrientationWhenOrientationLocked
        onCameraReady={handleCameraReady}
        ratio={ratio}
      />
      <RenderCameraGrid isVisible={isGridVisible} ratio={ratio} />
      <RenderCameraGesture handleZoomChange={handleZoomChange} zoom={zoom} />
      <RenderDrawingOverlay isVisible={isDrawingEnabled} ratio={ratio} />
      <RenderTiltIndicator isVisible={isLevelIndicatorVisible} />
      <RenderViewfinderFrame isVisible={true} mode={cameraMode} ratio={ratio} />
      {/* <RenderCameraBorders isVisible={true} ratio={ratio} /> */}
      <BottomControlBar
        photos={photos}
        zoom={zoom}
        handleZoomChange={handleZoomChange}
        takePicture={takePicture}
        lastPhoto={lastPhoto}
        cameraMode={cameraMode}
        onModeChange={setCameraMode}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Layout.TOP_CONTROL_BAR_HEIGHT,
    flex: 1,
    backgroundColor: Colors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },

  camera: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
});
