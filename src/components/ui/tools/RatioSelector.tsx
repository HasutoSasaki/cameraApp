import { Image, StyleSheet, Pressable, View, Text } from 'react-native';
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
        style={styles.ratioButton}
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
    backgroundColor: Colors.TEXT_WHITE,
    borderWidth: 1,
    borderColor: Colors.TEXT_BLACK,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratioText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.TEXT_BLACK,
  },
  ratioImage: {
    width: 30,
    height: 30,
  },
});
