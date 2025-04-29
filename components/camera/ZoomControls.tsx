import { FunctionComponent } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

interface Props {
    currentZoom: number;
    onZoomChange: (zoom: number) => void;
}

export const ZoomControls: FunctionComponent<Props> = ({ currentZoom, onZoomChange }) => {
    const zoomLevels = [1, 2, 3];

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
        flexDirection: 'row',
        gap: 10,
    },
    zoomButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    selectedZoom: {
        backgroundColor: 'white',
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