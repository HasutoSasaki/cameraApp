import { StyleSheet, View } from 'react-native';
import { GroupMode } from '@/components/layout/GroupMode';

export default function indexPage() {
    return (
        <View style={styles.container}>
            <GroupMode />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});