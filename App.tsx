import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, ListScreen } from "./src/screens";
import { RootStackParamList } from "./src/types/navigationTypes";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator id={undefined} initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerTitle: "Test - React Native Expo",
            }}
          />
          <Stack.Screen
            name="ListScreen"
            component={ListScreen}
            options={{
              headerTitle: "List Demo",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
