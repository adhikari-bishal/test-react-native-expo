import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigationTypes";
import AppLayout from "./layouts/AppLayout";

type NavigationProps = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

function HomeScreen({ navigation }: NavigationProps) {
  return (
    <AppLayout>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("ListScreen")}>
          <Text>List Demo</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
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

export default HomeScreen;
