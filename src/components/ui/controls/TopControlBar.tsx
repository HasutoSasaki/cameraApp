import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { CameraRatio } from 'expo-camera';
import { ZIndex } from '@/assets/style/zindex';
import { RatioSelector } from '@/components/ui/tools/RatioSelector';
import { CameraToolsPanel } from '@/components/controlBar/CameraToolsPanel';

interface ControlBarProps {
    setRatio: (ratio: CameraRatio) => void;
    ratio: CameraRatio;
    isLevelIndicatorVisible: boolean;
    setIsLevelIndicatorVisible: (visible: boolean) => void;

}
export function TopControlBar({ setRatio, ratio, isLevelIndicatorVisible, setIsLevelIndicatorVisible }: ControlBarProps) {
    // 各ツールのON/OFF状態を管理
    const [isDrawingGridEnabled, setIsDrawingGridEnabled] = useState(false);
    const [isGridVisible, setIsGridVisible] = useState(false);

    const handleRatioChange = (newRatio: CameraRatio) => {
        setRatio(newRatio);
    };

    const toggleDrawingGrid = () => {
        setIsDrawingGridEnabled(prev => !prev);
        // TODO: Implement drawing grid functionality
    };

    const toggleGridVisibility = () => {
        setIsGridVisible(prev => !prev);
        // TODO: Implement grid visibility functionality
    };

    const toggleLevelIndicator = () => {
        setIsLevelIndicatorVisible(!isLevelIndicatorVisible);
        // TODO: Implement level indicator functionality
    };

    return (
        <View style={styles.container}>
            <RatioSelector
                currentRatio={ratio}
                onRatioChange={handleRatioChange}
            />
            <CameraToolsPanel
                toggleDrawingGrid={toggleDrawingGrid}
                toggleGridVisibility={toggleGridVisibility}
                toggleLevelIndicator={toggleLevelIndicator}
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