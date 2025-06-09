import { Pressable, Image, StyleSheet, View } from 'react-native'
import { images } from '@/assets/index'

export function CameraModePanel() {

    const modeList = [
        {
            label: 'Selfie',
            icon: images.selfieIcon,
            mode: 'selfie'
        },
        {
            label: 'Solo',
            icon: images.soloIcon,
            mode: 'solo'
        },
        {
            label: 'Solo Stand',
            icon: images.soloStandIcon,
            mode: 'solo_stand'
        },
        {
            label: 'Group',
            icon: images.groupIcon,
            mode: 'group'
        },
    ]

    return (
        <View style={styles.container}>
            {modeList.map((mode) => (
                <Pressable key={mode.label} style={styles.modeButton}>
                    <Image
                        source={mode.icon}
                        style={styles.modeIcon}
                        resizeMode="contain"
                    />
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#000',
    },
    modeButton: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    modeIcon: {
        width: 45,
        height: 45,
    },
})
