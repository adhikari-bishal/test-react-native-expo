import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import ListComponent from "../components/ListComponent";
import AppLayout from "./layouts/AppLayout";
import { RootStackParamList } from "../types/navigationTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface Item {
  id: number;
  name: string;
}

type NavigationProps = NativeStackScreenProps<RootStackParamList, "ListScreen">;

function ListScreen({ navigation }: NavigationProps) {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );

      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <ActivityIndicator size={"large"} />
  ) : (
    <AppLayout>
      <View style={styles.container}>
        <ListComponent data={data} />
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListScreen;
