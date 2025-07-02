import { View, Image, StyleSheet, Pressable } from 'react-native';

interface CameraToolsPanelProps {
    onDrawingGridToggle?: () => void;
    onGridVisibilityToggle?: () => void;
    onLevelIndicatorToggle?: () => void;
    isDrawingGridEnabled?: boolean;
    isGridVisible?: boolean;
    isLevelIndicatorVisible?: boolean;
}

const CAMERA_TOOLS = [
    {
        id: 'drawing-grid',
        source: require('@/assets/images/icon/grid_plus.png'),
        action: 'onDrawingGridToggle' as const,
        accessibilityLabel: 'Toggle drawing grid tool',
        stateKey: 'isDrawingGridEnabled' as const
    },
    {
        id: 'grid-visibility',
        source: require('@/assets/images/icon/grid.png'),
        action: 'onGridVisibilityToggle' as const,
        accessibilityLabel: 'Toggle grid visibility',
        stateKey: 'isGridVisible' as const
    },
    {
        id: 'level-indicator',
        source: require('@/assets/images/icon/deg.png'),
        action: 'onLevelIndicatorToggle' as const,
        accessibilityLabel: 'Toggle level indicator',
        stateKey: 'isLevelIndicatorVisible' as const
    }
] as const;

export function CameraToolsPanel({
    onDrawingGridToggle,
    onGridVisibilityToggle,
    onLevelIndicatorToggle,
    isDrawingGridEnabled = false,
    isGridVisible = false,
    isLevelIndicatorVisible = false
}: CameraToolsPanelProps) {
    const actionMap = {
        onDrawingGridToggle,
        onGridVisibilityToggle,
        onLevelIndicatorToggle
    };

    const stateMap = {
        isDrawingGridEnabled,
        isGridVisible,
        isLevelIndicatorVisible
    };

    const handleToolPress = (action: keyof typeof actionMap) => {
        const handler = actionMap[action];
        if (handler) {
            handler();
        }
    };

    return (
        <View style={styles.container}>
            {CAMERA_TOOLS.map((tool) => {
                const isActive = stateMap[tool.stateKey];

                return (
                    <Pressable
                        key={tool.id}
                        style={[
                            styles.toolButton,
                            isActive && styles.activeToolButton
                        ]}
                        onPress={() => handleToolPress(tool.action)}
                        accessibilityLabel={tool.accessibilityLabel}
                        accessibilityState={{ selected: isActive }}
                    >
                        <Image
                            source={tool.source}
                            style={[
                                styles.toolIcon,
                                isActive && styles.activeToolIcon
                            ]}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    toolButton: {
        padding: 6,
        borderRadius: 6,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    activeToolButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    toolIcon: {
        width: 24,
        height: 24,
        tintColor: 'rgba(255, 255, 255, 0.7)',
    },
    activeToolIcon: {
        tintColor: '#fff',
    },
});