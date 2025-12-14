import { FunctionComponent } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import type { ZoomLevel } from '../../../assets/types/types';
import { ZOOM_LEVELS, MIN_ZOOM, DEFAULT_ZOOM, DISPLAY_MAX } from '@/assets/constants/zoom';
import { Colors } from '@/assets/style/colors';
import { Layout } from '@/assets/style/layout';

interface Props {
  handleZoomChange: (zoom: ZoomLevel) => void;
  currentZoom: ZoomLevel;
}

export function ZoomSelector({ handleZoomChange, currentZoom }: Props) {
  const zoomLevels = ZOOM_LEVELS;

  const displayZoomLevel = (zoom: ZoomLevel) => {
    if (zoom === MIN_ZOOM) {
      if (currentZoom < MIN_ZOOM && currentZoom < DEFAULT_ZOOM) {
        // 0〜0.1の範囲を1.0〜1.9xに変換
        return `${(1 + 9 * currentZoom).toFixed(1)}x`;
      }
      return '1.0x';
    } else if (zoom === DEFAULT_ZOOM) {
      if (currentZoom >= MIN_ZOOM) {
        // 0.1〜0.3の範囲を2.0〜3.0xに変換
        const displayValue = 1 + (currentZoom - 0.1) * 10;
        return `${Math.min(displayValue, DISPLAY_MAX).toFixed(1)}x`;
      }
      return '2.0x';
    }

    // ここには来ないはずだが、念のため
    return `${(zoom * 10).toFixed(1)}x`;
  };

  return (
    <View style={styles.container}>
      {zoomLevels.map(zoom => (
        <Pressable
          key={zoom}
          onPress={() => handleZoomChange(zoom)}
          style={({ pressed }) => [
            styles.zoomButton,
            currentZoom === zoom && styles.selectedZoom,
            pressed && styles.pressedZoom,
          ]}
        >
          <Text style={[styles.zoomText, currentZoom === zoom && styles.selectedZoomText]}>
            {displayZoomLevel(zoom)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 18,
    height: 32,
    alignItems: 'center',
    paddingHorizontal: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoomButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    minWidth: 36,
    marginHorizontal: 1.5,
  },
  selectedZoom: {
    backgroundColor: Colors.ACCENT_COLOR,
    shadowColor: Colors.ACCENT_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  pressedZoom: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  zoomText: {
    color: Colors.TEXT_WHITE,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  selectedZoomText: {
    color: Colors.TEXT_BLACK,
    fontWeight: '700',
  },
});
