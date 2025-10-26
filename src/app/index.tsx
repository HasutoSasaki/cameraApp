import { StyleSheet, View } from 'react-native';
import { CameraLayout } from '@/components/layout/CameraLayout';

export default function indexPage() {
  return (
    <View style={styles.container}>
      <CameraLayout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
