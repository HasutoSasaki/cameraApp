// filepath: [BottomControlBar.tsx](http://_vscodecontentref_/1)
import { View, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { ZoomSelector } from './ZoomSelector';
import { ShutterButton } from './ShutterButton';
import { Thumbnail } from '../../gallery/Thumbnail';
import type { ZoomLevel } from '../../../assets/types/types';
import { ModeSelector } from './ModeSelector';

interface Props {
  zoom: ZoomLevel;
  photos: MediaLibrary.Asset[];
  handleZoomChange: (zoom: ZoomLevel) => void;
  takePicture: () => Promise<void>;
  lastPhoto: string | null;
}

export function BottomControlBar({ photos, zoom, handleZoomChange, takePicture, lastPhoto }: Props) {
  return (
    <View style={styles.container}>
      <ModeSelector />
      <View style={styles.captureControls}>
        <View style={styles.gridItem}>
          <Thumbnail
            lastPhoto={lastPhoto}
            photos={photos}
          />
        </View>
        <View style={styles.gridItem}>
          <ShutterButton takePicture={takePicture} />
        </View>
        <View style={styles.gridItem}>
          <ZoomSelector
            currentZoom={zoom}
            handleZoomChange={handleZoomChange}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
  },
  captureControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  gridItem: {
    flexBasis: '33.33%',
    alignItems: "center",
    justifyContent: "center",
  },
});