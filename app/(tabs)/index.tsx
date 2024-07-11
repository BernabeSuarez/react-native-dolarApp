import { Text, View, ScrollView, ImageBackground } from "react-native";

import { Link } from "expo-router";
import { useEffect } from "react";
import { useDolarStore } from "@/store/dolarStore";

export default function Index() {
  const { getDolars } = useDolarStore();

  useEffect(() => {
    getDolars();
  }, [getDolars]);
  return (
    <View className="flex-1 bg-slate-800 pt-8 ">
      <View className="flex-1 ipx-6 py-8 px-4">
        <Text className="text-3xl text-center font-bold text-[#22c55e] mb-4">
          Dolarcito
        </Text>
        <Text className="text-md font-light text-white">
          Explora el valor actual del Dólar 💵 y todas sus cotizaciones del día
          en Argentina 🇦🇷 desde un mismo lugar.
        </Text>
        <Text className="text-md font-light text-white ">
          Monitoreá el valor del Dólar Oficial, Blue, MEP, CCL y Mayorista,
          ¡actualizados al minuto!
        </Text>
        <Text className="text-md font-light text-white ">
          Convertí Pesos Argentinos a Dólares y viceversa con precisión y
          facilidad.
        </Text>
        <Link href="/dolares" className="items-start text-white  text-lg mt-4">
          Ver cotizaciones
        </Link>
      </View>
    </View>
  );
}
