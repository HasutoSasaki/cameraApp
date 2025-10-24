import { Image, StyleSheet, Pressable } from 'react-native';
import { CameraRatio } from 'expo-camera';
import { RATIO_CONFIGURATIONS } from '@/assets/constants/ratio';

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
    <Pressable
      style={styles.ratioButton}
      onPress={handleRatioPress}
      accessibilityLabel={`Current ratio: ${currentConfig.label}. Tap to cycle to next ratio`}
      accessibilityHint="Cycles through available camera ratios"
    >
      <Image
        source={currentConfig.icon}
        style={[styles.ratioImage, { aspectRatio: currentConfig.aspectRatio }]}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ratioButton: {
    padding: 8,
    borderRadius: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratioImage: {
    width: 30,
    height: 30,
  },
});
