import { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';
import { ZIndex } from '@/assets/style/zindex';

const STROKE_WIDTH = 2;
const DEFAULT_COLOR = '#000000';
const ACTIVE_COLOR = '#00ff00';

interface Point {
    x: number;
    y: number;
}

interface DrawingPath {
    id: string;
    points: Point[];
}

interface RenderDrawingOverlayProps {
    isVisible: boolean;
    ratio: string;
}

export function RenderDrawingOverlay({ isVisible, ratio }: RenderDrawingOverlayProps) {
    const [paths, setPaths] = useState<DrawingPath[]>([]);
    const [currentPath, setCurrentPath] = useState<Point[]>([]);

    const aspectRatio = ratio === '16:9' ? 16 / 9 : ratio === '1:1' ? 1 : 4 / 3;

    // uiスレッドでjsスレッドからのState更新を安全に実行するためのヘルパー関数
    const startNewPath = useCallback((x: number, y: number) => {
        try {
            setCurrentPath([{ x, y }]);
        } catch (error) {
            console.error('Error starting new path:', error);
        }
    }, []);

    const updateCurrentPath = useCallback((x: number, y: number) => {
        try {
            setCurrentPath(prev => [...prev, { x, y }]);
        } catch (error) {
            console.error('Error updating path:', error);
        }
    }, []);

    const finishCurrentPath = useCallback(() => {
        try {
            setCurrentPath(prev => {
                if (prev.length > 1) {
                    setPaths(existing => [...existing, {
                        id: generatePathId(),
                        points: [...prev]
                    }]);
                }
                return [];
            });
        } catch (error) {
            console.error('Error finishing path:', error);
        }
    }, []);

    // すべての線をクリアする関数
    const clearAllPaths = useCallback(() => {
        try {
            setPaths([]);
            setCurrentPath([]);
        } catch (error) {
            console.error('Error clearing paths:', error);
        }
    }, []);

    const panGesture = Gesture.Pan()
        .onBegin((event) => {
            const { x, y } = event;
            runOnJS(startNewPath)(x, y);
        })
        .onUpdate((event) => {
            const { x, y } = event;
            runOnJS(updateCurrentPath)(x, y);
        })
        .onEnd(() => {
            runOnJS(finishCurrentPath)();
        });

    const generatePathId = useCallback((): string => {
        return `path_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }, []);

    const calculateLineSegmentStyle = useCallback((start: Point, end: Point) => {
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angleInRadians = Math.atan2(deltaY, deltaX);
        const angleInDegrees = angleInRadians * (180 / Math.PI);

        return {
            left: start.x,
            top: start.y - STROKE_WIDTH / 2,
            width: length,
            transform: [{ rotate: `${angleInDegrees}deg` }],
        };
    }, []);

    const renderPathSegments = useCallback((points: Point[], pathKey: string, isActive = false) => {
        if (points.length < 2) return null;

        return points.slice(0, -1).map((start, index) => {
            const end = points[index + 1];
            const segmentKey = `${pathKey}_segment_${index}`;
            const segmentStyle = calculateLineSegmentStyle(start, end);

            return (
                <View
                    key={segmentKey}
                    style={[
                        styles.lineSegment,
                        segmentStyle,
                        { backgroundColor: isActive ? ACTIVE_COLOR : DEFAULT_COLOR }
                    ]}
                />
            );
        });
    }, [calculateLineSegmentStyle]);

    // isVisibleがfalseの場合は何も表示しない
    if (!isVisible) return null;

    return (
        <View style={[styles.overlay, { aspectRatio }]}>
            {/* クリアボタン - 線が描かれている時のみ表示 */}
            {(paths.length > 0 || currentPath.length > 0) && (
                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearAllPaths}
                >
                    <Text style={styles.clearButtonText}>クリア</Text>
                </TouchableOpacity>
            )}

            <GestureDetector gesture={panGesture}>
                <Animated.View style={StyleSheet.absoluteFillObject}>
                    {/* 完成した線の描画 */}
                    {paths.map(path => (
                        <View key={path.id} style={StyleSheet.absoluteFillObject}>
                            {renderPathSegments(path.points, path.id)}
                        </View>
                    ))}

                    {/* 現在描画中の線 */}
                    {currentPath.length > 1 && (
                        <View style={StyleSheet.absoluteFillObject}>
                            {renderPathSegments(currentPath, 'current', true)}
                        </View>
                    )}
                </Animated.View>
            </GestureDetector>
        </View>
    );
}



const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        zIndex: ZIndex.drawing_overlay,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
    lineSegment: {
        position: 'absolute',
        height: STROKE_WIDTH,
        backgroundColor: DEFAULT_COLOR,
        borderRadius: STROKE_WIDTH / 2,
        transformOrigin: 'left center',
    },
    clearButton: {
        position: 'absolute',
        top: 100,
        right: 118,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        zIndex: 100,
    },
    clearButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});