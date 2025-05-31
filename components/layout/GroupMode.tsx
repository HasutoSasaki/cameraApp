import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from "expo-image";
import { useState, useRef } from 'react';
import { Button, StyleSheet, Pressable, Text, View, Modal } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { GalleryModal } from '../gallery/GalleryModal';
import { RenderCamera } from '../camera/RenderCamera';
import { RenderRequestPermission } from '../camera/RenderRequestPermission';
import { RenderTiltIndicator } from '../camera/RenderTiltIndicator';

export function GroupMode() {
    const [permission, requestPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);
    const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);

    if (!permission || !mediaPermission) return <View />;

    if (!permission.granted || !mediaPermission.granted) {
        return <RenderRequestPermission
            requestPermission={requestPermission}
            requestMediaPermission={requestMediaPermission}
        />;
    }

    return (
        <View style={styles.container}>
            <RenderCamera
                setPhotos={setPhotos}
                setIsGalleryVisible={setIsGalleryVisible}
            />
            <RenderTiltIndicator />
            <GalleryModal
                isGalleryVisible={isGalleryVisible}
                setIsGalleryVisible={setIsGalleryVisible}
                photos={photos}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});