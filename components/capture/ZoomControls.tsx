import { FunctionComponent } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import type { ZoomLevel } from '../../assets/types/types';
import { ZOOM_LEVELS, MIN_ZOOM, DEFAULT_ZOOM, DISPLAY_MAX } from '@/assets/constants/zoom';
interface Props {
    currentZoom: number;
    onZoomChange: (zoom: ZoomLevel) => void;
}

export const ZoomControls: FunctionComponent<Props> = ({ currentZoom, onZoomChange }) => {
    const zoomLevels = ZOOM_LEVELS;

    const displayZoomLevel = (zoom: ZoomLevel) => {
        if (zoom === MIN_ZOOM) {
            if (currentZoom < MIN_ZOOM && currentZoom < DEFAULT_ZOOM) {
                // 0〜0.1の範囲を1.0〜1.9xに変換
                return `${(1 + 9 * currentZoom).toFixed(1)}x`;
            }
            return "1.0x";
        }
        else if (zoom === DEFAULT_ZOOM) {
            if (currentZoom >= MIN_ZOOM) {
                // 0.1〜0.3の範囲を2.0〜3.0xに変換
                const displayValue = 1 + (currentZoom - 0.1) * 10;
                return `${Math.min(displayValue, DISPLAY_MAX).toFixed(1)}x`;
            }
            return "2.0x";
        }

        // ここには来ないはずだが、念のため
        return `${(zoom * 10).toFixed(1)}x`;
    };

    return (
        <View style={styles.container}>
            {zoomLevels.map((zoom) => (
                <Pressable
                    key={zoom}
                    onPress={() => onZoomChange(zoom)}
                    style={({ pressed }) => [
                        styles.zoomButton,
                        currentZoom === zoom && styles.selectedZoom,
                        pressed && styles.pressedZoom,
                    ]}
                >
                    <Text style={[
                        styles.zoomText,
                        currentZoom === zoom && styles.selectedZoomText
                    ]}>
                        {displayZoomLevel(zoom)}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flexDirection: 'row',
        gap: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 15,
    },
    zoomButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    selectedZoom: {
        backgroundColor: 'white',
        borderRadius: 15,
    },
    pressedZoom: {
        opacity: 0.7,
    },
    zoomText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    selectedZoomText: {
        color: 'black',
    },
});