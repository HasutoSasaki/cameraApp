import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { CameraRatio } from 'expo-camera';
import { ZIndex } from '@/assets/style/zindex';
import { RatioSelector } from '@/components/ui/tools/RatioSelector';
import { CameraToolsPanel } from '@/components/controlBar/CameraToolsPanel';

interface ControlBarProps {
    setRatio: (ratio: CameraRatio) => void;
    ratio: CameraRatio;
}

export function TopControlBar({ setRatio, ratio }: ControlBarProps) {
    // 各ツールのON/OFF状態を管理
    const [isDrawingGridEnabled, setIsDrawingGridEnabled] = useState(false);
    const [isGridVisible, setIsGridVisible] = useState(false);
    const [isLevelIndicatorVisible, setIsLevelIndicatorVisible] = useState(false);

    const handleRatioChange = (newRatio: CameraRatio) => {
        setRatio(newRatio);
    };

    const handleDrawingGridToggle = () => {
        setIsDrawingGridEnabled(prev => !prev);
        // TODO: Implement drawing grid functionality
    };

    const handleGridVisibilityToggle = () => {
        setIsGridVisible(prev => !prev);
        // TODO: Implement grid visibility functionality
    };

    const handleLevelIndicatorToggle = () => {
        setIsLevelIndicatorVisible(prev => !prev);
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
                isDrawingGridEnabled={isDrawingGridEnabled}
                isGridVisible={isGridVisible}
                isLevelIndicatorVisible={isLevelIndicatorVisible}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'transparent',
        borderRadius: 5,
        zIndex: ZIndex.control_bar,
    },
});