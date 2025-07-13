import { View, StyleSheet } from 'react-native';
import { calculateLineSegmentStyle } from '@/utils/drawing';

interface Point {
    x: number;
    y: number;
}

interface DrawingPath {
    id: string;
    points: Point[];
}

interface DrawingCanvasProps {
    /** 完成した描画パスの配列 */
    paths: DrawingPath[];
    /** 現在描画中のパス */
    currentPath: Point[];
}

const STROKE_WIDTH = 2;
const DEFAULT_COLOR = '#000000';
const ACTIVE_COLOR = '#00ff00';

/**
 * 描画パスをレンダリングするキャンバスコンポーネント
 * 完成したパスと現在描画中のパスを線分として描画する
 */
export function DrawingCanvas({ paths, currentPath }: DrawingCanvasProps) {
    /**
     * ポイント配列から線分を生成してレンダリング
     * @param points 描画ポイントの配列
     * @param pathKey パスの一意キー
     * @param isActive アクティブ状態（描画中）かどうか
     */
    const renderPathSegments = (points: Point[], pathKey: string, isActive = false) => {
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
    };

    return (
        <>
            {/* 完成済みパスの描画 */}
            {paths.map(path => (
                <View key={path.id} style={StyleSheet.absoluteFillObject}>
                    {renderPathSegments(path.points, path.id, false)}
                </View>
            ))}

            {/* 現在描画中のパス */}
            {currentPath.length > 1 && (
                <View style={StyleSheet.absoluteFillObject}>
                    {renderPathSegments(currentPath, 'current', true)}
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    lineSegment: {
        position: 'absolute',
        height: STROKE_WIDTH,
        backgroundColor: DEFAULT_COLOR,
        borderRadius: STROKE_WIDTH / 2,
        transformOrigin: 'left center',
    },
});