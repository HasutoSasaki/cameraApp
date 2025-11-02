import { Modal, StyleSheet, View, Button } from 'react-native';
import { Image } from 'expo-image';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import type { PinchGestureHandlerEventPayload, GestureEvent } from 'react-native-gesture-handler';

export function FullScreenImage({ uri, onClose }: { uri: string; onClose: () => void }) {
  const scale = useSharedValue(1);

  const handlePinchGesture = (event: GestureEvent<PinchGestureHandlerEventPayload>) => {
    'worklet';
    scale.value = event.nativeEvent.scale;
  };

  const handlePinchEnd = () => {
    'worklet';
    scale.value = withSpring(1);
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Modal visible={true} transparent={true} animationType="fade">
      <View style={styles.fullScreenContainer}>
        <View style={styles.header}>
          <Button title="閉じる" onPress={onClose} color="#007AFF" />
        </View>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PinchGestureHandler onGestureEvent={handlePinchGesture} onEnded={handlePinchEnd}>
            <Animated.View style={[styles.fullScreenImageContainer, rStyle]}>
              <Image source={{ uri }} style={styles.fullScreenImage} contentFit="contain" />
            </Animated.View>
          </PinchGestureHandler>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fullScreenImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});
