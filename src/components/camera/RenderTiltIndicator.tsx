import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

interface Tilt {
    x: number;
    y: number;
    z: number;
}

type AccelerometerSubscription = {
    remove: () => void;
} | null;

const TILT_CONFIG = {
    targetTiltZ: 0.15, // Z軸の目標値（少し後ろに反らせた状態）
    targetTiltX: 0, // X軸の目標値（水平）
    tolerance: 0.05, // 許容範囲
    updateInterval: 100,
    translationMultiplier: 40,
} as const;

export function RenderTiltIndicator() {
    const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0, z: 0 });
    const [subscription, setSubscription] = useState<AccelerometerSubscription>(null);


    const _subscribe = () => {
        Accelerometer.setUpdateInterval(TILT_CONFIG.updateInterval);
        const newSubscription = Accelerometer.addListener(setTilt);
        setSubscription(newSubscription);
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    // Calculate alignment status for both axes
    const isAlignedZ = Math.abs(tilt.z - TILT_CONFIG.targetTiltZ) < TILT_CONFIG.tolerance;
    const isAlignedX = Math.abs(tilt.x - TILT_CONFIG.targetTiltX) < TILT_CONFIG.tolerance;

    // Calculate translation values for visual indicator
    const translateYForZ = (tilt.z - TILT_CONFIG.targetTiltZ) * TILT_CONFIG.translationMultiplier;
    const translateXForX = (tilt.x - TILT_CONFIG.targetTiltX) * TILT_CONFIG.translationMultiplier;


    return (
        <View style={styles.tiltIndicator}>
            <View style={styles.indicatorContainer}>
                <View style={styles.barContainer}>
                    {/* 固定の十字ベース */}
                    <View style={styles.baseBarContainer}>
                        <View style={styles.baseBar} />
                        <View style={[styles.baseBar, { transform: [{ rotate: '90deg' }] }]} />
                    </View>

                    {/* 動く十字 */}
                    <View style={[
                        styles.tiltBarContainer,
                        {
                            transform: [
                                { translateY: translateYForZ },
                                { translateX: translateXForX }
                            ]
                        },
                    ]}>
                        <View style={[
                            styles.tiltBar,
                            (isAlignedX && isAlignedZ) && styles.alignedTiltBar
                        ]} />
                        <View style={[
                            styles.tiltBar,
                            { transform: [{ rotate: '90deg' }] },
                            (isAlignedX && isAlignedZ) && styles.alignedTiltBar
                        ]} />
                    </View>
                </View>
            </View>
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
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    baseBarContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tiltBarContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
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