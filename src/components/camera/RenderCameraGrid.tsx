import { View, StyleSheet, Dimensions } from 'react-native'
import { type CameraRatio } from 'expo-camera'
import { ZIndex } from '@/assets/style/zindex';

interface RenderCameraGridProps {
    isVisible: boolean;
    ratio: CameraRatio;
}

export function RenderCameraGrid({ isVisible, ratio }: RenderCameraGridProps) {
    if (!isVisible) return null;

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const cameraHeight = _calculateCameraHeight(screenWidth, ratio);

    const topOffset = (screenHeight - cameraHeight) / 2;

    return (
        <View style={[styles.gridContainer, {
            height: cameraHeight,
            top: topOffset,
            width: screenWidth
        }]} pointerEvents="none">
            {/* 縦線 */}
            <View style={[styles.verticalLine, { left: '33.33%' }]} />
            <View style={[styles.verticalLine, { left: '66.66%' }]} />

            {/* 横線 */}
            <View style={[styles.horizontalLine, { top: '33.33%' }]} />
            <View style={[styles.horizontalLine, { top: '66.66%' }]} />
        </View>
    )
}

function _calculateCameraHeight(screenWidth: number, ratio: CameraRatio): number {
    const [heightRatio, widthRatio] = ratio.split(':').map(Number);

    if (!widthRatio || !heightRatio) {
        return screenWidth * (3 / 4); // Default to 4:3 aspect ratio
    }

    const aspectRatio = widthRatio / heightRatio;
    return screenWidth / aspectRatio;
}

const styles = StyleSheet.create({
    gridContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: ZIndex.camera_grid,
    },
    verticalLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    horizontalLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
});