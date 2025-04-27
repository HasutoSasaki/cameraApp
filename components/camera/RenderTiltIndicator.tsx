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

    const targetTilt = 0.15; // 後ろに反らせた状態の目標値
    const tolerance = 0.05; // 許容範囲
    const isAligned = Math.abs(tilt.z - targetTilt) < tolerance;

    // Z軸の値からバーの位置を計算
    const translateY = (tilt.z - targetTilt) * 40;

    return (
        <View style={styles.tiltIndicator}>
            <View style={styles.barContainer}>
                {/* 基準となる固定バー */}
                <View style={styles.baseBar} />
                {/* 動く傾きバー */}
                <View style={[
                    styles.tiltBar,
                    { transform: [{ translateY }] },
                    isAligned && styles.alignedTiltBar
                ]} />
            </View>
            <Text style={styles.tiltText}>
                {isAligned ? '位置が合っています' : '角度を調整してください'}
            </Text>
            <Text style={styles.debugText}>{`Z軸：${tilt.z.toFixed(2)}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tiltIndicator: {
        position: 'absolute',
        top: 40,
        alignSelf: 'center',
        alignItems: 'center',
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
        backgroundColor: '#00ff00',
    },
    tiltText: {
        color: 'white',
        fontSize: 16,
        marginTop: 10,
    },
    debugText: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
    },
});