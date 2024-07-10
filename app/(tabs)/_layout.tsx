import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "#a1a1aa",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1e293b",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="convert"
        options={{
          title: "Convertidor",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="arrows-alt" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dolares"
        options={{
          title: "Cotizaciones",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="money" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
