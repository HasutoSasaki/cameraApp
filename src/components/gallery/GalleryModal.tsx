import { Modal, View, Button, Pressable, Text, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { useState, FunctionComponent } from "react";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { FullScreenImage } from "./FullScreenImage";
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    isGalleryVisible: boolean;
    setIsGalleryVisible: (visible: boolean) => void;
    photos: MediaLibrary.Asset[];
}

export function GalleryModal({ photos, isGalleryVisible, setIsGalleryVisible }: Props) {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);

    return (
        <Modal
            visible={isGalleryVisible}
            animationType="slide"
            onRequestClose={() => setIsGalleryVisible(false)}
        >
            <SafeAreaView style={styles.galleryContainer}>
                <View style={styles.header}>
                    <Button
                        title="閉じる"
                        onPress={() => setIsGalleryVisible(false)}
                        color="#007AFF"
                    />
                </View>
                <View style={styles.photoGrid}>
                    {photos && photos.length > 0 ? (
                        photos.map((photo) => (
                            <Pressable
                                key={photo.id}
                                onPress={() => {
                                    setSelectedPhoto(photo.uri);
                                    setIsFullScreenVisible(true);
                                }}
                                style={styles.photoContainer}
                            >
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={styles.gridPhoto}
                                    contentFit="cover"
                                />
                            </Pressable>
                        ))
                    ) : (
                        <Text style={styles.noPhotosText}>No photos found</Text>
                    )}
                </View>
            </SafeAreaView>
            {selectedPhoto && isFullScreenVisible && (
                <FullScreenImage
                    uri={selectedPhoto}
                    onClose={() => {
                        setIsFullScreenVisible(false);
                        setSelectedPhoto(null);
                    }}
                />
            )}
        </Modal>
    )
};

const styles = StyleSheet.create({
    galleryContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        borderBottomWidth: 1,
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2,
        padding: 2,
    },
    photoContainer: {
        width: (Dimensions.get('window').width - 9) / 3, // 3カラムにするために画面幅から余白を引いて3で割る
        aspectRatio: 1,
    },
    gridPhoto: {
        width: '100%',
        height: '100%',
    },
    noPhotosText: {
        color: 'white',
        textAlign: 'center',
        width: '100%',
        paddingTop: 20,
    },
});