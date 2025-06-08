import { View, StyleSheet } from 'react-native';
import { CameraRatio } from 'expo-camera';
import { ZIndex } from '@/assets/style/zindex';
import { RatioSelector } from '@/components/controlBar/RatioSelector';
import { CameraToolsPanel } from '@/components/controlBar/CameraToolsPanel';

interface ControlBarProps {
    setRatio: (ratio: CameraRatio) => void;
    ratio: CameraRatio;
}

export function ControlBar({ setRatio, ratio }: ControlBarProps) {
    const handleRatioChange = (newRatio: CameraRatio) => {
        console.log('ControlBar: Changing ratio from', ratio, 'to', newRatio);
        setRatio(newRatio);
    };

    const handleDrawingGridToggle = () => {
        console.log('ControlBar: Drawing grid toggle pressed');
        // TODO: Implement drawing grid functionality
    };

    const handleGridVisibilityToggle = () => {
        console.log('ControlBar: Grid visibility toggle pressed');
        // TODO: Implement grid visibility functionality
    };

    const handleLevelIndicatorToggle = () => {
        console.log('ControlBar: Level indicator toggle pressed');
        // TODO: Implement level indicator functionality
    };

    return (
        <View style={styles.container}>
            <RatioSelector
                currentRatio={ratio}
                onRatioChange={handleRatioChange}
            />
            <CameraToolsPanel
                onDrawingGridToggle={handleDrawingGridToggle}
                onGridVisibilityToggle={handleGridVisibilityToggle}
                onLevelIndicatorToggle={handleLevelIndicatorToggle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 5,
        zIndex: ZIndex.control_bar,
        gap: 16,
    },
});