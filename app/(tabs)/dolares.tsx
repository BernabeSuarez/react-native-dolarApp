import { Text, View, ScrollView } from "react-native";
import { useDolarStore, useMoneyStore } from "@/store/dolarStore";
import { DolarCard } from "../components/DolarCard";
import { useEffect } from "react";

export default function Dolares() {
  const { dolars, loading, getDolars } = useDolarStore();
  useEffect(() => {
    getDolars();
  }, [getDolars]);

  return (
    <View className="flex-1 bg-slate-800 pt-4">
      <ScrollView className="flex-1 w-full h-full">
        <View className="flex-1 items-center px-2 py-8 w-full">
          <Text className="text-2xl font-bold text-[#9EDED8] mt-4 mb-2">
            Cotizaciones
          </Text>
          <Text className="text-xs font-light text-slate-500 mb-4">
            cotización según Ámbito Financiero
          </Text>
          <View className="w-full">
            {loading && <Text className="text-white">Cargando...</Text>}
            {dolars.map((dolar) => (
              <DolarCard key={dolar.nombre} dolar={dolar} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
