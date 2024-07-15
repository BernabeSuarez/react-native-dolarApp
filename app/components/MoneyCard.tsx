import { IMoney } from "@/interfaces/dolar";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const MoneyCard = ({ money }: { money: IMoney }) => {
  return (
    <View
      key={money.nombre}
      className="flex-1 flex-row items-center justify-between rounded-lg w-screen px-4"
    >
      <View className="h-12 w-12 flex items-center justify-center rounded-md bg-slate-700 ">
        <FontAwesome name="dollar" size={28} color="#22c55e" />
      </View>
      <View className="p-2 flex-1 flex-col">
        <Text className="text-md font-medium text-white">{money.nombre}</Text>

        <Text className="text-xs text-gray-500 ">
          Actualizado:{" "}
          {new Date(money.fechaActualizacion).toLocaleString("es-AR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Text className="text-xs font-light italic text-white">
          Compra: $ {money.compra}
        </Text>
      </View>
      <View className="flex-1 items-center justify-end w-full">
        <Text className="text-lg font-light text-white">$ {money.venta}</Text>
      </View>
    </View>
  );
};
