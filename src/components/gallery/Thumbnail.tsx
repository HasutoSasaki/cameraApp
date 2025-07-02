
import { Pressable, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Image } from 'expo-image';
import { GalleryModal } from '../gallery/GalleryModal';
import { Asset } from 'expo-media-library';

interface Props {
    lastPhoto: string | null;
    photos: Asset[];
}

export function Thumbnail({ lastPhoto, photos }: Props) {

    const [isGalleryVisible, setIsGalleryVisible] = useState(false);


    return (
        <>
            <View style={[styles.thumbnailContainer]}>
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
            <GalleryModal
                isGalleryVisible={isGalleryVisible}
                setIsGalleryVisible={setIsGalleryVisible}
                photos={photos}
            />
        </>
    );
}

const styles = StyleSheet.create({
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 10,
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
})