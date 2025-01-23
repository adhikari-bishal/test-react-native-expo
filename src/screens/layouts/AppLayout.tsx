import { SafeAreaView, StyleSheet } from "react-native";

const AppLayout = ({ children }) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
  });

  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
};

export default AppLayout;
