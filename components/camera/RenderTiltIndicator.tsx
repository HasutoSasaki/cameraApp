import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export function RenderTiltIndicator() {
    const [tilt, setTilt] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        let subscription;

        Accelerometer.setUpdateInterval(100);

        subscription = Accelerometer.addListener(accelerometerData => {
            setTilt({
                x: accelerometerData.x,
                y: accelerometerData.y,
                z: accelerometerData.z
            });
        });

        return () => {
            subscription && subscription.remove();
        };
    }, []);

    // Z軸の目標値（少し後ろに反らせた状態）
    const targetTiltZ = 0.15;
    // X軸の目標値（水平）
    const targetTiltX = 0;

    const tolerance = 0.05;

    // 各軸の判定
    const isAlignedZ = Math.abs(tilt.z - targetTiltZ) < tolerance;
    const isAlignedX = Math.abs(tilt.x - targetTiltX) < tolerance;
    // 両方の軸が合っているかどうか
    const isPerfectlyAligned = isAlignedX && isAlignedZ;

    // Z軸とX軸の値からバーの位置を計算
    const translateYForZ = (tilt.z - targetTiltZ) * 40;
    const rotateAngleX = tilt.x * 45; // X軸の傾きを±45度の範囲で回転角度に変換

    return (
        <View style={styles.tiltIndicator}>
            <View style={styles.indicatorContainer}>
                <View style={styles.barContainer}>
                    <View style={styles.baseBar} />
                    <View style={[
                        styles.tiltBar,
                        { transform: [{ rotate: `${rotateAngleX}deg` }, { translateY: translateYForZ }] },
                        (isAlignedX && isAlignedZ) && styles.alignedTiltBar
                    ]} />
                </View>
            </View>

            {/* ステータステキスト */}
            <Text style={[
                styles.statusText,
                isPerfectlyAligned && styles.perfectStatusText
            ]}>
                {isPerfectlyAligned
                    ? 'excellent!'
                    : 'adjust the angles'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tiltIndicator: {
        position: 'absolute',
        top: '45%',
        alignSelf: 'center',
        alignItems: 'center',
        gap: 20,
    },
    indicatorContainer: {
        alignItems: 'center',
        gap: 8,
    },
    barContainer: {
        position: 'relative',
        width: 200,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    baseBar: {
        position: 'absolute',
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
    },
    tiltBar: {
        position: 'absolute',
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 2,
    },
    alignedTiltBar: {
        backgroundColor: 'rgb(255, 247, 0)',
    },
    statusText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    perfectStatusText: {
        color: 'rgb(255, 247, 0)',
    },
});