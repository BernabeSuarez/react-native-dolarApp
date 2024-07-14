import { View, Text, ActivityIndicator } from "react-native";
import { TextInput, Button, IconButton, Switch } from "react-native-paper";
import { useDolarStore } from "@/store/dolarStore";
import { useEffect, useState } from "react";
import { IDolar } from "@/interfaces/dolar";

export default function Convert() {
  const { dolars } = useDolarStore();
  const [rotate, setRotate] = useState(false);
  const [total, setTotal] = useState(0);
  const [pesos, setPesos] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setTotal(0);
    setPesos("");
  };

  const handleChange = (text: string) => {
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, "");
    setPesos(numericValue);

    if (numericValue !== "") {
      // Call the appropriate conversion function based on rotate and isSwitchOn
      if (rotate) {
        isSwitchOn ? convertBlue(numericValue) : convert(numericValue);
      } else {
        isSwitchOn
          ? convertDolarBlue(numericValue)
          : convertDolar(numericValue);
      }
    }
  };

  const rotateView = () => {
    setRotate(!rotate);
    setPesos("");
    setTotal(0);
  };

  function convert(pesos: string) {
    const dolarOficial = parseFloat(dolars[0].venta);
    const total = parseFloat(pesos) / dolarOficial;
    setTotal(total);
  }

  function convertDolar(pesos: string) {
    const dolarOficial = parseFloat(dolars[0].venta);
    const total = parseFloat(pesos) * dolarOficial;
    setTotal(total);
  }

  function convertBlue(pesos: string) {
    const dolarBlue = parseFloat(dolars[1].venta);
    const total = parseFloat(pesos) / dolarBlue;
    setTotal(total);
  }

  function convertDolarBlue(pesos: string) {
    const dolarBlue = parseFloat(dolars[1].venta);
    const total = parseFloat(pesos) * dolarBlue;
    setTotal(total);
  }

  return (
    <View className="flex-1 items-center bg-slate-800 pt-8 px-4">
      <Text className="text-2xl font-bold text-white mt-10">Convertidor</Text>
      {rotate ? (
        <View className="w-full mt-8">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg text-center mb-3 font-bold text-white">
              Pesos a Dolares
            </Text>
            <IconButton
              icon="rotate-3d-variant"
              size={25}
              className="bg-slate-700"
              rippleColor={"#22c55e"}
              onPress={rotateView}
            />
          </View>
          <View className="w-full">
            <TextInput
              mode="outlined"
              label="Pesos Argentinos"
              onChangeText={handleChange}
              keyboardType="numeric"
              outlineColor="#f7f7f7"
              selectionColor="#22c55e"
              className="bg-slate-700 mb-5"
              textColor="white"
              activeOutlineColor="#22c55e"
              value={pesos}
              left={
                <TextInput.Affix text="$" textStyle={{ color: "#f7f7f7" }} />
              }
            />
            <View className="flex-col bg-slate-600 rounded-md p-1 border-2 border-slate-300 justify-between mt-4">
              <Text className=" text-sm text-white text-start">Dolares</Text>
              <Text className="text-2xl font-bold text-white">
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View className="w-full mt-8">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg text-center mb-3 font-bold text-white">
              Dolares a Pesos
            </Text>
            <IconButton
              icon="rotate-3d-variant"
              size={25}
              className="bg-slate-700"
              rippleColor={"#22c55e"}
              onPress={rotateView}
            />
          </View>
          <View className="w-full">
            <TextInput
              mode="outlined"
              label="Dolares"
              onChangeText={handleChange}
              keyboardType="numeric"
              outlineColor="#f7f7f7"
              underlineColor="#f7f7f7"
              selectionColor="#22c55e"
              className="bg-slate-700 mb-5"
              textColor="white"
              activeOutlineColor="#22c55e"
              value={pesos}
              left={
                <TextInput.Affix text="$" textStyle={{ color: "#f7f7f7" }} />
              }
            />

            <View className="flex-col bg-slate-600 rounded-md p-1 border-2 border-slate-300 justify-between mt-4">
              <Text className=" text-sm text-white text-start">Pesos</Text>
              <Text className="text-2xl font-bold text-white">
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      )}
      {dolars && (
        <View className="w-full mt-6">
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-white">Cambio dolar blue</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color="#2263c5"
            />
          </View>
          {isSwitchOn ? (
            <View>
              <Text className="text-white">
                Cotizacion Dolar blue: $ {dolars[1].venta}
              </Text>
              <Text className="text-slate-300 text-xs ">
                ultima actualizacion:{" "}
                {new Date(dolars[1].fechaActualizacion).toLocaleString(
                  "es-AR",
                  {
                    year: "2-digit",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </Text>
            </View>
          ) : (
            <View>
              <Text className="text-white">
                Cotizacion Dolar oficial: $ {dolars[0].venta}
              </Text>
              <Text className="text-slate-300 text-xs ">
                ultima actualizacion:{" "}
                {new Date(dolars[0].fechaActualizacion).toLocaleString(
                  "es-AR",
                  {
                    year: "2-digit",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </Text>
            </View>
          )}
        </View>
      )}
      {total > 0 && (
        <View className="w-full mt-6">
          {rotate ? (
            <Text className="text-white">
              ${pesos} pesos equivalen a: ${total.toFixed(2)} dolares
            </Text>
          ) : (
            <Text className="text-white">
              ${pesos} dolares equivalen a: ${total.toFixed(2)} pesos
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
