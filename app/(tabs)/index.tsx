import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router"
import { ViewCamera } from "@/components/view/ViewCamera";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ViewCamera />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
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

