import { FunctionComponent } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import type { ZoomLevel } from '../../assets/types/types';

interface Props {
    currentZoom: number;
    onZoomChange: (zoom: ZoomLevel) => void;
}

export const ZoomControls: FunctionComponent<Props> = ({ currentZoom, onZoomChange }) => {
    const zoomLevels: ZoomLevel[] = [0, 0.5, 1];

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
                        {zoom}x
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