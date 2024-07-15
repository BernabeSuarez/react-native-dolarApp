import { Text, View, ScrollView } from "react-native";
import { useMoneyStore } from "@/store/dolarStore";
import { MoneyCard } from "../components/MoneyCard";
import { useEffect } from "react";

const otrasCot = () => {
  const { money, loading, getMoney } = useMoneyStore();

  useEffect(() => {
    getMoney();
  }, [getMoney]);

  return (
    <View className="flex-1 bg-slate-800 pt-4">
      <ScrollView className="flex-1 w-full h-full">
        <View className="flex-1 items-center px-2 py-8 w-full">
          <Text className="text-2xl font-bold text-white mb-4">
            Otras Cotizaciones
          </Text>
          <View className="w-full">
            {loading && <Text className="text-white">Cargando...</Text>}
            {money.map((money) => (
              <MoneyCard key={money.nombre} money={money} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default otrasCot;
