import { useState, useCallback } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

interface Point {
    x: number;
    y: number;
}

interface DrawingPath {
    id: string;
    points: Point[];
}

export function useDrawingPaths() {
    const [paths, setPaths] = useState<DrawingPath[]>([]);
    const [currentPath, setCurrentPath] = useState<Point[]>([]);

    const generatePathId = useCallback((): string => {
        return `path_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }, []);

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
    }, [generatePathId]);

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

    return {
        paths,
        currentPath,
        panGesture,
        clearAllPaths,
        hasDrawings: paths.length > 0 || currentPath.length > 0
    };
}