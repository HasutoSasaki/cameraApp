import { View, StyleSheet } from 'react-native';
import { CameraRatio } from 'expo-camera';
import { ZIndex } from '@/assets/style/zindex';
import { Layout } from '@/assets/style/layout';
import { RatioSelector } from '@/components/ui/tools/RatioSelector';
import { CameraToolsPanel } from '@/components/controlBar/CameraToolsPanel';

interface ControlBarProps {
  setRatio: (ratio: CameraRatio) => void;
  ratio: CameraRatio;
  isLevelIndicatorVisible: boolean;
  setIsLevelIndicatorVisible: (visible: boolean) => void;
  isGridVisible: boolean;
  setIsGridVisible: (visible: boolean) => void;
  isDrawingEnabled: boolean;
  setIsDrawingEnabled: (enabled: boolean) => void;
}
export function TopControlBar({
  setRatio,
  ratio,
  isLevelIndicatorVisible,
  setIsLevelIndicatorVisible,
  isGridVisible,
  setIsGridVisible,
  isDrawingEnabled,
  setIsDrawingEnabled,
}: ControlBarProps) {
  const handleRatioChange = (newRatio: CameraRatio) => {
    setRatio(newRatio);
  };

  const toggleDrawingMode = () => {
    setIsDrawingEnabled(!isDrawingEnabled);
  };

  const toggleGridVisibility = () => {
    setIsGridVisible(!isGridVisible);
  };

  const toggleLevelIndicator = () => {
    setIsLevelIndicatorVisible(!isLevelIndicatorVisible);
  };

  return (
    <View style={styles.container}>
      <RatioSelector currentRatio={ratio} onRatioChange={handleRatioChange} />
      <CameraToolsPanel
        toggleDrawingMode={toggleDrawingMode}
        toggleGridVisibility={toggleGridVisibility}
        toggleLevelIndicator={toggleLevelIndicator}
        isDrawingEnabled={isDrawingEnabled}
        isGridVisible={isGridVisible}
        isLevelIndicatorVisible={isLevelIndicatorVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Layout.SAFE_AREA_TOP,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.CONTROL_BAR_PADDING,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
    zIndex: ZIndex.control_bar,
  },
});
