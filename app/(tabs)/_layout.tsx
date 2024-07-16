import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";

import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#9EDED8",
        tabBarInactiveTintColor: "#88888b",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1e293b",
          paddingVertical: 10,
          paddingHorizontal: 10,
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
            <MaterialIcons name="currency-exchange" size={24} color={color} />
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
      <Tabs.Screen
        name="otrasCot"
        options={{
          title: "Mas Monedas",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="euro" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
