import { CameraView } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TopControlBar } from '../ui/controls/TopControlBar';
import { BottomControlBar } from '../ui/controls/BottomControlBar';
import { RenderCameraGesture } from './RenderCameraGesture';
import { RenderTiltIndicator } from '../camera/RenderTiltIndicator';



import { useCamera } from '@/hooks/useCamera';

export function RenderCamera() {
    const { ref, zoom, handleCameraReady, aspectRatio, handleZoomChange, handleRatioChange, ratio, takePicture, lastPhoto, photos } = useCamera();
    // top control bar state
    const [isLevelIndicatorVisible, setIsLevelIndicatorVisible] = useState(true);



    return (
        <>
            <TopControlBar ratio={ratio} setRatio={handleRatioChange}
                isLevelIndicatorVisible={isLevelIndicatorVisible} setIsLevelIndicatorVisible={setIsLevelIndicatorVisible} />
            <CameraView
                style={[styles.camera, { aspectRatio }]}
                ref={ref}
                mute={false}
                zoom={zoom}
                responsiveOrientationWhenOrientationLocked
                onCameraReady={handleCameraReady}
                ratio={ratio}
            />
            <RenderCameraGesture
                handleZoomChange={handleZoomChange}
                zoom={zoom}
            />
            <RenderTiltIndicator isVisible={isLevelIndicatorVisible} />
            <BottomControlBar
                photos={photos}
                zoom={zoom}
                handleZoomChange={handleZoomChange}
                takePicture={takePicture}
                lastPhoto={lastPhoto}
            />
        </>
    )
};

const styles = StyleSheet.create({
    camera: {
        width: "100%",
        aspectRatio: 4 / 3,
    },




    debugContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
        zIndex: 999,
    },
    debugText: {
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
    },

});