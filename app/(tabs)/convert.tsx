import { View, Text, ActivityIndicator } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useDolarStore } from "@/store/dolarStore";
import { useEffect, useState } from "react";
import { IDolar } from "@/interfaces/dolar";
export default function Convert() {
  const { dolars, setDolars } = useDolarStore();

  const [total, setTotal] = useState(0);
  const [pesos, setPesos] = useState("");
  const [load, setLoad] = useState(true);

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

  function convert(pesos: string) {
    const dolarOficial = parseFloat(dolars[0].venta);
    const total = parseFloat(pesos) / dolarOficial;
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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="flex-1 items-center bg-slate-800 pt-8 px-4">
      <Text className="text-2xl font-bold text-white">Convertidor</Text>
      <View className="w-full gap-5 mt-8">
        <TextInput
          mode="outlined"
          label="Pesos Argentinos"
          placeholder="Pesos Argentinos"
          onChangeText={handleChange}
          keyboardType="numeric"
          outlineColor="#676767"
          selectionColor="#22c55e"
          className="bg-slate-700"
          textColor="white"
          activeOutlineColor="#22c55e"
          left={<TextInput.Affix text="$" textStyle={{ color: "#f7f7f7" }} />}
        />
        <TextInput
          mode="outlined"
          label="Dolares"
          placeholder="Dolares"
          keyboardType="numeric"
          outlineColor="#676767"
          underlineColor="#f7f7f7"
          selectionColor="#22c55e"
          className="bg-slate-700"
          textColor="white"
          activeOutlineColor="#22c55e"
          left={<TextInput.Affix text="$" textStyle={{ color: "#f7f7f7" }} />}
        />
      </View>
      <View className="w-full mt-6">
        <Button
          mode="contained"
          className="w-full rounded-md "
          textColor="black"
          buttonColor="#22c55e"
          onPress={() => convert(pesos)}
        >
          Convertir
        </Button>
      </View>
      {dolars && (
        <View className="w-full mt-6">
          <Text className="text-white">Dolar Oficial: $ {dolars[0].venta}</Text>
        </View>
      )}
      {total > 0 && (
        <View className="w-full mt-6">
          <Text className="text-white">Total: ${total}</Text>
        </View>
      )}
    </View>
  );
}
