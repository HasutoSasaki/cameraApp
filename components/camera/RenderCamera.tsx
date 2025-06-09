import { CameraView, type CameraRatio } from 'expo-camera';
import { useState, useRef, useMemo, FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { ZoomControls } from '../capture/ZoomControls';
import { ControlBar } from '../layout/ControlBar';
import { ShutterBtn } from '../capture/ShutterBtn';
import { Thumbnail } from '../gallery/Thumbnail';
import { CameraModePanel } from '../layout/CameraModePanel';
import { RenderCameraGesture } from './RenderCameraGesture';
import type { ZoomLevel } from '../../assets/types/types';
import { MIN_ZOOM, MAX_ZOOM, DEFAULT_ZOOM } from '../../assets/constants/zoom';
import { DEFAULT_RATIO, RATIO_ASPECT_VALUES } from '@/assets/constants/ratio';
interface Props {
    setIsGalleryVisible: (visible: boolean) => void;
    setPhotos: (photos: MediaLibrary.Asset[]) => void;
}

export const RenderCamera: FunctionComponent<Props> = ({ setIsGalleryVisible, setPhotos }) => {
    const ref = useRef<CameraView>(null);
    const [lastPhoto, setLastPhoto] = useState<string | null>(null);
    const [zoom, setZoom] = useState<ZoomLevel>(MIN_ZOOM);
    const [ratio, setRatio] = useState<CameraRatio>(DEFAULT_RATIO);

    const aspectRatio = useMemo(() => {
        const newAspectRatio = RATIO_ASPECT_VALUES[ratio];
        console.log('RenderCamera: Ratio changed to', ratio, 'AspectRatio:', newAspectRatio);
        return newAspectRatio;
    }, [ratio]);

    const takePicture = async () => {
        const photo = await ref.current?.takePictureAsync();
        if (!photo) return;
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        setLastPhoto(photo.uri);
        await loadPhotos();
    };

    const loadPhotos = async () => {
        try {
            const { assets } = await MediaLibrary.getAssetsAsync({
                first: 20,
                sortBy: ['creationTime'],
                mediaType: ['photo']
            });
            setPhotos(assets);
        } catch (error) {
            console.error('Error loading photos:', error);
        }
    }

    const handleZoomChange = (newZoom: ZoomLevel) => {
        if (newZoom >= MAX_ZOOM) return;
        setZoom(newZoom);
    };

    const handleCameraReady = () => {
        //useStateに直接0.2を設定すると反映されないためカメラが準備できたタイミングで設定
        setZoom(DEFAULT_ZOOM);
    };

    const handleRatioChange = (newRatio: CameraRatio) => {
        console.log('RenderCamera: Received ratio change request:', newRatio);
        setRatio(newRatio);
    };

    return (
        <>
            <CameraView
                style={[styles.camera, { aspectRatio }]}
                ref={ref}
                mute={false}
                zoom={zoom}
                responsiveOrientationWhenOrientationLocked
                onCameraReady={handleCameraReady}
                ratio={ratio}
            />
            <ControlBar ratio={ratio} setRatio={handleRatioChange} />
            <RenderCameraGesture
                zoom={zoom}
                setZoom={setZoom}
            />

            <CameraModePanel />

            <View style={styles.cameraControls}>
                <View style={styles.gridItem}>
                    <Thumbnail lastPhoto={lastPhoto} setIsGalleryVisible={setIsGalleryVisible} />
                </View>
                <View style={styles.gridItem}>
                    <ShutterBtn takePicture={takePicture} />
                </View>
                <View style={styles.gridItem}>
                    <ZoomControls
                        currentZoom={zoom}
                        onZoomChange={handleZoomChange}
                    />
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    camera: {
        width: "100%",
        aspectRatio: 4 / 3,
    },

    cameraControls: {
        position: "absolute",
        bottom: 20,
        left: 0,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 30,
    },
    gridItem: {
        flexBasis: '33.33%',
        alignItems: "center",
        justifyContent: "center",
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