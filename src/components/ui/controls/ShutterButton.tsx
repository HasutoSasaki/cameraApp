import { Pressable, View, StyleSheet } from 'react-native'

interface Props {
    takePicture: () => Promise<void>
}

export function ShutterButton({ takePicture }: Props) {

    return (
        <Pressable onPress={takePicture}>
            {({ pressed }) => (
                <View
                    style={[
                        styles.ShutterButton,
                        { opacity: pressed ? 0.5 : 1 },
                    ]}
                >
                    <View style={styles.ShutterButtonInner} />
                </View>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    ShutterButton: {
        backgroundColor: "transparent",
        borderWidth: 5,
        borderColor: "white",
        width: 70,
        height: 70,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    ShutterButtonInner: {
        width: 55,
        height: 55,
        borderRadius: 50,
    },
})