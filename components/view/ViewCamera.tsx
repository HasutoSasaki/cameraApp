import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from "expo-image";
import { useState, useRef } from 'react';
import { Button, StyleSheet, Pressable, Text, View, Modal } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export function ViewCamera() {
    const [permission, requestPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
    const ref = useRef<CameraView>(null);
    const [lastPhoto, setLastPhoto] = useState<string | null>(null);
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);
    const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);

    if (!permission || !mediaPermission) return <View />;

    if (!permission.granted || !mediaPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ color: "white" }}>
                    カメラとメディアライブラリのアクセスを許可してください
                </Text>
                <Button
                    title="カメラとメディアライブラリのアクセスを許可"
                    onPress={async () => {
                        await requestPermission();
                        await requestMediaPermission();
                    }}
                />
            </View>
        );
    }

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

    const renderCamera = () => {
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

    const renderGallery = () => (
        <Modal
            visible={isGalleryVisible}
            animationType="slide"
            onRequestClose={() => setIsGalleryVisible(false)}
        >
            <View style={styles.galleryContainer}>
                <Button title="閉じる" onPress={() => setIsGalleryVisible(false)} />
                <View style={styles.photoGrid}>
                    {photos && photos.length > 0 ? (
                        photos.map((photo) => (
                            <Image
                                key={photo.id}
                                source={{ uri: photo.uri }}
                                style={styles.gridPhoto}
                                contentFit="cover"
                            />
                        ))
                    ) : (
                        <Text style={{ color: "white" }}>No photos found</Text>
                    )}
                </View>
            </View>
        </Modal>
    );
    return (
        <View style={styles.container}>
            {renderCamera()}
            {renderGallery()}
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
    camera: {
        flex: 1,
        width: "100%",
    },

    // カメラのシャッター部分
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

    thumbnailContainer: {
        width: 60, // サムネイルと同じ幅
        height: 60, // サムネイルと同じ高さ
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyThumbnail: {
        backgroundColor: 'transparent', // 透明
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'white',
    },

    // ギャラリー部分
    galleryContainer: {
        flex: 1,
        backgroundColor: '#000',
        padding: 50,
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingTop: 20,
    },
    gridPhoto: {
        width: '32%',
        height: '32%',
        aspectRatio: 1,
        marginBottom: 10,
    },
});