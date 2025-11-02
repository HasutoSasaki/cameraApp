import type { ZoomLevel } from '../../assets/types/types';
import { useRef, useEffect } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import { ZIndex } from '@/assets/style/zindex';

interface Touch {
  pageX: number;
  pageY: number;
}

interface Props {
  handleZoomChange: (newZoom: ZoomLevel) => void;
  zoom: ZoomLevel;
}

export function RenderCameraGesture({ handleZoomChange, zoom }: Props) {
  const lastDistance = useRef(0);
  const previousTouchCount = useRef(0);
  const zoomIncrement = 0.01;

  const zoomRef = useRef<ZoomLevel>(zoom);
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const getDistance = (touches: Touch[]): number => {
    if (touches.length < 2) return 0;

    const [touch1, touch2] = touches;
    return Math.sqrt(
      Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: evt => {
        const touches = evt.nativeEvent.touches;
        previousTouchCount.current = touches.length;
        if (touches.length === 2) {
          lastDistance.current = getDistance(touches);
          console.log('start Distance:', lastDistance.current);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;

        // タッチポイントが1本から2本に増えた場合の処理
        if (previousTouchCount.current === 1 && touches.length === 2) {
          lastDistance.current = getDistance(touches);
        }

        previousTouchCount.current = touches.length;

        const currentDistance = getDistance(touches);
        if (touches.length === 2) {
          const distanceDiff = currentDistance - lastDistance.current;

          // 拡大・縮小の方向を判定
          if (Math.abs(distanceDiff) > 2) {
            // 小さな変化は無視（閾値は調整可能）
            const zoomDirection = distanceDiff > 0 ? 1 : -1;

            let newZoom = zoomRef.current + zoomDirection * zoomIncrement;

            // ズーム範囲を制限（0～1）
            newZoom = Math.max(0, Math.min(1, newZoom));

            handleZoomChange(newZoom as ZoomLevel);
          }

          lastDistance.current = currentDistance;
        }
      },
      onPanResponderRelease: evt => {
        const touches = evt.nativeEvent.touches;
        previousTouchCount.current = touches.length;

        // タッチがすべて離れた場合のリセット
        if (touches.length === 0) {
          lastDistance.current = 0;
        }
      },
    })
  );

  return <View style={styles.absoluteFill} {...panResponder.current.panHandlers} />;
}

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: ZIndex.camera_gesture,
  },
});
