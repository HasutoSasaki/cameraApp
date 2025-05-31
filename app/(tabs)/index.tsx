import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router"
import { GroupMode } from "@/components/layout/GroupMode";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <GroupMode />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#fff',
  },
  button: {
    padding: 10,
    backgroundColor: '#388e3c',
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  }
});

