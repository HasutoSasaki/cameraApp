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
import { TopControlBar } from '../ui/controls/TopControlBar';
import { BottomControlBar } from '../ui/controls/BottomControlBar';

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
      <BottomControlBar
        photos={photos}
        zoom={zoom}
        handleZoomChange={handleZoomChange}
        takePicture={takePicture}
        lastPhoto={lastPhoto}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  camera: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
});
