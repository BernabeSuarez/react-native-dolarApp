import { View, Text, ActivityIndicator } from "react-native";
import { TextInput, Button, IconButton, Switch } from "react-native-paper";
import { useDolarStore } from "@/store/dolarStore";
import { useEffect, useState } from "react";
import { IDolar } from "@/interfaces/dolar";

export default function Convert() {
  const { dolars, setDolars } = useDolarStore();
  const [rotate, setRotate] = useState(true);
  const [total, setTotal] = useState(0);
  const [pesos, setPesos] = useState("");
  const [load, setLoad] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setTotal(0);
    setPesos("");
  };

  const fetchDolars = async (setDolars: (dolars: IDolar[]) => void) => {
    try {
      const response = await fetch("https://dolarapi.com/v1/dolares");
      const data = await response.json();
      setDolars(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (text: string) => {
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, "");
    setPesos(numericValue);
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
    setPesos("");
  }

  function convertDolar(pesos: string) {
    const dolarOficial = parseFloat(dolars[0].venta);
    const total = parseFloat(pesos) * dolarOficial;
    setTotal(total);
    setPesos("");
  }

  function convertBlue(pesos: string) {
    const dolarBlue = parseFloat(dolars[1].venta);
    const total = parseFloat(pesos) / dolarBlue;
    setTotal(total);
    setPesos("");
  }

  function convertDolarBlue(pesos: string) {
    const dolarBlue = parseFloat(dolars[1].venta);
    const total = parseFloat(pesos) * dolarBlue;
    setTotal(total);
    setPesos("");
  }

  const getDolars = async () => {
    await fetchDolars(setDolars);
    setLoad(false);
  };

  useEffect(() => {
    getDolars();
  }, []);

  if (load) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-800 pt-8 px-4">
        <ActivityIndicator size={"large"} animating color="#22c55e" />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center bg-slate-800 pt-8 px-4">
      <Text className="text-2xl font-bold text-white">Convertidor</Text>
      {rotate ? (
        <View className="w-full mt-8">
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
            <IconButton
              icon="rotate-3d-variant"
              size={35}
              className="bg-slate-700"
              rippleColor={"#22c55e"}
              onPress={rotateView}
            />

            <TextInput
              mode="flat"
              label="Dolares"
              className="mt-5"
              textColor="white"
              value={total > 0 ? total.toFixed(2) : "0.00"}
              disabled
              left={
                <TextInput.Affix text="$" textStyle={{ color: "#f7f7f7" }} />
              }
            />
          </View>
          <View className="w-full mt-6">
            <Button
              mode="contained"
              className="w-full rounded-md"
              textColor="black"
              buttonColor="#22c55e"
              rippleColor={"#07441d"}
              onPress={() => (isSwitchOn ? convert(pesos) : convertBlue(pesos))}
            >
              Convertir
            </Button>
          </View>
        </View>
      ) : (
        <View className="w-full mt-8">
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
            <IconButton
              icon="rotate-3d-variant"
              size={35}
              className="bg-slate-700"
              rippleColor={"#22c55e"}
              onPress={rotateView}
            />
            <TextInput
              mode="flat"
              label="Pesos Argentinos"
              className="bg-slate-700 mt-5"
              textColor="white"
              disabled
              value={total > 0 ? total.toFixed(2) : "0.00"}
              left={
                <TextInput.Affix text="$" textStyle={{ color: "#f7f7f7" }} />
              }
            />
          </View>
          <View className="w-full mt-6">
            <Button
              mode="contained"
              className="w-full rounded-md"
              textColor="black"
              buttonColor="#22c55e"
              rippleColor={"#07441d"}
              onPress={() =>
                isSwitchOn ? convertDolarBlue(pesos) : convertDolar(pesos)
              }
            >
              Convertir
            </Button>
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
              color="#22c55e"
            />
          </View>
          {isSwitchOn ? (
            <Text className="text-white">Dolar blue: $ {dolars[1].venta}</Text>
          ) : (
            <Text className="text-white">
              Dolar oficial: $ {dolars[0].venta}
            </Text>
          )}
        </View>
      )}
      {total > 0 && (
        <View className="w-full mt-6">
          <Text className="text-white">Total: ${total.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
}
