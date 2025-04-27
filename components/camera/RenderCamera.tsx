
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from "expo-image";
import { useState, useRef, FunctionComponent } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

interface Props {
    setIsGalleryVisible: (visible: boolean) => void;
    setPhotos: (photos: MediaLibrary.Asset[]) => void;
}

export const RenderCamera: FunctionComponent<Props> = ({ setIsGalleryVisible, setPhotos }) => {
    const ref = useRef<CameraView>(null);
    const [lastPhoto, setLastPhoto] = useState<string | null>(null);

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

    return (
        <CameraView
            style={styles.camera}
            ref={ref}
            mute={false}
            responsiveOrientationWhenOrientationLocked
        >
            <View style={styles.shutterContainer}>
                <View style={styles.thumbnailContainer}>
                    {lastPhoto ? (
                        <Pressable onPress={() => setIsGalleryVisible(true)}>
                            <Image
                                source={{ uri: lastPhoto }}
                                style={styles.thumbnail}
                                contentFit="cover"
                            />
                        </Pressable>
                    ) : (
                        <View style={[styles.thumbnail, styles.emptyThumbnail]} />
                    )}
                </View>
                <Pressable onPress={takePicture}>
                    {({ pressed }) => (
                        <View
                            style={[
                                styles.shutterBtn,
                                { opacity: pressed ? 0.5 : 1 },
                            ]}
                        >
                            <View style={styles.shutterBtnInner} />
                        </View>
                    )}
                </Pressable>
                {/* 倍率を変えられる機能が入る予定 */}
                <Pressable onPress={() => { }}>
                    <Text style={{ color: "white" }}>1x</Text>
                </Pressable>
            </View>
        </CameraView>
    )
};

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        width: "100%",
    },

    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'white',
    },
    thumbnailContainer: {
        width: 60, // サムネイルと同じ幅
        height: 60, // サムネイルと同じ高さ
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyThumbnail: {
        backgroundColor: 'transparent', // 透明
    },
    shutterContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
    },
    shutterBtn: {
        backgroundColor: "transparent",
        borderWidth: 5,
        borderColor: "white",
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    shutterBtnInner: {
        width: 65,
        height: 65,
        borderRadius: 50,
    },
});