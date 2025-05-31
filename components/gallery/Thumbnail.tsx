
import { Pressable, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

interface Props {
    lastPhoto: string | null;
    setIsGalleryVisible: (visible: boolean) => void;
}
export function Thumbnail({ lastPhoto, setIsGalleryVisible }: Props) {
    return (
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