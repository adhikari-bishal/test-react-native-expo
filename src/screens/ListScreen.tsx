import React from "react";
import { StyleSheet, View } from "react-native";
import ListComponent from "../components/ListComponent";

function ListScreen() {
  return (
    <View style={styles.container}>
      <ListComponent data={undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListScreen;
