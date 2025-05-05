import { CameraView } from 'expo-camera';
import { useState, useRef, FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { ZoomControls } from './ZoomControls';
import { ShutterBtn } from './ShutterBtn';
import { Thumbnail } from './Thumbnail';
import { RenderCameraGesture } from './RenderCameraGesture';
import type { ZoomLevel } from '../../assets/types/types';

interface Props {
    setIsGalleryVisible: (visible: boolean) => void;
    setPhotos: (photos: MediaLibrary.Asset[]) => void;
}

export const RenderCamera: FunctionComponent<Props> = ({ setIsGalleryVisible, setPhotos }) => {
    const ref = useRef<CameraView>(null);
    const [lastPhoto, setLastPhoto] = useState<string | null>(null);
    const [zoom, setZoom] = useState<ZoomLevel>(0.5);

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
        setZoom(newZoom);
    };

    return (
        <CameraView
            style={styles.camera}
            ref={ref}
            mute={false}
            zoom={zoom}
            responsiveOrientationWhenOrientationLocked
        >
            <RenderCameraGesture
                zoom={zoom}
                setZoom={setZoom}
            />
            <View style={styles.shutterContainer}>
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
        </CameraView >
    )
};

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        width: "100%",
    },

    shutterContainer: {
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