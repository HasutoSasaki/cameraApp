import { Pressable, View, StyleSheet } from 'react-native'

interface Props {
    takePicture: () => void
}

export function ShutterBtn({ takePicture }: Props) {

    return (
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
    )
}

const styles = StyleSheet.create({
    shutterBtn: {
        backgroundColor: "transparent",
        borderWidth: 5,
        borderColor: "white",
        width: 70,
        height: 70,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    shutterBtnInner: {
        width: 55,
        height: 55,
        borderRadius: 50,
    },
})