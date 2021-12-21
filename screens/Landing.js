import React from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { posts } from "../api/landing";
import Post from "./Post";

export default function App({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post navigation={navigation} item={item} options={{
          miniVersion: true,
        }}/>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#808080",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 5,
  }
});
