import { StyleSheet, Pressable, View, Text } from 'react-native';
import { CameraRatio } from 'expo-camera';
import { RATIO_CONFIGURATIONS } from '@/assets/constants/ratio';
import { Colors } from '@/assets/style/colors';

interface RatioSelectorProps {
  currentRatio: CameraRatio;
  onRatioChange: (ratio: CameraRatio) => void;
}

export function RatioSelector({ currentRatio, onRatioChange }: RatioSelectorProps) {
  const getNextRatio = (): CameraRatio => {
    const currentIndex = RATIO_CONFIGURATIONS.findIndex(config => config.ratio === currentRatio);
    const nextIndex = (currentIndex + 1) % RATIO_CONFIGURATIONS.length;
    return RATIO_CONFIGURATIONS[nextIndex].ratio;
  };

  const getCurrentConfig = () => {
    return (
      RATIO_CONFIGURATIONS.find(config => config.ratio === currentRatio) || RATIO_CONFIGURATIONS[0]
    );
  };

  const handleRatioPress = () => {
    const nextRatio = getNextRatio();
    onRatioChange(nextRatio);
  };

  const currentConfig = getCurrentConfig();

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.ratioButton, pressed && styles.pressedButton]}
        onPress={handleRatioPress}
        accessibilityLabel={`Current ratio: ${currentConfig.label}. Tap to cycle to next ratio`}
        accessibilityHint="Cycles through available camera ratios"
      >
        <Text style={styles.ratioText}>{currentConfig.label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  ratioButton: {
    backgroundColor: Colors.DARK_OVERLAY_60,
    borderWidth: 1,
    borderColor: Colors.WHITE_OVERLAY_30,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ratioText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.TEXT_WHITE,
    letterSpacing: 0.5,
  },
  pressedButton: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  ratioImage: {
    width: 30,
    height: 30,
  },
});
