import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import ListComponent from "../components/ListComponent";
import AppLayout from "./layouts/AppLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigationTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchData } from "../redux/slices/listSlice";

type NavigationProps = NativeStackScreenProps<RootStackParamList, "ListScreen">;

function ListScreen({ navigation }: NavigationProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.list);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <AppLayout>
      <View style={styles.container}>
        {loading ? <ActivityIndicator size="large" /> : <ListComponent />}
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
