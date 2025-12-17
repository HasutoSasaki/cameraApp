import { Pressable, Image, StyleSheet, View, Text } from 'react-native';
import { images } from '@/assets/index';
import { Colors } from '@/assets/style/colors';

interface ModeSelectorProps {
  displayMode?: 'text' | 'icon';
  activeMode?: string;
  onModeChange?: (mode: string) => void;
}

export function ModeSelector({
  displayMode = 'text',
  activeMode = 'closeup',
  onModeChange,
}: ModeSelectorProps) {
  const modeList = [
    {
      label: 'Selfie',
      textLabel: '自撮',
      icon: images.selfieIcon,
      mode: 'selfie',
    },
    {
      label: 'Solo',
      textLabel: '全身',
      icon: images.soloIcon,
      mode: 'solo',
    },
    {
      label: 'Solo Stand',
      textLabel: 'グループ',
      icon: images.soloStandIcon,
      mode: 'group',
    },
    {
      label: 'Group',
      textLabel: 'アップ',
      icon: images.groupIcon,
      mode: 'closeup',
    },
  ];

  const handleModePress = (mode: string) => {
    onModeChange?.(mode);
  };

  return (
    <View style={styles.container}>
      {modeList.map(mode => {
        const isActive = activeMode === mode.mode;

        return (
          <Pressable
            key={mode.label}
            style={({ pressed }) => [styles.modeButton, pressed && styles.pressedModeButton]}
            onPress={() => handleModePress(mode.mode)}
          >
            {displayMode === 'icon' ? (
              <Image
                source={mode.icon}
                style={[styles.modeIcon, isActive && styles.activeModeIcon]}
                resizeMode="contain"
              />
            ) : (
              <Text
                style={[
                  styles.modeText,
                  isActive ? styles.activeModeText : styles.inactiveModeText,
                ]}
              >
                {mode.textLabel}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modeButton: {
    marginHorizontal: 12,
    alignItems: 'center',
  },
  modeIcon: {
    width: 45,
    height: 45,
  },
  activeModeIcon: {
    tintColor: Colors.ACCENT_COLOR,
  },
  modeText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  activeModeText: {
    color: Colors.ACCENT_COLOR,
    fontWeight: '700',
  },
  inactiveModeText: {
    color: Colors.TEXT_WHITE,
  },
  pressedModeButton: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});
