import { Text, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useDolarStore } from "@/store/dolarStore";
import { DolarCard } from "../components/DolarCard";

export default function Dolares() {
  const { dolars, setDolars } = useDolarStore();
  const getDolars = async () => {
    try {
      const response = await fetch("https://dolarapi.com/v1/dolares");
      const data = await response.json();
      setDolars(data);
    } catch (error) {
      console.error(error);
    } finally {
      //  setLoading(false);
    }
  };

  useEffect(() => {
    getDolars();
  }, []);

  return (
    <View className="flex-1 bg-slate-800 pt-8">
      <ScrollView className="flex-1 w-full h-full">
        <View className="flex-1 items-center px-2 py-8 w-full">
          <Text className="text-3xl font-bold text-white mb-4">
            Cotizaciones
          </Text>
          <View className="w-full">
            {dolars.map((dolar) => (
              <DolarCard key={dolar.nombre} dolar={dolar} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
